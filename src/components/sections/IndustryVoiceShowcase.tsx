"use client";

import { getAgentIcon, IconBox } from "@/components/icons/icon-map";
import {
  AudioPlayer,
  AudioPlayerProvider,
} from "@/components/ui/AudioPlayer";
import { Container, Section } from "@/components/ui/container";
import {
  industryVoiceCards,
  industryVoiceLangs,
  industryVoiceSection,
  type IndustryVoiceLangId,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

function VoiceChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border-default bg-surface-muted px-1.5 py-1">
      <span className="grid size-5 place-items-center rounded-md bg-brand-primary-light text-[10px] font-semibold text-brand-primary">
        {name.slice(0, 1)}
      </span>
      <span className="pr-1 text-[12px] font-medium text-text-primary">
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
    const step = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const selectLang = useCallback((next: IndustryVoiceLangId) => {
    setLang(next);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, []);

  return (
    <Section
      id="industries"
      surface="white"
      aria-labelledby="industry-voice-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-small font-semibold uppercase tracking-wider text-brand-primary">
              {industryVoiceSection.eyebrow}
            </p>
            <h2
              id="industry-voice-heading"
              className="font-display text-h2 text-text-primary"
            >
              {industryVoiceSection.titleBefore}
              <span className="text-brand-primary">
                {industryVoiceSection.titleHighlight}
              </span>
              {industryVoiceSection.titleAfter}
            </h2>
            <p className="mt-4 max-w-xl text-body leading-relaxed text-text-secondary">
              {industryVoiceSection.subtitle}
            </p>
            <p className="mt-2 text-[13px] text-text-muted">
              {industryVoiceSection.funFact}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex rounded-lg border border-border-default bg-surface-muted p-0.5"
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
                      "rounded-md px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                      active
                        ? "bg-surface-white text-text-primary shadow-sm"
                        : "text-text-muted hover:text-text-primary",
                    )}
                  >
                    {option.label}
                    <span className="ml-1 font-normal text-text-muted">
                      {option.native}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="grid size-9 place-items-center rounded-lg border border-border-default text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              aria-label="Previous industries"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="grid size-9 place-items-center rounded-lg border border-border-default text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              aria-label="Next industries"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <AudioPlayerProvider key={lang}>
          <div
            ref={scrollerRef}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {industryVoiceCards.map((card) => {
            const variant = card.variants[lang];
            const Icon = getAgentIcon(card.id);
            return (
              <article
                key={`${card.id}-${lang}`}
                data-industry-card
                className="flex w-[min(100%,22rem)] shrink-0 snap-start flex-col rounded-2xl border border-border-default bg-surface-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconBox icon={Icon} variant="primary" size="sm" />
                  <VoiceChip name={variant.voiceCode} />
                </div>

                <h3 className="mt-4 font-display text-[17px] font-semibold tracking-tight text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-text-secondary">
                  {variant.description}
                </p>

                <div className="mt-5">
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
                    tone="light"
                  />
                </div>

                <Link
                  href={card.href}
                  className="mt-4 inline-flex h-10 items-center justify-between rounded-lg border border-border-default bg-surface-muted/50 px-3 text-[13px] font-semibold text-text-primary transition-colors hover:border-brand-primary/35 hover:bg-brand-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  {card.deployLabel}
                  <ChevronRight className="size-4 text-brand-primary" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
          </div>
        </AudioPlayerProvider>
      </Container>
    </Section>
  );
}
