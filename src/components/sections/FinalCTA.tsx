"use client";

import { LeadForm } from "@/components/forms/LeadForm";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { finalCTASection } from "@/content/site";
import { cn } from "@/lib/utils";
import { Calendar, Mail } from "lucide-react";
import { useState } from "react";

type ContactTab = "contact" | "demo";

export function FinalCTA() {
  const [activeTab, setActiveTab] = useState<ContactTab>("contact");
  const { bookDemo } = finalCTASection;

  return (
    <Section
      id="contact"
      surface="dark"
      className="relative overflow-hidden"
      aria-label={finalCTASection.title}
    >
      <DarkSectionBackdrop variant="dark" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow={finalCTASection.eyebrow}
            title={finalCTASection.title}
            subtitle={finalCTASection.subtitle}
            align="center"
            theme="dark"
          />

          <div
            className="mt-8 flex rounded-lg border border-white/10 bg-white/5 p-1"
            role="tablist"
            aria-label="Contact options"
          >
            {(["contact", "demo"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md py-3 text-small font-medium transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
                  activeTab === tab
                    ? "bg-brand-primary text-white"
                    : "text-text-inverse-muted hover:text-text-inverse",
                )}
              >
                {tab === "contact" ? (
                  <Mail className="size-4" aria-hidden="true" />
                ) : (
                  <Calendar className="size-4" aria-hidden="true" />
                )}
                {tab === "contact"
                  ? finalCTASection.tabs.contact
                  : finalCTASection.tabs.demo}
              </button>
            ))}
          </div>

          <div className="card-glass mt-6 p-6 md:p-8">
            {activeTab === "contact" ? (
              <LeadForm theme="dark" />
            ) : bookDemo.calendlyUrl ? (
              <iframe
                src={bookDemo.calendlyUrl}
                title="Book a demo with OpsBrain AI"
                className="min-h-[630px] w-full rounded-lg border-0"
              />
            ) : (
              <div className="flex flex-col items-center px-4 py-10 text-center">
                <Calendar
                  className="size-12 text-brand-accent"
                  aria-hidden="true"
                />
                <p className="mt-4 max-w-md text-body leading-relaxed text-text-inverse-muted">
                  {bookDemo.placeholder}
                </p>
                <ButtonLink
                  href={bookDemo.mailtoFallback}
                  variant="primary"
                  size="lg"
                  className="mt-8"
                  trackAsDemo="final_cta_email_demo"
                >
                  Email to Book Demo
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
