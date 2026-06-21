"use client";

import { FlowShell } from "@/components/visuals/FlowShell";
import { AnimatePresence, motion } from "framer-motion";
import { Headphones, HelpCircle, PhoneIncoming, RefreshCw, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    id: 0,
    label: "Incoming Call",
    content: (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col items-center gap-3 py-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="flex size-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 ring-4 ring-cyan-500/20"
          >
            <PhoneIncoming className="size-7" aria-hidden="true" />
          </motion.div>
          <p className="text-small font-medium text-text-inverse">Incoming call · 11:47 PM</p>
          <p className="text-[11px] text-text-inverse-muted">+91 98765 43210 · Queue: 0 wait</p>
        </div>
      </div>
    ),
  },
  {
    id: 1,
    label: "FAQ Answered",
    content: (
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2 text-[10px] text-text-inverse-muted">
          <Shield className="size-3 text-cyan-400" aria-hidden="true" />
          Knowledge base match · 98% confidence
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p className="text-[11px] text-text-inverse-muted">Customer asks</p>
          <p className="mt-1 text-small text-text-inverse">
            What are your business hours and return policy?
          </p>
        </div>
        <div className="rounded-xl bg-brand-accent/10 px-3 py-2">
          <p className="text-[11px] text-brand-accent">AI resolved instantly</p>
          <p className="mt-1 text-small text-text-inverse">
            We&apos;re open 24/7. Returns accepted within 30 days.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    label: "Escalate to Human",
    content: (
      <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
          <Headphones className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-small font-semibold text-amber-400">Escalated to Agent</p>
          <p className="text-[11px] text-text-inverse-muted">Complex billing issue detected</p>
          <p className="text-[11px] text-text-inverse-muted">Full transcript + sentiment attached</p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    label: "CRM Logged",
    content: (
      <div className="flex items-center gap-3 rounded-xl border border-brand-accent/30 bg-brand-accent/10 p-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-brand-accent/20 text-brand-accent">
          <RefreshCw className="size-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-small font-semibold text-brand-accent">Logged to CRM</p>
          <p className="text-[11px] text-text-inverse-muted">Ticket #4821 · Salesforce</p>
        </div>
        <HelpCircle className="size-5 text-brand-accent/60" aria-hidden="true" />
      </div>
    ),
  },
] as const;

interface InboundSupportFlowProps {
  active?: boolean;
  activeStep?: number;
  className?: string;
}

export function InboundSupportFlow({
  active = true,
  activeStep,
  className,
}: InboundSupportFlowProps) {
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
      title="24/7 Support Console"
      status="0s wait"
      steps={steps}
      step={step}
      accentClass="from-cyan-500/10 to-brand-accent/10"
      className={className}
      ariaLabel="Inbound support flow animation"
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
