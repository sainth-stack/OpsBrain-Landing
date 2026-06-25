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
    "bg-transparent !text-text-secondary hover:bg-surface-muted hover:!text-text-primary",
} as const;

const sizeStyles = {
  sm: "h-9 px-4 text-small rounded-md gap-1.5",
  md: "h-11 px-5 text-body rounded-lg gap-2",
  lg: "h-12 px-6 text-body rounded-lg gap-2",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      children,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center font-semibold transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When set, fires a `demo_click` analytics event on click. */
  trackAsDemo?: string;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
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
          "inline-flex min-h-11 min-w-11 items-center justify-center font-semibold transition-colors",
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
