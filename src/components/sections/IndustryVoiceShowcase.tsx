"use client";

import {
  AudioPlayer,
  AudioPlayerProvider,
} from "@/components/ui/AudioPlayer";
import { Container, Section } from "@/components/ui/container";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import {
  AgentMark,
  type AgentMarkType,
} from "@/components/visuals/AgentMark";
import {
  industryVoiceCards,
  industryVoiceLangs,
  industryVoiceSection,
  type IndustryVoiceLangId,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const MARK_TYPES = new Set<AgentMarkType>([
  "sales",
  "hr",
  "hospital",
  "support",
  "school",
  "restaurant",
  "realestate",
  "insurance",
]);

function asMarkType(id: string): AgentMarkType {
  return MARK_TYPES.has(id as AgentMarkType) ? (id as AgentMarkType) : "sales";
}

function VoiceChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] py-1 pl-1 pr-2.5">
      <span className="grid size-5 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 text-[10px] font-bold text-ink shadow-[0_0_12px_rgba(52,211,153,0.45)]">
        {name.slice(0, 1)}
      </span>
      <span className="text-[11px] font-semibold tracking-wide text-emerald-300">
        {name}
      </span>
    </span>
  );
}

export function IndustryVoiceShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<IndustryVoiceLangId>("te");

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-industry-card]");
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const selectLang = useCallback((next: IndustryVoiceLangId) => {
    setLang(next);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, []);

  return (
    <Section
      id="industries"
      surface="ink"
      className="relative overflow-hidden"
      aria-labelledby="industry-voice-heading"
    >
      <DarkSectionBackdrop />

      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              {industryVoiceSection.eyebrow}
            </p>
            <h2
              id="industry-voice-heading"
              className="font-display text-h2 text-on-dark"
            >
              {industryVoiceSection.titleBefore}
              <span className="text-brand-accent">
                {industryVoiceSection.titleHighlight}
              </span>
              {industryVoiceSection.titleAfter}
            </h2>
            <p className="mt-4 max-w-xl text-body leading-relaxed text-on-dark-muted">
              {industryVoiceSection.subtitle}
            </p>
            <p className="mt-3 text-[12px] text-on-dark-muted/80">
              Same Cartesia Sonic voices your AI employees use on live calls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-sm"
              role="tablist"
              aria-label="Demo language"
            >
              {industryVoiceLangs.map((option) => {
                const active = option.id === lang;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectLang(option.id)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                      active
                        ? "bg-brand-accent text-ink shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                        : "text-on-dark-muted hover:text-on-dark",
                    )}
                  >
                    {option.label}
                    <span className="ml-1.5 font-normal opacity-70">
                      {option.native}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-on-dark transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                aria-label="Previous industries"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-on-dark transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
                aria-label="Next industries"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <AudioPlayerProvider key={lang}>
        <div
          ref={scrollerRef}
          className="relative mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="hidden shrink-0 lg:block lg:w-[max(0px,calc((100vw-80rem)/2))]" />
          {industryVoiceCards.map((card) => {
            const variant = card.variants[lang];
            return (
              <article
                key={`${card.id}-${lang}`}
                data-industry-card
                className="group relative flex w-[min(100%,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_24px_80px_-32px_rgba(16,185,129,0.45)]"
              >
                <div
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-3">
                  <AgentMark
                    type={asMarkType(card.id)}
                    theme="dark"
                    size={52}
                    className="rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  />
                  <VoiceChip name={variant.voiceCode} />
                </div>

                <h3 className="mt-5 font-display text-[1.2rem] leading-snug tracking-tight text-on-dark">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-6 text-on-dark-muted">
                  {variant.description}
                </p>

                <div className="mt-6">
                  <AudioPlayer
                    id={`industry-${card.id}-${lang}`}
                    key={variant.audioSrc}
                    src={variant.audioSrc}
                    fallbackText={`${variant.voiceCode} ${lang} demo for ${card.title}`}
                    fallbackLang={variant.fallbackLang}
                    duration={variant.fallbackDuration}
                    label={`${variant.voiceCode} · ${card.title}`}
                    preferSpeech={false}
                    isActiveCard
                    variant="compact"
                    tone="dark"
                  />
                </div>

                <Link
                  href={card.href}
                  className="mt-5 flex h-11 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-semibold text-on-dark transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                >
                  {card.deployLabel}
                  <span className="grid size-8 place-items-center rounded-xl bg-brand-primary text-white shadow-[0_8px_20px_rgba(79,70,229,0.45)] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </article>
            );
          })}
          <div className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </AudioPlayerProvider>
    </Section>
  );
}
