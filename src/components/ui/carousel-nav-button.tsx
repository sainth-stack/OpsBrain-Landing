import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type CarouselNavButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  direction: "prev" | "next";
  label: string;
};

export function carouselNavButtonClass(disabled?: boolean) {
  return cn(
    "grid size-10 shrink-0 place-items-center rounded-full sm:size-11",
    "border border-border-default bg-surface-white/95 text-text-primary",
    "shadow-[0_4px_20px_rgba(15,23,42,0.1)] backdrop-blur-sm",
    "transition-all hover:border-brand-primary/30 hover:bg-surface-white hover:shadow-[0_8px_28px_rgba(79,70,229,0.12)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
    disabled && "pointer-events-none opacity-35",
  );
}

export function CarouselNavButton({
  direction,
  label,
  className,
  disabled,
  ...props
}: CarouselNavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={cn(carouselNavButtonClass(disabled), className)}
      {...props}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}

export function carouselNavButtonAbsoluteClass(side: "left" | "right") {
  return cn(
    carouselNavButtonClass(),
    "absolute top-1/2 z-10 -translate-y-1/2",
    side === "left" ? "left-0 sm:left-1" : "right-0 sm:right-1",
  );
}
