"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxDotGrid({
  variant = "dark",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const dotColor =
    variant === "dark"
      ? "rgb(255 255 255 / 0.06)"
      : "rgb(79 70 229 / 0.08)";

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute -inset-y-20 inset-x-0"
        style={prefersReducedMotion ? undefined : { y, willChange: "transform" }}
        aria-hidden="true"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 80%)",
          }}
        />
      </motion.div>
    </div>
  );
}
