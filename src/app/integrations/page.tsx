import { IconBox } from "@/components/icons/icon-map";
import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import { getAllIntegrationNames, hubPages } from "@/content/seo-pages";
import { trustBarIntegrations } from "@/content/site";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
  getServiceJsonLd,
} from "@/lib/seo";
import { Cloud, Megaphone, Kanban, Phone, Calendar } from "lucide-react";

const integrationIcons = {
  Salesforce: Cloud,
  HubSpot: Megaphone,
  Pipedrive: Kanban,
  Twilio: Phone,
  "Google Calendar": Calendar,
} as const;

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Integrations", path: hubPages.integrations.path },
];

export const metadata = buildPageMetadata({
  title: hubPages.integrations.title,
  description: hubPages.integrations.description,
  path: hubPages.integrations.path,
});

const allIntegrations = getAllIntegrationNames();

const jsonLd = getPageJsonLd([
  getBreadcrumbJsonLd(breadcrumbs),
  getServiceJsonLd({
    name: "OpsBrain AI Integrations",
    description: hubPages.integrations.description,
    url: hubPages.integrations.path,
  }),
]);

export default function IntegrationsPage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Integrations"
          title="Connect OpsBrain to your revenue stack"
          subtitle={hubPages.integrations.description}
        />

        <section aria-labelledby="featured-integrations-heading">
          <h2 id="featured-integrations-heading" className="text-h2 font-bold text-text-primary">
            Featured integrations
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustBarIntegrations.map((integration) => {
              const Icon =
                integrationIcons[
                  integration.label as keyof typeof integrationIcons
                ] ?? Cloud;
              return (
                <article
                  key={integration.label}
                  className="rounded-xl border border-border-default bg-surface-white p-5"
                >
                  <IconBox icon={Icon} variant="primary" size="md" />
                  <h3 className="mt-4 text-body font-semibold text-text-primary">
                    OpsBrain {integration.label} integration
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-text-secondary">
                    Bi-directional sync for leads, call logs, meetings, and
                    disposition codes - so {integration.label} stays the system
                    of record while AI employees handle voice workflows.
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="all-integrations-heading">
          <h2 id="all-integrations-heading" className="text-h2 font-bold text-text-primary">
            Supported systems
          </h2>
          <p className="mt-3 max-w-3xl text-body leading-relaxed text-text-secondary">
            OpsBrain connects to CRMs, calendars, telephony, helpdesks, ATS tools,
            POS systems, and custom APIs. Below are systems referenced across AI
            employee personas and platform workflows.
          </p>
          <ul className="mt-6 columns-1 gap-x-8 sm:columns-2 lg:columns-3" role="list">
            {allIntegrations.map((name) => (
              <li
                key={name}
                className="mb-2 text-body text-text-secondary [break-inside:avoid]"
              >
                OpsBrain + {name}
              </li>
            ))}
          </ul>
        </section>

        <PageCTA
          title="Need a custom integration?"
          description="Enterprise plans include solution engineering for proprietary CRMs, EHRs, and policy-admin systems."
          secondaryHref="/ai-employees"
          secondaryLabel="Browse AI employees"
        />
      </MarketingPageShell>
    </>
  );
}
