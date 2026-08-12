"use client";

import { pricingTiers } from "@/content/seo-pages";
import { cn } from "@/lib/utils";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function PricingPlans() {
  return (
    <section aria-label="Pricing plans" className="mt-14 lg:mt-16">
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-5">
        {pricingTiers.map((tier) => {
          const featured = "featured" in tier && tier.featured;
          const badge = "badge" in tier ? tier.badge : null;

          return (
            <article
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-surface-white p-7 md:p-8",
                featured
                  ? "border-brand-primary/25 shadow-[0_24px_48px_-28px_rgba(79,70,229,0.55)] ring-1 ring-brand-primary/10"
                  : "border-border-default shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  {tier.name}
                </p>
                {badge ? (
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      featured
                        ? "bg-brand-primary text-white"
                        : "bg-surface-muted text-text-secondary",
                    )}
                  >
                    {badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-text-primary">
                    {tier.price}
                  </p>
                  {tier.priceUnit ? (
                    <span className="text-body text-text-secondary">{tier.priceUnit}</span>
                  ) : null}
                </div>
                <p className="mt-3 text-small leading-relaxed text-text-secondary">{tier.tagline}</p>
              </div>

              <div className="my-7 h-px bg-border-default" aria-hidden />

              <ul className="flex-1 space-y-3.5" role="list">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-small leading-relaxed text-text-secondary"
                  >
                    <CheckIcon
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        featured ? "text-brand-primary" : "text-text-secondary/70",
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.cta.href}
                className={cn(
                  "mt-8 inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-small font-semibold transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  featured
                    ? "btn-gradient text-white"
                    : "border border-border-default bg-surface-white text-text-primary hover:border-brand-primary/25 hover:bg-surface-muted",
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
