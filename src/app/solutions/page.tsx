import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { howItWorksTabs } from "@/content/site";
import { getAllSolutionSlugs, hubPages, solutionPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: hubPages.solutions.title,
  description: hubPages.solutions.description,
  path: hubPages.solutions.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: hubPages.solutions.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function SolutionsHubPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Solutions"
          title="AI Voice Workflows for Revenue Teams"
          subtitle={hubPages.solutions.intro}
        />

        <section aria-labelledby="solution-grid-heading">
          <h2 id="solution-grid-heading" className="sr-only">
            Browse OpsBrain solutions
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {getAllSolutionSlugs().map((slug) => {
              const tab = howItWorksTabs.find((item) => item.id === slug);
              const page = solutionPages[slug];
              if (!tab || !page) return null;

              return (
                <Link
                  key={slug}
                  href={page.path}
                  className="group flex flex-col rounded-xl border border-border-default bg-surface-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                    {tab.label}
                  </p>
                  <h3 className="mt-2 text-body font-semibold text-text-primary group-hover:text-brand-primary md:text-lg">
                    {tab.title}
                  </h3>
                  <p className="mt-3 flex-1 text-small leading-relaxed text-text-secondary">
                    {tab.description}
                  </p>
                  <span className="mt-4 text-small font-medium text-brand-primary">
                    View solution →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <PageCTA
          title="Not sure which workflow fits?"
          description="Tell us about your pipeline - we'll recommend lead calling, inbound support, or bulk campaigns during a 30-minute demo."
        />
      </MarketingPageShell>
    </>
  );
}
