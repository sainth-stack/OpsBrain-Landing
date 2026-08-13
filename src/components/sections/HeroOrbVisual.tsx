"use client";

import { cn } from "@/lib/utils";
import { VoiceWaveform } from "@/components/ui/VoiceWaveform";
import { hero } from "@/content/site";
import {
  Calendar,
  CreditCard,
  Database,
  Mail,
  MessageCircle,
  Pause,
  Play,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";

const TOOL_ICONS: Record<string, LucideIcon> = {
  CreditCard,
  MessageCircle,
  Mail,
  Calendar,
  Database,
  Smartphone,
};

const ALL_TOOLS = hero.visual.orbitTools;
const ALL_LANGUAGES = hero.visual.orbitLanguages;

/** Fewer language chips on narrow screens — keeps the orbit readable. */
const MOBILE_LANG_LOCALES = new Set(["te", "hi", "en", "es"]);

type OrbitMetrics = {
  langRadius: number;
  toolRadius: number;
  compactChips: boolean;
  compactLangSet: boolean;
};

const DESKTOP_METRICS: OrbitMetrics = {
  langRadius: 48,
  toolRadius: 36.5,
  compactChips: false,
  compactLangSet: false,
};

function polar(radiusPct: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top: `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

function metricsForWidth(width: number): OrbitMetrics {
  if (width < 300) {
    return { langRadius: 41, toolRadius: 33, compactChips: true, compactLangSet: true };
  }
  if (width < 380) {
    return { langRadius: 43, toolRadius: 34.5, compactChips: true, compactLangSet: true };
  }
  if (width < 520) {
    return { langRadius: 45, toolRadius: 35.5, compactChips: true, compactLangSet: false };
  }
  return DESKTOP_METRICS;
}

function useOrbitMetrics(stageRef: RefObject<HTMLDivElement | null>) {
  const [metrics, setMetrics] = useState<OrbitMetrics>(DESKTOP_METRICS);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const update = () => {
      setMetrics(metricsForWidth(el.getBoundingClientRect().width));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stageRef]);

  return metrics;
}

function RingTrack({
  radiusPct,
  dashed = false,
}: {
  radiusPct: number;
  dashed?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
        dashed
          ? "border border-dashed border-brand-primary/25"
          : "border border-brand-primary/14",
      )}
      style={{ width: `${radiusPct * 2}%`, height: `${radiusPct * 2}%` }}
      aria-hidden="true"
    />
  );
}

function ChipFace({
  label,
  icon,
  variant,
  compact,
}: {
  label: string;
  icon?: string;
  variant: "tool" | "language";
  compact?: boolean;
}) {
  const Icon = icon ? TOOL_ICONS[icon] : null;
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border bg-white/95 backdrop-blur-md",
        "shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.03]",
        variant === "tool"
          ? "border-brand-primary/15"
          : "border-slate-200/90",
        compact ? "px-2 py-1" : "px-3 py-1.5",
      )}
    >
      {variant === "tool" && Icon ? (
        <span
          className={cn(
            "flex items-center justify-center rounded-full bg-brand-primary/10",
            compact ? "size-4" : "size-5",
          )}
        >
          <Icon className={cn("text-brand-primary", compact ? "size-2.5" : "size-3")} aria-hidden="true" />
        </span>
      ) : (
        <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden="true" />
      )}
      <span
        className={cn(
          "whitespace-nowrap leading-none",
          compact ? "text-[10px]" : "text-[12px]",
          variant === "tool" ? "font-semibold text-text-primary" : "font-medium text-text-secondary",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function OrbitChip({
  nodeRef,
  pos,
  children,
}: {
  nodeRef: (el: HTMLDivElement | null) => void;
  pos: { left: string; top: string };
  children: ReactNode;
}) {
  return (
    <div
      ref={nodeRef}
      className="absolute z-20 will-change-[left,top]"
      style={pos}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">{children}</div>
    </div>
  );
}

export function HeroOrbVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const accentRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const metricsRef = useRef<OrbitMetrics>(DESKTOP_METRICS);

  const metrics = useOrbitMetrics(stageRef);
  metricsRef.current = metrics;

  const languages = useMemo(
    () =>
      metrics.compactLangSet
        ? ALL_LANGUAGES.filter((lang) => MOBILE_LANG_LOCALES.has(lang.locale))
        : ALL_LANGUAGES,
    [metrics.compactLangSet],
  );
  const tools = ALL_TOOLS;

  const [isPlaying, setIsPlaying] = useState(false);
  const [liveLabel, setLiveLabel] = useState("EN · English");

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
    const chips = ["EN · English", "TE · Telugu", "HI · Hindi"];
    if (chips.length <= 1) return;
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % chips.length;
      setLiveLabel(chips[i] ?? "EN · English");
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
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

  useEffect(() => {
    chipRefs.current = [];
  }, [languages.length]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const placeStatic = () => {
      const { langRadius, toolRadius } = metricsRef.current;
      languages.forEach((_, index) => {
        const node = chipRefs.current[index];
        if (!node) return;
        const pos = polar(langRadius, (360 / languages.length) * index);
        node.style.left = pos.left;
        node.style.top = pos.top;
      });
      tools.forEach((_, index) => {
        const node = chipRefs.current[languages.length + index];
        if (!node) return;
        const pos = polar(toolRadius, (360 / tools.length) * index + 180 / tools.length);
        node.style.left = pos.left;
        node.style.top = pos.top;
      });
    };

    if (reduced) {
      placeStatic();
      return;
    }

    let raf = 0;
    let last = performance.now();
    let langDeg = 0;
    let toolDeg = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.048);
      last = now;
      langDeg += 7 * dt;
      toolDeg -= 10 * dt;

      const { langRadius, toolRadius } = metricsRef.current;

      languages.forEach((_, index) => {
        const node = chipRefs.current[index];
        if (!node) return;
        const base = (360 / languages.length) * index;
        const pos = polar(langRadius, base + langDeg);
        node.style.left = pos.left;
        node.style.top = pos.top;
      });

      tools.forEach((_, index) => {
        const node = chipRefs.current[languages.length + index];
        if (!node) return;
        const base = (360 / tools.length) * index + 180 / tools.length;
        const pos = polar(toolRadius, base + toolDeg);
        node.style.left = pos.left;
        node.style.top = pos.top;
      });

      const a0 = accentRefs.current[0];
      const a1 = accentRefs.current[1];
      if (a0) {
        const p = polar(toolRadius, toolDeg + 18);
        a0.style.left = p.left;
        a0.style.top = p.top;
      }
      if (a1) {
        const p = polar(langRadius, langDeg + 55);
        a1.style.left = p.left;
        a1.style.top = p.top;
      }

      raf = requestAnimationFrame(tick);
    };

    placeStatic();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [languages.length, tools.length]);

  return (
    <div className="hero-orb-shell mx-auto w-full max-w-[600px]">
      <div
        ref={stageRef}
        className="hero-orb-stage relative mx-auto aspect-square w-full"
        role="img"
        aria-label={hero.visual.ariaLabel}
      >
        <audio
          ref={audioRef}
          src="/audio/hero-demo.mp3?v=cartesia-sindhu115"
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className="sr-only"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-[6%] rounded-full sm:inset-[4%]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(79,70,229,0.11) 0%, rgba(79,70,229,0.04) 42%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 12px), 0)",
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <RingTrack radiusPct={metrics.langRadius} />
          <RingTrack radiusPct={metrics.toolRadius} dashed />
          <RingTrack radiusPct={Math.max(22, metrics.toolRadius - 12)} />

          {languages.map((lang, index) => (
            <OrbitChip
              key={`lang-${lang.locale}`}
              nodeRef={(el) => {
                chipRefs.current[index] = el;
              }}
              pos={{ left: "50%", top: "50%" }}
            >
              <ChipFace label={lang.label} variant="language" compact={metrics.compactChips} />
            </OrbitChip>
          ))}

          {tools.map((tool, index) => (
            <OrbitChip
              key={`tool-${tool.label}`}
              nodeRef={(el) => {
                chipRefs.current[languages.length + index] = el;
              }}
              pos={{ left: "50%", top: "50%" }}
            >
              <ChipFace
                label={tool.label}
                icon={tool.icon}
                variant="tool"
                compact={metrics.compactChips}
              />
            </OrbitChip>
          ))}

          <span
            ref={(el) => {
              accentRefs.current[0] = el;
            }}
            className="pointer-events-none absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_14px_rgba(16,185,129,0.9)]"
            style={{ left: "50%", top: "50%" }}
            aria-hidden="true"
          />
          <span
            ref={(el) => {
              accentRefs.current[1] = el;
            }}
            className="pointer-events-none absolute z-10 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(79,70,229,0.85)]"
            style={{ left: "50%", top: "50%" }}
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div
            className="flex w-[42%] max-w-[220px] flex-col items-center sm:w-[40%] sm:max-w-[250px]"
            style={{
              transform:
                "translate3d(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 6px), 0)",
              transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="relative aspect-square w-full">
              <div
                className="absolute inset-[-10%] rounded-full border border-brand-primary/15 animate-pulse-ring sm:inset-[-12%]"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-[5%] rounded-full animate-spin-slow sm:-inset-[6%]"
                style={{
                  animationDuration: "18s",
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(79,70,229,0.42) 12%, transparent 30%, rgba(16,185,129,0.2) 55%, transparent 72%, rgba(79,70,229,0.32) 90%, transparent 100%)",
                  maskImage: "radial-gradient(closest-side, transparent 76%, black 78%)",
                  WebkitMaskImage:
                    "radial-gradient(closest-side, transparent 76%, black 78%)",
                }}
                aria-hidden="true"
              />

              <div
                className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-full px-4 animate-breathe sm:gap-0 sm:px-5 sm:pb-14 md:pb-16"
                style={{
                  background:
                    "radial-gradient(circle at 30% 26%, #f8f7ff 0%, #c7d2fe 20%, #818cf8 46%, #4f46e5 72%, #312e81 100%)",
                  boxShadow:
                    "0 30px 80px rgba(79,70,229,0.28), inset 0 -22px 50px rgba(30,27,75,0.3), inset 0 14px 36px rgba(255,255,255,0.5)",
                }}
              >
                <div
                  className="absolute left-[12%] top-[8%] h-[30%] w-[44%] rounded-full bg-white/45 blur-2xl"
                  aria-hidden="true"
                />
                <VoiceWaveform className="relative z-[1] scale-90 sm:scale-100" />
                <p className="relative z-[1] mt-2 hidden text-center text-[15px] font-bold tracking-[0.14em] text-white sm:block md:text-[17px]">
                  {hero.visual.centerLabel}
                </p>
                <p className="relative z-[1] mt-1.5 hidden items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:inline-flex md:text-[11px]">
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-300" />
                  </span>
                  Live · {liveLabel}
                </p>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause OpsBrain demo" : "Play OpsBrain demo"}
                  aria-pressed={isPlaying}
                  className={cn(
                    "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full transition-all sm:absolute sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 md:bottom-5 md:size-12",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    "active:scale-95",
                    isPlaying
                      ? "bg-white text-brand-primary shadow-[0_8px_28px_rgba(0,0,0,0.25)]"
                      : "border-2 border-white/80 bg-white/25 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md hover:scale-105 hover:bg-white/40 hover:border-white",
                  )}
                >
                  {isPlaying ? (
                    <Pause className="size-5" aria-hidden="true" />
                  ) : (
                    <Play
                      className="size-5 translate-x-0.5"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
