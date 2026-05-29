import { SectionWrapper } from '../SectionWrapper';
import { CTAButton } from '../CTAButton';

const beforeSteps = [
  { label: 'Identify test scenarios from requirements', time: '45 min' },
  { label: 'Write step-by-step test cases manually', time: '60 min' },
  { label: 'Map selectors and locate elements', time: '30 min' },
  { label: 'Script automation in Playwright/Selenium', time: '45 min' },
  { label: 'Debug flaky selectors and timing issues', time: '20 min' },
  { label: 'Review and validate test coverage', time: '20 min' },
];

const afterSteps = [
  { label: 'Record your manual test flow in the browser', time: '30 sec' },
  { label: 'AI analyzes DOM and generates test cases', time: '45 sec' },
  { label: 'Review human-readable Playwright scripts', time: '30 sec' },
  { label: 'Export production-ready automation', time: '15 sec' },
];

/**
 * Transformation section — before/after comparison showing the concrete
 * time savings of switching from manual regression setup (3 hours) to
 * Genie QA's automated process (2 minutes). Uses a side-by-side layout
 * with visual timeline to make the transformation visceral.
 *
 * Requirements: 2.6
 */
export function TransformationSection() {
  return (
    <SectionWrapper id="transformation" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-accent"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>The Transformation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            From 3 Hours to 2 Minutes
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            See how teams replace their manual regression setup process with
            AI-powered test generation — same coverage, a fraction of the time.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before — Pain state */}
          <div className="surface-elevated shadow-layered p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-red-400"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M12 8v4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg">Before</h3>
                <span className="text-muted text-sm">Manual regression setup</span>
              </div>
              <span className="ml-auto text-red-400 font-mono font-bold text-xl">~3 hrs</span>
            </div>

            {/* Timeline steps */}
            <ol className="space-y-4" aria-label="Manual process steps">
              {beforeSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full border border-red-400/30 bg-red-500/5 flex items-center justify-center">
                      <span className="text-xs text-red-400 font-mono">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm">{step.label}</p>
                  </div>
                  <span className="flex-shrink-0 text-muted text-xs font-mono">{step.time}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* After — Transformed state */}
          <div className="surface-elevated surface-ai shadow-layered p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-green-400"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg">After</h3>
                <span className="text-muted text-sm">Genie QA automated process</span>
              </div>
              <span className="ml-auto text-green-400 font-mono font-bold text-xl">~2 min</span>
            </div>

            {/* Timeline steps */}
            <ol className="space-y-4" aria-label="Genie QA automated process steps">
              {afterSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full border border-green-400/30 bg-green-500/5 flex items-center justify-center">
                      <span className="text-xs text-green-400 font-mono">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm">{step.label}</p>
                  </div>
                  <span className="flex-shrink-0 text-muted text-xs font-mono">{step.time}</span>
                </li>
              ))}
            </ol>

            {/* Savings callout */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-muted text-sm">Time saved per regression cycle</span>
                <span className="text-accent font-bold text-lg">2 hrs 58 min</span>
              </div>
              <p className="text-muted text-xs mt-2">
                That&apos;s 15+ hours saved per week for a team running daily regressions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA — outcome-focused, routes to registration */}
        <div className="text-center mt-12">
          <CTAButton variant="primary" section="transformation" href="https://app.genieqa.app/login">
            See the Transformation
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
