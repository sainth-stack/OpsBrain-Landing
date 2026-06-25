"use client";

import { trackDemoClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const variantStyles = {
  primary:
    "bg-brand-primary !text-white hover:bg-brand-primary-hover hover:!text-white shadow-sm",
  secondary:
    "border border-brand-primary/30 bg-surface-white !text-brand-primary hover:bg-brand-primary-light hover:!text-brand-primary",
  outline:
    "border border-brand-primary/35 bg-surface-white !text-brand-primary hover:bg-brand-primary-light hover:border-brand-primary/50 hover:!text-brand-primary",
  "outline-dark":
    "border border-white/25 bg-transparent !text-white hover:bg-white/10 hover:!text-white",
  ghost:
    "!text-text-secondary hover:bg-surface-muted hover:!text-text-primary",
} as const;

const sizeStyles = {
  sm: "h-9 px-4 text-small rounded-md gap-1.5",
  md: "h-11 px-5 text-body rounded-lg gap-2",
  lg: "h-12 px-7 text-body rounded-lg gap-2",
} as const;

export type CtaLinkVariant = keyof typeof variantStyles;
export type CtaLinkSize = keyof typeof sizeStyles;

export interface CtaLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: CtaLinkVariant;
  size?: CtaLinkSize;
  trackAsDemo?: string;
}

export const CtaLink = forwardRef<HTMLAnchorElement, CtaLinkProps>(
  function CtaLink(
    {
      className,
      variant = "primary",
      size = "md",
      children,
      trackAsDemo,
      onClick,
      ...props
    },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex min-h-11 items-center justify-center font-semibold transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        onClick={(event) => {
          if (trackAsDemo) {
            trackDemoClick(trackAsDemo);
          }
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
);
