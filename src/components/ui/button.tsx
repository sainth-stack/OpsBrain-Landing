import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const variantStyles = {
  primary:
    "btn-gradient text-white hover:bg-brand-primary-hover border-0",
  secondary:
    "bg-surface-white text-text-primary border border-border-default hover:bg-surface-muted",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-muted",
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
          "inline-flex min-h-11 min-w-11 items-center justify-center font-medium transition-colors",
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
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      className,
      variant = "primary",
      size = "md",
      children,
      ...props
    },
    ref,
  ) {
    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex min-h-11 min-w-11 items-center justify-center font-medium transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
