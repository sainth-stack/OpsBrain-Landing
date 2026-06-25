"use client";

const BAR_CONFIG = [
  { height: 10, duration: "0.85s", delay: "0ms" },
  { height: 18, duration: "1.05s", delay: "120ms" },
  { height: 28, duration: "0.95s", delay: "240ms" },
  { height: 38, duration: "1.15s", delay: "80ms" },
  { height: 22, duration: "0.9s", delay: "360ms" },
  { height: 42, duration: "1.2s", delay: "200ms" },
  { height: 32, duration: "1s", delay: "480ms" },
  { height: 16, duration: "0.88s", delay: "300ms" },
  { height: 36, duration: "1.1s", delay: "140ms" },
  { height: 24, duration: "0.92s", delay: "420ms" },
  { height: 14, duration: "0.98s", delay: "260ms" },
  { height: 30, duration: "1.08s", delay: "180ms" },
  { height: 20, duration: "0.94s", delay: "540ms" },
  { height: 12, duration: "1.02s", delay: "60ms" },
  { height: 26, duration: "1.12s", delay: "320ms" },
  { height: 34, duration: "0.96s", delay: "400ms" },
] as const;

/** SaaS-style live voice waveform for the hero orb. */
export function VoiceWaveform({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative flex h-12 items-end justify-center gap-[3px] px-1">
        <div
          className="pointer-events-none absolute inset-x-2 bottom-0 h-8 rounded-full bg-white/20 blur-xl"
          aria-hidden="true"
        />
        {BAR_CONFIG.map((bar, i) => (
          <span
            key={i}
            className="voice-wave-bar w-[3px] rounded-full bg-gradient-to-t from-white/70 to-white"
            style={{
              height: `${bar.height}px`,
              ["--bar-duration" as string]: bar.duration,
              ["--bar-delay" as string]: bar.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
