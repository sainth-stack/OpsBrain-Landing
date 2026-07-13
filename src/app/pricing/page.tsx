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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

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
          title="Simple, transparent pricing. Scale as you grow."
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
                  "relative flex flex-col rounded-2xl border bg-surface-white p-6 md:p-8",
                  "featured" in tier && tier.featured
                    ? "border-brand-primary shadow-md ring-1 ring-brand-primary/20"
                    : "border-border-default",
                )}
              >
                {"featured" in tier && tier.featured ? (
                  <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                ) : null}
                <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
                  {tier.name}
                </p>
                <p className="mt-2 text-h2 font-bold text-text-primary">
                  {tier.price}
                </p>
                <h3 className="mt-1 text-h3 font-bold text-text-primary">
                  {tier.headline}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-text-secondary">
                  {tier.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5" role="list">
                  {tier.features.map((feature) => {
                    const isSectionLabel = feature.endsWith("plus:");
                    if (isSectionLabel) {
                      return (
                        <li
                          key={feature}
                          className="pt-1 text-small font-semibold text-text-primary"
                        >
                          {feature}
                        </li>
                      );
                    }
                    return (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-small leading-relaxed text-text-secondary"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-brand-primary" />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
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
            Every plan includes multilingual voice calling, email (Gmail) campaigns,
            WhatsApp campaigns, and CRM integration — no channel add-ons. Starter and
            Growth are self-serve at $399/mo for 5 AI employees and $1,499/mo for 20 AI
            employees, while Enterprise is custom-priced for teams that need unlimited AI
            employees, SLAs, and compliance. Scale AI employees up or down as your
            pipeline grows.
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
