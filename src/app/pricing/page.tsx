import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { hubPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getFaqJsonLdFromItems,
  getPageJsonLd,
  getProductOfferJsonLd,
} from "@/lib/seo";

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
          title="AI employees with clear voice minutes. Monthly or annual."
          subtitle={hubPages.pricing.description}
        />

        <PricingPlans />

        <section aria-labelledby="pricing-usage-heading">
          <h2 id="pricing-usage-heading" className="text-h2 font-bold text-text-primary">
            How voice minutes work
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border-default bg-surface-white p-5">
              <p className="text-small font-semibold text-text-primary">
                Included each month
              </p>
              <p className="mt-2 text-body leading-relaxed text-text-secondary">
                Starter includes 2,000 connected voice minutes. Growth includes
                7,500. Minutes refresh monthly on both monthly and annual plans.
              </p>
            </div>
            <div className="rounded-2xl border border-border-default bg-surface-white p-5">
              <p className="text-small font-semibold text-text-primary">
                What counts as a minute
              </p>
              <p className="mt-2 text-body leading-relaxed text-text-secondary">
                Connected call time only. Average outbound conversations are
                about 3 minutes — so Starter covers roughly 670 answered calls.
              </p>
            </div>
            <div className="rounded-2xl border border-border-default bg-surface-white p-5">
              <p className="text-small font-semibold text-text-primary">
                If you go over
              </p>
              <p className="mt-2 text-body leading-relaxed text-text-secondary">
                Extra voice minutes are $0.12/min, or upgrade to the next plan.
                Enterprise gets a custom minute pool and volume pricing.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="pricing-note-heading">
          <h2 id="pricing-note-heading" className="text-h2 font-bold text-text-primary">
            Honest pricing
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            You pay for AI employees — not a confusing credit marketplace. Choose
            monthly to start fast, or annual to save 20%. Starter is $399/mo or
            $3,830/year (5 AI employees, 2,000 minutes/mo). Growth is $1,499/mo or
            $14,390/year (20 AI employees, 7,500 minutes/mo). Enterprise is custom
            for unlimited AI employees, compliance, and committed volume.
          </p>
        </section>

        <PageFaq items={hubPages.pricing.faq} />

        <PageCTA
          title="Get a quote for your team"
          description="Share your industry, monthly lead volume, and CRM stack — we'll recommend the right plan and billing period."
          secondaryHref="/platform"
          secondaryLabel="Explore platform"
        />
      </MarketingPageShell>
    </>
  );
}
