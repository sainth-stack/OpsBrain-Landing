import { IconBox } from "@/components/icons/icon-map";
import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import {
  capabilities,
  capabilitiesSection,
  hubPages,
  platformOverview,
} from "@/content/seo-pages";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
  getSoftwareApplicationJsonLd,
} from "@/lib/seo";
import {
  ArrowRightLeft,
  Phone,
  Search,
  Zap,
} from "lucide-react";

const pillarIcons = {
  Search,
  Phone,
  Zap,
  ArrowRightLeft,
} as const;

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Platform", path: hubPages.platform.path },
];

export const metadata = buildPageMetadata({
  title: hubPages.platform.title,
  description: hubPages.platform.description,
  path: hubPages.platform.path,
});

const jsonLd = getPageJsonLd([
  getBreadcrumbJsonLd(breadcrumbs),
  getSoftwareApplicationJsonLd(),
]);

export default function PlatformPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Platform"
          title={platformOverview.title}
          subtitle={platformOverview.subtitle}
        />

        <section aria-labelledby="platform-pillars-heading">
          <h2 id="platform-pillars-heading" className="text-h2 font-bold text-text-primary">
            Four pillars of the AI workforce OS
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformOverview.pillars.map((pillar) => {
              const Icon =
                pillarIcons[pillar.icon as keyof typeof pillarIcons] ?? Search;
              return (
                <article
                  key={pillar.label}
                  className="rounded-xl border border-border-default bg-surface-white p-5"
                >
                  <IconBox icon={Icon} variant="primary" size="md" />
                  <h3 className="mt-4 text-body font-semibold text-text-primary">
                    {pillar.label}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading" className="text-h2 font-bold text-text-primary">
            {capabilitiesSection.title}
          </h2>
          <p className="mt-3 max-w-3xl text-body leading-relaxed text-text-secondary">
            {capabilitiesSection.subtitle}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="rounded-xl border border-border-default bg-surface-muted p-5"
              >
                <h3 className="text-body font-semibold text-text-primary">
                  {capability.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-text-secondary">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <RelatedLinks
          title="Put the platform to work"
          links={[
            {
              href: "/solutions/lead-calling",
              label: "Instant lead calling",
              description: "Respond to inbound leads in under 60 seconds.",
            },
            {
              href: "/solutions/inbound-support",
              label: "24/7 inbound support",
              description: "Answer every call and escalate with full context.",
            },
            {
              href: "/solutions/bulk-campaigns",
              label: "Bulk outbound campaigns",
              description: "Run parallel AI call waves from CRM or CSV lists.",
            },
            {
              href: "/ai-employees",
              label: "AI employees by industry",
              description: "Pre-built personas for sales, healthcare, hospitality, and more.",
            },
          ]}
        />

        <PageCTA />
      </MarketingPageShell>
    </>
  );
}
