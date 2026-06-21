"use client";

import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { ParallaxDotGrid } from "@/components/ui/ParallaxDotGrid";

export function DarkSectionBackdrop({
  variant = "dark",
}: {
  variant?: "light" | "dark";
}) {
  return (
    <>
      <ParallaxDotGrid variant={variant} />
      <BackgroundEffects variant={variant} dots={false} />
    </>
  );
}
