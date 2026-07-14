"use client";

import { useDiyaAssistant } from "@/components/assistant/DiyaAssistantContext";
import { trackDemoClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

type TalkWithDiyaButtonProps = {
  label?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
  trackAs?: string;
  autoStart?: boolean;
};

const variantStyles = {
  primary:
    "border border-brand-primary/30 bg-surface-white !text-brand-primary hover:bg-brand-primary-light hover:border-brand-primary/50",
  outline:
    "border border-brand-primary/35 bg-surface-white !text-brand-primary hover:bg-brand-primary-light hover:border-brand-primary/50",
} as const;

const sizeStyles = {
  md: "h-11 px-5 text-body rounded-lg gap-2",
  lg: "h-12 px-7 text-body rounded-lg gap-2",
} as const;

export function TalkWithDiyaButton({
  label = "Talk with AI employee",
  variant = "outline",
  size = "lg",
  className,
  trackAs = "talk_with_diya",
  autoStart = true,
}: TalkWithDiyaButtonProps) {
  const { openDiya } = useDiyaAssistant();

  return (
    <button
      type="button"
      onClick={() => {
        if (trackAs) trackDemoClick(trackAs);
        openDiya({ autoStart, withBackdrop: true });
      }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      <Mic className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </button>
  );
}
