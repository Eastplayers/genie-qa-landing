import { ReactNode } from 'react';
import { LegalLayout } from '../../components/LegalLayout';
import { CTAButton } from '../../components/CTAButton';

const registrationUrl = 'https://app.genieqa.app/login';

/**
 * Solution page: Analytics & Tracking Testing — /solutions/analytics-testing
 *
 * Positions Genie QA as the tool that verifies analytics events fire correctly on every deploy.
 */
export function AnalyticsTestingPage() {
  return (
    <LegalLayout>
      {/* ── Hero ── */}
      <section className="text-center py-16 border-b border-border mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          Solution · Product Analytics
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
          Your analytics are only as good as
          <br />
          <span className="text-accent">the events behind them.</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
          Broken event tracking is invisible. Your funnel data looks fine until you realize
          the "Add to Cart" event stopped firing 3 deploys ago. Genie QA verifies every
          analytics event fires correctly — on every deploy, automatically.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton variant="primary" section="solutions-analytics-hero" href={registrationUrl}>
            Protect your analytics data
          </CTAButton>
          <CTAButton variant="secondary" section="solutions-analytics-hero" href="/#how-it-works">
            See how it works
          </CTAButton>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { value: '100%', label: 'of conversion events verified per deploy' },
            { value: '0', label: 'silent tracking failures reach production' },
            { value: '< 2 min', label: 'to run the full tracking test suite' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-accent">{value}</p>
              <p className="text-muted text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ── */}
      <Section title="The problem with analytics tracking today">
        <p className="text-foreground/80 leading-relaxed mb-6">
          Analytics tracking is fragile. A refactor renames a component, a selector changes,
          a function gets moved — and suddenly your most important conversion event stops
          firing. No error is thrown. No test fails. Your dashboards keep showing data, just
          the wrong data. By the time your data team notices, weeks of decisions have been
          made on corrupted metrics.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              icon: '👻',
              title: 'Silent breakage',
              body: 'Tracking failures produce no errors. Events just stop appearing in your analytics tool — silently.',
            },
            {
              icon: '📊',
              title: 'Corrupted dashboards',
              body: 'Decisions made on broken data are worse than no data. Funnel drop-offs, conversion rates, and cohort analysis all become unreliable.',
            },
            {
              icon: '🔍',
              title: 'Hard to debug',
              body: 'Tracking bugs are discovered weeks later during audits. Tracing which deploy broke which event is painful and time-consuming.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-lg bg-card border border-border p-5">
              <span className="text-2xl mb-3 block" aria-hidden="true">{icon}</span>
              <h3 className="text-foreground font-semibold mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How Genie QA solves it ── */}
      <Section title="How Genie QA solves it">
        <div className="space-y-8">
          {[
            {
              step: '01',
              title: 'Record the user flows that trigger analytics events',
              body: 'Use the Genie QA Chrome extension to record the exact user journeys that should fire your key analytics events — signup, feature activation, upgrade click, checkout, CTA interaction. No code required.',
              detail: 'Captures: clicks, form submissions, page navigations, modal interactions, CTA events',
            },
            {
              step: '02',
              title: 'AI generates assertions for every tracking call',
              body: 'Genie QA\'s AI analyzes your recorded flows and generates Playwright test assertions that verify each analytics event fires with the correct payload — event type, label, section, and any custom properties.',
              detail: 'Asserts: trackEvent() called, correct type/label/section, correct metadata, no duplicate fires',
            },
            {
              step: '03',
              title: 'Run tracking tests on every deploy',
              body: 'Connect to your CI/CD pipeline. On every pull request, the full tracking test suite runs headlessly. If any event stops firing or fires with the wrong payload, the build fails before it reaches production.',
              detail: 'Integrates with: GitHub Actions, GitLab CI, Jenkins — zero configuration after initial setup',
            },
            {
              step: '04',
              title: 'Get a precise failure report',
              body: 'When a tracking assertion fails, Genie QA tells you exactly which event broke, which deploy introduced the regression, and what the expected vs actual payload was. Fix it in minutes, not days.',
              detail: 'Report includes: event name, expected payload, actual payload, failing selector, deploy diff',
            },
          ].map(({ step, title, body, detail }) => (
            <div key={step} className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">{step}</span>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg mb-2">{title}</h3>
                <p className="text-foreground/80 leading-relaxed mb-2">{body}</p>
                <p className="text-muted text-xs">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── What gets tested ── */}
      <Section title="What Genie QA verifies in your analytics tracking">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'CTA click events fire with correct label and section',
            'Signup / registration conversion events fire on form submit',
            'Feature activation events fire on first use',
            'Upgrade / pricing CTA events fire with plan metadata',
            'Scroll depth events fire at correct thresholds',
            'Demo interaction events fire on playground use',
            'Page view events fire on route change',
            'Error events fire when expected failures occur',
            'No duplicate event fires on re-render',
            'Event payloads match the expected schema exactly',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✓</span>
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Real questions answered ── */}
      <Section title="Answer real product questions with confidence">
        <div className="space-y-4">
          {[
            {
              question: '"Did the checkout event fire on the last deploy?"',
              answer: 'Yes — Genie QA ran the checkout flow test and the trackEvent() assertion passed with the correct payload.',
            },
            {
              question: '"Why did our conversion rate drop this week?"',
              answer: 'Genie QA flagged a tracking regression on Tuesday\'s deploy — the "Start Free" CTA event stopped firing after a NavBar refactor.',
            },
            {
              question: '"Are all our funnel events firing correctly?"',
              answer: 'Run the full tracking suite: 12/12 assertions pass. Every funnel step from signup to activation is verified.',
            },
          ].map(({ question, answer }) => (
            <div key={question} className="rounded-lg bg-card border border-border p-5">
              <p className="text-foreground font-medium mb-2 italic">{question}</p>
              <p className="text-muted text-sm leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Use cases ── */}
      <Section title="Built for every analytics stack">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: '📈',
              title: 'Conversion tracking',
              body: 'Verify every conversion event — signup, upgrade, checkout, CTA click — fires correctly on every deploy.',
            },
            {
              icon: '🔁',
              title: 'Funnel integrity',
              body: 'Ensure every step in your acquisition and activation funnel fires the right event so your funnel data stays accurate.',
            },
            {
              icon: '🎯',
              title: 'Feature adoption',
              body: 'Confirm feature interaction events fire when users engage with new features, so adoption metrics are trustworthy.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="rounded-lg bg-card border border-border p-5">
              <span className="text-2xl mb-3 block" aria-hidden="true">{icon}</span>
              <h3 className="text-foreground font-semibold mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="text-center py-16 border-t border-border mt-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Stop making decisions on broken data
        </h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          Genie QA verifies every analytics event on every deploy. Your dashboards stay
          accurate. Your decisions stay grounded.
        </p>
        <CTAButton variant="primary" section="solutions-analytics-cta" href={registrationUrl}>
          Start protecting your analytics
        </CTAButton>
        <p className="text-muted text-sm mt-3">No credit card required · Free forever plan</p>
      </section>
    </LegalLayout>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
        {title}
      </h2>
      {children}
    </section>
  );
}
