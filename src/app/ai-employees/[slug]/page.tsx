import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { getAllIndustrySlugs, getIndustryPageContent } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
  getServiceJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getIndustryPageContent(slug);
  if (!content) return {};

  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: `/ai-employees/${slug}`,
    keywords: content.keywords,
  });
}

export default async function AIEmployeePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getIndustryPageContent(slug);
  if (!content) notFound();

  const { employee, paragraphs, faq, solution, breadcrumbs } = content;
  const pagePath = `/ai-employees/${slug}`;

  const jsonLd = getPageJsonLd([
    getBreadcrumbJsonLd(breadcrumbs),
    getServiceJsonLd({
      name: employee.name,
      description: content.description,
      url: pagePath,
    }),
    getFaqJsonLdFromItems(faq),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell
        breadcrumbs={breadcrumbs}
        backHref="/ai-employees"
        backLabel="All AI employees"
      >
        <PageHero
          eyebrow={`${employee.industry} · ${employee.role}`}
          title={employee.name}
          subtitle={employee.description}
        />

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-h2 font-bold text-text-primary">
            Overview
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            {employee.fullDescription}
          </p>
          <p className="mt-4 inline-flex rounded-full bg-brand-accent-light px-4 py-1.5 text-small font-medium text-brand-accent">
            {employee.outcomeMetric}
          </p>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 text-body leading-relaxed text-text-secondary"
            >
              {paragraph}
            </p>
          ))}
        </section>

        <section aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading" className="text-h2 font-bold text-text-primary">
            Key capabilities
          </h2>
          <ul className="mt-4 space-y-3" role="list">
            {employee.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex gap-3 rounded-lg border border-border-default bg-surface-muted px-4 py-3 text-body text-text-secondary"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-primary" />
                {capability}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="integrations-heading">
          <h2 id="integrations-heading" className="text-h2 font-bold text-text-primary">
            Integrations
          </h2>
          <p className="mt-3 text-body text-text-secondary">
            {employee.name} connects to your existing stack and syncs every call,
            note, and outcome in real time.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {employee.integrations.map((integration) => (
              <Link
                key={integration}
                href="/integrations"
                className={cn(
                  "inline-flex rounded-md border border-border-default bg-surface-white px-3 py-1.5 text-small font-medium text-text-primary",
                  "hover:border-brand-primary/40 hover:text-brand-primary",
                )}
              >
                {integration}
              </Link>
            ))}
          </div>
        </section>

        <RelatedLinks
          title="Explore related workflows"
          links={[
            {
              href: solution.path,
              label: solution.label,
              description: solution.description,
            },
            {
              href: "/",
              label: "OpsBrain AI homepage",
              description: "See the full platform for lead calling, support, and CRM automation.",
            },
            {
              href: "/platform",
              label: "Platform overview",
              description: "Discover, engage, automate, and hand off across your revenue funnel.",
            },
          ]}
        />

        <PageFaq items={faq} />

        <PageCTA
          title={`Deploy ${employee.name} today`}
          description={`Start with a 14-day pilot configured for ${employee.industry.toLowerCase()} workflows — scripts, voice, and CRM sync included.`}
          secondaryHref="/pricing"
        />
      </MarketingPageShell>
    </>
  );
}
