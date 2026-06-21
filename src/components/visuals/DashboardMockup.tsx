"use client";

import { cn } from "@/lib/utils";

const SPARKLINE = [22, 28, 25, 31, 29, 35, 33, 38, 36, 41, 44, 47];

const activityEvents = [
  { label: "Call completed · Telugu", time: "12s ago" },
  { label: "Meeting scheduled", time: "34s ago" },
  { label: "Lead scored hot", time: "1m ago" },
  { label: "Outreach sent", time: "2m ago" },
] as const;

function Sparkline() {
  const width = 120;
  const height = 32;
  const max = Math.max(...SPARKLINE);
  const min = Math.min(...SPARKLINE);
  const range = max - min || 1;

  const pathD = SPARKLINE.map((v, i) => {
    const x = (i / (SPARKLINE.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-8 w-[120px]"
      aria-hidden="true"
    >
      <path
        d={pathD}
        fill="none"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActivityFeed() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-text-inverse-muted">
        Recent activity
      </p>
      <ul className="space-y-2.5">
        {activityEvents.map((event) => (
          <li
            key={event.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-sm font-medium text-text-inverse">
              {event.label}
            </span>
            <span className="shrink-0 text-xs tabular-nums text-text-inverse-muted">
              {event.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-lg", className)}
      aria-hidden="true"
    >
      <div className="card-glass-dark overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-inverse">
                OpsBrain Command Center
              </p>
              <p className="text-xs text-text-inverse-muted">
                Live revenue operations
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand-accent" />
              <span className="text-xs font-medium text-brand-accent">Live</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-text-inverse-muted">Live Calls</p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums text-text-inverse">
              47
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-xs font-medium text-brand-accent">
                +12 active now
              </p>
              <Sparkline />
            </div>
          </div>

          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
