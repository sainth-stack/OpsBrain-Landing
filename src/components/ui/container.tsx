import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: "div" | "section" | "article" | "main";
}

export function Container({
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  surface?: "white" | "muted" | "tint" | "dark" | "ink";
  id?: string;
}

export function Section({
  surface = "white",
  className,
  children,
  ...props
}: SectionProps) {
  const surfaceClass = {
    white: "section-surface-white",
    muted: "section-surface-muted",
    tint: "section-surface-tint",
    dark: "section-surface-dark",
    ink: "section-surface-ink",
  }[surface];

  return (
    <section
      className={cn("section-padding", surfaceClass, className)}
      {...props}
    >
      {children}
    </section>
  );
}
