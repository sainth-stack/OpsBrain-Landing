import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name} - how we collect, use, and protect your data.`,
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <Container className="prose prose-slate max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-small font-medium text-brand-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="text-h1 font-bold text-text-primary">Privacy Policy</h1>
        <p className="mt-2 text-small text-text-muted">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="mt-8 space-y-6 text-body leading-relaxed text-text-secondary">
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              1. Introduction
            </h2>
            <p className="mt-2">
              OpsBrain AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the OpsBrain AI platform and website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              2. Information We Collect
            </h2>
            <p className="mt-2">We may collect:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Contact information (name, email, phone, business name)</li>
              <li>Account and billing information for platform customers</li>
              <li>Usage data, call logs, and conversation metadata processed by AI employees</li>
              <li>Technical data (IP address, browser type, device information)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              3. How We Use Your Information
            </h2>
            <p className="mt-2">
              We use collected information to provide and improve our AI employee platform, respond to inquiries, process demo requests, comply with legal obligations, and communicate about our services. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              4. Data Security
            </h2>
            <p className="mt-2">
              We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, SOC 2 Type II controls, and role-based access. No method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              5. Your Rights
            </h2>
            <p className="mt-2">
              Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. Contact us at privacy@opsbrain.ai to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-semibold text-text-primary">
              6. Contact
            </h2>
            <p className="mt-2">
              Questions about this Privacy Policy? Email{" "}
              <a href="mailto:privacy@opsbrain.ai" className="text-brand-primary hover:underline">
                privacy@opsbrain.ai
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
