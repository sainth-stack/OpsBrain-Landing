/**
 * Mic capture AudioWorklet: downsamples to PCM16 16 kHz and forwards to the
 * server, with an energy gate so the user can interrupt naturally.
 *
 * Downsampling uses linear interpolation (not nearest-sample) to avoid the
 * aliasing that degraded what Azure STT heard.
 *
 * Echo gate (while the agent is speaking): raw mic audio includes the agent's
 * own voice echoing through the speakers, which must not reach STT or the agent
 * would "interrupt" itself. So during agent speech we only forward audio while
 * we detect real voiced energy, and we keep a short rolling PRE-ROLL buffer that
 * we flush the moment speech starts - so STT receives the user's interruption
 * from its very first word (no clipped onset). A hangover keeps forwarding
 * through natural short pauses mid-sentence, then re-gates on silence.
 *
 * The decision of whether an utterance actually interrupts the agent is made on
 * the SERVER from the recognised words (backchannels like "yeah"/"go ahead" are
 * ignored) - this worklet only controls which audio is worth sending.
 *
 * When the agent is not speaking, the mic is fully open (forward everything).
 *
 * Messages IN (main -> worklet): { cmd: "mode", agentSpeaking: boolean }
 * Messages OUT (worklet -> main): ArrayBuffer of Int16LE mono 16 kHz PCM
 */
export const VAD_WORKLET_CODE = `
class VadCaptureProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = options.processorOptions || {};
    this._ratio = sampleRate / 16000;
    this._leftover = new Float32Array(0);

    this._agentSpeaking = false;
    this._threshold = opts.bargeInRms != null ? opts.bargeInRms : 0.02;
    const framesFor = (ms) => Math.max(1, Math.ceil((ms / 1000) * sampleRate / 128));
    this._minVoicedFrames = framesFor(opts.minVoicedMs != null ? opts.minVoicedMs : 220);
    this._hangoverFrames = framesFor(opts.hangoverMs != null ? opts.hangoverMs : 500);
    this._maxPreroll = Math.floor(((opts.prerollMs != null ? opts.prerollMs : 350) / 1000) * 16000);

    this._voicedRun = 0;
    this._hangover = 0;
    this._active = false;
    this._preroll = [];       // Int16Array chunks (16 kHz), recent audio
    this._prerollLen = 0;

    this.port.onmessage = (e) => {
      const d = e.data;
      if (d && d.cmd === "mode") {
        this._agentSpeaking = !!d.agentSpeaking;
        this._voicedRun = 0;
        this._hangover = 0;
        this._active = false;
        this._preroll = [];
        this._prerollLen = 0;
        this._leftover = new Float32Array(0);
      }
    };
  }

  _downsample(input) {
    const combined = new Float32Array(this._leftover.length + input.length);
    combined.set(this._leftover);
    combined.set(input, this._leftover.length);
    const outCount = Math.floor(combined.length / this._ratio);
    if (outCount <= 0) {
      this._leftover = combined;
      return new Int16Array(0);
    }
    const pcm = new Int16Array(outCount);
    for (let i = 0; i < outCount; i++) {
      const pos = i * this._ratio;
      const i0 = Math.floor(pos);
      const frac = pos - i0;
      const s0 = combined[i0];
      const s1 = i0 + 1 < combined.length ? combined[i0 + 1] : s0;
      const v = s0 * (1 - frac) + s1 * frac;
      pcm[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
    }
    const consumed = Math.floor(outCount * this._ratio);
    this._leftover = combined.slice(consumed);
    return pcm;
  }

  _send(pcm) {
    if (pcm.length > 0) this.port.postMessage(pcm.buffer, [pcm.buffer]);
  }

  _pushPreroll(pcm) {
    if (pcm.length === 0) return;
    this._preroll.push(pcm);
    this._prerollLen += pcm.length;
    while (this._prerollLen - this._preroll[0].length >= this._maxPreroll && this._preroll.length > 1) {
      this._prerollLen -= this._preroll[0].length;
      this._preroll.shift();
    }
  }

  _flushPreroll() {
    const merged = new Int16Array(this._prerollLen);
    let off = 0;
    for (const c of this._preroll) { merged.set(c, off); off += c.length; }
    this._preroll = [];
    this._prerollLen = 0;
    this._send(merged);
  }

  process(inputs) {
    const input = inputs[0] && inputs[0][0];
    if (!input || !input.length) return true;

    const pcm = this._downsample(input);

    if (!this._agentSpeaking) {
      this._send(pcm);
      return true;
    }

    let sum = 0;
    for (let i = 0; i < input.length; i++) sum += input[i] * input[i];
    const rms = Math.sqrt(sum / input.length);
    if (rms >= this._threshold) {
      this._voicedRun++;
      this._hangover = 0;
    } else {
      this._voicedRun = 0;
      if (this._active) this._hangover++;
    }

    if (!this._active) {
      this._pushPreroll(pcm);
      if (this._voicedRun >= this._minVoicedFrames) {
        this._active = true;
        this.port.postMessage({ type: "interrupt" });
        this._flushPreroll(); // includes onset + current audio
      }
    } else {
      this._send(pcm);
      if (this._hangover > this._hangoverFrames) {
        this._active = false;
        this._preroll = [];
        this._prerollLen = 0;
      }
    }
    return true;
  }
}
registerProcessor('vad-capture-processor', VadCaptureProcessor);
`;

export const VAD_PROCESSOR_NAME = "vad-capture-processor";

export const DEFAULT_VAD_OPTIONS = {
  // RMS threshold for a "voiced" frame while the agent is speaking.
  bargeInRms: 0.012,
  // Sustained voiced audio (ms) before we start forwarding an interruption.
  minVoicedMs: 90,
  // Keep forwarding this long after voice drops (rides over mid-sentence pauses).
  hangoverMs: 420,
  // Rolling audio kept so the interruption's first words aren't clipped.
  prerollMs: 320,
} as const;
