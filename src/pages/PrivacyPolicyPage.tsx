import { ReactNode } from 'react';
import { LegalLayout } from '../components/LegalLayout';

/**
 * Privacy Policy page — /privacy-policy
 *
 * Covers data collection, usage, storage, third-party services,
 * cookies, user rights, and contact information for Genie QA.
 */
export function PrivacyPolicyPage() {
  const effectiveDate = 'May 29, 2026';

  return (
    <LegalLayout>
      <article className="prose-legal">
        {/* Page heading */}
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-10">Effective date: {effectiveDate}</p>

        <Section>
          <p className="text-foreground/80 leading-relaxed">
            Genie QA (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to
            protecting your personal information. This Privacy Policy explains what data we collect,
            how we use it, and the choices you have. By using our website at{' '}
            <a href="https://genieqa.app" className="text-accent hover:underline">
              genieqa.app
            </a>{' '}
            or our application at{' '}
            <a href="https://app.genieqa.app" className="text-accent hover:underline">
              app.genieqa.app
            </a>
            , you agree to the practices described here.
          </p>
        </Section>

        <Section title="1. Information We Collect">
          <Subsection title="1.1 Information you provide directly">
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                <strong>Account information</strong> — name, email address, and password when you
                register for a Genie QA account.
              </li>
              <li>
                <strong>Payment information</strong> — billing name, address, and payment card
                details processed securely by our payment provider (Stripe). We do not store raw
                card numbers.
              </li>
              <li>
                <strong>Communications</strong> — messages you send us via email or support
                channels.
              </li>
            </ul>
          </Subsection>

          <Subsection title="1.2 Information collected automatically">
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>
                <strong>Usage data</strong> — pages visited, features used, clicks, scroll depth,
                and session duration collected via our analytics system.
              </li>
              <li>
                <strong>Device and browser data</strong> — IP address, browser type and version,
                operating system, screen resolution, and referring URL.
              </li>
              <li>
                <strong>Log data</strong> — server logs including timestamps, request paths, and
                error codes retained for up to 90 days.
              </li>
              <li>
                <strong>Cookies and local storage</strong> — see Section 5 for details.
              </li>
            </ul>
          </Subsection>

          <Subsection title="1.3 Test workflow data">
            <p className="text-foreground/80 leading-relaxed">
              When you use the Genie QA application to record and run test workflows, we process
              the URLs, DOM selectors, and interaction steps you capture. This data is stored in
              your account and used solely to provide the service. We do not use your workflow data
              to train AI models without your explicit consent.
            </p>
          </Subsection>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>
              <strong>Provide and improve the service</strong> — process your test runs, generate
              AI test cases, store results, and improve product features.
            </li>
            <li>
              <strong>Account management</strong> — authenticate you, manage your subscription, and
              send transactional emails (receipts, password resets, plan changes).
            </li>
            <li>
              <strong>Customer support</strong> — respond to your questions and troubleshoot issues.
            </li>
            <li>
              <strong>Analytics and product development</strong> — understand how the product is
              used in aggregate to prioritize improvements. We use anonymized or aggregated data
              where possible.
            </li>
            <li>
              <strong>Security and fraud prevention</strong> — detect and prevent unauthorized
              access, abuse, and violations of our Terms of Service.
            </li>
            <li>
              <strong>Legal compliance</strong> — meet our obligations under applicable law.
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            We do not sell your personal data to third parties. We do not use your data for
            targeted advertising.
          </p>
        </Section>

        <Section title="3. Legal Basis for Processing (GDPR)">
          <p className="text-foreground/80 leading-relaxed">
            If you are located in the European Economic Area (EEA), we process your personal data
            under the following legal bases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-3">
            <li>
              <strong>Contract performance</strong> — processing necessary to provide the service
              you signed up for.
            </li>
            <li>
              <strong>Legitimate interests</strong> — analytics, security monitoring, and product
              improvement, balanced against your privacy rights.
            </li>
            <li>
              <strong>Legal obligation</strong> — compliance with applicable laws and regulations.
            </li>
            <li>
              <strong>Consent</strong> — where we ask for your explicit consent (e.g., marketing
              emails). You may withdraw consent at any time.
            </li>
          </ul>
        </Section>

        <Section title="4. Data Sharing and Third Parties">
          <p className="text-foreground/80 leading-relaxed mb-3">
            We share your data only with trusted service providers who help us operate the
            platform, under strict data processing agreements:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>
              <strong>Stripe</strong> — payment processing. Stripe&rsquo;s privacy policy applies
              to payment data.
            </li>
            <li>
              <strong>Amazon Web Services (AWS)</strong> — cloud infrastructure and data storage
              in the EU (eu-west-1) region by default.
            </li>
            <li>
              <strong>Anthropic / OpenAI</strong> — AI model inference for test generation. Prompts
              sent to these providers do not include your personal account information.
            </li>
            <li>
              <strong>PostHog</strong> — product analytics. Data is anonymized before transmission.
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            We may also disclose your data if required by law, court order, or to protect the
            rights and safety of Genie QA, our users, or the public.
          </p>
        </Section>

        <Section title="5. Cookies and Tracking">
          <p className="text-foreground/80 leading-relaxed mb-3">
            We use the following types of cookies and similar technologies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>
              <strong>Strictly necessary cookies</strong> — session authentication and CSRF
              protection. These cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies</strong> — anonymous usage tracking to understand how
              visitors interact with the site. You can opt out via your browser settings or a
              Do Not Track signal.
            </li>
            <li>
              <strong>Preference cookies</strong> — remember your settings (e.g., theme, language).
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            You can control cookies through your browser settings. Disabling analytics cookies
            will not affect your ability to use the service.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p className="text-foreground/80 leading-relaxed">
            We retain your account data for as long as your account is active. If you delete your
            account, we will delete or anonymize your personal data within 30 days, except where
            we are required to retain it for legal or financial compliance purposes (typically up
            to 7 years for billing records).
          </p>
          <p className="text-foreground/80 leading-relaxed mt-3">
            Test workflow data and generated test cases are retained for the duration of your
            subscription and deleted within 30 days of account closure.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p className="text-foreground/80 leading-relaxed mb-3">
            Depending on your location, you may have the following rights regarding your personal
            data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>
              <strong>Access</strong> — request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong>Correction</strong> — request correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong>Deletion</strong> — request deletion of your personal data (&ldquo;right to
              be forgotten&rdquo;).
            </li>
            <li>
              <strong>Portability</strong> — receive your data in a structured, machine-readable
              format.
            </li>
            <li>
              <strong>Objection</strong> — object to processing based on legitimate interests.
            </li>
            <li>
              <strong>Restriction</strong> — request that we restrict processing of your data in
              certain circumstances.
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            To exercise any of these rights, please contact Genie QA through the methods
            provided on their website. We will respond within 30 days.
          </p>
        </Section>

        <Section title="8. Data Security">
          <p className="text-foreground/80 leading-relaxed">
            We implement industry-standard security measures including TLS encryption in transit,
            AES-256 encryption at rest, role-based access controls, and regular security audits.
            No method of transmission over the internet is 100% secure — if you believe your
            account has been compromised, contact us immediately through the methods provided
            on our website.
          </p>
        </Section>

        <Section title="9. International Transfers">
          <p className="text-foreground/80 leading-relaxed">
            Genie QA is operated from the European Union. If you access the service from outside
            the EU, your data may be transferred to and processed in countries with different data
            protection laws. We use Standard Contractual Clauses (SCCs) approved by the European
            Commission to safeguard such transfers.
          </p>
        </Section>

        <Section title="10. Children's Privacy">
          <p className="text-foreground/80 leading-relaxed">
            Genie QA is not directed at children under 16. We do not knowingly collect personal
            data from children. If you believe a child has provided us with personal data, please
            contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p className="text-foreground/80 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material
            changes by email or by posting a notice on the site at least 14 days before the change
            takes effect. The &ldquo;Effective date&rdquo; at the top of this page reflects the
            most recent revision.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p className="text-foreground/80 leading-relaxed">
            For questions about this Privacy Policy, please refer to the official policy or
            contact Genie QA through the methods provided on their website.
          </p>
        </Section>
      </article>
    </LegalLayout>
  );
}

// ---------------------------------------------------------------------------
// Local helpers — keep the JSX above readable
// ---------------------------------------------------------------------------

function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      {title && (
        <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      {children}
    </div>
  );
}
