import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageHero } from "@/components/pages/PageHero";
import {
  compareCategories,
  compareHub,
  comparePages,
  getComparePagesByCategory,
} from "@/content/competitors";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: compareHub.title,
  description: compareHub.description,
  path: compareHub.path,
  keywords: compareHub.keywords,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Compare", path: compareHub.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function CompareHubPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Comparisons"
          title="AI Voice & SDR Platform Comparisons"
          subtitle={compareHub.description}
        />

        {compareCategories.map((category) => {
          const pages = getComparePagesByCategory(category.id);
          if (pages.length === 0) return null;

          return (
            <section key={category.id} aria-labelledby={`category-${category.id}`}>
              <h2
                id={`category-${category.id}`}
                className="text-h2 font-bold text-text-primary"
              >
                {category.label}
              </h2>
              <p className="mt-2 max-w-3xl text-body text-text-secondary">
                {category.description}
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2" role="list">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/compare/${page.slug}`}
                      className="block rounded-xl border border-border-default bg-surface-white p-5 transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-light/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    >
                      <h3 className="text-body font-semibold text-text-primary">
                        {page.h1}
                      </h3>
                      <p className="mt-2 text-small leading-relaxed text-text-secondary">
                        {page.description}
                      </p>
                      <span className="mt-3 inline-block text-small font-medium text-brand-primary">
                        Read comparison →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section aria-labelledby="all-comparisons-heading">
          <h2 id="all-comparisons-heading" className="text-h3 font-semibold text-text-primary">
            All comparison pages
          </h2>
          <ul className="mt-4 columns-1 gap-x-8 sm:columns-2" role="list">
            {comparePages.map((page) => (
              <li key={page.slug} className="mb-2 [break-inside:avoid]">
                <Link
                  href={`/compare/${page.slug}`}
                  className="text-body text-brand-primary hover:underline"
                >
                  {page.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </MarketingPageShell>
    </>
  );
}
