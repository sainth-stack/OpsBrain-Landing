import { LeadForm } from "@/components/forms/LeadForm";
import { DarkSectionBackdrop } from "@/components/ui/DarkSectionBackdrop";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { finalCTASection } from "@/content/site";

export function FinalCTA() {
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

          <div className="card-glass mt-8 p-6 md:p-8">
            <LeadForm theme="dark" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
