"use client";

import { FlowShell } from "@/components/visuals/FlowShell";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, FileSpreadsheet, Radio, Waves } from "lucide-react";
import { useEffect, useState } from "react";

function CallWaveBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-1.5 py-4" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-full bg-brand-primary"
          animate={
            active
              ? { height: [12, 28 + (i % 3) * 8, 12] }
              : { height: 12 }
          }
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const steps = [
  {
    id: 0,
    label: "Upload CSV",
    content: (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <FileSpreadsheet className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-small font-medium text-text-inverse">leads_q1_2026.csv</p>
          <p className="text-[11px] text-text-inverse-muted">2,840 contacts · Validated ✓</p>
        </div>
        <span className="text-[11px] font-semibold text-brand-accent">Ready</span>
      </div>
    ),
  },
  {
    id: 1,
    label: "Parallel Calls",
    content: (
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="size-4 text-brand-primary" aria-hidden="true" />
            <p className="text-small font-medium text-text-inverse">847 parallel calls</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] text-brand-accent">
            <Radio className="size-3" aria-hidden="true" /> Live
          </span>
        </div>
        <CallWaveBars active />
      </div>
    ),
  },
  {
    id: 2,
    label: "Call Waves",
    content: (
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
        {[
          { wave: "Wave 1", done: 940, total: 940, pct: 100 },
          { wave: "Wave 2", done: 612, total: 940, pct: 65 },
          { wave: "Wave 3", done: 180, total: 960, pct: 19 },
        ].map((w) => (
          <div key={w.wave} className="rounded-lg bg-white/5 px-3 py-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-text-inverse-muted">{w.wave}</span>
              <span className="text-text-inverse">{w.done}/{w.total}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent"
                initial={{ width: 0 }}
                animate={{ width: `${w.pct}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    label: "Results Dashboard",
    content: (
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Connected", value: "68%", color: "text-brand-accent" },
          { label: "Qualified", value: "312", color: "text-brand-primary" },
          { label: "Booked", value: "89", color: "text-purple-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
          >
            <BarChart3 className="mx-auto mb-1 size-4 text-text-inverse-muted" aria-hidden="true" />
            <p className={cn("text-lg font-bold tabular-nums", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-text-inverse-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    ),
  },
] as const;

interface BulkCampaignFlowProps {
  active?: boolean;
  activeStep?: number;
  className?: string;
}

export function BulkCampaignFlow({
  active = true,
  activeStep,
  className,
}: BulkCampaignFlowProps) {
  const [internalStep, setInternalStep] = useState(0);
  const step = activeStep ?? internalStep;

  useEffect(() => {
    if (!active || activeStep !== undefined) return;
    const interval = setInterval(() => {
      setInternalStep((s) => (s + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [active, activeStep]);

  return (
    <FlowShell
      title="Campaign Command"
      status="847 live"
      steps={steps}
      step={step}
      accentClass="from-emerald-500/10 to-brand-primary/10"
      className={className}
      ariaLabel="Bulk campaign flow animation"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
        >
          {steps[step].content}
        </motion.div>
      </AnimatePresence>
    </FlowShell>
  );
}
