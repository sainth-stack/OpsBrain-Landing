import { PageHeaderNav } from "@/components/pages/PageHeaderNav";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { Container } from "@/components/ui/container";
import {
  COMPARE_LAST_UPDATED,
  type ComparePageContent,
} from "@/content/competitors";
import { getEmployeeBySlug } from "@/content/seo-pages";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
} from "@/lib/seo";

export function ComparisonPage({ content }: { content: ComparePageContent }) {
  const path = `/compare/${content.slug}`;
  const competitorLabel =
    content.competitorColumnLabel ?? content.competitorName;
  const isRoundup = content.category === "roundup";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: content.h1, path },
  ];

  const relatedIndustries = content.relatedIndustrySlugs
    .map((slug) => getEmployeeBySlug(slug))
    .filter(Boolean);

  const jsonLd = getPageJsonLd([
    getBreadcrumbJsonLd(breadcrumbs),
    getFaqJsonLdFromItems(content.faq),
  ]);

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main className="flex-1 py-12 md:py-16">
        <Container>
          <PageHeaderNav
            breadcrumbs={breadcrumbs}
            backHref="/compare"
            backLabel="All comparisons"
          />

          <header className="mt-8 max-w-3xl md:mt-10">
            <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
              {isRoundup ? "Category comparison" : "Alternative guide"}
            </p>
            <h1 className="mt-3 font-display text-h1 font-bold text-text-primary md:text-display">
              {content.h1}
            </h1>
            <p className="mt-4 text-body leading-relaxed text-text-secondary md:text-lg">
              {content.intro}
            </p>
          </header>

          <section className="mt-12" aria-labelledby="comparison-table-heading">
            <h2
              id="comparison-table-heading"
              className="text-h2 font-bold text-text-primary"
            >
              Feature comparison
            </h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border-default">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border-default bg-surface-muted">
                    <th scope="col" className="px-4 py-3 text-small font-semibold text-text-primary">
                      Capability
                    </th>
                    <th scope="col" className="px-4 py-3 text-small font-semibold text-text-primary">
                      {competitorLabel}
                    </th>
                    <th scope="col" className="px-4 py-3 text-small font-semibold text-brand-primary">
                      OpsBrain AI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparisonRows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-border-default last:border-b-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-body font-medium text-text-primary"
                      >
                        {row.feature}
                      </th>
                      <td className="px-4 py-3 text-body text-text-secondary">
                        {row.competitor}
                      </td>
                      <td className="px-4 py-3 text-body font-medium text-text-primary">
                        {row.opsbrain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <section aria-labelledby="when-competitor-heading">
              <h2
                id="when-competitor-heading"
                className="text-h3 font-semibold text-text-primary"
              >
                {isRoundup
                  ? "When other tools may fit"
                  : `When to choose ${content.competitorName}`}
              </h2>
              <ul className="mt-4 space-y-2" role="list">
                {content.whenCompetitor.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-body leading-relaxed text-text-secondary"
                  >
                    <span aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="when-opsbrain-heading">
              <h2
                id="when-opsbrain-heading"
                className="text-h3 font-semibold text-text-primary"
              >
                When to choose OpsBrain
              </h2>
              <ul className="mt-4 space-y-2" role="list">
                {content.whenOpsBrain.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-body leading-relaxed text-text-secondary"
                  >
                    <span aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <PageFaq items={content.faq} />

          <div className="mt-12 space-y-12">
            <RelatedLinks
              title="Explore OpsBrain"
              links={[
                ...relatedIndustries.map((employee) => ({
                  href: `/ai-employees/${employee!.id}`,
                  label: employee!.name,
                  description: employee!.description,
                })),
                {
                  href: "/platform",
                  label: "Platform overview",
                  description: "Ten core capabilities for autonomous revenue teams.",
                },
                {
                  href: "/pricing",
                  label: "Pricing & plans",
                  description: "Plans from $299/mo — Starter, Growth, and Enterprise.",
                },
                {
                  href: "/solutions/lead-calling",
                  label: "Instant lead calling",
                  description: "Respond to leads in under 60 seconds with AI voice.",
                },
              ]}
            />

            <PageCTA
              title="See OpsBrain on your workflow"
              description="Book a demo to see OpsBrain on your scripts, languages, and CRM — no engineering sprint required."
            />

            <p className="text-small leading-relaxed text-text-muted">
              {isRoundup ? (
                <>
                  Information based on publicly available product documentation and
                  industry comparisons. Last updated: {COMPARE_LAST_UPDATED}.
                </>
              ) : (
                <>
                  Not affiliated with {content.competitorName}. Information based on
                  publicly available sources. Last updated: {COMPARE_LAST_UPDATED}.
                </>
              )}
            </p>
          </div>
        </Container>
      </main>
    </>
  );
}
