import { CTAButton } from '../CTAButton';
import { SectionWrapper } from '../SectionWrapper';
import { HeroDashboardMockup } from './HeroDashboardMockup';

const registrationUrl = 'https://app.genieqa.app/login';

/**
 * Hero section — the first content visitors see above the fold.
 *
 * Visual hierarchy (top → bottom):
 * 1. Benefit-focused headline (≤80 chars)
 * 2. Supporting text (≤200 chars)
 * 3. Primary CTA ("Start Free") + Secondary CTA ("Book Demo") side by side
 * 4. Risk reducers (no credit card, free forever, setup time)
 * 5. Trust indicators (minimum 3)
 * 6. Visual element (product dashboard mockup)
 *
 * Requirements: 1.1, 1.2, 1.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8
 */
export function HeroSection({ onBookDemo }: { onBookDemo?: () => void }) {
  return (
    <SectionWrapper id="hero" className="flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content column */}
          <div className="flex flex-col gap-6">
            {/* 1. Headline (≤80 chars) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Automation Testing Without Writing Complex Code
            </h1>

            {/* 2. Supporting text (≤200 chars) */}
            <p className="text-lg sm:text-xl text-muted max-w-xl">
              Genie QA helps Manual QCs, Business Analysts, Product Owners, and teams create, manage, and automate testing workflows using AI. Record user actions, generate edge cases automatically, and run tests at scale — without deep technical knowledge.
            </p>

            {/* 3. CTAs side by side */}
            <div className="flex flex-wrap gap-4">
              <CTAButton variant="primary" section="hero" href={registrationUrl}>
                Start Free
              </CTAButton>
              <CTAButton variant="secondary" section="hero" onClick={onBookDemo}>
                Book Demo
              </CTAButton>
            </div>

            {/* 4. Risk reducers */}
            <p className="text-sm text-muted">
              No credit card required · Free forever · Setup in 2 minutes
            </p>

            {/* 5. Trust indicators (minimum 3) */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <TrustBadge icon="✓" text="No complex coding required" />
              <TrustBadge icon="✓" text="AI-generated edge cases" />
              <TrustBadge icon="✓" text="Playwright-powered execution" />
              <TrustBadge icon="✓" text="Collaboration ready" />
            </div>
          </div>

          {/* 6. Visual element (product dashboard mockup) */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <HeroDashboardMockup />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Inline trust indicator badge used within the Hero section. */
function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <span aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </span>
  );
}
