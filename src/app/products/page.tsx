import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/button";
import { moreFromOpsBrain, productNavItems } from "@/content/products";
import { hubPages } from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: hubPages.products.title,
  description: hubPages.products.description,
  path: hubPages.products.path,
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: hubPages.products.path },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function ProductsHubPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Products"
          title="OpsBrain AI, OpsSpark, OpsMeet"
          subtitle={hubPages.products.intro}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {productNavItems.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-2xl border border-border-default bg-surface-white p-6"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {item.name}
                </h3>
                {item.badge ? (
                  <span className="rounded-md bg-brand-primary-light px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-primary">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 flex-1 text-small leading-relaxed text-text-secondary">
                {item.tagline}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <ButtonLink
                  href={item.href}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  {item.id === "opsbrain-ai" ? "Open homepage" : `See ${item.name}`}
                </ButtonLink>
                {item.loginHref ? (
                  <ButtonLink
                    href={item.loginHref}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    trackAsDemo={`products_hub_${item.id}_login`}
                  >
                    Login
                  </ButtonLink>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="more-heading">
          <h2
            id="more-heading"
            className="font-display text-h3 font-bold text-text-primary"
          >
            {moreFromOpsBrain.title}
          </h2>
          <p className="mt-2 max-w-2xl text-body text-text-secondary">
            {moreFromOpsBrain.subtitle}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {moreFromOpsBrain.cards.map((card) => (
              <div
                key={card.slug}
                className="rounded-2xl border border-border-default bg-surface-white p-6"
              >
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {card.name}
                </h3>
                <p className="mt-1 text-small font-medium text-text-secondary">
                  {card.line}
                </p>
                <p className="mt-2 text-small leading-relaxed text-text-secondary">
                  {card.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={card.href}
                    className="text-small font-semibold text-brand-primary hover:underline"
                  >
                    {card.cta}
                  </Link>
                  <span className="text-text-muted" aria-hidden="true">
                    ·
                  </span>
                  <a
                    href={card.loginHref}
                    className="text-small font-semibold text-brand-primary hover:underline"
                  >
                    Login
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PageCTA
          title="Ready to deploy AI employees?"
          description="Get started with OpsBrain AI, or talk to an agent on a live demo call."
        />
      </MarketingPageShell>
    </>
  );
}
