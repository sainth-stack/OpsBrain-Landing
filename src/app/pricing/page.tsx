import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { hubPages, pricingTiers } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
  getProductOfferJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: hubPages.pricing.title,
  description: hubPages.pricing.description,
  path: hubPages.pricing.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: hubPages.pricing.path },
];

const jsonLd = getPageJsonLd([
  getBreadcrumbJsonLd(breadcrumbs),
  getProductOfferJsonLd({
    name: "OpsBrain AI Platform",
    description: hubPages.pricing.description,
    url: hubPages.pricing.path,
  }),
  getFaqJsonLdFromItems(hubPages.pricing.faq),
]);

export default function PricingPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Pricing"
          title="Pilot first. Scale when ROI is proven."
          subtitle={hubPages.pricing.description}
        />

        <section aria-labelledby="pricing-tiers-heading">
          <h2 id="pricing-tiers-heading" className="sr-only">
            Pricing tiers
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-2xl border bg-surface-white p-6 md:p-8",
                  "featured" in tier && tier.featured
                    ? "border-brand-primary shadow-md ring-1 ring-brand-primary/20"
                    : "border-border-default",
                )}
              >
                <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
                  {tier.name}
                </p>
                <h3 className="mt-2 text-h3 font-bold text-text-primary">
                  {tier.headline}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-text-secondary">
                  {tier.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2" role="list">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-small leading-relaxed text-text-secondary"
                    >
                      • {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-small font-medium text-text-muted">
                  Contact for quote — no list prices published online.
                </p>
                <a
                  href={tier.cta.href}
                  className={cn(
                    "mt-4 inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-body font-medium transition-colors",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    "featured" in tier && tier.featured
                      ? "btn-gradient text-white"
                      : "border border-border-default bg-surface-white text-text-primary hover:bg-surface-muted",
                  )}
                >
                  {tier.cta.label}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="pricing-note-heading">
          <h2 id="pricing-note-heading" className="text-h2 font-bold text-text-primary">
            Honest pricing
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            OpsBrain pricing reflects your call volume, number of AI employees,
            languages, and integration complexity. We do not publish one-size-fits-all
            rates because a regional restaurant and a global SaaS team have different
            workloads. Every engagement starts with a scoped quote and optional 14-day
            pilot so you validate ROI before annual commitment.
          </p>
        </section>

        <PageFaq items={hubPages.pricing.faq} />

        <PageCTA
          title="Get a quote for your team"
          description="Share your industry, monthly lead volume, and CRM stack — we'll recommend the right plan."
          secondaryHref="/platform"
          secondaryLabel="Explore platform"
        />
      </MarketingPageShell>
    </>
  );
}
