"use client";

import { cn } from "@/lib/utils";
import { Calendar, MessageCircle } from "lucide-react";

type DiyaPromptChipsProps = {
  chips: readonly string[];
  selected?: string | null;
  onSelect?: (chip: string) => void;
  disabled?: boolean;
};

function isDemoChip(chip: string): boolean {
  return chip.toLowerCase().includes("book a demo");
}

export function DiyaPromptChips({
  chips,
  selected,
  onSelect,
  disabled,
}: DiyaPromptChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Suggested topics">
      {chips.map((chip) => {
        const isDemo = isDemoChip(chip);
        const isSelected = selected === chip;

        return (
          <button
            key={chip}
            type="button"
            role="listitem"
            disabled={disabled}
            onClick={() => onSelect?.(chip)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
              "text-xs font-medium transition-all duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              isSelected
                ? "border-brand-primary bg-brand-primary text-white shadow-sm"
                : "border-brand-primary/20 bg-surface-white text-brand-primary hover:border-brand-primary/40 hover:bg-brand-primary-light/80",
              "disabled:cursor-not-allowed disabled:opacity-45",
            )}
          >
            {isDemo ? (
              <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            )}
            {chip}
          </button>
        );
      })}
    </div>
  );
}
