import { ReactNode } from 'react';
import { LegalLayout } from '../components/LegalLayout';

/**
 * Terms of Service page — /terms-of-service
 *
 * Covers acceptance, account responsibilities, acceptable use, subscription
 * and billing, intellectual property, disclaimers, limitation of liability,
 * termination, and governing law for Genie QA.
 */
export function TermsOfServicePage() {
  const effectiveDate = 'May 29, 2026';

  return (
    <LegalLayout>
      <article className="prose-legal">
        {/* Page heading */}
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted text-sm mb-10">Effective date: {effectiveDate}</p>

        <Section>
          <p className="text-foreground/80 leading-relaxed">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
            Genie QA website at{' '}
            <a href="https://genieqa.app" className="text-accent hover:underline">
              genieqa.app
            </a>{' '}
            and the Genie QA application at{' '}
            <a href="https://app.genieqa.app" className="text-accent hover:underline">
              app.genieqa.app
            </a>{' '}
            (collectively, the &ldquo;Service&rdquo;), operated by Genie QA
            (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing or using the
            Service, you agree to be bound by these Terms. If you do not agree, do not use the
            Service.
          </p>
        </Section>

        <Section title="1. Eligibility and Account Registration">
          <p className="text-foreground/80 leading-relaxed mb-3">
            You must be at least 16 years old to use the Service. By creating an account, you
            represent that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>You are at least 16 years of age.</li>
            <li>
              You have the legal capacity to enter into a binding agreement in your jurisdiction.
            </li>
            <li>
              If you are registering on behalf of an organization, you have the authority to bind
              that organization to these Terms.
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activity that occurs under your account. Notify us immediately through
            the contact methods provided on our website if you suspect unauthorized access.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p className="text-foreground/80 leading-relaxed">
            Genie QA is a QA automation platform that allows users to record browser workflows,
            generate AI-powered test cases, execute automated tests via Playwright, and review
            results. The Service includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80 mt-3">
            <li>A Chrome extension for recording user interactions.</li>
            <li>A web dashboard for managing workflows, test cases, and results.</li>
            <li>An Electron desktop application for running Playwright test suites.</li>
            <li>AI-powered test case generation using large language models.</li>
            <li>Reporting and export functionality.</li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            We reserve the right to modify, suspend, or discontinue any part of the Service at
            any time with reasonable notice.
          </p>
        </Section>

        <Section title="3. Acceptable Use">
          <p className="text-foreground/80 leading-relaxed mb-3">
            You agree to use the Service only for lawful purposes and in accordance with these
            Terms. You must not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>
              Use the Service to test or attack systems you do not own or have explicit written
              permission to test.
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Service, its infrastructure,
              or other users&rsquo; accounts.
            </li>
            <li>
              Use the Service to generate, distribute, or store malicious code, malware, or
              exploits.
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any part of the Service except as
              permitted by applicable law.
            </li>
            <li>
              Resell, sublicense, or otherwise commercialize access to the Service without our
              prior written consent.
            </li>
            <li>
              Violate any applicable local, national, or international law or regulation.
            </li>
            <li>
              Transmit unsolicited communications, spam, or engage in any form of automated
              scraping of the Service.
            </li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mt-4">
            We reserve the right to suspend or terminate accounts that violate these restrictions
            without prior notice.
          </p>
        </Section>

        <Section title="4. Subscription Plans and Billing">
          <Subsection title="4.1 Plans">
            <p className="text-foreground/80 leading-relaxed">
              Genie QA offers free and paid subscription plans. Paid plans are billed on a monthly
              or annual basis as selected at checkout. Plan features and pricing are described on
              our{' '}
              <a href="/#pricing" className="text-accent hover:underline">
                Pricing page
              </a>
              .
            </p>
          </Subsection>

          <Subsection title="4.2 Payment">
            <p className="text-foreground/80 leading-relaxed">
              Payments are processed by Stripe. By providing payment information, you authorize us
              to charge your payment method for the applicable subscription fees. All fees are
              exclusive of taxes unless stated otherwise. You are responsible for any applicable
              taxes.
            </p>
          </Subsection>

          <Subsection title="4.3 Renewals and cancellation">
            <p className="text-foreground/80 leading-relaxed">
              Subscriptions renew automatically at the end of each billing period unless you cancel
              before the renewal date. You can cancel your subscription at any time from your
              account settings. Cancellation takes effect at the end of the current billing period
              — you retain access until then. We do not provide refunds for partial billing periods
              except where required by law.
            </p>
          </Subsection>

          <Subsection title="4.4 Price changes">
            <p className="text-foreground/80 leading-relaxed">
              We may change subscription prices with at least 30 days&rsquo; notice. Price changes
              take effect at your next renewal. Continued use of the Service after a price change
              constitutes acceptance of the new price.
            </p>
          </Subsection>
        </Section>

        <Section title="5. Intellectual Property">
          <Subsection title="5.1 Our IP">
            <p className="text-foreground/80 leading-relaxed">
              The Service, including its software, design, trademarks, and content, is owned by
              Genie QA and protected by intellectual property laws. These Terms do not grant you
              any ownership rights in the Service.
            </p>
          </Subsection>

          <Subsection title="5.2 Your content">
            <p className="text-foreground/80 leading-relaxed">
              You retain ownership of the test workflows, test cases, and other content you create
              using the Service (&ldquo;Your Content&rdquo;). By using the Service, you grant us a
              limited, non-exclusive license to store, process, and display Your Content solely to
              provide the Service to you.
            </p>
          </Subsection>

          <Subsection title="5.3 Feedback">
            <p className="text-foreground/80 leading-relaxed">
              If you provide feedback, suggestions, or ideas about the Service, you grant us a
              perpetual, irrevocable, royalty-free license to use that feedback for any purpose
              without compensation to you.
            </p>
          </Subsection>
        </Section>

        <Section title="6. Privacy">
          <p className="text-foreground/80 leading-relaxed">
            Your use of the Service is also governed by our{' '}
            <a href="/privacy-policy" className="text-accent hover:underline">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference. By using the Service, you
            consent to the data practices described in the Privacy Policy.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p className="text-foreground/80 leading-relaxed">
            The Service integrates with third-party services (e.g., Stripe for payments, AWS for
            infrastructure, AI providers for test generation). Your use of those services is
            subject to their respective terms and privacy policies. We are not responsible for the
            practices of third-party services.
          </p>
        </Section>

        <Section title="8. Disclaimers">
          <p className="text-foreground/80 leading-relaxed">
            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
            WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT
            WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
            COMPONENTS.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-3">
            AI-generated test cases are provided as suggestions only. You are responsible for
            reviewing, validating, and approving any generated content before use in production
            environments.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p className="text-foreground/80 leading-relaxed">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GENIE QA SHALL NOT BE LIABLE FOR
            ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
            OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE
            SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-3">
            OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED
            THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM OR
            (B) €100.
          </p>
        </Section>

        <Section title="10. Indemnification">
          <p className="text-foreground/80 leading-relaxed">
            You agree to indemnify, defend, and hold harmless Genie QA and its officers,
            directors, employees, and agents from any claims, damages, losses, and expenses
            (including reasonable legal fees) arising from: (a) your use of the Service in
            violation of these Terms; (b) Your Content; or (c) your violation of any applicable
            law or third-party rights.
          </p>
        </Section>

        <Section title="11. Termination">
          <p className="text-foreground/80 leading-relaxed">
            Either party may terminate these Terms at any time. You may terminate by deleting your
            account. We may terminate or suspend your access immediately if you violate these
            Terms, without liability to you.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-3">
            Upon termination, your right to use the Service ceases immediately. Sections 5
            (Intellectual Property), 8 (Disclaimers), 9 (Limitation of Liability), 10
            (Indemnification), and 12 (Governing Law) survive termination.
          </p>
        </Section>

        <Section title="12. Governing Law and Disputes">
          <p className="text-foreground/80 leading-relaxed">
            These Terms are governed by the laws of the European Union and the member state in
            which Genie QA is registered, without regard to conflict of law principles. Any
            disputes arising under these Terms shall be resolved through good-faith negotiation
            first. If unresolved, disputes shall be submitted to the competent courts of the
            jurisdiction in which Genie QA is registered.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-3">
            If you are a consumer in the EU, you may also use the European Commission&rsquo;s
            Online Dispute Resolution platform at{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p className="text-foreground/80 leading-relaxed">
            We may update these Terms from time to time. We will notify you of material changes
            by email or by posting a notice on the site at least 14 days before the change takes
            effect. Continued use of the Service after the effective date constitutes acceptance
            of the updated Terms.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p className="text-foreground/80 leading-relaxed">
            For questions about these Terms of Service, please refer to the official terms or
            contact Genie QA through the methods provided on their website.
          </p>
        </Section>
      </article>
    </LegalLayout>
  );
}

// ---------------------------------------------------------------------------
// Local helpers
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
