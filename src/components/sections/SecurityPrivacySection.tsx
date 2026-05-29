import { SectionWrapper } from '../SectionWrapper';
import { CTAButton } from '../CTAButton';

/* ─── Key Principles ─── */

const principles = [
  {
    title: 'Local-First Architecture',
    description:
      'We only process data you intentionally share. Test execution happens entirely on your machine — DOM snapshots, recordings, and artifacts never leave your environment.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <path d="M12 2L4 6v6c0 5.25 3.4 10.2 8 11.6 4.6-1.4 8-6.35 8-11.6V6l-8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'You Own Your Data',
    description:
      'You retain full ownership of your data at all times. Genie QA acts solely as a processor and handles data only under your instructions. We never sell your data or use it to train AI models.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Privacy by Design',
    description:
      'Genie QA processes data in accordance with GDPR principles. We support explicit, revocable consent management and ensure all privacy decisions are respected at every level.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

/* ─── Infrastructure & Compliance ─── */

const compliance = [
  {
    title: 'AWS Infrastructure',
    description:
      'Backend services are hosted on AWS, providing enterprise-grade security controls, redundancy, and compliance standards designed to operate securely at global scale.',
    badge: 'AWS',
  },
  {
    title: 'Built on Playwright',
    description:
      'Test execution uses the open-source Playwright framework — fully auditable, no proprietary black boxes. Your generated scripts are standard TypeScript you can inspect and version.',
    badge: 'OSS',
  },
  {
    title: 'Stripe Payments',
    description:
      'All payment processing is handled exclusively by Stripe. Sensitive payment details never touch our servers. PCI DSS compliance is maintained by Stripe.',
    badge: 'PCI',
  },
];

/* ─── Technical Capabilities ─── */

const capabilities = [
  {
    label: 'TLS',
    title: 'Encryption in Transit',
    description:
      'All data is encrypted in transit using industry-standard TLS 1.3 protocols to prevent unauthorized interception.',
  },
  {
    label: 'AES-256',
    title: 'Encryption at Rest',
    description:
      'Stored data is protected with AES-256 encryption, ensuring it remains unreadable without authorized access.',
  },
  {
    label: 'SSO',
    title: 'Google SSO',
    description:
      'Sign in via Google Workspace, allowing teams to manage access centrally and reduce risks from weak or shared passwords.',
  },
  {
    label: 'RBAC',
    title: 'Role-Based Access Controls',
    description:
      'Granular permissions let you control who can view, edit, or execute test workflows within your organization.',
  },
  {
    label: 'SDLC',
    title: 'Secure Development',
    description:
      'Security is integrated into our development process with code reviews, dependency scanning, and automated testing for every release.',
  },
  {
    label: 'MON',
    title: 'Continuous Monitoring',
    description:
      'Production environments are monitored 24/7. Security vulnerabilities are continuously assessed, prioritized, and remediated based on risk.',
  },
];

/**
 * Comprehensive Data Privacy & Security section — inspired by Founder OS /security.
 * Full-page-style section with hero header, key principles, compliance badges,
 * and technical security capabilities grid.
 *
 * Builds enterprise trust through transparency, concrete technical details,
 * and clear data ownership commitments.
 *
 * Requirements: 2.10
 */
export function SecurityPrivacySection() {
  const registrationUrl = 'https://app.genieqa.app/login';

  return (
    <SectionWrapper id="security-privacy" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ─── Hero Header ─── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-green-500">
              <path d="M12 2L4 6v6c0 5.25 3.4 10.2 8 11.6 4.6-1.4 8-6.35 8-11.6V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>SECURITY</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Your Data,<br />
            <span className="text-accent">Protected by Design</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Genie QA puts security at its core. We safeguard your information through
            local-first architecture, clear data ownership, and enterprise-grade encryption.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton variant="primary" section="security" href={registrationUrl}>
              Start Free — No Card Required
            </CTAButton>
          </div>
        </div>

        {/* ─── Key Principles ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Built with Security in Mind
            </h3>
            <p className="text-muted max-w-xl mx-auto">
              Your test data stays under your control. We process only what you intentionally share.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="surface-elevated p-6 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  {principle.icon}
                </div>
                <h4 className="text-foreground font-semibold text-lg">
                  {principle.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Infrastructure & Compliance ─── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-4">
              <span>SECURITY</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Global Infrastructure & Compliance
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compliance.map((item, index) => (
              <div key={index} className="surface-elevated p-6 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center">
                  <span className="text-accent font-bold text-sm">{item.badge}</span>
                </div>
                <h4 className="text-foreground font-semibold text-lg">
                  {item.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Technical Security Capabilities ─── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-4">
              <span>CAPABILITIES</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Data Security Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <div key={index} className="surface-elevated border-luminance p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 text-accent text-xs font-bold font-mono">
                    {cap.label}
                  </span>
                  <h4 className="text-foreground font-semibold text-base">
                    {cap.title}
                  </h4>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Trust Statement ─── */}
        <div className="text-center surface-elevated p-8 md:p-12 rounded-lg">
          <p className="text-muted text-lg max-w-2xl mx-auto mb-6">
            Our platform is designed with a strong emphasis on privacy and security,
            adhering to industry standards to guarantee optimal data protection and foster
            user trust.
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Scale with Total Peace of Mind
          </h3>
          <p className="text-muted mb-6">
            Our secure foundation lets you focus on quality. Built for speed, scaled for security.
          </p>
          <CTAButton variant="primary" section="security-bottom" href={registrationUrl}>
            Start Automating for Free
          </CTAButton>
          <p className="text-sm text-muted mt-3">
            No credit card required · Free forever · Cancel anytime
          </p>
        </div>

      </div>
    </SectionWrapper>
  );
}
