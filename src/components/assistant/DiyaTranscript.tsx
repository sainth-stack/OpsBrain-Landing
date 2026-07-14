"use client";

import { DiyaAvatar } from "@/components/assistant/DiyaAvatar";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export type DiyaTurn = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type DiyaTranscriptProps = {
  turns: DiyaTurn[];
  liveAgentText?: string;
  liveUserText?: string;
  compact?: boolean;
  className?: string;
};

function Bubble({
  role,
  text,
  live,
}: {
  role: "user" | "assistant";
  text: string;
  live?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "diya-message-in flex gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isUser ? (
        <DiyaAvatar size="sm" className="mt-0.5 shrink-0" />
      ) : null}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-md bg-brand-primary text-white"
            : "rounded-bl-md border border-border-default/60 bg-surface-white text-text-primary",
          live && "opacity-90",
        )}
      >
        {text}
        {live ? (
          <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse rounded-full bg-current opacity-50" />
        ) : null}
      </div>
    </div>
  );
}

export function DiyaTranscript({
  turns,
  liveAgentText,
  liveUserText,
  compact = false,
  className,
}: DiyaTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns, liveAgentText, liveUserText]);

  const hasContent =
    turns.length > 0 || Boolean(liveAgentText) || Boolean(liveUserText);

  if (!hasContent) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-dashed border-border-default/80",
          "bg-surface-muted/30 px-4",
          compact ? "min-h-[4rem] py-3" : "min-h-[6rem] py-5",
          className,
        )}
      >
        <p className="text-center text-xs leading-relaxed text-text-muted">
          Your conversation with Diya will appear here
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-3 overflow-y-auto rounded-2xl",
        compact
          ? "max-h-[28vh] min-h-[4rem] p-1"
          : "max-h-[32vh] min-h-[6rem] border border-border-default/60 bg-surface-muted/20 p-3",
        className,
      )}
      aria-live="polite"
      aria-label="Conversation transcript"
    >
      {turns.map((turn) => (
        <Bubble key={turn.id} role={turn.role} text={turn.text} />
      ))}
      {liveAgentText ? (
        <Bubble role="assistant" text={liveAgentText} live />
      ) : null}
      {liveUserText ? <Bubble role="user" text={liveUserText} live /> : null}
      <div ref={bottomRef} />
    </div>
  );
}
