import { getTrustBarIcon } from "@/components/icons/icon-map";
import { Container } from "@/components/ui/container";
import { IntegrationLogo } from "@/components/ui/integration-logo";
import {
  trustBarIndustries,
  trustBarIntegrations,
  trustBarSection,
} from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      aria-labelledby="trust-bar-heading"
      className="border-y border-border-default bg-surface-white"
    >
      <Container className="py-10 md:py-12">
        <div className="overflow-hidden rounded-2xl border border-border-default bg-surface-white">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-border-default p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                {trustBarSection.eyebrow}
              </p>
              <h2
                id="trust-bar-heading"
                className="mt-2 font-display text-lg font-semibold tracking-tight text-text-primary"
              >
                {trustBarSection.industriesTitle}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                {trustBarSection.headline}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3" role="list">
                {trustBarIndustries.map(({ label, icon, href }) => {
                  const Icon = getTrustBarIcon(icon);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className={cn(
                          "group flex h-full items-center gap-2.5 rounded-xl border border-border-default bg-surface-muted/50 px-3 py-2.5",
                          "transition-colors hover:border-brand-primary/35 hover:bg-brand-primary-light",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                        )}
                      >
                        <Icon
                          className="size-4 shrink-0 text-brand-primary"
                          aria-hidden="true"
                        />
                        <span className="text-[13px] font-medium text-text-primary">
                          {label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-surface-muted/40 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {trustBarSection.integrationsLabel}
              </p>
              <p className="mt-2 font-display text-lg font-semibold tracking-tight text-text-primary">
                {trustBarSection.integrationsTitle}
              </p>
              <ul
                className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"
                role="list"
              >
                {trustBarIntegrations.map(({ label, logo }) => (
                  <li key={label}>
                    <Link
                      href={trustBarSection.integrationsHref}
                      className={cn(
                        "flex h-full items-center gap-2.5 rounded-xl border border-border-default bg-surface-white px-3 py-2.5",
                        "transition-colors hover:border-brand-primary/35",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                      )}
                      aria-label={`OpsBrain ${label} integration`}
                    >
                      <IntegrationLogo
                        slug={logo}
                        label={label}
                        className="h-5 w-auto shrink-0"
                      />
                      <span className="truncate text-[13px] font-medium text-text-primary">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={trustBarSection.integrationsHref}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                {trustBarSection.integrationsCta}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
