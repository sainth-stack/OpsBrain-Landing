import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageFaq } from "@/components/pages/PageFaq";
import { PageHero } from "@/components/pages/PageHero";
import { ButtonLink } from "@/components/ui/button";
import type { ProductPageContent } from "@/content/products";
import { moreFromOpsBrain } from "@/content/products";
import Link from "next/link";

export function ProductPage({ product }: { product: ProductPageContent }) {
  const otherCard = moreFromOpsBrain.cards.find(
    (card) => card.slug !== product.slug,
  );

  return (
    <MarketingPageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: product.name, path: product.path },
      ]}
    >
      <div>
        <PageHero
          eyebrow={product.eyebrow}
          title={product.h1}
          subtitle={product.subtitle}
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href={product.primaryCta.href}
            variant="primary"
            size="lg"
            trackAsDemo={`product_${product.slug}_get_started`}
          >
            {product.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={product.loginHref}
            variant="secondary"
            size="lg"
            trackAsDemo={`product_${product.slug}_login`}
          >
            Login
          </ButtonLink>
          <ButtonLink href={product.secondaryCta.href} variant="ghost" size="lg">
            {product.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>

      <section aria-labelledby={`${product.slug}-problem-heading`}>
        <h2
          id={`${product.slug}-problem-heading`}
          className="font-display text-h2 font-bold text-text-primary"
        >
          {product.problem.title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {product.problem.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border-default bg-surface-white p-5"
            >
              <h3 className="text-body font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby={`${product.slug}-capabilities-heading`}>
        <h2
          id={`${product.slug}-capabilities-heading`}
          className="font-display text-h2 font-bold text-text-primary"
        >
          {product.capabilitiesTitle}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {product.capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border-default bg-surface-white p-5"
            >
              <h3 className="text-body font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24"
        aria-labelledby={`${product.slug}-how-heading`}
      >
        <h2
          id={`${product.slug}-how-heading`}
          className="font-display text-h2 font-bold text-text-primary"
        >
          {product.howItWorks.title}
        </h2>
        <p className="mt-3 max-w-2xl text-body text-text-secondary">
          {product.howItWorks.subtitle}
        </p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {product.howItWorks.steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border-default bg-surface-white p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-body font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby={`${product.slug}-who-heading`}>
        <h2
          id={`${product.slug}-who-heading`}
          className="font-display text-h2 font-bold text-text-primary"
        >
          {product.whoItsFor.title}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-text-secondary">
          {product.whoItsFor.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-small leading-relaxed text-text-muted">
          {product.whoItsFor.notFor}
        </p>
      </section>

      <section
        id="pricing"
        className="scroll-mt-24"
        aria-labelledby={`${product.slug}-pricing-heading`}
      >
        <h2
          id={`${product.slug}-pricing-heading`}
          className="font-display text-h2 font-bold text-text-primary"
        >
          {product.pricing.title}
        </h2>
        <p className="mt-3 max-w-2xl text-body text-text-secondary">
          {product.pricing.subtitle}
        </p>
        <div
          className={
            product.pricing.tiers.length === 1
              ? "mt-6 max-w-md"
              : "mt-6 grid gap-4 md:grid-cols-3"
          }
        >
          {product.pricing.tiers.map((tier) => (
            <article
              key={tier.name}
              className="flex flex-col rounded-2xl border border-border-default bg-surface-white p-6"
            >
              <h3 className="text-body font-semibold text-text-primary">
                {tier.name}
              </h3>
              <p className="mt-2 font-display text-3xl font-bold text-text-primary">
                {tier.price}
                {tier.price.startsWith("$") && tier.price !== "$0" ? (
                  <span className="text-base font-medium text-text-muted">
                    /mo
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-small text-text-secondary">{tier.note}</p>
              <ul className="mt-4 space-y-2 text-small text-text-secondary">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <PageFaq items={product.faq} />

      {otherCard ? (
        <p className="text-small text-text-secondary">
          Also from OpsBrain:{" "}
          <Link
            href={otherCard.href}
            className="font-medium text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            {otherCard.name}
          </Link>
          {" - "}
          {otherCard.line}
        </p>
      ) : null}

      <PageCTA
        title={product.cta.title}
        description={product.cta.description}
        primaryHref={product.cta.primaryHref}
        primaryLabel={product.cta.primaryLabel}
        secondaryHref={product.cta.secondaryHref}
        secondaryLabel={product.cta.secondaryLabel}
      />
    </MarketingPageShell>
  );
}
