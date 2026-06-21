import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name} platform and website.`,
};

export default function TermsPage() {
  return (
    <main className="flex-1 py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-small font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-h1 font-bold text-text-primary">Terms of Service</h1>
        <p className="mt-2 text-small text-text-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="mt-8 space-y-6 text-body leading-relaxed text-text-secondary">
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              1. Agreement
            </h2>
            <p className="mt-2">
              By accessing or using OpsBrain AI services, you agree to these Terms of Service. If you do not agree, do not use our platform or website.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              2. Services
            </h2>
            <p className="mt-2">
              OpsBrain AI provides autonomous AI employee software for lead calling, customer support, and revenue operations. Service availability, features, and pricing are described in your order form or subscription agreement.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              3. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to use OpsBrain AI to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Violate applicable laws including TCPA, GDPR, and telemarketing regulations</li>
              <li>Place unsolicited calls without proper consent</li>
              <li>Transmit harmful, fraudulent, or deceptive content</li>
              <li>Reverse engineer or attempt to extract model weights or proprietary systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              4. Payment & Billing
            </h2>
            <p className="mt-2">
              Paid plans are billed according to your subscription terms. Fees are non-refundable except as required by law or specified in your agreement. We may change pricing with 30 days notice.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              5. Limitation of Liability
            </h2>
            <p className="mt-2">
              To the maximum extent permitted by law, OpsBrain AI shall not be liable for indirect, incidental, or consequential damages. Our total liability is limited to fees paid in the twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              6. Contact
            </h2>
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
