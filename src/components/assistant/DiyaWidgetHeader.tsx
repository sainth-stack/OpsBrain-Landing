"use client";

import { DiyaAvatar } from "@/components/assistant/DiyaAvatar";
import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

type DiyaWidgetHeaderProps = {
  onMinimize: () => void;
  className?: string;
};

export function DiyaWidgetHeader({ onMinimize, className }: DiyaWidgetHeaderProps) {
  return (
    <header
      className={cn(
        "diya-widget-header-gradient flex shrink-0 items-center gap-3 border-b border-border-default/80 px-4 py-3.5",
        className,
      )}
    >
      <DiyaAvatar size="md" showOnline />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 id="diya-widget-title" className="truncate text-[15px] font-bold tracking-tight text-text-primary">
            Diya
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200/60">
            <span className="diya-online-pulse h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Online
          </span>
        </div>
        <p className="truncate text-xs font-medium text-text-secondary">
          AI Voice Guide · OpsBrain AI
        </p>
      </div>
      <button
        type="button"
        onClick={onMinimize}
        className={cn(
          "rounded-xl p-2 text-text-muted transition-colors",
          "hover:bg-surface-muted hover:text-text-primary",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        )}
        aria-label="Minimize assistant"
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </header>
  );
}
