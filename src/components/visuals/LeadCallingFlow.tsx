"use client";

import { FlowShell } from "@/components/visuals/FlowShell";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, Megaphone, Phone, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 0,
    label: "Lead Received",
    content: (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600/30 text-blue-400">
          <Megaphone className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-small font-medium text-on-dark">New Facebook Lead</p>
          <p className="text-[11px] text-on-dark-muted">Ravi K. · Hyderabad</p>
        </div>
        <div className="text-right">
          <span className="rounded-full bg-brand-accent/20 px-2 py-0.5 text-[10px] font-semibold text-brand-accent">
            NEW
          </span>
          <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-brand-accent">
            <Zap className="size-3" aria-hidden="true" /> 2s ago
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    label: "Calling Lead",
    content: (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col items-center gap-3 py-2">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex size-16 items-center justify-center rounded-full bg-brand-primary/30 text-brand-primary ring-4 ring-brand-primary/20"
          >
            <Phone className="size-7" aria-hidden="true" />
          </motion.div>
          <p className="text-small font-medium text-on-dark">Calling Ravi…</p>
          <div className="flex items-center gap-3 text-[11px] text-on-dark-muted">
            <span className="flex items-center gap-1">
              <Clock className="size-3" aria-hidden="true" /> 0:03 elapsed
            </span>
            <span className="text-brand-accent">Instant outbound</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    label: "AI Conversation",
    content: (
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between text-[10px] text-on-dark-muted">
          <span>Live transcript</span>
          <span className="rounded bg-brand-accent/20 px-1.5 py-0.5 text-brand-accent">TE · Telugu</span>
        </div>
        <div className="rounded-xl rounded-bl-sm bg-brand-primary/20 px-3 py-2">
          <p className="text-[11px] text-on-dark-muted">AI Employee · Arjun</p>
          <p className="text-small text-on-dark">
            నమస్కారం! మీరు మా SaaS ప్రోడక్ట్ గురించి ఆసక్తి చూపించారు.
          </p>
        </div>
        <div className="ml-4 rounded-xl rounded-br-sm bg-white/10 px-3 py-2">
          <p className="text-[11px] text-on-dark-muted">Lead · Ravi</p>
          <p className="text-small text-on-dark">
            Yes, I&apos;d like to see a demo this week.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    label: "Meeting Booked",
    content: (
      <div className="flex items-center gap-3 rounded-xl border border-brand-accent/30 bg-brand-accent/10 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-brand-accent/20 text-brand-accent">
          <Calendar className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-small font-semibold text-brand-accent">Demo Booked!</p>
          <p className="text-[11px] text-on-dark-muted">Thu 3:00 PM · Google Meet</p>
        </div>
        <div className="rounded-lg bg-white/10 px-2 py-1 text-center">
          <p className="text-[9px] text-on-dark-muted">CRM</p>
          <p className="text-[10px] font-semibold text-brand-accent">Synced ✓</p>
        </div>
      </div>
    ),
  },
] as const;

interface LeadCallingFlowProps {
  active?: boolean;
  activeStep?: number;
  className?: string;
}

export function LeadCallingFlow({
  active = true,
  activeStep,
  className,
}: LeadCallingFlowProps) {
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
      title="Instant Lead Response"
      status="847ms avg"
      steps={steps}
      step={step}
      accentClass="from-brand-primary/10 to-purple-600/10"
      className={className}
      ariaLabel="Lead calling flow animation"
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
