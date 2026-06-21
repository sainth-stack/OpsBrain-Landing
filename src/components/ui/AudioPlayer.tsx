"use client";

import { cn } from "@/lib/utils";
import { trackAudioPlay } from "@/lib/analytics";
import { Pause, Play } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface AudioPlayerContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  registerStop: (id: string, stop: () => void) => void;
  unregisterStop: (id: string) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeId, setActiveIdState] = useState<string | null>(null);
  const stopsRef = useRef(new Map<string, () => void>());

  const registerStop = useCallback((id: string, stop: () => void) => {
    stopsRef.current.set(id, stop);
  }, []);

  const unregisterStop = useCallback((id: string) => {
    stopsRef.current.delete(id);
  }, []);

  const setActiveId = useCallback((id: string | null) => {
    setActiveIdState((prev) => {
      if (prev && prev !== id) {
        stopsRef.current.get(prev)?.();
      }
      return id;
    });
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{ activeId, setActiveId, registerStop, unregisterStop }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

function useAudioPlayerContext() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("AudioPlayer must be used within AudioPlayerProvider");
  }
  return ctx;
}

function WaveformVisualizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div
      className="flex h-10 items-end justify-center gap-[3px]"
      aria-hidden="true"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-brand-primary/70 transition-all",
            isPlaying ? "animate-waveform-bar" : "h-2",
          )}
          style={
            isPlaying
              ? {
                  animationDelay: `${i * 0.05}s`,
                  height: `${8 + (i % 5) * 4}px`,
                }
              : { height: "8px" }
          }
        />
      ))}
    </div>
  );
}

export interface AudioPlayerProps {
  id: string;
  src: string;
  fallbackText: string;
  fallbackLang?: string;
  duration?: number;
  label: string;
  className?: string;
  isActiveCard?: boolean;
  preferSpeech?: boolean;
  showDemoLabel?: boolean;
}

export function AudioPlayer({
  id,
  src,
  fallbackText,
  fallbackLang = "en-US",
  duration: fallbackDuration = 45,
  label,
  className,
  isActiveCard,
  preferSpeech = false,
  showDemoLabel = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { activeId, setActiveId, registerStop, unregisterStop } =
    useAudioPlayerContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [useSpeechFallback, setUseSpeechFallback] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [audioReady, setAudioReady] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<"idle" | "speech" | "file">(
    "idle",
  );

  const isGlobalActive = activeId === id;

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    progressRef.current = 0;
    setPlaybackMode("idle");
  }, []);

  useEffect(() => {
    registerStop(id, stopPlayback);
    return () => {
      unregisterStop(id);
      stopPlayback();
    };
  }, [id, stopPlayback, registerStop, unregisterStop]);

  const startSpeechFallback = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    setUseSpeechFallback(true);
    setPlaybackMode("speech");
    const utterance = new SpeechSynthesisUtterance(fallbackText);
    utterance.lang = fallbackLang;
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const matched = voices.find((v) => v.lang.startsWith(fallbackLang.split("-")[0]));
    if (matched) utterance.voice = matched;

    utterance.onend = () => {
      stopPlayback();
      setActiveId(null);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    const estimatedDuration = fallbackDuration;
    setDuration(estimatedDuration);
    setCurrentTime(0);
    progressRef.current = 0;

    timerRef.current = setInterval(() => {
      progressRef.current += 0.25;
      setCurrentTime(progressRef.current);
      if (progressRef.current >= estimatedDuration) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 250);
  }, [fallbackText, fallbackLang, fallbackDuration, setActiveId, stopPlayback]);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      stopPlayback();
      setActiveId(null);
      return;
    }

    setActiveId(id);

    trackAudioPlay(fallbackLang);

    const speechAvailable =
      typeof window !== "undefined" && !!window.speechSynthesis;

    if (preferSpeech && speechAvailable) {
      setIsPlaying(true);
      startSpeechFallback();
      return;
    }

    const audio = audioRef.current;

    if (audio && audioReady && !useSpeechFallback) {
      try {
        await audio.play();
        setIsPlaying(true);
        setPlaybackMode("file");
        return;
      } catch {
        setUseSpeechFallback(true);
      }
    }

    if (speechAvailable) {
      setIsPlaying(true);
      startSpeechFallback();
    }
  }, [
    isPlaying,
    stopPlayback,
    setActiveId,
    id,
    preferSpeech,
    audioReady,
    useSpeechFallback,
    startSpeechFallback,
    fallbackLang,
  ]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      togglePlay();
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn("space-y-3", className)}>
      {showDemoLabel && (
        <p className="text-[11px] font-medium text-brand-accent">
          {playbackMode === "speech" && isPlaying
            ? "▶ Browser voice preview (Web Speech API)"
            : playbackMode === "file" && isPlaying
              ? "▶ Playing preview audio file"
              : "Browser voice preview - tap play to hear demo script"}
        </p>
      )}
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          if (audio && Number.isFinite(audio.duration)) {
            setDuration(audio.duration);
            setAudioReady(true);
          }
        }}
        onError={() => setUseSpeechFallback(true)}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (audio) setCurrentTime(audio.currentTime);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setActiveId(null);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (!useSpeechFallback) setIsPlaying(false);
        }}
        className="sr-only"
        aria-hidden="true"
      />

      <WaveformVisualizer isPlaying={isPlaying && isGlobalActive} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          onKeyDown={handleKeyDown}
          aria-label={isPlaying ? `Pause ${label} demo` : `Play ${label} demo`}
          aria-pressed={isPlaying}
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full transition-all",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            isPlaying && isGlobalActive
              ? "bg-brand-primary text-white ring-2 ring-brand-primary/30"
              : "bg-brand-primary-light text-brand-primary hover:bg-brand-primary hover:text-white",
            isActiveCard && isPlaying && "ring-2 ring-brand-accent ring-offset-2",
          )}
        >
          {isPlaying && isGlobalActive ? (
            <Pause className="size-5" aria-hidden="true" />
          ) : (
            <Play className="size-5 translate-x-0.5" aria-hidden="true" />
          )}
        </button>

        <div className="flex-1">
          <div
            className="h-1.5 overflow-hidden rounded-full bg-border-default"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${label} playback progress`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-text-muted">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
