"use client";

import { hero } from "@/content/site";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarCheck,
  Database,
  Megaphone,
  Phone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";

const STORY_STEPS = hero.visual.storySteps;
const METRIC_LABELS = hero.visual.metricLabels;

const NODE_ICONS: Record<string, LucideIcon> = {
  Megaphone,
  Phone,
  CalendarCheck,
  Database,
  TrendingUp,
};

/** Logical canvas with safe inset so node pills are not clipped. */
const NETWORK_SIZE = 440;
const CENTER = { x: 220, y: 220 };
const ORBIT_RADIUS = 122;
const ORBIT_MIN_PX = 320;
const ORBIT_MAX_PX = 520;
const NODE_COUNT = hero.visual.nodes.length;
const MAX_FEED_ITEMS = 3;

type OrbitPoint = {
  label: string;
  icon: string;
  x: number;
  y: number;
  index: number;
};

type FeedItem = {
  id: string;
  label: string;
  createdAt: number;
};

function getNodeAngle(index: number) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / NODE_COUNT;
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function buildArcSegment(fromIndex: number, toIndex: number): string {
  const start = polarToCartesian(CENTER.x, CENTER.y, ORBIT_RADIUS, getNodeAngle(fromIndex));
  const end = polarToCartesian(CENTER.x, CENTER.y, ORBIT_RADIUS, getNodeAngle(toIndex));
  return `M ${start.x} ${start.y} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 0 1 ${end.x} ${end.y}`;
}

const WORKFLOW_SEGMENTS = Array.from({ length: NODE_COUNT - 1 }, (_, index) =>
  buildArcSegment(index, index + 1),
);

const FLOW_EASE = [0.4, 0, 0.2, 1] as const;

function useOrbitSize(panelRef: RefObject<HTMLDivElement | null>) {
  const [orbitSize, setOrbitSize] = useState(400);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const isWide = width >= 768;
      const toastHeadroom = isWide ? 20 : 32;
      const inset = isWide ? 4 : 8;
      const available = Math.min(width - inset * 2, height - toastHeadroom - inset);
      const fill = available;
      const next = Math.round(
        Math.max(ORBIT_MIN_PX, Math.min(fill, ORBIT_MAX_PX)),
      );
      if (next > 0) setOrbitSize(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return orbitSize;
}

function useWorkflowProgress(activeIndex: number) {
  const prevRef = useRef(activeIndex);
  const [progressLevel, setProgressLevel] = useState(activeIndex);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const prev = prevRef.current;

    if (activeIndex === 0 && prev === NODE_COUNT - 1) {
      setIsResetting(true);
      prevRef.current = -1;

      const timer = window.setTimeout(() => {
        setProgressLevel(0);
        setIsResetting(false);
        prevRef.current = 0;
      }, 420);

      return () => window.clearTimeout(timer);
    }

    setProgressLevel(activeIndex);
    prevRef.current = activeIndex;
  }, [activeIndex]);

  return {
    progressLevel: isResetting ? NODE_COUNT - 1 : progressLevel,
    isResetting,
  };
}

function WorkflowProgress({
  progressLevel,
  isResetting,
  animate,
}: {
  progressLevel: number;
  isResetting: boolean;
  animate: boolean;
}) {
  return (
    <motion.g
      animate={{ opacity: isResetting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {WORKFLOW_SEGMENTS.map((segmentPath, index) => {
        const isVisible = progressLevel > index;
        return (
          <motion.path
            key={`workflow-segment-${index}`}
            d={segmentPath}
            fill="none"
            stroke="url(#revenue-flow-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={false}
            animate={{
              pathLength: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0,
            }}
            transition={{
              pathLength: {
                duration: animate && isVisible ? 0.6 : 0,
                ease: FLOW_EASE,
              },
              opacity: { duration: animate ? 0.25 : 0 },
            }}
          />
        );
      })}
    </motion.g>
  );
}

function getOrbitNodes(): OrbitPoint[] {
  return hero.visual.nodes.map((node, index) => {
    const angle = getNodeAngle(index);
    return {
      ...node,
      index,
      x: CENTER.x + ORBIT_RADIUS * Math.cos(angle),
      y: CENTER.y + ORBIT_RADIUS * Math.sin(angle),
    };
  });
}

function pct(value: number) {
  return `${(value / NETWORK_SIZE) * 100}%`;
}

function formatRelativeTime(seconds: number): string {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

function useHeroStoryLoop() {
  const [stepIndex, setStepIndex] = useState(0);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [clock, setClock] = useState(0);

  const currentStep = STORY_STEPS[stepIndex];

  const lastPushedStepRef = useRef<number | null>(null);

  const pushFeedItem = useCallback((label: string, step: number) => {
    const id = `step-${step}-${label}`;
    setFeedItems((items) =>
      [{ id, label, createdAt: Date.now() }, ...items].slice(0, MAX_FEED_ITEMS),
    );
  }, []);

  useEffect(() => {
    if (lastPushedStepRef.current === stepIndex) return;
    lastPushedStepRef.current = stepIndex;
    pushFeedItem(STORY_STEPS[stepIndex].feedLabel, stepIndex);
  }, [stepIndex, pushFeedItem]);

  useEffect(() => {
    const duration = currentStep.durationMs;
    const timeout = window.setTimeout(() => {
      setStepIndex((current) => (current + 1) % STORY_STEPS.length);
    }, duration);
    return () => window.clearTimeout(timeout);
  }, [stepIndex, currentStep.durationMs]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClock(Date.now());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return { currentStep, stepIndex, feedItems, clock };
}

function AnimatedMetric({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  return (
    <motion.span
      key={String(value)}
      initial={{ opacity: 0.6, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {value}
    </motion.span>
  );
}

function NetworkCanvas({
  nodes,
  activeIndex,
  animate,
}: {
  nodes: OrbitPoint[];
  activeIndex: number;
  animate: boolean;
}) {
  const activeNode = nodes[activeIndex];
  const { progressLevel, isResetting } = useWorkflowProgress(activeIndex);

  return (
    <svg
      viewBox={`0 0 ${NETWORK_SIZE} ${NETWORK_SIZE}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="revenue-flow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#818cf8" stopOpacity="1" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="orbit-track-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(255 255 255 / 0.06)" />
          <stop offset="50%" stopColor="rgb(129 140 248 / 0.22)" />
          <stop offset="100%" stopColor="rgb(255 255 255 / 0.06)" />
        </linearGradient>
        <radialGradient id="revenue-node-spotlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(79 70 229 / 0.28)" />
          <stop offset="100%" stopColor="rgb(79 70 229 / 0)" />
        </radialGradient>
      </defs>

      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r={ORBIT_RADIUS}
        fill="none"
        stroke="url(#orbit-track-gradient)"
        strokeWidth="2.5"
        className={animate ? "revenue-orbit-track" : undefined}
      />

      <WorkflowProgress
        progressLevel={progressLevel}
        isResetting={isResetting}
        animate={animate}
      />

      {activeNode ? (
        <motion.circle
          r={58}
          fill="url(#revenue-node-spotlight)"
          initial={false}
          animate={{ cx: activeNode.x, cy: activeNode.y, opacity: 1 }}
          transition={{ duration: animate ? 0.65 : 0, ease: FLOW_EASE }}
        />
      ) : null}

      {nodes.map((node) => {
        const isActive = node.index === activeIndex;
        return (
          <motion.circle
            key={`anchor-${node.label}`}
            r={isActive ? 4.5 : 3}
            fill={isActive ? "#818cf8" : "rgb(255 255 255 / 0.18)"}
            initial={false}
            animate={{
              cx: node.x,
              cy: node.y,
              opacity: isActive ? 1 : 0.55,
            }}
            transition={{ duration: animate ? 0.65 : 0, ease: FLOW_EASE }}
            className={cn(isActive && animate && "revenue-node-pulse")}
          />
        );
      })}

      {activeNode ? (
        <motion.line
          x1={CENTER.x}
          y1={CENTER.y}
          stroke="url(#revenue-flow-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 88"
          className={animate ? "revenue-line-flow" : undefined}
          opacity={0.9}
          initial={false}
          animate={{ x2: activeNode.x, y2: activeNode.y }}
          transition={{ duration: animate ? 0.65 : 0, ease: FLOW_EASE }}
        />
      ) : null}
    </svg>
  );
}

function OrbitNode({
  node,
  isActive,
  animate,
}: {
  node: OrbitPoint;
  isActive: boolean;
  animate: boolean;
}) {
  const Icon = NODE_ICONS[node.icon] ?? Phone;

  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(node.x), top: pct(node.y) }}
      animate={
        animate && isActive
          ? { y: [0, -2, 0], scale: [1, 1.03, 1] }
          : undefined
      }
      transition={{
        duration: isActive ? 2.4 : 0.65,
        repeat: isActive ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-full border px-3.5 py-2.5 shadow-sm backdrop-blur-md transition-all duration-500",
          isActive
            ? "border-indigo-400/70 bg-indigo-500/30 shadow-[0_0_0_1px_rgb(129_140_248_/_0.4),0_0_40px_rgb(79_70_229_/_0.5),0_16px_48px_rgb(79_70_229_/_0.4)]"
            : "border-white/[0.14] bg-slate-950/75 opacity-80",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border",
            isActive
              ? "border-indigo-300/50 bg-indigo-500/35"
              : "border-white/14 bg-white/[0.06]",
          )}
        >
          <Icon
            className={cn(
              "size-4",
              isActive ? "text-indigo-50" : "text-slate-400",
            )}
            aria-hidden="true"
          />
        </span>
        <p
          className={cn(
            "whitespace-nowrap text-xs font-semibold tracking-wide",
            isActive ? "text-white" : "text-slate-400",
          )}
        >
          {node.label}
        </p>
      </div>
    </motion.div>
  );
}

function CenterHub({ animate }: { animate: boolean }) {
  const [lineOne, lineTwo] = hero.visual.centerLabel.split(" ");

  return (
    <motion.div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(CENTER.x), top: pct(CENTER.y) }}
      animate={animate ? { scale: [1, 1.015, 1] } : undefined}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative flex size-[124px] items-center justify-center">
        <div
          className={cn(
            "absolute inset-0 rounded-full border border-indigo-400/45 bg-slate-950/95 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.1),0_0_48px_rgb(79_70_229_/_0.32)]",
            animate && "revenue-hub-glow",
          )}
        />
        <div className="relative flex flex-col items-center justify-center gap-1 px-2 text-center">
          <span className="text-xs font-bold uppercase leading-none tracking-[0.13em] text-indigo-300">
            {lineOne}
          </span>
          <span className="text-xs font-bold uppercase leading-none tracking-[0.13em] text-white">
            {lineTwo ?? ""}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function OrbitStage({
  nodes,
  activeIndex,
  animate,
  size,
}: {
  nodes: OrbitPoint[];
  activeIndex: number;
  animate: boolean;
  size: number;
}) {
  const scale = size / NETWORK_SIZE;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: NETWORK_SIZE,
          height: NETWORK_SIZE,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <NetworkCanvas nodes={nodes} activeIndex={activeIndex} animate={animate} />
        {nodes.map((node) => (
          <OrbitNode
            key={node.label}
            node={node}
            isActive={activeIndex === node.index}
            animate={animate}
          />
        ))}
        <CenterHub animate={animate} />
      </div>
    </div>
  );
}

function ActivityToast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
      className="inline-flex max-w-[220px] items-center gap-2 rounded-full border border-brand-accent/25 bg-slate-950/80 px-3 py-1.5 shadow-[0_8px_24px_rgb(0_0_0_/_0.35)] backdrop-blur-md sm:max-w-none sm:px-3.5 sm:py-2"
    >
      <span className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-accent opacity-40" />
        <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
      </span>
      <p className="text-[11px] font-medium text-on-dark sm:text-xs">{message}</p>
    </motion.div>
  );
}

function LiveCallStrip({ transcript }: { transcript: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-brand-primary/25 bg-brand-primary/10 px-3 py-2.5"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-primary">
        Live AI call
      </p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-on-dark/90">
        {transcript}
      </p>
    </motion.div>
  );
}

function MetricTile({
  label,
  value,
  note,
  accent = false,
  className,
}: {
  label: string;
  value: string | number;
  note?: string | null;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border p-3.5 sm:p-4",
        accent
          ? "border-brand-accent/20 bg-brand-accent/[0.08]"
          : "border-white/10 bg-white/[0.04]",
        className,
      )}
    >
      <p className="text-[11px] font-medium leading-snug text-on-dark-muted">{label}</p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-bold tabular-nums leading-none tracking-tight sm:text-[1.75rem]",
          accent ? "text-brand-accent" : "text-on-dark",
        )}
      >
        <AnimatedMetric value={value} />
      </p>
      {note ? (
        <p className="mt-2 text-[11px] font-medium leading-none text-brand-accent">{note}</p>
      ) : null}
    </div>
  );
}

function CommandCenterPanel({
  step,
  feedItems,
  clock,
  animate,
}: {
  step: (typeof STORY_STEPS)[number];
  feedItems: FeedItem[];
  clock: number;
  animate: boolean;
}) {
  const { metrics } = step;
  const hasVoice = "voice" in step && step.voice;
  const showPipeline = "highlightPipeline" in step && step.highlightPipeline;
  const visibleFeed = feedItems.slice(0, 2);

  const secondaryLabel = showPipeline ? "Pipeline" : "Meetings Booked";
  const secondaryValue = showPipeline ? metrics.pipeline : metrics.meetingsBooked;

  return (
    <div className="flex h-full min-h-0 flex-col md:min-h-[460px] lg:min-h-[500px]">
      <div className="shrink-0 border-b border-white/10 bg-white/[0.02] px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-snug text-on-dark sm:text-base">
              {hero.visual.commandCenterTitle}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-on-dark-muted">
              {hero.visual.commandCenterSubtitle}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-2.5 py-1">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-accent opacity-50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand-accent" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-accent">
              Live
            </span>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={step.languageChip}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="mt-3 inline-flex rounded-full border border-brand-primary/20 bg-brand-primary/15 px-2.5 py-1 text-[10px] font-semibold text-brand-primary"
          >
            {step.languageChip}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3.5 p-4 sm:gap-4 sm:p-5">
        <MetricTile
          label={METRIC_LABELS.liveCalls}
          value={metrics.liveCalls}
          note={step.activeCallsNote}
          accent
        />

        <div className="grid min-w-0 grid-cols-2 gap-3">
          <MetricTile label="Qualified Leads" value={metrics.qualifiedLeads} />
          <MetricTile
            label={secondaryLabel}
            value={secondaryValue}
            accent={showPipeline}
          />
        </div>

        <AnimatePresence mode="wait">
          {hasVoice ? (
            <LiveCallStrip
              key={step.message}
              transcript={step.voice.transcript}
            />
          ) : null}
        </AnimatePresence>

        <div className="mt-auto min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-on-dark-muted">
            Recent activity
          </p>
          <ul className="space-y-2.5">
            <AnimatePresence initial={false}>
              {visibleFeed.map((event, index) => (
                <motion.li
                  key={event.id}
                  initial={animate ? { opacity: 0, x: -8 } : false}
                  animate={{ opacity: index === 0 ? 1 : 0.55, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs"
                >
                  <span
                    className={cn(
                      "truncate font-medium",
                      index === 0 ? "text-on-dark" : "text-on-dark-muted",
                    )}
                  >
                    {event.label}
                  </span>
                  <span className="shrink-0 whitespace-nowrap tabular-nums text-[11px] text-on-dark-muted">
                    {formatRelativeTime(
                      Math.max(0, Math.floor((clock - event.createdAt) / 1000)),
                    )}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RevenueNetworkHero({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;
  const nodes = useMemo(() => getOrbitNodes(), []);
  const { currentStep, feedItems, clock } = useHeroStoryLoop();
  const animationPanelRef = useRef<HTMLDivElement>(null);
  const orbitSize = useOrbitSize(animationPanelRef);

  return (
    <div
      className={cn("relative mx-auto w-full max-w-[860px] xl:max-w-[920px]", className)}
      role="img"
      aria-label={hero.visual.ariaLabel}
    >
      <div className="card-glass-dark overflow-hidden rounded-2xl border border-white/[0.08] shadow-[0_24px_80px_rgb(0_0_0_/_0.45)]">
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 md:items-stretch">
          <div
            ref={animationPanelRef}
            className="relative flex min-h-[380px] min-w-0 items-center justify-center overflow-visible px-2 py-4 sm:min-h-[420px] md:min-h-[460px] md:px-3 lg:min-h-[500px]"
          >
            <div
              className="hero-dot-grid pointer-events-none absolute inset-0 opacity-35"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(79_70_229_/_0.2),transparent_58%)]"
              aria-hidden="true"
            />

            <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 md:bottom-auto md:left-4 md:top-4 md:translate-x-0 lg:left-5 lg:top-5">
              <AnimatePresence mode="wait">
                <ActivityToast key={currentStep.message} message={currentStep.message} />
              </AnimatePresence>
            </div>

            <OrbitStage
              nodes={nodes}
              activeIndex={currentStep.nodeIndex}
              animate={animate}
              size={orbitSize}
            />
          </div>

          <div className="min-w-0 border-t border-white/10 md:border-l md:border-t-0">
            <CommandCenterPanel
              step={currentStep}
              feedItems={feedItems}
              clock={clock}
              animate={animate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
