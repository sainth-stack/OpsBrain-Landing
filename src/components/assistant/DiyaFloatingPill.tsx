"use client";

import { DiyaAvatar } from "@/components/assistant/DiyaAvatar";
import { cn } from "@/lib/utils";

type DiyaFloatingPillProps = {
  onClick: () => void;
  className?: string;
};

export function DiyaFloatingPill({ onClick, className }: DiyaFloatingPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "diya-pill-attention group fixed bottom-24 right-5 z-[60]",
        "flex items-center gap-3 rounded-full",
        "border border-brand-primary/25 bg-surface-white pl-1.5 pr-5 py-1.5",
        "text-sm font-semibold text-text-primary",
        "transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        "lg:bottom-6",
        className,
      )}
      aria-label="Open OpsBrain voice assistant — Talk to Diya"
    >
      <DiyaAvatar size="sm" showOnline />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
          OpsBrain AI
        </span>
        <span className="flex items-center gap-1.5">
          Talk to Diya
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-brand-primary opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );
}
