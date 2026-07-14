"use client";

import { DiyaFloatingPill } from "@/components/assistant/DiyaFloatingPill";
import { useDiyaAssistant } from "@/components/assistant/DiyaAssistantContext";
import { DiyaOrb } from "@/components/assistant/DiyaOrb";
import { DiyaPromptChips } from "@/components/assistant/DiyaPromptChips";
import { DiyaStatusChip } from "@/components/assistant/DiyaStatusChip";
import { DiyaTranscript } from "@/components/assistant/DiyaTranscript";
import { DiyaWidgetFooter } from "@/components/assistant/DiyaWidgetFooter";
import { DiyaWidgetHeader } from "@/components/assistant/DiyaWidgetHeader";
import {
  DIYA_ENDED_MESSAGE,
  DIYA_WELCOME_BODY,
  DIYA_WELCOME_HEADLINE,
  getPromptChips,
} from "@/components/assistant/diya-prompts";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

function formatDuration(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function isDemoChip(chip: string): boolean {
  return chip.toLowerCase().includes("book a demo");
}

function ConfirmEndBanner({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="shrink-0 border-b border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50/80 px-4 py-3.5">
      <p className="text-sm font-semibold text-amber-900">End your conversation with Diya?</p>
      <p className="mt-0.5 text-xs text-amber-700/80">You can always come back and talk again.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          End call
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-border-default bg-surface-white px-3 py-2.5 text-xs font-semibold text-text-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Keep talking
        </button>
      </div>
    </div>
  );
}

function WelcomeCard() {
  return (
    <div className="diya-message-in rounded-2xl border border-border-default/60 bg-gradient-to-br from-surface-white to-surface-tint/40 px-4 py-4 text-center shadow-sm">
      <p className="text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
        {DIYA_WELCOME_HEADLINE}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {DIYA_WELCOME_BODY}
      </p>
    </div>
  );
}

function EndedMessage() {
  return (
    <p className="diya-message-in px-1 text-center text-[15px] font-medium leading-relaxed text-text-primary">
      {DIYA_ENDED_MESSAGE}
    </p>
  );
}

export function VoiceAssistantPanel() {
  const pathname = usePathname();
  const router = useRouter();
  const promptChips = useMemo(() => getPromptChips(pathname), [pathname]);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const {
    view,
    showBackdrop,
    callState,
    turns,
    agentText,
    userTranscript,
    error,
    callDuration,
    isInCall,
    openDiya,
    minimizeDiya,
    dismissDiya,
    startCall,
    endCall,
  } = useDiyaAssistant();

  const handleStart = useCallback(() => {
    setSelectedPrompt(null);
    void startCall();
  }, [startCall]);

  const handleChipSelect = useCallback(
    (chip: string) => {
      if (isDemoChip(chip)) {
        router.push("/#contact");
        return;
      }
      setSelectedPrompt(chip);
      void startCall();
    },
    [router, startCall],
  );

  const handleMinimize = useCallback(() => {
    if (isInCall) {
      setConfirmEnd(true);
      return;
    }
    dismissDiya();
  }, [isInCall, dismissDiya]);

  const handleConfirmEnd = useCallback(() => {
    endCall();
    setConfirmEnd(false);
    minimizeDiya();
  }, [endCall, minimizeDiya]);

  const isIdle = callState === "idle";
  const isEnded = callState === "ended";
  const orbSize = isInCall ? "compact" : isIdle ? "hero" : "default";

  if (view === "pill") {
    return <DiyaFloatingPill onClick={() => openDiya()} />;
  }

  return (
    <>
      {showBackdrop ? (
        <button
          type="button"
          className="fixed inset-0 z-[55] bg-slate-900/25 backdrop-blur-[2px] transition-opacity"
          aria-label="Close assistant"
          onClick={() => {
            if (isInCall) {
              setConfirmEnd(true);
            } else {
              minimizeDiya();
            }
          }}
        />
      ) : null}

      <div
        className={cn(
          "diya-widget-enter diya-widget-shadow fixed bottom-24 right-5 z-[60]",
          "flex w-[min(100vw-1.25rem,26rem)] flex-col",
          "max-h-[min(82vh,32rem)] overflow-hidden rounded-[1.25rem]",
          "border border-border-default/80 bg-surface-white",
          "lg:bottom-6",
        )}
        role="dialog"
        aria-labelledby="diya-widget-title"
        aria-label="OpsBrain voice assistant — Diya"
        aria-modal={showBackdrop ? true : undefined}
      >
        <DiyaWidgetHeader onMinimize={handleMinimize} />

        {confirmEnd ? (
          <ConfirmEndBanner
            onConfirm={handleConfirmEnd}
            onCancel={() => setConfirmEnd(false)}
          />
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-2 px-4 pt-3">
            <DiyaStatusChip callState={callState} />
            {isInCall ? (
              <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-semibold tabular-nums text-text-secondary">
                {formatDuration(callDuration)}
              </span>
            ) : null}
          </div>

          {isEnded ? (
            <div className="flex min-h-0 flex-1 flex-col px-4">
              <div
                className={cn(
                  "flex flex-col items-center",
                  turns.length > 0 ? "shrink-0 pt-2" : "flex-1 justify-center py-2",
                )}
              >
                <DiyaOrb callState={callState} size="default" />
                <div className="mt-4 w-full max-w-[20rem]">
                  <EndedMessage />
                </div>
              </div>

              {turns.length > 0 ? (
                <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-2">
                  <DiyaTranscript turns={turns} compact />
                </div>
              ) : null}

              {error ? (
                <div className="shrink-0 pb-2">
                  <div className="diya-message-in space-y-2.5 rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-red-700">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStart}
                      className="w-full rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <div
                className={cn(
                  "flex shrink-0 justify-center px-4",
                  isInCall ? "pt-2" : "pt-3",
                )}
              >
                <DiyaOrb callState={callState} size={orbSize} />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                {isIdle ? (
                  <div className="space-y-4 pb-2">
                    <WelcomeCard />
                    <div className="space-y-2">
                      <p className="text-center text-xs font-semibold uppercase tracking-wider text-text-secondary">
                        Popular questions
                      </p>
                      <DiyaPromptChips
                        chips={promptChips}
                        selected={selectedPrompt}
                        onSelect={handleChipSelect}
                      />
                    </div>
                  </div>
                ) : null}

                {isInCall ? (
                  <DiyaTranscript
                    turns={turns}
                    liveAgentText={agentText}
                    liveUserText={userTranscript}
                    compact
                  />
                ) : null}

                {error ? (
                  <div className="diya-message-in mt-3 space-y-2.5 rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                      <p className="text-xs leading-relaxed text-red-700">{error}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleStart}
                      className="w-full rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    >
                      Try again
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}

          <DiyaWidgetFooter
            callState={callState}
            isInCall={isInCall}
            onStart={handleStart}
            onEnd={endCall}
            onDismiss={dismissDiya}
          />
        </div>
      </div>
    </>
  );
}
