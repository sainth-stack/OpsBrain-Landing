"use client";

import { DiyaAvatar } from "@/components/assistant/DiyaAvatar";
import { cn } from "@/lib/utils";
import type { VoiceCallState } from "@/lib/landing-voice";

const BAR_HEIGHTS = [6, 12, 20, 28, 16, 32, 24, 14, 26, 18, 10, 30] as const;

type OrbSize = "hero" | "default" | "compact";

type DiyaOrbProps = {
  callState: VoiceCallState;
  size?: OrbSize;
  className?: string;
};

function Waveform({ active, mode }: { active: boolean; mode: "agent" | "user" | "idle" }) {
  const barClass =
    mode === "user"
      ? "bg-gradient-to-t from-emerald-500/80 to-emerald-400"
      : mode === "agent"
        ? "bg-gradient-to-t from-brand-primary/90 to-indigo-400"
        : "bg-brand-primary/20";

  return (
    <div
      className="flex h-7 items-end justify-center gap-[3px]"
      aria-hidden="true"
      role="presentation"
    >
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full transition-all duration-300",
            active ? cn("voice-wave-bar", barClass) : barClass,
          )}
          style={{
            height: active ? `${h * 0.55}px` : `${h * 0.3}px`,
            ["--bar-duration" as string]: `${0.7 + (i % 4) * 0.1}s`,
            ["--bar-delay" as string]: `${i * 55}ms`,
          }}
        />
      ))}
    </div>
  );
}

const SIZE_CONFIG: Record<
  OrbSize,
  { avatar: "sm" | "md" | "lg" | "xl"; width: string; showWaveform: boolean }
> = {
  hero: { avatar: "xl", width: "w-32", showWaveform: true },
  default: { avatar: "lg", width: "w-28", showWaveform: true },
  compact: { avatar: "md", width: "w-20", showWaveform: false },
};

export function DiyaOrb({ callState, size = "default", className }: DiyaOrbProps) {
  const isSpeaking = callState === "agent_speaking" || callState === "opening";
  const isListening = callState === "active";
  const isLive =
    callState === "connecting" ||
    callState === "opening" ||
    callState === "active" ||
    callState === "agent_speaking";
  const isConnecting = callState === "connecting" || callState === "ending";

  const { avatar: avatarSize, width: containerWidth, showWaveform } = SIZE_CONFIG[size];

  return (
    <div className={cn("relative mx-auto flex flex-col items-center", containerWidth, className)}>
      <div className="relative flex aspect-square w-full items-center justify-center">
        {isLive ? (
          <>
            <div
              className="absolute inset-[-4px] rounded-full border-2 border-brand-primary/25 animate-pulse-ring"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 rounded-full border border-brand-primary/15 animate-pulse-ring"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            />
            {isListening ? (
              <div
                className="absolute inset-[-8px] rounded-full border-2 border-emerald-400/40 animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
                aria-hidden="true"
              />
            ) : null}
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-primary/5 to-indigo-100/40 animate-breathe"
              aria-hidden="true"
            />
            <div
              className="absolute inset-2 rounded-full border border-brand-primary/15"
              aria-hidden="true"
            />
          </>
        )}

        {isConnecting ? (
          <div
            className="absolute -inset-2 rounded-full animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(79,70,229,0.4) 15%, transparent 35%, rgba(16,185,129,0.25) 60%, transparent 80%)",
              maskImage: "radial-gradient(closest-side, transparent 78%, black 80%)",
              WebkitMaskImage: "radial-gradient(closest-side, transparent 78%, black 80%)",
            }}
            aria-hidden="true"
          />
        ) : null}

        <div
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full",
            isSpeaking && "glow-pulse",
            isListening && "ring-[3px] ring-emerald-400/50 ring-offset-2 ring-offset-surface-white",
          )}
        >
          <DiyaAvatar size={avatarSize} showOnline={isLive} />
        </div>
      </div>

      {showWaveform ? (
        <div className="mt-3 w-full">
          <Waveform
            active={isSpeaking || isListening}
            mode={isListening ? "user" : isSpeaking ? "agent" : "idle"}
          />
        </div>
      ) : null}
    </div>
  );
}
