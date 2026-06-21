"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUpVariants, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={delay}
      variants={fadeUpVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
