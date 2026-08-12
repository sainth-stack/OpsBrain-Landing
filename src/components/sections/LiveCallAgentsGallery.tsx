"use client";

import { CallAgentModal } from "@/components/forms/CallAgentModal";
import { LiveCallAgentCard } from "@/components/sections/LiveCallAgentCard";
import {
  liveCallAgents,
  liveCallPage,
  type LiveCallAgent,
} from "@/content/live-call-agents";
import { Clock3, Languages, PhoneCall, ShieldCheck } from "lucide-react";
import { useState } from "react";

const HIGHLIGHTS = [
  {
    icon: PhoneCall,
    label: "Live demo call",
    detail: "Agent dials your number",
  },
  {
    icon: Languages,
    label: "Top Indian languages",
    detail: "English, Hindi, Telugu, Tamil + more",
  },
  {
    icon: Clock3,
    label: "Under a minute",
    detail: "Pick, share, get the call",
  },
  {
    icon: ShieldCheck,
    label: "Consent based",
    detail: "You control the number",
  },
] as const;

export function LiveCallAgentsGallery() {
  const [selected, setSelected] = useState<LiveCallAgent | null>(null);

  return (
    <>
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-primary">
            <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            {liveCallPage.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-h2 text-text-primary">
            {liveCallPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-text-secondary">
            {liveCallPage.subtitle}
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 rounded-xl border border-border-default bg-surface-white px-3.5 py-3 shadow-sm"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-primary-light text-brand-primary">
                <item.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-[13px] font-semibold text-text-primary">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[12px] text-text-muted">
                  {item.detail}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {liveCallAgents.map((agent) => (
            <LiveCallAgentCard
              key={agent.id}
              agent={agent}
              onCall={setSelected}
            />
          ))}
        </div>
      </div>

      <CallAgentModal
        agent={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
