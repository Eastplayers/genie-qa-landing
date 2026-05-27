import { SectionWrapper } from '../SectionWrapper';

const trustBadges = [
  'No complex coding required',
  'AI-generated edge cases',
  'Playwright-powered execution',
  'Collaboration ready',
];

/**
 * Displays social proof badges/stats to build visitor trust.
 * Requirements: 3.5
 */
export function TrustIndicators() {
  return (
    <SectionWrapper id="trust-indicators" className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded bg-card border border-border px-4 py-2 text-sm text-muted"
            >
              <span className="text-green-400" aria-hidden="true">✓</span>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
