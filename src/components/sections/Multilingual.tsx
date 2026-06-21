"use client";

import {
  AudioPlayer,
  AudioPlayerProvider,
} from "@/components/ui/AudioPlayer";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  multilingualSection,
  voiceDemoCategories,
  voiceDemos,
  type VoiceDemoCategoryId,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export function Multilingual() {
  const [activeCategory, setActiveCategory] =
    useState<VoiceDemoCategoryId>("sales");

  const categoryDemos = useMemo(
    () => voiceDemos.filter((demo) => demo.categoryId === activeCategory),
    [activeCategory],
  );

  const activeCategoryMeta = voiceDemoCategories.find(
    (c) => c.id === activeCategory,
  );

  return (
    <Section
      id="voice-demos"
      surface="dark"
      className="relative overflow-hidden"
      aria-label={multilingualSection.title}
    >
      <DarkSectionBackdrop variant="dark" />

      <Container className="relative">
        <SectionHeader
          eyebrow={multilingualSection.eyebrow}
          title={multilingualSection.title}
          subtitle={multilingualSection.subtitle}
          align="center"
          theme="dark"
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Badge
            variant="accent"
            className="border border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
          >
            {multilingualSection.nativeEngineBadge}
          </Badge>
        </div>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Select business use case"
        >
          {voiceDemoCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-small font-medium transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                activeCategory === category.id
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                  : "border-white/10 bg-white/5 text-on-dark-muted hover:border-white/20 hover:text-on-dark",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {activeCategoryMeta ? (
          <p className="mt-4 text-center text-small text-on-dark-muted">
            {activeCategoryMeta.description}
          </p>
        ) : null}

        <AudioPlayerProvider>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categoryDemos.map((demo) => (
              <article
                key={demo.id}
                className="card-glass glow-pulse border-brand-accent/40 p-6 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-body font-semibold text-on-dark">
                      {demo.persona}
                    </h3>
                    <p className="text-small text-on-dark-muted">
                      {demo.trait}
                    </p>
                  </div>
                  <span className="rounded-lg bg-brand-primary/20 px-2 py-1 text-[10px] font-bold text-indigo-300">
                    {demo.scriptBadge}
                  </span>
                </div>

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-on-dark-muted">
                  {demo.languageNative}
                </p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                  <AudioPlayer
                    id={demo.id}
                    src={demo.audioSrc}
                    fallbackText={`${demo.persona} ${demo.language} voice demo`}
                    fallbackLang={demo.fallbackLang}
                    duration={demo.fallbackDuration}
                    label={`${demo.persona} ${demo.language}`}
                    preferSpeech={false}
                    isActiveCard
                  />
                </div>
              </article>
            ))}
          </div>
        </AudioPlayerProvider>
      </Container>
    </Section>
  );
}
