import { MarketingPageShell } from "@/components/pages/MarketingPageShell";
import { JsonLdScript } from "@/components/pages/JsonLdScript";
import { PageCTA } from "@/components/pages/PageCTA";
import { PageHero } from "@/components/pages/PageHero";
import {
  buildPageMetadata,
  getBreadcrumbJsonLd,
  getPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "TCPA, GDPR & AI Calling Compliance Guide",
  description:
    "Compliance checklist for AI outbound and inbound calling under TCPA, GDPR, and telemarketing rules — consent, DNC, calling windows, and data retention for voice AI.",
  path: "/guides/tcpa-gdpr-ai-calling",
  keywords: [
    "TCPA AI calling",
    "GDPR voice AI",
    "AI telemarketing compliance",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Compliance Guide", path: "/guides/tcpa-gdpr-ai-calling" },
];

const jsonLd = getPageJsonLd([getBreadcrumbJsonLd(breadcrumbs)]);

export default function ComplianceGuidePage() {
  return (
    <>
      <JsonLdScript data={jsonLd} />
      <MarketingPageShell breadcrumbs={breadcrumbs}>
        <PageHero
          eyebrow="Compliance"
          title="TCPA, GDPR & AI Calling: What Revenue Teams Should Know"
          subtitle="AI voice agents scale outreach fast — which makes consent, disclosure, and data handling more important, not less. Use this guide as a starting point with your legal counsel."
        />

        <section aria-labelledby="tcpa-heading">
          <h2 id="tcpa-heading" className="text-h2 font-bold text-text-primary">
            TCPA and U.S. outbound calling
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            The Telephone Consumer Protection Act regulates autodialed calls, prerecorded
            messages, and texts to mobile numbers. AI voice agents that place outbound calls
            generally require prior express consent for marketing — or an established business
            relationship where applicable. Maintain proof of consent tied to each lead record.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-body text-text-secondary">
            <li>Honor National Do Not Call registries and internal suppression lists.</li>
            <li>Configure calling windows by timezone and campaign type.</li>
            <li>Disclose that the caller is AI when required by state law or company policy.</li>
            <li>Offer opt-out during the call and propagate to CRM immediately.</li>
          </ul>
        </section>

        <section aria-labelledby="gdpr-heading">
          <h2 id="gdpr-heading" className="text-h2 font-bold text-text-primary">
            GDPR and EU data subjects
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            Processing personal data for AI calling requires a lawful basis — often consent or
            legitimate interest with balancing tests. Call recordings and transcripts are personal
            data; define retention periods and honor access, rectification, and erasure requests.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-body text-text-secondary">
            <li>Document data flows between CRM, voice platform, and subprocessors.</li>
            <li>Use EU data residency options when offered on enterprise plans.</li>
            <li>Restrict access to recordings via role-based controls and audit logs.</li>
          </ul>
        </section>

        <section aria-labelledby="india-heading">
          <h2 id="india-heading" className="text-h2 font-bold text-text-primary">
            India TRAI and multilingual campaigns
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            Commercial communications in India fall under TRAI regulations including DND
            preferences and registered telemarketer requirements. Telugu and Hindi campaigns still
            require consent artifacts and calling discipline — language choice does not exempt teams
            from registry checks.
          </p>
        </section>

        <section aria-labelledby="opsbrain-heading">
          <h2 id="opsbrain-heading" className="text-h2 font-bold text-text-primary">
            How OpsBrain supports compliance-ready deployments
          </h2>
          <p className="mt-4 text-body leading-relaxed text-text-secondary">
            OpsBrain provides SOC 2 Type II infrastructure, encryption at rest and in transit,
            configurable calling windows, consent field mapping in CRM integrations, and immutable
            audit logs on enterprise plans. Your legal team should approve scripts, list sources,
            and jurisdictional scope before launch.
          </p>
        </section>

        <PageCTA
          title="Plan a compliant AI calling pilot"
          description="Work with our onboarding team to map consent fields, DNC lists, and escalation rules before your first production campaign."
          secondaryHref="/compare"
          secondaryLabel="Compare platforms"
        />

        <p className="text-small text-text-muted">
          This guide is informational only and not legal advice. Consult qualified counsel for
          your jurisdiction and use case. Last updated: June 1, 2026.
        </p>
      </MarketingPageShell>
    </>
  );
}
