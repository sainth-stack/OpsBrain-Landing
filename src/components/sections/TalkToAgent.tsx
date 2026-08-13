"use client";

import { CarouselNavButton } from "@/components/ui/carousel-nav-button";
import { Container } from "@/components/ui/container";
import {
  industryVoiceCards,
  talkToAgentLangs,
  talkToAgentSection,
  talkToAgentUseCaseIds,
  type IndustryVoiceLangId,
} from "@/content/site";
import { useLandingVoiceAssistant } from "@/hooks/useLandingVoiceAssistant";
import { trackDemoClick } from "@/lib/analytics";
import { prefetchLandingVoiceSession } from "@/lib/landing-voice";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader2, Mic, MicOff, PhoneOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const ROLE_LABELS: Record<string, string> = {
  realestate: "Real Estate Agent",
  school: "Admissions Agent",
  hospital: "Hospital Receptionist",
  restaurant: "Restaurant Host",
  sales: "Sales Agent",
};

const ORB_STYLES: Record<string, { background: string; shadow: string; ring: string }> = {
  realestate: {
    background:
      "radial-gradient(circle at 32% 28%, #e0f2fe 0%, #7dd3fc 24%, #0ea5e9 52%, #0369a1 78%, #0c4a6e 100%)",
    shadow:
      "0 24px 80px rgb(14 165 233 / 0.32), inset 0 -26px 56px rgb(12 74 110 / 0.35), inset 0 14px 40px rgb(255 255 255 / 0.5)",
    ring: "border-sky-400/40",
  },
  school: {
    background:
      "radial-gradient(circle at 32% 28%, #fff7ed 0%, #fdba74 24%, #f97316 52%, #c2410c 78%, #7c2d12 100%)",
    shadow:
      "0 24px 80px rgb(249 115 22 / 0.32), inset 0 -26px 56px rgb(124 45 18 / 0.35), inset 0 14px 40px rgb(255 255 255 / 0.5)",
    ring: "border-orange-400/40",
  },
  hospital: {
    background:
      "radial-gradient(circle at 32% 28%, #ecfdf5 0%, #6ee7b7 24%, #10b981 52%, #047857 78%, #064e3b 100%)",
    shadow:
      "0 24px 80px rgb(16 185 129 / 0.32), inset 0 -26px 56px rgb(6 78 59 / 0.35), inset 0 14px 40px rgb(255 255 255 / 0.5)",
    ring: "border-emerald-400/40",
  },
  restaurant: {
    background:
      "radial-gradient(circle at 32% 28%, #fff1f2 0%, #fda4af 24%, #f43f5e 52%, #be123c 78%, #881337 100%)",
    shadow:
      "0 24px 80px rgb(244 63 94 / 0.32), inset 0 -26px 56px rgb(136 19 55 / 0.35), inset 0 14px 40px rgb(255 255 255 / 0.5)",
    ring: "border-rose-400/40",
  },
  sales: {
    background:
      "radial-gradient(circle at 32% 28%, #eef2ff 0%, #a5b4fc 24%, #6366f1 52%, #4338ca 78%, #312e81 100%)",
    shadow:
      "0 24px 80px rgb(79 70 229 / 0.32), inset 0 -26px 56px rgb(49 46 129 / 0.35), inset 0 14px 40px rgb(255 255 255 / 0.5)",
    ring: "border-brand-primary/40",
  },
};

function LiveWaveform({ active }: { active: boolean }) {
  const bars = [10, 18, 28, 16, 32, 14, 24, 12, 26, 20, 30, 15, 22, 17];
  return (
    <div className="flex h-7 items-end justify-center gap-[3px]" aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={index}
          className={cn(
            "w-[2.5px] rounded-full bg-brand-primary/85",
            active && "voice-wave-bar",
          )}
          style={{
            height: active ? `${height}px` : "4px",
            ["--bar-duration" as string]: `${0.75 + (index % 4) * 0.12}s`,
            ["--bar-delay" as string]: `${index * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function TalkToAgent() {
  const cards = useMemo(
    () =>
      industryVoiceCards.filter((card) =>
        (talkToAgentUseCaseIds as readonly string[]).includes(card.id),
      ),
    [],
  );
  const [lang, setLang] = useState<IndustryVoiceLangId>("en");
  const [index, setIndex] = useState(0);
  const card = cards[index] ?? cards[0];
  const variant = card?.variants[lang];
  const agentId = card ? `${card.id}-${lang}` : "";
  const role = card ? (ROLE_LABELS[card.id] ?? card.title) : "";
  const orbStyle = card ? (ORB_STYLES[card.id] ?? ORB_STYLES.sales) : ORB_STYLES.sales;

  const {
    callState,
    error,
    isInCall,
    micMuted,
    startCall,
    endCall,
    toggleMute,
  } = useLandingVoiceAssistant({ captions: false });

  const isSpeaking = callState === "agent_speaking" || callState === "opening";
  const isListening = callState === "active";
  const isConnecting = callState === "connecting";

  useEffect(() => {
    prefetchLandingVoiceSession(agentId);
  }, [agentId]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!cards.length) return;
      const wrapped = (nextIndex + cards.length) % cards.length;
      if (wrapped === index) return;
      if (isInCall) endCall();
      setIndex(wrapped);
    },
    [cards.length, endCall, index, isInCall],
  );

  const onStart = useCallback(() => {
    if (isInCall || !agentId) return;
    trackDemoClick("talk_to_agent_start");
    void startCall({ agentId });
  }, [agentId, isInCall, startCall]);

  const selectLang = useCallback(
    (next: IndustryVoiceLangId) => {
      if (isInCall) endCall();
      setLang(next);
    },
    [endCall, isInCall],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  if (!card || !variant) return null;

  const statusLabel = isConnecting
    ? talkToAgentSection.connectingLabel
    : isSpeaking
      ? talkToAgentSection.speakingLabel
      : isListening
        ? talkToAgentSection.listeningLabel
        : null;

  return (
    <section
      id={talkToAgentSection.id}
      aria-labelledby="talk-to-agent-heading"
      className="talk-agent-stage scroll-mt-16"
    >
      <Container className="py-14 sm:py-20 md:py-24">
        <div
          className={cn(
            "talk-agent-card relative mx-auto w-full max-w-[42rem] overflow-hidden rounded-[1.75rem]",
            "border border-border-default bg-surface-white",
            "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_48px_rgba(15,23,42,0.08)]",
          )}
        >
          <div className="relative px-5 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
            <div className="mx-auto max-w-lg text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-primary">
                {talkToAgentSection.eyebrow}
              </p>
              <h2
                id="talk-to-agent-heading"
                className="mt-2 font-display text-[1.5rem] font-semibold tracking-tight text-text-primary sm:text-[1.75rem]"
              >
                {talkToAgentSection.title}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
                {talkToAgentSection.subtitle}
              </p>
            </div>

            <div
              className="mx-auto mt-6 flex w-fit max-w-full overflow-x-auto rounded-xl border border-border-default bg-surface-muted p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Language"
            >
              {talkToAgentLangs.map((option) => {
                const active = option.id === lang;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    disabled={isInCall}
                    onClick={() => selectLang(option.id)}
                    className={cn(
                      "shrink-0 rounded-lg px-4 py-2 text-[12px] font-semibold transition-all sm:px-5",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                      active
                        ? "bg-surface-white text-text-primary shadow-sm ring-1 ring-border-default/80"
                        : "text-text-muted hover:text-text-primary disabled:opacity-40",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto mt-8 grid w-full max-w-[22rem] grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 sm:mt-10 sm:max-w-md sm:grid-cols-[3rem_1fr_3rem] sm:gap-4">
              <CarouselNavButton
                direction="prev"
                label="Previous agent"
                disabled={isInCall}
                onClick={() => goTo(index - 1)}
                className="justify-self-start"
              />

              <div
                key={`${card.id}-${lang}`}
                className="flex flex-col items-center motion-safe:animate-fade-up"
              >
                <div
                  className="relative flex size-[9.5rem] items-center justify-center sm:size-[11.5rem]"
                  aria-hidden="true"
                >
                  {isInCall ? (
                    <span
                      className={cn(
                        "absolute inset-[-12px] rounded-full animate-pulse-ring border sm:inset-[-14px]",
                        orbStyle.ring,
                      )}
                    />
                  ) : null}
                  <span
                    className={cn(
                      "talk-agent-orb size-full rounded-full transition-[background,box-shadow,transform] duration-500",
                      !isInCall && "animate-breathe",
                      isSpeaking && "scale-[1.04]",
                    )}
                    style={{
                      background: orbStyle.background,
                      boxShadow: orbStyle.shadow,
                    }}
                  />
                </div>

                <div className="mt-5 flex items-center gap-1.5" aria-label="Select agent">
                  {cards.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isInCall}
                      aria-label={ROLE_LABELS[item.id] ?? item.title}
                      aria-current={i === index}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === index
                          ? "w-5 bg-brand-primary"
                          : "w-1.5 bg-border-default hover:bg-text-muted disabled:opacity-40",
                      )}
                    />
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[15px] font-semibold tracking-tight text-text-primary">
                    {role}
                  </p>
                  <p className="mt-0.5 text-[13px] text-text-muted">{variant.voiceCode}</p>
                </div>
              </div>

              <CarouselNavButton
                direction="next"
                label="Next agent"
                disabled={isInCall}
                onClick={() => goTo(index + 1)}
                className="justify-self-end"
              />
            </div>

            <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center">
              {isInCall ? (
                <div className="flex w-full flex-col items-center gap-5">
                  {statusLabel ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface-muted/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          isSpeaking
                            ? "bg-brand-primary"
                            : isConnecting
                              ? "bg-amber-400"
                              : "bg-brand-accent",
                        )}
                      />
                      {statusLabel}
                    </span>
                  ) : null}
                  <LiveWaveform active={isSpeaking || isListening} />
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                      type="button"
                      onClick={toggleMute}
                      disabled={isConnecting}
                      aria-pressed={micMuted}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-border-default bg-surface-white px-5 text-[13px] font-semibold text-text-primary shadow-sm transition-all hover:-translate-y-px hover:shadow-md disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:flex-none"
                    >
                      {micMuted ? (
                        <MicOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Mic className="size-4" aria-hidden="true" />
                      )}
                      {micMuted
                        ? talkToAgentSection.unmuteLabel
                        : talkToAgentSection.muteLabel}
                    </button>
                    <button
                      type="button"
                      onClick={endCall}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#ef4444] px-5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgb(239_68_68/0.8)] transition-all hover:-translate-y-px hover:bg-[#dc2626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:flex-none"
                    >
                      <PhoneOff className="size-3.5" aria-hidden="true" />
                      {talkToAgentSection.endCallLabel}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-8 text-[14px] font-semibold text-white shadow-[0_10px_28px_-12px_rgb(79_70_229/0.7)] transition-all hover:-translate-y-px hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
                >
                  {talkToAgentSection.startConversation}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              )}

              {isConnecting ? (
                <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-text-muted">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                  {talkToAgentSection.connectingLabel}
                </p>
              ) : null}

              {error ? (
                <p className="mt-4 max-w-sm text-center text-small text-red-600">{error}</p>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
