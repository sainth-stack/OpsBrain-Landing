"use client";

import { cn } from "@/lib/utils";

export function FlowChrome({
  title,
  status = "Live",
}: {
  title: string;
  status?: string;
}) {
  return (
    <div className="relative mb-4 flex items-center justify-between border-b border-white/10 pb-3">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-brand-accent/80" />
      </div>
      <p className="font-display text-[11px] font-medium text-text-inverse">{title}</p>
      <span className="rounded-full bg-brand-accent/15 px-2 py-0.5 text-[9px] font-semibold text-brand-accent">
        {status}
      </span>
    </div>
  );
}

export function FlowShell({
  title,
  status,
  steps,
  step,
  children,
  accentClass = "from-brand-primary/10",
  className,
  ariaLabel,
}: {
  title: string;
  status?: string;
  steps: readonly { id: number; label: string }[];
  step: number;
  children: React.ReactNode;
  accentClass?: string;
  className?: string;
  ariaLabel: string;
}) {
  return (
    <div
      className={cn(
        "card-glass-dark relative min-h-[280px] overflow-hidden p-5",
        className,
      )}
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br via-transparent to-transparent", accentClass)} />
      <div className="relative">
        <FlowChrome title={title} status={status} />
        <div className="mb-4 flex gap-1">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                i <= step ? "bg-brand-primary" : "bg-white/10",
                i === step && "ring-2 ring-brand-primary/40",
              )}
            />
          ))}
        </div>
        {children}
        <p className="relative mt-4 text-center text-[11px] text-text-inverse-muted">
          Step {step + 1}/{steps.length} · {steps[step]?.label}
        </p>
      </div>
    </div>
  );
}
