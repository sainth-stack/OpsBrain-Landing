"use client";

import {
  DEFAULT_PLAYER_OPTIONS,
  PCM_PLAYER_CODE,
  PCM_PLAYER_NAME,
} from "@/realtime/audio/pcm-player";
import {
  DEFAULT_VAD_OPTIONS,
  VAD_PROCESSOR_NAME,
  VAD_WORKLET_CODE,
} from "@/realtime/audio/vad-processor";
import {
  buildLandingVoiceWsUrl,
  consumeLandingVoiceSession,
  type VoiceCallState,
  type VoiceTurn,
} from "@/lib/landing-voice";
import { useCallback, useEffect, useRef, useState } from "react";

export type { VoiceCallState, VoiceTurn };

function micPermissionError(err: unknown): string {
  if (err instanceof DOMException) {
    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
      return "Microphone access was blocked. Click the lock icon in your address bar, allow the microphone, then tap Start conversation again.";
    }
    if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
      return "No microphone was found. Connect a mic and try again.";
    }
    if (err.name === "NotReadableError") {
      return "Your microphone is in use by another app. Close it and try again.";
    }
  }
  return "Could not access the microphone. Allow mic permission when prompted, then try again.";
}

async function requestMicrophoneStream(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new DOMException(
      "Microphone API unavailable — use HTTPS or localhost.",
      "NotSupportedError",
    );
  }
  return navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    video: false,
  });
}

export function useLandingVoiceAssistant() {
  const [callState, setCallState] = useState<VoiceCallState>("idle");
  const [turns, setTurns] = useState<VoiceTurn[]>([]);
  const [agentText, setAgentText] = useState("");
  const [userTranscript, setUserTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const playerNodeRef = useRef<AudioWorkletNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const micConnectedRef = useRef(false);
  const playbackActiveRef = useRef(false);
  const agentUtteranceActiveRef = useRef(false);
  const micOpenPendingRef = useRef(false);
  const bargedInRef = useRef(false);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callStartTimeRef = useRef(0);
  const callStateRef = useRef<VoiceCallState>("idle");

  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  const startTimer = useCallback(() => {
    callStartTimeRef.current = Date.now();
    durationIntervalRef.current = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTimeRef.current) / 1000));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  }, []);

  const setCaptureMode = useCallback((agentSpeaking: boolean) => {
    workletNodeRef.current?.port.postMessage({ cmd: "mode", agentSpeaking });
  }, []);

  const stopPlayback = useCallback(() => {
    playerNodeRef.current?.port.postMessage({ cmd: "clear" });
    playbackActiveRef.current = false;
  }, []);

  const muteMic = useCallback(() => {
    if (micSourceRef.current && workletNodeRef.current && micConnectedRef.current) {
      try {
        micSourceRef.current.disconnect(workletNodeRef.current);
      } catch {
        /* ok */
      }
      micConnectedRef.current = false;
    }
  }, []);

  const connectMic = useCallback(() => {
    if (micSourceRef.current && workletNodeRef.current && !micConnectedRef.current) {
      micSourceRef.current.connect(workletNodeRef.current);
      micConnectedRef.current = true;
    }
  }, []);

  const openMicWhenReady = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (ctx?.state === "suspended") ctx.resume().catch(() => {});
    if (!playbackActiveRef.current) {
      micOpenPendingRef.current = false;
      connectMic();
      setCaptureMode(false);
      setCallState("active");
      return;
    }
    micOpenPendingRef.current = true;
  }, [connectMic, setCaptureMode]);

  const handleBargeIn = useCallback(() => {
    bargedInRef.current = true;
    agentUtteranceActiveRef.current = false;
    stopPlayback();
    setCaptureMode(false);
    setCallState("active");
  }, [stopPlayback, setCaptureMode]);

  const enqueuePCMChunk = useCallback((pcmBytes: ArrayBuffer) => {
    if (bargedInRef.current) return;
    const ctx = audioCtxRef.current;
    const player = playerNodeRef.current;
    if (!ctx || !player) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    playbackActiveRef.current = true;
    player.port.postMessage(pcmBytes, [pcmBytes]);
  }, []);

  const closeWs = useCallback(() => {
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {
        /* ok */
      }
      wsRef.current = null;
    }
  }, []);

  const cleanup = useCallback(() => {
    stopTimer();
    muteMic();
    agentUtteranceActiveRef.current = false;
    micOpenPendingRef.current = false;
    bargedInRef.current = false;
    stopPlayback();
    closeWs();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    if (workletNodeRef.current) {
      try {
        workletNodeRef.current.disconnect();
      } catch {
        /* ok */
      }
      workletNodeRef.current = null;
    }
    if (playerNodeRef.current) {
      try {
        playerNodeRef.current.disconnect();
      } catch {
        /* ok */
      }
      playerNodeRef.current = null;
    }
    micSourceRef.current = null;
    micConnectedRef.current = false;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, [stopTimer, muteMic, stopPlayback, closeWs]);

  const startCall = useCallback(async () => {
    if (callStateRef.current !== "idle" && callStateRef.current !== "ended") return;

    cleanup();
    setError(null);
    setTurns([]);
    setUserTranscript("");
    setAgentText("");
    setCallDuration(0);
    setCallState("connecting");

    // Request mic in the same user gesture as the button click — before any network
    // await, or Chrome blocks getUserMedia without showing the permission prompt.
    let stream: MediaStream;
    try {
      stream = await requestMicrophoneStream();
    } catch (err) {
      setError(micPermissionError(err));
      setCallState("idle");
      cleanup();
      return;
    }
    micStreamRef.current = stream;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        /* ok */
      }
    }

    const capUrl = URL.createObjectURL(
      new Blob([VAD_WORKLET_CODE], { type: "application/javascript" }),
    );
    const playUrl = URL.createObjectURL(
      new Blob([PCM_PLAYER_CODE], { type: "application/javascript" }),
    );

    let session: Awaited<ReturnType<typeof consumeLandingVoiceSession>>;
    try {
      const [, sessionResult] = await Promise.all([
        Promise.all([ctx.audioWorklet.addModule(capUrl), ctx.audioWorklet.addModule(playUrl)]),
        consumeLandingVoiceSession(),
      ]);
      session = sessionResult;
    } catch {
      setError("Your browser does not support real-time voice.");
      setCallState("idle");
      cleanup();
      URL.revokeObjectURL(capUrl);
      URL.revokeObjectURL(playUrl);
      return;
    }
    URL.revokeObjectURL(capUrl);
    URL.revokeObjectURL(playUrl);

    if (!session.ok) {
      setError(session.error);
      setCallState("idle");
      cleanup();
      return;
    }

    const playerNode = new AudioWorkletNode(ctx, PCM_PLAYER_NAME, {
      processorOptions: DEFAULT_PLAYER_OPTIONS,
      outputChannelCount: [1],
    });
    playerNodeRef.current = playerNode;
    playerNode.connect(ctx.destination);
    playerNode.port.onmessage = (evt: MessageEvent<{ type?: string }>) => {
      if (evt.data?.type === "drained") {
        playbackActiveRef.current = false;
        if (micOpenPendingRef.current) {
          micOpenPendingRef.current = false;
          connectMic();
          setCaptureMode(false);
          setCallState("active");
        }
      }
    };

    const workletNode = new AudioWorkletNode(ctx, VAD_PROCESSOR_NAME, {
      processorOptions: DEFAULT_VAD_OPTIONS,
    });
    workletNodeRef.current = workletNode;
    workletNode.port.onmessage = (evt: MessageEvent<ArrayBuffer>) => {
      if (evt.data instanceof ArrayBuffer && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(evt.data);
      }
    };
    const silentGain = ctx.createGain();
    silentGain.gain.value = 0;
    workletNode.connect(silentGain);
    silentGain.connect(ctx.destination);

    const micSource = ctx.createMediaStreamSource(stream);
    micSourceRef.current = micSource;
    // Hold capture until the backend sends mic_open (after Diya's greeting).
    // Forwarding PCM during STT handshake used to abort the Cartesia connect.

    const ws = new WebSocket(buildLandingVoiceWsUrl(session.sessionToken));
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => startTimer();

    ws.onmessage = (evt) => {
      if (evt.data instanceof ArrayBuffer) {
        enqueuePCMChunk(evt.data);
        return;
      }
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(evt.data as string);
      } catch {
        return;
      }
      const type = data.type as string;

      switch (type) {
        case "connected":
          setCallState("opening");
          break;
        case "agent_start": {
          setCallState("agent_speaking");
          const chunk = (data.text as string) ?? "";
          setAgentText(chunk);
          bargedInRef.current = false;
          if (!agentUtteranceActiveRef.current) {
            agentUtteranceActiveRef.current = true;
            stopPlayback();
          }
          setCaptureMode(true);
          break;
        }
        case "agent_token": {
          const chunk = (data.text as string) ?? "";
          if (!chunk) break;
          setAgentText((prev) => {
            if (!prev) return chunk;
            const sep = prev.endsWith(" ") || chunk.startsWith(" ") ? "" : " ";
            return prev + sep + chunk;
          });
          break;
        }
        case "agent_done":
          agentUtteranceActiveRef.current = false;
          break;
        case "barge_in":
          handleBargeIn();
          break;
        case "done": {
          const reply = (data.reply as string) ?? "";
          if (reply) {
            setTurns((prev) => [
              ...prev,
              { id: `t_${Date.now()}`, role: "assistant", text: reply },
            ]);
          }
          setAgentText("");
          break;
        }
        case "mic_open":
          openMicWhenReady();
          break;
        case "transcript": {
          const text = (data.text as string) ?? "";
          const isFinal = data.is_final as boolean;
          if (isFinal && text) {
            setUserTranscript("");
            setTurns((prev) => [
              ...prev,
              { id: `t_${Date.now()}`, role: "user", text },
            ]);
          } else {
            setUserTranscript(text);
          }
          break;
        }
        case "error":
          setError((data.message as string) ?? "Voice assistant error");
          if (
            callStateRef.current === "connecting" ||
            callStateRef.current === "opening"
          ) {
            setCallState("idle");
            cleanup();
          }
          break;
      }
    };

    ws.onerror = () => {
      setError("Voice connection failed. Please try again.");
      setCallState("idle");
      cleanup();
    };

    ws.onclose = (ev) => {
      if (ev.code !== 1000 && callStateRef.current !== "ended") {
        setCallState("ended");
        stopTimer();
      }
      wsRef.current = null;
    };
  }, [
    cleanup,
    connectMic,
    enqueuePCMChunk,
    handleBargeIn,
    openMicWhenReady,
    setCaptureMode,
    startTimer,
    stopPlayback,
    stopTimer,
  ]);

  const endCall = useCallback(() => {
    if (agentText.trim()) {
      setTurns((prev) => [
        ...prev,
        { id: `t_${Date.now()}`, role: "assistant", text: agentText.trim() },
      ]);
      setAgentText("");
    }
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "end" }));
    }
    setCallState("ending");
    muteMic();
    stopPlayback();
    stopTimer();
    closeWs();
    window.setTimeout(() => {
      setCallState((current) => (current === "ending" ? "ended" : current));
    }, 700);
  }, [agentText, muteMic, stopPlayback, stopTimer, closeWs]);

  useEffect(() => () => cleanup(), [cleanup]);

  return {
    callState,
    turns,
    agentText,
    userTranscript,
    error,
    callDuration,
    startCall,
    endCall,
    isInCall:
      callState === "connecting" ||
      callState === "opening" ||
      callState === "active" ||
      callState === "agent_speaking" ||
      callState === "ending",
  };
}
