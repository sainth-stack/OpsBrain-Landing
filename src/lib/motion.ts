"use client";

import {
  useInView,
  useReducedMotion,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export const fadeScaleVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
      delay,
    },
  }),
};

export const drawLineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, delay, ease: "easeOut" as const },
      opacity: { duration: 0.3, delay },
    },
  }),
};

export const viewportOnce = {
  once: true,
  amount: 0.2 as const,
};

export const floatAnimation = {
  y: [-4, 4, -4],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export const bobAnimation = (delay = 0) => ({
  y: [-4, 4, -4],
  transition: {
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

export function useCountUp(
  target: number,
  options?: {
    duration?: number;
    enabled?: boolean;
    decimals?: number;
  },
) {
  const { duration = 1200, enabled = true, decimals = 0 } = options ?? {};
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, viewportOnce);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = enabled && isInView && !prefersReducedMotion;
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      setDisplay(value);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [shouldAnimate, target, duration]);

  const staticFormatted =
    decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
  const animatedFormatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return {
    ref,
    display: shouldAnimate ? animatedFormatted : staticFormatted,
    raw: shouldAnimate ? display : target,
  };
}

export function useSpringCount(value: number, enabled = true) {
  const prefersReducedMotion = useReducedMotion();
  const spring = useSpring(value, {
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  });
  const [display, setDisplay] = useState(value);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v));
  });

  useEffect(() => {
    if (prefersReducedMotion || !enabled) return;
    spring.set(value);
  }, [spring, value, prefersReducedMotion, enabled]);

  if (prefersReducedMotion || !enabled) return value;
  return display;
}
