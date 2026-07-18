"use client";

import { useState } from "react";
import {
  getTierPricing,
  pricingTiers,
  type BillingPeriod,
} from "@/content/seo-pages";
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

export function PricingPlans() {
  const [period, setPeriod] = useState<BillingPeriod>("annual");

  return (
    <section aria-labelledby="pricing-tiers-heading" className="space-y-8">
      <div className="flex flex-col items-center gap-3">
        <h2 id="pricing-tiers-heading" className="sr-only">
          Pricing tiers
        </h2>
        <div
          className="inline-flex items-center rounded-full border border-border-default bg-surface-muted p-1"
          role="group"
          aria-label="Billing period"
        >
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            aria-pressed={period === "monthly"}
            className={cn(
              "rounded-full px-5 py-2 text-small font-semibold transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              period === "monthly"
                ? "bg-brand-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPeriod("annual")}
            aria-pressed={period === "annual"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 text-small font-semibold transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              period === "annual"
                ? "bg-brand-primary text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            Annual
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                period === "annual"
                  ? "bg-white/20 text-white"
                  : "bg-brand-primary/10 text-brand-primary",
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
        <p className="max-w-xl text-center text-small text-text-secondary">
          {period === "annual"
            ? "Annual plans are 20% off and billed upfront. Voice minutes still refresh every month."
            : "Pay month to month. Switch to annual anytime to save 20%."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const pricing = getTierPricing(tier, period);
          const featured = "featured" in tier && tier.featured;

          return (
            <article
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-surface-white p-6 md:p-8",
                featured
                  ? "border-brand-primary shadow-md ring-1 ring-brand-primary/20"
                  : "border-border-default",
              )}
            >
              {featured ? (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most popular
                </span>
              ) : null}

              <p className="text-small font-semibold uppercase tracking-wider text-brand-primary">
                {tier.name}
              </p>

              <div className="mt-2 flex items-baseline gap-1">
                <p className="text-h2 font-bold text-text-primary">
                  {pricing.displayPrice}
                </p>
                {pricing.priceSuffix ? (
                  <span className="text-body font-medium text-text-secondary">
                    {pricing.priceSuffix}
                  </span>
                ) : null}
              </div>

              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                {pricing.billingNote}
              </p>
              {pricing.totalLabel ? (
                <p className="mt-2 text-small font-semibold text-text-primary">
                  {pricing.totalLabel}
                </p>
              ) : null}

              <h3 className="mt-4 text-h3 font-bold text-text-primary">
                {tier.headline}
              </h3>

              <div className="mt-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-4 py-3">
                <p className="text-small font-semibold text-text-primary">
                  {tier.includedMinutes}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  {tier.minutesNote}
                </p>
              </div>

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
                  featured
                    ? "btn-gradient text-white"
                    : "border border-border-default bg-surface-white text-text-primary hover:bg-surface-muted",
                )}
              >
                {tier.cta.label}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
