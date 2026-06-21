"use client";

import { roiCalculatorSection } from "@/content/site";
import {
  formatResponseDelay,
  OPSBRAIN_RESPONSE_HOURS,
  type ROIResults,
} from "@/lib/roi-model";
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Currency = "INR" | "USD";

interface ROIDashboardProps {
  leads: number;
  responseDelay: number;
  results: ROIResults;
  currency: Currency;
  heroMetric: React.ReactNode;
}

function currencySymbol(currency: Currency) {
  return currency === "INR" ? "₹" : "$";
}

function FunnelBar({
  label,
  valueLabel,
  pct,
  tone,
  index,
  animate,
}: {
  label: string;
  valueLabel: string;
  pct: number;
  tone: "primary" | "muted" | "danger";
  index: number;
  animate: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const toneClass = {
    primary: "bg-brand-primary",
    muted: "bg-brand-primary/70",
    danger: "bg-red-500/90",
  }[tone];

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-small">
        <span
          className={cn(
            "font-medium",
            tone === "danger" ? "text-red-600" : "text-text-secondary",
          )}
        >
          {label}
        </span>
        <span className="shrink-0 tabular-nums text-text-muted">{valueLabel}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
        <motion.div
          className={cn("h-full rounded-full", toneClass)}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.45,
            delay: prefersReducedMotion ? 0 : index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          role="presentation"
        />
      </div>
    </div>
  );
}

export function ROIVisualization({
  leads,
  responseDelay,
  results,
  currency,
  heroMetric,
}: ROIDashboardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewportOnce);
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const symbol = currencySymbol(currency);
  const { funnel, comparison, methodology } = roiCalculatorSection;

  const followUpPct = Math.round((results.followUpsCompleted / leads) * 100);
  const revenuePct = Math.max(8, Math.min(92, results.leakPct + 8));

  const todayBarPct = Math.max(
    12,
    Math.min(100, Math.round(results.currentConversionPct * 4)),
  );
  const opsBrainBarPct = Math.max(
    12,
    Math.min(100, Math.round(results.opsBrainConversionPct * 4)),
  );

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border-default bg-surface-white p-6 md:p-8"
      aria-labelledby="roi-dashboard-title"
    >
      <p
        id="roi-dashboard-title"
        className="text-small font-medium uppercase tracking-wider text-text-muted"
      >
        {roiCalculatorSection.dashboardTitle}
      </p>

      <div
        className="mt-6 rounded-xl border border-brand-accent/30 bg-brand-accent/5 p-5 md:p-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-small font-medium text-text-secondary">
          {roiCalculatorSection.heroMetricLabel}
        </p>
        <p className="mt-2 font-display text-[2rem] font-bold leading-none tabular-nums text-brand-accent md:text-h1">
          {heroMetric}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-border-default bg-surface-muted/50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {roiCalculatorSection.secondaryMetrics.missedFollowUps}
          </p>
          <p className="mt-2 font-display text-h3 font-bold tabular-nums text-text-primary">
            {results.missedFollowUps.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border-default bg-surface-muted/50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {roiCalculatorSection.secondaryMetrics.revenueAtRisk}
          </p>
          <p className="mt-2 font-display text-h3 font-bold tabular-nums text-red-600">
            {symbol}
            {results.revenueAtRisk.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-border-default bg-surface-muted/50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
            {roiCalculatorSection.secondaryMetrics.dealsRecovered}
          </p>
          <p className="mt-2 font-display text-h3 font-bold tabular-nums text-text-primary">
            +{Math.round(results.dealsRecovered).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-small font-medium uppercase tracking-wider text-text-muted">
          {funnel.title}
        </p>
        <div className="mt-4 space-y-4">
          <FunnelBar
            label={funnel.leads}
            valueLabel={leads.toLocaleString()}
            pct={100}
            tone="primary"
            index={0}
            animate={isInView}
          />
          <FunnelBar
            label={funnel.followUps}
            valueLabel={results.followUpsCompleted.toLocaleString()}
            pct={followUpPct}
            tone="muted"
            index={1}
            animate={isInView}
          />
          <FunnelBar
            label={funnel.revenue}
            valueLabel={`${symbol}${results.revenueAtRisk.toLocaleString()}`}
            pct={revenuePct}
            tone="danger"
            index={2}
            animate={isInView}
          />
        </div>
        <p className="mt-3 text-small text-red-600/90">
          {results.leakPct}% pipeline leakage from {formatResponseDelay(responseDelay)}{" "}
          average response delay
        </p>
      </div>

      <div className="mt-8">
        <p className="text-small font-medium uppercase tracking-wider text-text-muted">
          {comparison.title}
        </p>
        <div className="mt-4 space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-small">
              <span className="font-medium text-text-secondary">
                {comparison.today}
              </span>
              <span className="tabular-nums text-text-muted">
                {formatResponseDelay(responseDelay)} · {results.currentConversionPct}%
                effective conversion
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-red-500/80"
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${todayBarPct}%` : 0 }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-small">
              <span className="font-medium text-brand-primary">
                {comparison.withOpsBrain}
              </span>
              <span className="tabular-nums text-text-muted">
                {comparison.opsBrainResponse} · {results.opsBrainConversionPct}%
                effective conversion
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
              <motion.div
                className="h-full rounded-full bg-brand-accent"
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${opsBrainBarPct}%` : 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              />
            </div>
          </div>
        </div>
        <p className="sr-only">
          Current response delay {formatResponseDelay(responseDelay)} versus OpsBrain
          at {formatResponseDelay(OPSBRAIN_RESPONSE_HOURS)}.
        </p>
      </div>

      <div className="mt-8 border-t border-border-default pt-6">
        <button
          type="button"
          onClick={() => setMethodologyOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 text-left text-small font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-expanded={methodologyOpen}
        >
          How we calculate this
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform",
              methodologyOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
        {methodologyOpen && (
          <div className="mt-3 space-y-2 text-small leading-relaxed text-text-muted">
            <p>{methodology.summary}</p>
            <p>{methodology.sources}</p>
            <p>{roiCalculatorSection.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
