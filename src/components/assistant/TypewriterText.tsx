"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speed = 28,
  className,
  onComplete,
}: TypewriterTextProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    if (!text) return;

    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= text.length) {
        window.clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <p className={className} aria-live="polite">
      {text.slice(0, visible)}
      {visible < text.length ? (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-brand-primary align-middle" />
      ) : null}
    </p>
  );
}
