"use client";

import type { VoiceCallState } from "@/lib/landing-voice";
import { cn } from "@/lib/utils";
import { Loader2, Mic, Phone, Sparkles, Volume2 } from "lucide-react";

const STATUS_CONFIG: Record<
  VoiceCallState,
  {
    label: string;
    icon: typeof Mic;
    className: string;
    iconClassName?: string;
    spin?: boolean;
  } | null
> = {
  idle: null,
  connecting: {
    label: "Allow microphone access",
    icon: Mic,
    className: "bg-amber-50 text-amber-800 ring-amber-200/70",
    iconClassName: "text-amber-600",
  },
  opening: {
    label: "Diya is greeting you",
    icon: Sparkles,
    className: "bg-brand-primary-light text-brand-primary ring-brand-primary/15",
    spin: true,
  },
  active: {
    label: "Listening — speak now",
    icon: Mic,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
    iconClassName: "text-emerald-500",
  },
  agent_speaking: {
    label: "Diya is speaking",
    icon: Volume2,
    className: "bg-brand-primary-light text-brand-primary ring-brand-primary/15",
  },
  ending: {
    label: "Wrapping up",
    icon: Loader2,
    className: "bg-surface-muted text-text-muted ring-border-default",
    spin: true,
  },
  ended: {
    label: "Call ended",
    icon: Phone,
    className: "bg-slate-100 text-slate-700 ring-slate-200/80",
    iconClassName: "text-slate-500",
  },
};

type DiyaStatusChipProps = {
  callState: VoiceCallState;
  className?: string;
};

export function DiyaStatusChip({ callState, className }: DiyaStatusChipProps) {
  const config = STATUS_CONFIG[callState];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5",
        "text-xs font-medium ring-1 ring-inset",
        config.className,
        className,
      )}
    >
      <Icon
        className={cn(
          "h-3 w-3 shrink-0",
          config.iconClassName,
          config.spin && "animate-spin",
        )}
        aria-hidden="true"
      />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
