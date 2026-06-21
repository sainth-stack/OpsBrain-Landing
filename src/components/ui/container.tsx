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
      className={cn("mx-auto w-full max-w-7xl px-6", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  surface?: "white" | "muted" | "dark";
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
    dark: "section-surface-dark",
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
