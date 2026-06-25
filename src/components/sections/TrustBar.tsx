import { getTrustBarIcon } from "@/components/icons/icon-map";
import { Container } from "@/components/ui/container";
import { IntegrationLogo } from "@/components/ui/integration-logo";
import {
  trustBarIndustries,
  trustBarIntegrations,
  trustBarSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      aria-labelledby="trust-bar-heading"
      className="border-b border-border-default/60 bg-surface-white"
    >
      <Container className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            {trustBarSection.eyebrow}
          </p>
          <h2
            id="trust-bar-heading"
            className="mt-3 text-base font-medium leading-relaxed text-text-secondary md:text-lg"
          >
            {trustBarSection.headline}
          </h2>

          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7 sm:gap-2.5"
            role="list"
          >
            {trustBarIndustries.map(({ label, icon }) => {
              const Icon = getTrustBarIcon(icon);
              return (
                <li key={label}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-border-default",
                      "bg-surface-muted/60 px-3 py-1.5 text-sm font-medium text-text-primary",
                      "max-sm:px-2.5 max-sm:text-xs",
                    )}
                  >
                    <Icon
                      className="hidden h-3.5 w-3.5 shrink-0 text-brand-primary sm:block"
                      aria-hidden="true"
                    />
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mx-auto mt-8 max-w-4xl border-t border-border-default/60 pt-8 md:mt-10 md:pt-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
            {trustBarSection.integrationsLabel}
          </p>
          <ul
            className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-12 md:gap-x-14"
            role="list"
          >
            {trustBarIntegrations.map(({ label, logo }) => (
              <li key={label}>
                <Link
                  href={trustBarSection.integrationsHref}
                  className={cn(
                    "inline-flex items-center gap-2 transition-opacity",
                    "opacity-60 hover:opacity-100 focus-visible:opacity-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2",
                  )}
                  aria-label={`OpsBrain ${label} integration`}
                >
                  <IntegrationLogo slug={logo} label={label} />
                  <span className="text-sm font-medium text-text-secondary">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
