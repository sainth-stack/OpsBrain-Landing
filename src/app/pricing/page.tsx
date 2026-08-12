import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { PricingPlans } from "@/components/pages/PricingPlans";
import { pricingOtherProductsNote } from "@/content/products";
import { hubPages } from "@/content/seo-pages";
import Link from "next/link";
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
          title="Simple, honest pricing"
          subtitle="Voice is pay-as-you-go at ₹3 per connected minute. Add Gmail and WhatsApp campaigns for ₹499/month when you need them. What you see is what you pay."
        />

        <PricingPlans />

        <p className="mt-10 text-center text-small text-text-secondary">
          {pricingOtherProductsNote.text} {pricingOtherProductsNote.cta}{" "}
          {pricingOtherProductsNote.links.map((link, index) => (
            <span key={link.href}>
              <Link
                href={link.href}
                className="font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                {link.label}
              </Link>
              {index < pricingOtherProductsNote.links.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>

        <PageFaq items={hubPages.pricing.faq} />

        <PageCTA
          title="Start with 50 free credits"
          description="Launch AI employees on voice in minutes. Add Gmail and WhatsApp campaigns whenever you're ready."
          secondaryHref="/platform"
          secondaryLabel="Explore platform"
        />
      </MarketingPageShell>
    </>
  );
}
