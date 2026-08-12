"use client";

import { LeadForm } from "@/components/forms/LeadForm";
import { Container, Section } from "@/components/ui/container";
import { finalCTASection, trustBarSection, whyOpsBrainSection } from "@/content/site";
import { CheckCircle2 } from "lucide-react";

const demoBullets = whyOpsBrainSection.checklist.slice(0, 3);

export function FinalCTA() {
  return (
    <Section
      id="contact"
      surface="ink"
      className="scroll-mt-24 md:scroll-mt-28"
      aria-label={finalCTASection.title}
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-accent">
            {finalCTASection.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
            {finalCTASection.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-on-dark-muted">
            {finalCTASection.subtitle}
          </p>
          <ul className="mt-7 space-y-3 text-on-dark-muted">
            {demoBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-on-dark-muted">{trustBarSection.headline}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-soft p-7 md:p-8">
          <LeadForm theme="dark" />
        </div>
      </Container>
    </Section>
  );
}
