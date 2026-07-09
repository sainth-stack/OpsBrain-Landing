import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/seo";
import { PageHeaderNav } from "@/components/pages/PageHeaderNav";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for the OpsBrain AI platform and website, including acceptable use, billing, and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="flex-1 py-16">
      <Container className="max-w-3xl">
        <PageHeaderNav
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Terms of Service", path: "/terms" },
          ]}
          backHref="/"
          backLabel="Back to home"
        />
        <h1 className="mt-8 text-h1 font-bold text-text-primary md:mt-10">Terms of Service</h1>
        <p className="mt-2 text-small text-text-muted">Last updated: July 9, 2026</p>

        <div className="mt-8 space-y-8 text-body leading-relaxed text-text-secondary">

          {/* 1. Agreement */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">1. Agreement</h2>
            <p className="mt-2">
              By accessing or using OpsBrain AI services, you agree to these Terms of Service and our{" "}
              <a href="/privacy" className="text-brand-primary hover:underline">
                Privacy Policy
              </a>
              . If you do not agree, do not use our platform or website.
            </p>
          </section>

          {/* 2. Services */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">2. Services</h2>
            <p className="mt-2">
              OpsBrain AI provides autonomous AI employee software for lead calling, customer support, email campaigns, calendar scheduling, and revenue operations. Service availability, features, and pricing are described in your order form or subscription agreement.
            </p>
          </section>

          {/* 3. Google Integrations */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">3. Google Integrations</h2>
            <p className="mt-2">
              OpsBrain AI offers optional integrations with Google services including Gmail and Google Calendar. By connecting your Google account, you:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                Authorise OpsBrain AI to access the specific Google APIs described in our{" "}
                <a href="/privacy" className="text-brand-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                (Section 2 — Google API Services Limited Use Disclosure) solely for the purposes stated therein.
              </li>
              <li>
                Acknowledge that our use of Google API data adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </li>
              <li>
                Confirm that you are the authorised owner or administrator of the Google account being connected and have the right to grant this access.
              </li>
              <li>
                Accept responsibility for ensuring that all emails sent through your connected Gmail account and all calls placed by your AI employees comply with applicable laws, including CAN-SPAM, TCPA, GDPR, and all applicable telemarketing and anti-spam regulations in your jurisdiction.
              </li>
              <li>
                Understand that you may disconnect your Google account at any time via Dashboard → Connectors or directly via{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  myaccount.google.com/permissions
                </a>
                .
              </li>
            </ul>
          </section>

          {/* 4. Acceptable Use */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">4. Acceptable Use</h2>
            <p className="mt-2">You agree not to use OpsBrain AI to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Violate applicable laws including TCPA, CAN-SPAM, GDPR, and telemarketing regulations</li>
              <li>Place unsolicited calls or send unsolicited emails without proper consent from recipients</li>
              <li>Transmit harmful, fraudulent, or deceptive content</li>
              <li>Use Google API data for purposes beyond those disclosed in our Privacy Policy, including training AI models or improving any general-purpose product</li>
              <li>Reverse engineer or attempt to extract model weights, proprietary systems, or Google API tokens</li>
              <li>Circumvent Google&apos;s Terms of Service or API usage policies</li>
            </ul>
          </section>

          {/* 5. Payment & Billing */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">5. Payment &amp; Billing</h2>
            <p className="mt-2">
              Paid plans are billed according to your subscription terms. Fees are non-refundable except as required by law or specified in your agreement. We may change pricing with 30 days&apos; notice.
            </p>
          </section>

          {/* 6. Limitation of Liability */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">6. Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, OpsBrain AI shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to fees paid in the twelve months preceding the claim. We are not liable for any violations of applicable telemarketing, spam, or data protection laws resulting from your use of the platform.
            </p>
          </section>

          {/* 7. Changes to Terms */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">7. Changes to Terms</h2>
            <p className="mt-2">
              We may update these Terms from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page. Continued use of the platform after changes are posted constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">8. Contact</h2>
            <p className="mt-2">
              Questions about these Terms? Email{" "}
              <a href="mailto:legal@opsbrain.ai" className="text-brand-primary hover:underline">
                legal@opsbrain.ai
              </a>
              .
            </p>
          </section>

        </div>
      </Container>
    </main>
  );
}
