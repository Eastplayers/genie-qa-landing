import { ReactNode } from 'react';
import { LegalLayout } from '../../components/LegalLayout';
import { CTAButton } from '../../components/CTAButton';

const registrationUrl = 'https://app.genieqa.app/login';

/**
 * Solution page: Onboarding Flow Testing — /solutions/onboarding-testing
 *
 * Positions Genie QA as the tool that ensures onboarding flows never break silently.
 */
export function OnboardingTestingPage() {
  return (
    <LegalLayout>
      {/* ── Hero ── */}
      <section className="text-center py-16 border-b border-border mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          Solution · Product Onboarding
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
          Your onboarding flow breaks silently.
          <br />
          <span className="text-accent">Genie QA catches it before users do.</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
          Onboarding is the highest-stakes UI in any SaaS product. A broken step 2 kills
          activation. Manual QA can't keep up with every deploy — Genie QA automates the
          entire regression suite so you ship with confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton variant="primary" section="solutions-onboarding-hero" href={registrationUrl}>
            Test your onboarding flow free
          </CTAButton>
          <CTAButton variant="secondary" section="solutions-onboarding-hero" href="/#how-it-works">
            See how it works
          </CTAButton>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { value: '< 2 min', label: 'to catch an onboarding regression' },
            { value: '0', label: 'manual re-tests per deploy' },
            { value: '100%', label: 'of onboarding steps covered' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-accent">{value}</p>
              <p className="text-muted text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Problem ── */}
      <Section title="The problem with onboarding QA today">
        <p className="text-foreground/80 leading-relaxed mb-6">
          Modern SaaS onboarding flows are complex — modals, tooltips, multi-step wizards,
          conditional branches, and deep-linked URLs. Every deploy is a risk. A single broken
          selector, a missing modal trigger, or a CTA that navigates to the wrong URL can
          silently kill your activation rate for days before anyone notices.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {[
            {
              icon: '🔇',
              title: 'Silent failures',
              body: 'Broken onboarding steps don\'t throw errors — they just stop working. Users drop off and you never know why.',
            },
            {
              icon: '🐢',
              title: 'Manual QA doesn\'t scale',
              body: 'Re-testing a 6-step onboarding flow manually after every deploy takes 20+ minutes. Teams skip it.',
            },
            {
              icon: '📉',
              title: 'Activation rate drops',
              body: 'A broken step 2 can cut your activation rate in half before your analytics even surface the trend.',
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
              title: 'Record your onboarding flow once',
              body: 'Install the Genie QA Chrome extension and walk through your onboarding flow exactly as a new user would. Every click, fill, navigation, and modal interaction is captured automatically — no code required.',
              detail: 'Captures: modal triggers, tooltip anchors, CTA clicks, URL navigations, form submissions, conditional branches',
            },
            {
              step: '02',
              title: 'AI generates test cases for every step',
              body: 'Genie QA\'s AI analyzes your recorded flow and generates a complete Playwright test suite. Each step gets assertions: modal is visible, tooltip is anchored to the correct element, CTA navigates to the right URL, form submits successfully.',
              detail: 'Generated assertions: element visibility, URL correctness, text content, aria attributes, form state',
            },
            {
              step: '03',
              title: 'Run the full regression suite on every deploy',
              body: 'Connect Genie QA to your CI/CD pipeline. On every pull request and deploy, the full onboarding regression suite runs automatically in headless Playwright. You get a pass/fail report before the deploy goes live.',
              detail: 'Integrates with: GitHub Actions, GitLab CI, Jenkins — runs in < 2 minutes',
            },
            {
              step: '04',
              title: 'Get alerted the moment a step breaks',
              body: 'When a test fails, Genie QA shows you exactly which step broke, what the expected behavior was, and what the actual DOM state was. Fix it before users ever see it.',
              detail: 'Report includes: failing step, expected vs actual, screenshot, selector that failed',
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
      <Section title="What Genie QA tests in your onboarding flow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Modal appears at the correct step',
            'Tooltip anchors to the right UI element',
            'CTA buttons navigate to the correct URL',
            'Multi-step wizard advances correctly',
            'Form fields accept and submit valid input',
            'Conditional branches trigger correctly',
            'Progress indicators update at each step',
            'Skip / dismiss actions work as expected',
            'Deep-linked onboarding URLs load correctly',
            'Onboarding completes and marks user as activated',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✓</span>
              {item}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Use cases ── */}
      <Section title="Built for every onboarding pattern">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: '🧭',
              title: 'Product tours',
              body: 'Test every step of a guided product tour — tooltip position, next/back navigation, completion state.',
            },
            {
              icon: '📋',
              title: 'Setup wizards',
              body: 'Verify multi-step setup flows: account creation, workspace setup, first project creation, invite flow.',
            },
            {
              icon: '🎯',
              title: 'Feature discovery',
              body: 'Ensure feature highlight modals appear for new users, link to the right docs, and dismiss correctly.',
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
          Stop letting onboarding regressions kill your activation rate
        </h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          Record your onboarding flow once. Genie QA tests it on every deploy — automatically.
        </p>
        <CTAButton variant="primary" section="solutions-onboarding-cta" href={registrationUrl}>
          Start testing for free
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
