import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import {
  getAllSolutionSlugs,
  getEmployeeBySlug,
  getSolutionPageContent,
} from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
  getServiceJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getSolutionPageContent(slug);
  if (!content) return {};

  return buildPageMetadata({
    title: content.page.title,
    description: content.page.description,
    path: content.page.path,
    keywords: content.page.keywords,
  });
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getSolutionPageContent(slug);
  if (!content) notFound();

  const { tab, page, breadcrumbs } = content;
  const relatedEmployees = page.relatedEmployeeIds
    .map((id) => getEmployeeBySlug(id))
    .filter(Boolean);

  const jsonLd = getPageJsonLd([
    getBreadcrumbJsonLd(breadcrumbs),
    getServiceJsonLd({
      name: page.title,
      description: page.description,
      url: page.path,
    }),
    getFaqJsonLdFromItems(page.faq),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell
        breadcrumbs={breadcrumbs}
        backHref="/solutions"
        backLabel="All solutions"
      >
        <PageHero
          eyebrow="Solutions"
          title={tab.title}
          subtitle={tab.description}
        />

        <section aria-labelledby="workflow-heading">
          <h2 id="workflow-heading" className="text-h2 font-bold text-text-primary">
            How it works
          </h2>
          <ol className="mt-6 space-y-4" role="list">
            {tab.steps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-xl border border-border-default bg-surface-white p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-small font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-body leading-relaxed text-text-secondary">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="text-h2 font-bold text-text-primary">
            Benefits
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2" role="list">
            {page.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-lg border border-border-default bg-surface-muted px-4 py-3 text-body text-text-secondary"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        {relatedEmployees.length > 0 ? (
          <RelatedLinks
            title="Related AI employees"
            links={relatedEmployees.map((employee) => ({
              href: `/ai-employees/${employee!.id}`,
              label: employee!.name,
              description: employee!.description,
            }))}
          />
        ) : null}

        <RelatedLinks
          title="More on OpsBrain"
          links={[
            {
              href: "/",
              label: "Homepage",
              description: "Explore the full OpsBrain AI platform and voice demos.",
            },
            {
              href: "/platform",
              label: "Platform",
              description: "See all ten core capabilities in one revenue operating system.",
            },
          ]}
        />

        <PageFaq items={page.faq} />

        <PageCTA
          title={`Launch ${page.label.toLowerCase()} with OpsBrain`}
          description="Configure scripts, languages, and CRM mappings during onboarding — most teams go live in under 30 minutes."
        />
      </MarketingPageShell>
    </>
  );
}
