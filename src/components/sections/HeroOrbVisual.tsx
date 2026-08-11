"use client";

import { cn } from "@/lib/utils";
import { VoiceWaveform } from "@/components/ui/VoiceWaveform";
import { hero } from "@/content/site";
import { CalendarCheck, Database, Pause, Phone, Play, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const leadStep = hero.visual.storySteps[0];
const callStep = hero.visual.storySteps[1];
const crmStep = hero.visual.storySteps[4];
const metrics = crmStep.metrics;

const parallax = (factor: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--mx, 0) * ${factor}px), calc(var(--my, 0) * ${factor}px), 0)`,
  transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
});

function EmployeeOrb() {
  const [liveLabel, setLiveLabel] = useState<string>(callStep.languageChip);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    const chips = hero.visual.storySteps
      .map((step) => step.languageChip)
      .filter(Boolean);
    if (chips.length <= 1) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % chips.length;
      setLiveLabel(chips[index] ?? callStep.languageChip);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative flex aspect-square w-[72%] items-center justify-center">
      <div
        className="absolute inset-0 rounded-full border-2 border-brand-primary/25 animate-pulse-ring"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-full border border-brand-primary/15 animate-pulse-ring"
        style={{ animationDelay: "1.6s" }}
        aria-hidden="true"
      />

      <div
        className="absolute -inset-4 rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(79,70,229,0.35) 10%, transparent 28%, rgba(16,185,129,0.25) 52%, transparent 70%, rgba(79,70,229,0.3) 90%, transparent 100%)",
          maskImage: "radial-gradient(closest-side, transparent 84%, black 86%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, transparent 84%, black 86%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute -inset-7 animate-orbit" aria-hidden="true">
        <span className="absolute left-1/2 top-0 -ml-1 h-2.5 w-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(79,70,229,0.8)]" />
        <span className="absolute bottom-[12%] right-[8%] h-1.5 w-1.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
      </div>
      <div
        className="absolute -inset-12 animate-orbit"
        style={{ animationDirection: "reverse", animationDuration: "38s" }}
        aria-hidden="true"
      >
        <span className="absolute right-0 top-1/2 h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
      </div>

      <audio
        ref={audioRef}
        src="/audio/hero-demo.mp3?v=cartesia-simi1"
        preload="none"
        onEnded={() => { setIsPlaying(false); }}
        className="sr-only"
        aria-hidden="true"
      />

      <div
        className="relative flex h-full w-full flex-col items-center justify-center rounded-full animate-breathe"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #eef2ff 0%, #a5b4fc 24%, #6366f1 50%, #4338ca 76%, #312e81 96%)",
          boxShadow:
            "0 24px 80px rgba(79,70,229,0.32), inset 0 -26px 56px rgba(30,27,75,0.35), inset 0 14px 40px rgba(255,255,255,0.5)",
        }}
      >
        <div
          className="absolute left-[16%] top-[10%] h-[26%] w-[38%] rounded-full bg-white/45 blur-xl"
          aria-hidden="true"
        />

        <VoiceWaveform />

        <p className="mt-3 text-xl font-bold tracking-[0.18em] text-white sm:text-2xl">
          {hero.visual.centerLabel}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-white/90">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          Live call · {liveLabel}
        </p>

        {/* Play button — bottom-left of orb sphere */}
        <div className="absolute bottom-[10%] left-[10%] flex flex-col items-center gap-1.5">
          {/* Attention pulse ring — only shown when idle */}
          {!isPlaying && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: "rgba(255,255,255,0.35)" }}
              aria-hidden="true"
            />
          )}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause OpsBrain demo" : "Play OpsBrain demo"}
            aria-pressed={isPlaying}
            className={cn(
              "relative flex size-16 items-center justify-center rounded-full transition-all duration-300",
              "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
              "active:scale-95",
              isPlaying
                ? "bg-brand-primary text-white shadow-[0_0_32px_rgba(79,70,229,0.8),0_0_12px_rgba(79,70,229,0.5)] ring-2 ring-white/30"
                : "border-2 border-white/50 bg-white/20 text-white backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:bg-white/35 hover:border-white/70 hover:scale-105",
            )}
          >
            {isPlaying ? (
              <Pause className="size-6" aria-hidden="true" />
            ) : (
              <Play className="size-6 translate-x-0.5" aria-hidden="true" />
            )}
          </button>
          <span className="text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none">
            {isPlaying ? "Playing" : "Hear Demo"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HeroOrbVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", x.toFixed(3));
        el.style.setProperty("--my", y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={visualRef}
      className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center"
      role="img"
      aria-label={hero.visual.ariaLabel}
    >
      <div style={parallax(16)} className="flex h-full w-full items-center justify-center">
        <EmployeeOrb />
      </div>

      <div
        className="absolute left-0 top-0 z-10 hidden w-[220px] sm:block md:-left-4 lg:w-60"
        style={parallax(-26)}
      >
        <div className="animate-float rounded-xl border border-border-default bg-white/95 p-4 shadow-xl backdrop-blur-md">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {leadStep.feedLabel}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
            {callStep.voice?.transcript ?? callStep.message}
          </p>
          <p className="mt-2.5 border-t border-border-muted pt-2.5 text-xs font-medium text-brand-accent">
            {callStep.activeCallsNote}
          </p>
        </div>
      </div>

      <div
        className="absolute right-0 top-0 z-10 hidden w-[200px] sm:block md:-right-4 lg:w-[220px]"
        style={parallax(-18)}
      >
        <div
          className="animate-float rounded-xl border border-border-default bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md"
          style={{ animationDelay: "1.1s" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            {hero.visual.commandCenterTitle}
          </p>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
            <span className="text-text-muted">{hero.visual.metricLabels.liveCalls}</span>
            <span className="font-semibold text-text-primary">{metrics.liveCalls}</span>
            <span className="text-text-muted">{hero.visual.metricLabels.qualifiedLeads}</span>
            <span className="font-semibold text-text-primary">{metrics.qualifiedLeads}</span>
            <span className="text-text-muted">{hero.visual.metricLabels.meetingsBooked}</span>
            <span className="font-semibold text-brand-accent">{metrics.meetingsBooked}</span>
            <span className="text-text-muted">{hero.visual.metricLabels.pipeline}</span>
            <span className="font-semibold text-brand-primary">{metrics.pipeline}</span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 z-10 w-[240px] -translate-x-1/2 lg:w-64"
        style={parallax(-22)}
      >
        <div
          className="animate-float rounded-xl border border-border-default bg-white/95 p-4 shadow-xl backdrop-blur-md"
          style={{ animationDelay: "2.2s" }}
        >
          <p className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
            <Database className="h-3.5 w-3.5" aria-hidden="true" />
            {crmStep.feedLabel}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
            <CalendarCheck className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
            {crmStep.message}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-brand-accent">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            Pipeline updated automatically
          </p>
        </div>
      </div>
    </div>
  );
}
