import { getProblemIcon } from "@/components/icons/icon-map";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { problemSection } from "@/content/site";

export function Problem() {
  return (
    <Section id="problem" surface="white" aria-label={problemSection.title}>
      <Container>
        <SectionHeader
          eyebrow={problemSection.eyebrow}
          title={problemSection.title}
          subtitle={problemSection.subtitle}
          align="center"
        />

        <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-brand-primary/20 bg-brand-primary-light px-6 py-4 text-center text-body font-medium leading-relaxed text-brand-primary md:text-lg">
          {problemSection.statHighlight}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problemSection.painPoints.map((point) => {
            const Icon = getProblemIcon(point.icon);
            return (
              <article key={point.title} className="card-marketing">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Icon className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-text-primary">{point.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-text-secondary">
                  {point.description}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xl font-semibold text-text-primary md:mt-16">
          {problemSection.closingLine}
        </p>
      </Container>
    </Section>
  );
}
