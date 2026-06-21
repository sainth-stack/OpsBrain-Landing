"use client";

import { brandAssets } from "@/assets/brand";
import { useTheme } from "@/components/providers/ThemeProvider";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CSSProperties } from "react";

type LogoVariant = "light" | "dark";

type LogoProps = {
  /** Light = dark text on light backgrounds; dark = light text on dark backgrounds */
  variant?: LogoVariant;
  className?: string;
  /** Preload the mark in the navbar */
  priority?: boolean;
};

/** Brain icon - `src/assets/brand/mark.png` */
export function BrainMark({
  className,
  style,
  size = 36,
  priority = false,
}: {
  className?: string;
  style?: CSSProperties;
  size?: number;
  priority?: boolean;
}) {
  const dimension =
    typeof style?.width === "number"
      ? style.width
      : typeof style?.height === "number"
        ? style.height
        : size;

  return (
    <Image
      src={brandAssets.mark}
      alt=""
      width={dimension}
      height={dimension}
      className={cn("shrink-0", className)}
      style={style}
      aria-hidden="true"
      priority={priority}
    />
  );
}

/** Horizontal lockup - mark + Plus Jakarta Sans wordmark */
export function Logo({
  variant,
  className,
  priority = false,
}: LogoProps) {
  const { theme } = useTheme();
  const resolvedVariant = variant ?? (theme === "dark" ? "dark" : "light");

  return (
    <span
      className={cn("inline-flex items-center gap-2.5 md:gap-3", className)}
      role="img"
      aria-label={siteConfig.name}
    >
      <BrainMark className="size-8 md:size-9" size={36} priority={priority} />
      <span className="font-display text-[1.125rem] font-bold leading-none tracking-[-0.03em] md:text-xl">
        <span
          className={cn(
            resolvedVariant === "dark" ? "text-slate-50" : "text-text-primary",
          )}
        >
          OpsBrain
        </span>
        <span
          className={cn(
            "ml-1",
            resolvedVariant === "dark" ? "text-indigo-300" : "text-brand-primary",
          )}
        >
          AI
        </span>
      </span>
    </span>
  );
}

/** Icon-only mark */
export function LogoMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <BrainMark
      className={cn(className)}
      size={size}
      style={{ width: size, height: size }}
    />
  );
}

/** @deprecated Use `Logo` */
export const LogoImage = Logo;
