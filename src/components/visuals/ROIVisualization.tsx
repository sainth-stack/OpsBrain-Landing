"use client";

import { roiCalculatorSection } from "@/content/site";
import {
  formatResponseDelay,
  type ROIResults,
} from "@/lib/roi-model";
import { cn } from "@/lib/utils";

function MetricCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "danger" | "accent";
}) {
  return (
    <div className="flex min-h-[96px] flex-col justify-between rounded-xl border border-border-default bg-surface-muted/40 p-4">
      <p className="text-[10px] font-semibold uppercase leading-snug tracking-wide text-text-muted">
        {label}
      </p>
      <p
        className={cn(
          "mt-3 text-2xl font-bold tabular-nums leading-none",
          tone === "danger" && "text-red-600",
          tone === "accent" && "text-brand-accent",
          tone === "default" && "text-text-primary",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: string;
  pct: number;
  tone: "primary" | "muted" | "danger" | "accent";
}) {
  const barClass = {
    primary: "bg-brand-primary",
    muted: "bg-brand-primary/65",
    danger: "bg-red-500",
    accent: "bg-brand-accent",
  }[tone];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span
          className={cn(
            "font-medium",
            tone === "danger" ? "text-red-600" : "text-text-secondary",
          )}
        >
          {label}
        </span>
        <span className="shrink-0 tabular-nums text-text-muted">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", barClass)}
          style={{ width: `${Math.max(4, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}

export function ROIVisualization({
  leads,
  responseDelay,
  results,
}: {
  leads: number;
  responseDelay: number;
  results: ROIResults;
}) {
  const symbol = "$";
  const { funnel, comparison } = roiCalculatorSection;

  const followUpPct = Math.round((results.followUpsCompleted / leads) * 100);
  const riskBarPct = Math.max(10, Math.min(100, results.leakPct + 12));
  const todayBarPct = Math.max(15, Math.min(100, results.currentConversionPct * 5));
  const opsBrainBarPct = Math.max(
    15,
    Math.min(100, results.opsBrainConversionPct * 5),
  );

  return (
    <div
      className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-white p-6 md:p-8"
      aria-labelledby="roi-dashboard-title"
    >
      <p
        id="roi-dashboard-title"
        className="text-xs font-semibold uppercase tracking-widest text-text-muted"
      >
        {roiCalculatorSection.dashboardTitle}
      </p>

      <div className="mt-5 rounded-xl border border-brand-accent/25 bg-brand-accent/5 px-5 py-5">
        <p className="text-sm font-medium text-text-secondary">
          {roiCalculatorSection.heroMetricLabel}
        </p>
        <p className="mt-2 font-display text-4xl font-bold tabular-nums leading-none text-brand-accent md:text-5xl">
          {symbol}
          {results.revenueRecoverable.toLocaleString()}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCard
          label={roiCalculatorSection.secondaryMetrics.missedFollowUps}
          value={results.missedFollowUps.toLocaleString()}
        />
        <MetricCard
          label={roiCalculatorSection.secondaryMetrics.revenueAtRisk}
          value={`${symbol}${results.revenueAtRisk.toLocaleString()}`}
          tone="danger"
        />
        <MetricCard
          label={roiCalculatorSection.secondaryMetrics.dealsRecovered}
          value={`+${results.dealsRecovered.toLocaleString()}`}
          tone="accent"
        />
      </div>

      <div className="mt-6 border-t border-border-muted pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {funnel.title}
        </p>
        <div className="mt-4 space-y-4">
          <ProgressRow
            label={funnel.leads}
            value={leads.toLocaleString()}
            pct={100}
            tone="primary"
          />
          <ProgressRow
            label={funnel.followUps}
            value={results.followUpsCompleted.toLocaleString()}
            pct={followUpPct}
            tone="muted"
          />
          <ProgressRow
            label={funnel.revenue}
            value={`${symbol}${results.revenueAtRisk.toLocaleString()}`}
            pct={riskBarPct}
            tone="danger"
          />
        </div>
        <p className="mt-3 text-sm text-red-600">
          {results.leakPct}% pipeline leakage from {formatResponseDelay(responseDelay)}{" "}
          average response delay
        </p>
      </div>

      <div className="mt-6 border-t border-border-muted pt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {comparison.title}
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-text-secondary">
                {comparison.today}
              </span>
              <span className="text-xs tabular-nums text-text-muted">
                {formatResponseDelay(responseDelay)} · {results.currentConversionPct}%
                effective conversion
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-red-500 transition-all duration-500"
                style={{ width: `${todayBarPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-brand-primary">
                {comparison.withOpsBrain}
              </span>
              <span className="text-xs tabular-nums text-text-muted">
                {comparison.opsBrainResponse} · {results.opsBrainConversionPct}%
                effective conversion
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-brand-accent transition-all duration-500"
                style={{ width: `${opsBrainBarPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
