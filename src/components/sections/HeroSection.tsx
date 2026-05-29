import { CTAButton } from '../CTAButton';
import { SectionWrapper } from '../SectionWrapper';
import { SocialProofStrip } from '../SocialProofStrip';
import { HeroAnimatedDemo } from './HeroAnimatedDemo';

const registrationUrl = 'https://app.genieqa.app/login';

/**
 * Hero section — the first content visitors see above the fold.
 *
 * Visual hierarchy (top → bottom):
 * 1. Audience-specific headline with outcome-focused language
 * 2. Supporting text targeting non-technical QA teams
 * 3. Primary CTA ("Generate Your First Test") + Secondary CTA ("See How It Works")
 * 4. "Built with Playwright" trust badge
 * 5. Social proof strip (avatar stack, user count, outcome metrics, trust line)
 * 6. Animated AI demonstration (HeroAnimatedDemo)
 *
 * Requirements: 2.1, 2.2, 2.4, 2.10, 3.1, 3.2, 3.7
 */
export function HeroSection() {
  return (
    <SectionWrapper id="hero" className="flex items-center py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content column */}
          <div className="flex flex-col gap-6">
            {/* 1. Headline — audience-specific, outcome-focused */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Turn Manual Test Flows Into Automation — Without Writing Code
            </h1>

            {/* 2. Supporting text — targets non-technical QA teams */}
            <p className="text-lg sm:text-xl text-muted max-w-xl">
              Genie QA's browser-context-aware AI watches how your team tests manually, then generates production-ready Playwright scripts automatically. No coding skills needed — just record, review, and run.
            </p>

            {/* 3. CTAs side by side */}
            <div className="flex flex-wrap gap-4">
              <CTAButton variant="primary" section="hero" href={registrationUrl}>
                Generate Your First Test
              </CTAButton>
              <CTAButton variant="secondary" section="hero" href="#how-it-works">
                See How It Works
              </CTAButton>
            </div>

            {/* 4. Built with Playwright trust badge */}
            <div className="flex items-center gap-2 pt-2">
              <PlaywrightBadge />
            </div>

            {/* 5. Social proof strip — avatar stack, user count, outcome metrics, trust line */}
            <SocialProofStrip />
          </div>

          {/* 5. Animated AI demonstration */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <HeroAnimatedDemo />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** "Built with Playwright" trust badge displayed below CTAs. */
function PlaywrightBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="text-green-500"
      >
        <path
          d="M8 1L2 4v4c0 3.5 2.5 6.4 6 7 3.5-.6 6-3.5 6-7V4L8 1z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8L7 9.5 10.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Built with Playwright</span>
    </span>
  );
}
