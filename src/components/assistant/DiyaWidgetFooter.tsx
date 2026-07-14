"use client";

import type { VoiceCallState } from "@/lib/landing-voice";
import { cn } from "@/lib/utils";
import { Calendar, Mic, PhoneOff } from "lucide-react";
import Link from "next/link";

type DiyaWidgetFooterProps = {
  callState: VoiceCallState;
  isInCall: boolean;
  onStart: () => void;
  onEnd: () => void;
  onDismiss: () => void;
};

export function DiyaWidgetFooter({
  callState,
  isInCall,
  onStart,
  onEnd,
  onDismiss,
}: DiyaWidgetFooterProps) {
  const isIdle = callState === "idle";
  const isEnded = callState === "ended";

  return (
    <footer className="shrink-0 border-t border-border-default/80 bg-surface-white px-4 py-3.5">
      <div className="flex flex-col gap-2.5">
        {isIdle ? (
          <>
            <button
              type="button"
              onClick={onStart}
              className={cn(
                "btn-gradient inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl px-4",
                "text-sm font-semibold shadow-md shadow-brand-primary/20",
                "transition-shadow hover:shadow-lg hover:shadow-brand-primary/25",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              )}
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
              Talk to Diya
            </button>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/#contact"
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary",
                  "transition-colors hover:text-brand-primary-hover",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded-sm",
                )}
              >
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                Book a demo
              </Link>
              <span className="text-border-default" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                onClick={onDismiss}
                className="text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Maybe later
              </button>
            </div>
          </>
        ) : null}

        {isInCall ? (
          <button
            type="button"
            onClick={onEnd}
            className={cn(
              "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border px-4",
              "border-red-200/80 bg-red-50 text-sm font-semibold text-red-700",
              "transition-colors hover:border-red-300 hover:bg-red-100",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500",
            )}
          >
            <PhoneOff className="h-4 w-4" aria-hidden="true" />
            End conversation
          </button>
        ) : null}

        {isEnded ? (
          <>
            <button
              type="button"
              onClick={onStart}
              className={cn(
                "btn-gradient inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl px-4",
                "text-sm font-semibold shadow-md shadow-brand-primary/20",
                "transition-shadow hover:shadow-lg hover:shadow-brand-primary/25",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              )}
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
              Talk to Diya again
            </button>
            <Link
              href="/#contact"
              className={cn(
                "inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl border px-4",
                "border-brand-primary/25 bg-surface-white text-sm font-semibold text-brand-primary",
                "transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-light",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              )}
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book a demo
            </Link>
          </>
        ) : null}
      </div>
    </footer>
  );
}
