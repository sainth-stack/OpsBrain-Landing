import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "primary" | "accent" | "neutral" | "outline";
}

const variantStyles = {
  primary: "bg-brand-primary-light text-brand-primary",
  accent: "bg-brand-accent-light text-brand-accent",
  neutral: "bg-surface-muted text-text-secondary",
  outline: "bg-transparent border border-border-default text-text-secondary",
} as const;

export function Badge({
  variant = "primary",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[28px] items-center rounded-full px-3 py-1 text-small font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
