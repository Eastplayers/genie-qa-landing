import { SectionWrapper } from '../SectionWrapper';
import { CTAButton } from '../CTAButton';

const nextSteps = [
  { number: 1, label: 'Sign up' },
  { number: 2, label: 'Install extension' },
  { number: 3, label: 'Record workflow' },
  { number: 4, label: 'See AI tests' },
];

/**
 * Closing call-to-action section with specific outcome, risk reducers,
 * and "what happens next" step indicator.
 *
 * Requirements: 11.1, 11.2, 11.3, 11.4, 8.1, 8.2, 8.3, 8.4, 8.5
 */
export function FinalCTASection() {
  const registrationUrl = 'https://app.genieqa.app/login';

  return (
    <SectionWrapper
      id="final-cta"
      className="py-24 bg-gradient-to-br from-card via-background to-card"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your First AI-Generated Test Suite in 2 Minutes
        </h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          Join 50+ teams who automated their QA without writing complex code.
        </p>
        <CTAButton variant="primary" section="final-cta" href={registrationUrl}>
          Start Automating for Free
        </CTAButton>

        {/* Risk reducer */}
        <p className="text-sm text-muted mt-3">
          No credit card required · Free forever · Cancel anytime
        </p>

        {/* What happens next — desktop horizontal */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
          {nextSteps.map((step, index) => (
            <span key={step.number} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted/70">
                <span className="w-5 h-5 rounded-full bg-border/50 text-muted flex items-center justify-center text-[10px] font-medium">
                  {step.number}
                </span>
                {step.label}
              </span>
              {index < nextSteps.length - 1 && (
                <span className="text-border text-xs" aria-hidden="true">→</span>
              )}
            </span>
          ))}
        </div>

        {/* What happens next — mobile vertical */}
        <div className="md:hidden mt-8 flex flex-col items-center gap-1.5">
          {nextSteps.map((step) => (
            <span key={step.number} className="flex items-center gap-2 text-xs text-muted/70">
              <span className="w-5 h-5 rounded-full bg-border/50 text-muted flex items-center justify-center text-[10px] font-medium">
                {step.number}
              </span>
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
