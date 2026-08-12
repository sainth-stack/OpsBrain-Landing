"use client";

import type { LiveCallAgent } from "@/content/live-call-agents";
import { liveCallAgentPortraits } from "@/content/live-call-agents";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CircleCheck,
  Languages,
  Link2,
  MapPin,
  MessageSquareText,
  Phone,
  PhoneCall,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

const WORKFLOW_ICONS = {
  phone: PhoneCall,
  bot: Sparkles,
  calendar: CalendarCheck2,
  check: CircleCheck,
  message: MessageSquareText,
  link: Link2,
} as const;

function AgentAvatar({
  name,
  gender,
}: {
  name: string;
  gender: LiveCallAgent["gender"];
}) {
  const src = liveCallAgentPortraits[gender];

  return (
    <div className="relative shrink-0">
      <div className="size-[3.25rem] overflow-hidden rounded-full bg-surface-muted ring-2 ring-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]">
        <Image
          src={src}
          alt={name}
          width={52}
          height={52}
          className="size-full object-cover"
        />
      </div>
      <span
        className="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-surface-white bg-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
        aria-label="Online"
      />
    </div>
  );
}

function MetaChip({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default/80 bg-surface-muted/50 px-2.5 py-1 text-[11px] font-medium text-text-secondary">
      <Icon className="size-3 shrink-0 text-brand-primary" strokeWidth={1.75} />
      {children}
    </span>
  );
}

export function LiveCallAgentCard({
  agent,
  onCall,
}: {
  agent: LiveCallAgent;
  onCall: (agent: LiveCallAgent) => void;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-surface-white",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.04)]",
        "transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-0.5 hover:border-brand-primary/25",
        "hover:shadow-[0_8px_30px_rgba(79,70,229,0.1)]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-primary/[0.04] to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-3.5">
          <AgentAvatar name={agent.name} gender={agent.gender} />
          <div className="min-w-0 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-display text-[17px] font-semibold tracking-tight text-text-primary">
                {agent.name}
              </p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                Live
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-text-muted">{agent.subtitle}</p>
          </div>
        </div>

        <h3 className="mt-5 font-display text-[19px] font-bold leading-snug tracking-tight text-text-primary">
          {agent.role}
        </h3>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <MetaChip icon={Building2}>{agent.industry}</MetaChip>
          <MetaChip icon={MapPin}>{agent.region}</MetaChip>
          {agent.languages.slice(0, 3).map((lang) => (
            <MetaChip key={lang} icon={Languages}>
              {lang}
            </MetaChip>
          ))}
          {agent.languages.length > 3 ? (
            <MetaChip icon={Languages}>
              +{agent.languages.length - 3} more
            </MetaChip>
          ) : null}
        </div>

        <p className="mt-4 text-[13.5px] leading-relaxed text-text-secondary">
          {agent.description}
        </p>

        <div className="mt-6 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              Agent workflow
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-primary">
              <Link2 className="size-3" strokeWidth={1.75} aria-hidden="true" />
              Live actions
            </span>
          </div>

          <ol className="relative mt-4 space-y-0">
            {agent.workflow.map((step, index) => {
              const Icon = WORKFLOW_ICONS[step.icon];
              const isLast = index === agent.workflow.length - 1;
              return (
                <li key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
                  {!isLast ? (
                    <span
                      className="absolute left-[13px] top-7 bottom-0 w-px bg-border-default"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-[1] grid size-7 shrink-0 place-items-center rounded-full border border-brand-primary/15 bg-brand-primary-light text-brand-primary shadow-sm">
                    <Icon className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="pt-1 text-[13px] leading-snug text-text-secondary">
                    {step.label}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <button
          type="button"
          onClick={() => onCall(agent)}
          className={cn(
            "mt-6 inline-flex h-[3.25rem] w-full items-center gap-3 rounded-xl px-4 text-left text-white",
            "bg-gradient-to-r from-brand-primary via-indigo-600 to-violet-600",
            "shadow-[0_8px_20px_rgba(79,70,229,0.28)]",
            "transition-[transform,box-shadow,opacity] duration-200",
            "hover:opacity-[0.96] hover:shadow-[0_10px_24px_rgba(79,70,229,0.34)]",
            "active:scale-[0.99]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          )}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/15 ring-1 ring-white/20">
            <Phone className="size-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold tracking-tight">
              Call me now
            </span>
            <span className="block text-[11px] text-white/80">
              Get a live demo call in seconds
            </span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 text-white/85 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
