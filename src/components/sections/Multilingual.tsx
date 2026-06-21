"use client";

import {
  AudioPlayer,
  AudioPlayerProvider,
} from "@/components/ui/AudioPlayer";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { multilingualSection, voiceDemos } from "@/content/site";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Multilingual() {
  const [activeLang, setActiveLang] = useState<string>("telugu");

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
          aria-label="Select language"
        >
          {voiceDemos.map((demo) => (
            <button
              key={demo.id}
              type="button"
              role="tab"
              aria-selected={activeLang === demo.id}
              onClick={() => setActiveLang(demo.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2 text-small font-medium transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                activeLang === demo.id
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                  : "border-white/10 bg-white/5 text-on-dark-muted hover:border-white/20 hover:text-on-dark",
              )}
            >
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">
                {demo.scriptBadge}
              </span>
              {demo.languageNative}
            </button>
          ))}
        </div>

        <AudioPlayerProvider>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {voiceDemos.map((demo) => {
              const isActive = activeLang === demo.id;
              return (
                <article
                  key={demo.id}
                  className={cn(
                    "card-glass p-6 transition-all duration-300",
                    isActive
                      ? "glow-pulse border-brand-accent/40 opacity-100"
                      : "border-white/10 opacity-80 hover:opacity-100",
                  )}
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

                  <blockquote className="mt-5 space-y-2 border-l-2 border-brand-accent/60 pl-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-accent">
                      Sample conversation
                    </p>
                    {demo.transcript.map((line, i) => (
                      <p
                        key={line}
                        className={cn(
                          "text-small leading-relaxed",
                          i === 0
                            ? "font-medium text-on-dark"
                            : "text-on-dark-muted",
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </blockquote>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <AudioPlayer
                      id={demo.id}
                      src={demo.audioSrc}
                      fallbackText={demo.script}
                      fallbackLang={demo.fallbackLang}
                      duration={demo.fallbackDuration}
                      label={`${demo.persona} ${demo.language}`}
                      preferSpeech={false}
                      isActiveCard={isActive}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </AudioPlayerProvider>
      </Container>
    </Section>
  );
}
