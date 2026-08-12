import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { howItWorksSection, howItWorksSteps, howItWorksTabs } from "@/content/site";
import { hubPages, solutionPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: hubPages.howItWorks.title,
  description: hubPages.howItWorks.description,
  path: hubPages.howItWorks.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "How it works", path: hubPages.howItWorks.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function HowItWorksPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow={howItWorksSection.eyebrow}
          title={howItWorksSection.title}
          subtitle={hubPages.howItWorks.intro}
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border-default bg-surface-white p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                Step {item.step}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <section aria-labelledby="workflows-heading" className="mt-4">
          <h2
            id="workflows-heading"
            className="font-display text-h3 font-bold text-text-primary"
          >
            Core workflows
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {howItWorksTabs.map((tab) => {
              const page = solutionPages[tab.id as keyof typeof solutionPages];
              return (
                <Link
                  key={tab.id}
                  href={page?.path ?? "/solutions"}
                  className="group rounded-2xl border border-border-default bg-surface-white p-6 transition-colors hover:border-brand-primary/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    {tab.label}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-text-primary group-hover:text-brand-primary">
                    {tab.title}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-text-secondary">
                    {tab.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <PageCTA
          title="See it on a real call"
          description="Talk to an agent on the homepage, or pick an agent and get a live demo call."
          primaryHref="/try-a-live-call"
          primaryLabel="Try a live call"
          secondaryHref="/#talk-to-an-agent"
          secondaryLabel="Talk to an agent"
        />
      </MarketingPageShell>
    </>
  );
}
