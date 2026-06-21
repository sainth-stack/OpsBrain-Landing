"use client";

import { getIntegrationIcon, getTrustBarIcon } from "@/components/icons/icon-map";
import { trustBarIndustries, trustBarIntegrations } from "@/content/site";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

function MarqueeRow({
  items,
  getIcon,
  ariaLabel,
}: {
  items: readonly { label: string; icon: string }[];
  getIcon: (name: string) => LucideIcon;
  ariaLabel: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-white to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-white to-transparent md:w-20" />

      <div
        className="marquee-track flex w-max gap-8 px-4 md:gap-12 md:px-6"
        role="list"
        aria-label={ariaLabel}
      >
        {doubled.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <div
              key={`${item.label}-${index}`}
              role="listitem"
              className={cn(
                "flex shrink-0 items-center gap-2 text-text-muted",
                "transition-colors duration-200 hover:text-text-primary",
              )}
            >
              <Icon className="size-4 shrink-0 opacity-60" aria-hidden="true" />
              <span className="whitespace-nowrap text-sm font-medium">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrustRow({
  label,
  items,
  getIcon,
  ariaLabel,
}: {
  label: string;
  items: readonly { label: string; icon: string }[];
  getIcon: (name: string) => LucideIcon;
  ariaLabel: string;
}) {
  return (
    <div>
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-text-muted">
        {label}
      </p>
      <MarqueeRow items={items} getIcon={getIcon} ariaLabel={ariaLabel} />
    </div>
  );
}

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      className="border-y border-border-default bg-surface-white py-8 md:py-10"
      aria-label="Trust and integrations"
    >
      <TrustRow
        label="Trusted across industries"
        items={trustBarIndustries}
        getIcon={getTrustBarIcon}
        ariaLabel="Industries served"
      />

      <div className="my-8 border-t border-border-default md:my-10" />

      <TrustRow
        label="Integrates with"
        items={trustBarIntegrations}
        getIcon={getIntegrationIcon}
        ariaLabel="Integration partners"
      />
    </section>
  );
}
