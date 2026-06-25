"use client";

import {
  AudioPlayer,
  AudioPlayerProvider,
} from "@/components/ui/AudioPlayer";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { multilingualSection, voiceDemos } from "@/content/site";

export function Multilingual() {
  return (
    <Section
      id="voice-demos"
      surface="tint"
      aria-label={multilingualSection.title}
    >
      <Container>
        <SectionHeader
          eyebrow={multilingualSection.eyebrow}
          title={multilingualSection.title}
          subtitle={multilingualSection.subtitle}
          align="center"
        />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent-light px-4 py-1.5 text-sm font-medium text-brand-accent">
            {multilingualSection.nativeEngineBadge}
          </span>
        </div>

        <AudioPlayerProvider>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {voiceDemos.map((demo) => (
              <article
                key={demo.id}
                className="rounded-2xl border border-border-default bg-surface-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-body font-semibold text-text-primary">
                      {demo.persona}
                    </h3>
                    <p className="text-small text-text-muted">{demo.trait}</p>
                  </div>
                  <span className="rounded-lg bg-brand-primary-light px-2 py-1 text-[10px] font-bold text-brand-primary">
                    {demo.scriptBadge}
                  </span>
                </div>

                <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  {demo.languageNative}
                </p>

                <div className="mt-5 rounded-xl border border-border-muted bg-surface-muted p-4">
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
