import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export interface SectionHeaderProps extends ComponentPropsWithoutRef<"div"> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-small font-semibold uppercase tracking-wider",
            isDark ? "text-brand-accent" : "text-brand-primary",
            isCenter && "mx-auto",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-h2",
          isDark ? "text-on-dark" : "text-text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-body",
            isDark ? "text-on-dark-muted" : "text-text-secondary",
            isCenter && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
