import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { aiEmployees } from "@/content/site";
import { hubPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
  getWebSiteJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: hubPages.aiEmployees.title,
  description: hubPages.aiEmployees.description,
  path: hubPages.aiEmployees.path,
});

const jsonLd = getPageJsonLd([
  getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "AI Employees", path: hubPages.aiEmployees.path },
  ]),
  getWebSiteJsonLd(),
]);

export default function AIEmployeesHubPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "AI Employees", path: hubPages.aiEmployees.path },
        ]}
      >
        <PageHero
          eyebrow="AI Workforce"
          title="AI Employees for Every Industry"
          subtitle={hubPages.aiEmployees.intro}
        />

        <section aria-labelledby="persona-grid-heading">
          <h2 id="persona-grid-heading" className="sr-only">
            Browse AI employee personas
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiEmployees.map((employee) => (
              <Link
                key={employee.id}
                href={`/ai-employees/${employee.id}`}
                className="group flex flex-col rounded-xl border border-border-default bg-surface-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  {employee.industry}
                </p>
                <h3 className="mt-2 text-body font-semibold text-text-primary group-hover:text-brand-primary md:text-lg">
                  {employee.name}
                </h3>
                <p className="mt-2 text-small font-medium text-brand-accent">
                  {employee.outcomeMetric}
                </p>
                <p className="mt-3 flex-1 text-small leading-relaxed text-text-secondary">
                  {employee.description}
                </p>
                <span className="mt-4 text-small font-medium text-brand-primary">
                  View persona →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <PageCTA
          title="Not sure which AI employee fits?"
          description="Share your industry and workflow — we'll recommend the right persona and solution during a 30-minute demo."
        />
      </MarketingPageShell>
    </>
  );
}
