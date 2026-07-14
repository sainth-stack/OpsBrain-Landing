/**
 * Gapless PCM16 playback AudioWorklet.
 *
 * The previous player created one `AudioBufferSourceNode` per WebSocket frame
 * and scheduled them back-to-back. Variable Azure chunk sizes + tiny scheduling
 * seams produced clicks ("breaking"), and buffers were built at 16 kHz while the
 * AudioContext ran at the device rate (44.1/48 kHz), so the browser resampled
 * every chunk (audible "blur").
 *
 * This worklet instead keeps a single continuous ring buffer of 16 kHz source
 * samples and produces the context's native-rate output with linear
 * interpolation — one uninterrupted stream, no per-chunk seams. On underrun it
 * emits silence (never a click or a timeline jump) and re-buffers a small
 * jitter cushion before resuming, then reports "drained" so the main thread can
 * open the mic once the agent has truly finished speaking.
 *
 * Messages IN (main -> worklet):
 *   ArrayBuffer            : Int16LE mono 16 kHz PCM to enqueue
 *   { cmd: "clear" }       : drop all buffered audio immediately (barge-in / stop)
 * Messages OUT (worklet -> main):
 *   { type: "drained" }    : buffer emptied after having played audio
 */
export const PCM_PLAYER_CODE = `
class PcmPlayerProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = options.processorOptions || {};
    this._srcRate = opts.srcRate || 16000;
    // How many source (16 kHz) samples advance per output sample.
    this._step = this._srcRate / sampleRate;
    // Small jitter cushion before (re)starting playback, in source samples.
    this._minStart = Math.floor(((opts.minStartMs || 120) / 1000) * this._srcRate);

    this._buffer = new Float32Array(0); // pending source-rate samples
    this._readPos = 0;                  // fractional read index into _buffer
    this._started = false;              // are we actively draining?
    this._everPlayed = false;           // have we output any audio this run?

    this.port.onmessage = (e) => {
      const d = e.data;
      if (d && d.cmd === "clear") {
        this._buffer = new Float32Array(0);
        this._readPos = 0;
        this._started = false;
        this._everPlayed = false;
        return;
      }
      this._enqueue(new Int16Array(d));
    };
  }

  _enqueue(int16) {
    const startIdx = Math.floor(this._readPos);
    const keep = this._buffer.length - startIdx;
    const merged = new Float32Array(keep + int16.length);
    if (keep > 0) merged.set(this._buffer.subarray(startIdx), 0);
    for (let i = 0; i < int16.length; i++) {
      merged[keep + i] = int16[i] / 32768;
    }
    this._buffer = merged;
    this._readPos -= startIdx;
  }

  process(_inputs, outputs) {
    const out = outputs[0] && outputs[0][0];
    if (!out) return true;

    const available = this._buffer.length - this._readPos;

    if (!this._started) {
      // Wait for a jitter cushion before starting, so early network jitter
      // doesn't immediately underrun. If we've already played this run and
      // just went dry, report drained once.
      if (available < this._minStart) {
        out.fill(0);
        return true;
      }
      this._started = true;
    }

    for (let i = 0; i < out.length; i++) {
      const idx = this._readPos;
      const i0 = Math.floor(idx);
      if (i0 + 1 >= this._buffer.length) {
        // Underrun: fill the rest of this render quantum with silence and
        // pause draining until the cushion refills (no click, no jump).
        for (let j = i; j < out.length; j++) out[j] = 0;
        this._started = false;
        if (this._everPlayed) {
          this._everPlayed = false;
          this.port.postMessage({ type: "drained" });
        }
        this._compact();
        return true;
      }
      const frac = idx - i0;
      out[i] = this._buffer[i0] * (1 - frac) + this._buffer[i0 + 1] * frac;
      this._readPos += this._step;
      this._everPlayed = true;
    }

    this._compact();
    return true;
  }

  _compact() {
    const startIdx = Math.floor(this._readPos);
    if (startIdx > 8192) {
      this._buffer = this._buffer.slice(startIdx);
      this._readPos -= startIdx;
    }
  }
}
registerProcessor("pcm-player-processor", PcmPlayerProcessor);
`;

export const PCM_PLAYER_NAME = "pcm-player-processor";

export const DEFAULT_PLAYER_OPTIONS = {
  srcRate: 16000,
  // Jitter cushion before playback (re)starts. Large enough to ride out
  // network jitter and the brief gap between pipelined TTS sentences.
  minStartMs: 140,
} as const;
