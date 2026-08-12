import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { problemSection } from "@/content/site";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Problem() {
  return (
    <Section id="problem" surface="white" aria-label={problemSection.title}>
      <Container>
        <SectionHeader
          eyebrow={problemSection.eyebrow}
          title={problemSection.title}
          subtitle={problemSection.subtitle}
          className="mb-8 md:mb-10"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {problemSection.stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl border border-border-default bg-surface-muted/40 px-6 py-5"
            >
              <p className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-[2.5rem]">
                {stat.value}
              </p>
              <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border-default">
          <ul role="list" className="divide-y divide-border-default">
            {problemSection.painPoints.map((point, index) => (
              <li
                key={point.title}
                className="grid gap-2 px-5 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:px-7 sm:py-6"
              >
                <span className="text-[12px] font-semibold tabular-nums text-brand-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[16px] font-semibold tracking-tight text-text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-text-secondary">
                    {point.description}
                  </p>
                </div>
                <span className="w-fit rounded-md bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-text-muted sm:mt-0.5">
                  {point.tag}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-border-default bg-surface-muted/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-[14px] font-medium text-text-primary">
              {problemSection.closingLine}
            </p>
            <Link
              href={problemSection.closingHref}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              {problemSection.closingCta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
