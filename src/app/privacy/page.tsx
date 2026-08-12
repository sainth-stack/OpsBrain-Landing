import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/seo";
import { PageHeaderNav } from "@/components/pages/PageHeaderNav";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How OpsBrain AI collects, uses, and protects your personal data when you use our website and AI employee platform.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <Container className="max-w-3xl">
        <PageHeaderNav
          breadcrumbs={[
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]}
          backHref="/"
          backLabel="Back to home"
        />
        <h1 className="mt-8 text-h1 font-bold text-text-primary md:mt-10">Privacy Policy</h1>
        <p className="mt-2 text-small text-text-muted">Last updated: July 17, 2026</p>

        <div className="mt-8 space-y-8 text-body leading-relaxed text-text-secondary">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">1. Introduction</h2>
            <p className="mt-2">
              OpsBrain AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the OpsBrain AI platform and website at opsbrain.ai. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, including when you connect third-party integrations such as Google Gmail and Google Calendar.
            </p>
            <p className="mt-2">
              By using OpsBrain AI, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.
            </p>
          </section>

          {/* 2. Google API Services - Limited Use Disclosure */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">2. Google API Services - Limited Use Disclosure</h2>
            <p className="mt-2">
              OpsBrain AI&apos;s use and transfer to any other application of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <p className="mt-3 font-medium text-text-primary">What Google data we access and why:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-text-primary">Gmail (send only):</span> When you connect your Gmail account, we request permission solely to send emails on your behalf. This access is used exclusively to send outbound campaign emails and AI-assisted replies through your Gmail account. We do <strong>not</strong> request Gmail read/inbox access and we do not read your Gmail mailbox via Google APIs.
              </li>
              <li>
                <span className="font-medium text-text-primary">Google Calendar (events &amp; read):</span> When you connect Google Calendar, we request permission to create, update, delete, and read calendar events. This access is used exclusively to schedule meetings on your behalf when a lead confirms interest, to check your availability, and to manage or cancel meetings created through OpsBrain.
              </li>
              <li>
                <span className="font-medium text-text-primary">Google Account email address (userinfo.email, openid):</span> Used only to identify and display the Google account you have connected, and to associate it with your OpsBrain organisation.
              </li>
            </ul>
            <p className="mt-3 font-medium text-text-primary">What we do NOT do with Google API data:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>We do not use Google API data to train, fine-tune, or improve any artificial intelligence or machine learning models.</li>
              <li>We do not use Google API data to develop new features or improve our platform in ways unrelated to the specific service you enabled.</li>
              <li>We do not use Google API data for advertising, re-targeting, or profiling purposes.</li>
              <li>We do not sell or transfer Google API data to third parties for any purpose other than providing or improving the specific features you authorised.</li>
              <li>We do not allow humans to read your Gmail or Calendar content except (a) where you have given explicit consent, (b) for security or abuse investigation as permitted by the Google API Services User Data Policy, or (c) where required by applicable law.</li>
            </ul>
          </section>

          {/* 3. Information We Collect */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">3. Information We Collect</h2>
            <p className="mt-2">We may collect the following categories of information:</p>

            <p className="mt-3 font-medium text-text-primary">Account &amp; Contact Information</p>
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>Name, email address, phone number, and business name</li>
              <li>Account credentials and billing information for platform customers</li>
            </ul>

            <p className="mt-3 font-medium text-text-primary">Google Gmail Data (only when you connect Gmail)</p>
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>The email address of your connected Gmail account</li>
              <li>Metadata needed to send mail on your behalf (for example, message IDs returned by Gmail after a successful send)</li>
            </ul>

            <p className="mt-3 font-medium text-text-primary">Google Calendar Data (only when you connect Google Calendar)</p>
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>Calendar event details for meetings created through OpsBrain (title, time, attendees, Google Meet links)</li>
              <li>Calendar availability (freebusy status) used to avoid scheduling conflicts</li>
            </ul>

            <p className="mt-3 font-medium text-text-primary">Campaign &amp; Platform Usage Data</p>
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>AI employee call logs and conversation transcripts</li>
              <li>Campaign performance data (emails sent, delivery status)</li>
              <li>Email engagement data: whether recipients of emails sent through your Gmail account opened the email (tracked via a 1x1 tracking pixel) or clicked links (tracked via redirect URLs)</li>
              <li>Unsubscribe events from campaign emails</li>
            </ul>

            <p className="mt-3 font-medium text-text-primary">Technical Data</p>
            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>IP address, browser type, and device information</li>
              <li>Log data and error reports</li>
            </ul>
          </section>

          {/* 4. How We Use Your Information */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">4. How We Use Your Information</h2>
            <p className="mt-2">We use the information we collect solely to deliver the specific services you have requested. This includes:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Sending campaign emails and approved AI-assisted replies through your connected Gmail account to leads you have uploaded</li>
              <li>Creating, managing, and cancelling Google Calendar meetings on your behalf when your AI employee schedules an appointment</li>
              <li>Operating AI voice and messaging campaigns as configured by you</li>
              <li>Responding to your support inquiries and processing demo requests</li>
              <li>Billing, account management, and legal compliance</li>
              <li>Sending service-related communications about your account</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> use your information - including any data received from Google APIs - to develop or improve generalised AI or machine learning models, train language models, or enhance our platform in any way beyond the features you explicitly enabled.
            </p>
            <p className="mt-2">We do not sell your personal data to third parties.</p>
          </section>

          {/* 5. Email Tracking */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">5. Email Tracking</h2>
            <p className="mt-2">
              Campaign emails sent through OpsBrain via your connected Gmail account may include the following tracking mechanisms, which help you measure the effectiveness of your campaigns:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-text-primary">Open tracking:</span> A 1x1 invisible pixel image is embedded in each email. When a recipient opens the email, their email client loads the image, which signals an open event. The pixel URL contains a one-time token - it does not reveal the recipient&apos;s personal data to us beyond the fact that the email was opened.
              </li>
              <li>
                <span className="font-medium text-text-primary">Click tracking:</span> Links in campaign emails are wrapped in a redirect URL. When a recipient clicks a link, they are briefly routed through our servers before reaching the destination. This records the click event and the original URL.
              </li>
              <li>
                <span className="font-medium text-text-primary">Unsubscribe:</span> Every campaign email contains an unsubscribe link as required by CAN-SPAM and GDPR. Recipients can opt out of future emails at any time by clicking this link.
              </li>
            </ul>
            <p className="mt-2">
              Tracking data is stored solely for the benefit of the OpsBrain customer who sent the campaign and is not used for advertising or sold to any third party.
            </p>
          </section>

          {/* 6. Data Sharing & Subprocessors */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">6. Data Sharing &amp; Subprocessors</h2>
            <p className="mt-2">
              We do not sell, rent, or trade your personal data or Google API data. We may share data with the following categories of third-party service providers (&quot;subprocessors&quot;) solely to operate the platform:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-text-primary">Cloud infrastructure providers:</span> Hosting, database storage, and computing infrastructure used to run the platform.
              </li>
              <li>
                <span className="font-medium text-text-primary">AI / language model providers:</span> Content required to operate AI employees (for example, campaign context, lead details you provide, and calendar availability needed to draft or schedule meetings) may be sent to AI language model providers solely to generate the requested user-facing response. These providers are used under commercial/enterprise terms that do not permit use of that content to train their foundational or generalised AI/ML models.
              </li>
              <li>
                <span className="font-medium text-text-primary">Telephony &amp; communications providers:</span> For AI voice calls, call audio and transcripts may be processed by our telephony infrastructure partners.
              </li>
              <li>
                <span className="font-medium text-text-primary">Payment processors:</span> Billing information is processed by our payment provider and is not stored on our servers.
              </li>
            </ul>
            <p className="mt-2">
              All subprocessors are bound by data processing agreements requiring them to maintain confidentiality and process data only as instructed.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">7. Data Retention</h2>
            <p className="mt-2">We retain your data for as long as your account is active or as needed to provide services. Specific retention periods:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-text-primary">Google OAuth tokens (Gmail &amp; Calendar):</span> Retained until you disconnect the integration from your dashboard or revoke access via your Google account, after which tokens are permanently deleted within 24 hours.
              </li>
              <li>
                <span className="font-medium text-text-primary">Outbound Gmail send metadata:</span> Retained for the lifetime of your account (or until you disconnect Gmail). Deleted within 30 days of account closure.
              </li>
              <li>
                <span className="font-medium text-text-primary">Google Calendar event IDs &amp; meeting details:</span> Retained until the meeting is deleted or your account is closed.
              </li>
              <li>
                <span className="font-medium text-text-primary">Email tracking events (opens, clicks):</span> Retained for 12 months, then aggregated and anonymised.
              </li>
              <li>
                <span className="font-medium text-text-primary">Call logs &amp; conversation transcripts:</span> Retained for 24 months or until you request deletion.
              </li>
              <li>
                <span className="font-medium text-text-primary">Account &amp; billing data:</span> Retained for 7 years as required by financial regulations, then securely deleted.
              </li>
            </ul>
          </section>

          {/* 8. Data Security */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">8. Data Security</h2>
            <p className="mt-2">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>AES-256 encryption for data at rest</li>
              <li>TLS 1.3 for all data in transit</li>
              <li>SOC 2 Type II controls and role-based access</li>
              <li>Google OAuth tokens are stored encrypted and are never logged in plaintext</li>
              <li>PKCE (Proof Key for Code Exchange) is used for all Google OAuth flows to prevent authorisation code interception</li>
            </ul>
            <p className="mt-2">
              No method of transmission over the Internet is 100% secure. In the event of a data breach affecting your personal information, we will notify you as required by applicable law.
            </p>
          </section>

          {/* 9. Your Rights & Choices */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">9. Your Rights &amp; Choices</h2>
            <p className="mt-2">Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><span className="font-medium text-text-primary">Access:</span> Request a copy of the personal data we hold about you.</li>
              <li><span className="font-medium text-text-primary">Correction:</span> Request correction of inaccurate data.</li>
              <li><span className="font-medium text-text-primary">Deletion:</span> Request deletion of your personal data.</li>
              <li><span className="font-medium text-text-primary">Portability:</span> Request your data in a machine-readable format.</li>
              <li><span className="font-medium text-text-primary">Objection / Restriction:</span> Object to or restrict certain processing activities.</li>
            </ul>

            <p className="mt-4 font-medium text-text-primary">Disconnecting Google Integrations</p>
            <p className="mt-1">You can revoke OpsBrain&apos;s access to your Google account at any time through either of these methods:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-text-primary">Via OpsBrain dashboard:</span> Go to Dashboard → Connectors → select Gmail or Google Calendar → click Disconnect. All stored tokens will be deleted within 24 hours.
              </li>
              <li>
                <span className="font-medium text-text-primary">Via Google directly:</span> Visit{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary hover:underline"
                >
                  myaccount.google.com/permissions
                </a>
                , find OpsBrain AI, and click Remove Access.
              </li>
            </ul>

            <p className="mt-4 font-medium text-text-primary">California Residents (CCPA)</p>
            <p className="mt-1">
              California residents have the right to know what personal information we collect and how it is used, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information as defined under the California Consumer Privacy Act. To exercise your California privacy rights, contact us at{" "}
              <a href="mailto:privacy@opsbrain.ai" className="text-brand-primary hover:underline">
                privacy@opsbrain.ai
              </a>
              .
            </p>

            <p className="mt-4">To exercise any of your rights, contact us at{" "}
              <a href="mailto:privacy@opsbrain.ai" className="text-brand-primary hover:underline">
                privacy@opsbrain.ai
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* 10. Children's Privacy */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">10. Children&apos;s Privacy</h2>
            <p className="mt-2">
              OpsBrain AI is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately at{" "}
              <a href="mailto:privacy@opsbrain.ai" className="text-brand-primary hover:underline">
                privacy@opsbrain.ai
              </a>{" "}
              and we will delete it promptly.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">11. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of this page and, where the changes are material, notify you by email or via a notice within the platform. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-h3 font-semibold text-text-primary">12. Contact</h2>
            <p className="mt-2">
              Questions, concerns, or requests regarding this Privacy Policy or your personal data? Contact our Privacy team:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Email:{" "}
                <a href="mailto:privacy@opsbrain.ai" className="text-brand-primary hover:underline">
                  privacy@opsbrain.ai
                </a>
              </li>
              <li>Website: opsbrain.ai</li>
            </ul>
          </section>

        </div>
      </Container>
    </main>
  );
}
