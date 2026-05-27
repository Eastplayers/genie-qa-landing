import { SectionWrapper } from '../SectionWrapper';

const steps = [
  { number: 1, title: 'Record user workflows', description: 'Capture actions from your browser without writing automation scripts.', icon: '🎬' },
  { number: 2, title: 'AI understands your process', description: 'Genie QA analyzes workflows and additional requirements.', icon: '🤖' },
  { number: 3, title: 'Generate complete test scenarios', description: 'AI creates negative cases, edge cases, and missing steps automatically.', icon: '📋' },
  { number: 4, title: 'Organize and execute', description: 'Group test cases into suites and schedule automated execution.', icon: '▶️' },
  { number: 5, title: 'Review insights', description: 'Monitor results and receive AI-assisted failure analysis.', icon: '📊' },
];

/**
 * Displays the product workflow as a numbered sequence of steps.
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */
export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          How It Works
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-16 text-lg">
          From recording to results in five simple steps.
        </p>

        {/* Horizontal timeline (≥768px) */}
        <div className="hidden md:flex items-start justify-between relative">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center text-center relative flex-1">
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5 bg-border" aria-hidden="true" />
              )}
              <div className="relative z-10 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-lg font-bold mb-4 shrink-0">
                {step.number}
              </div>
              <span className="text-2xl mb-2" aria-hidden="true">{step.icon}</span>
              <h3 className="text-foreground font-semibold text-base mb-2 px-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed px-2 max-w-[200px]">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Vertical stack (<768px) */}
        <div className="md:hidden space-y-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-base font-bold shrink-0">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-border mt-2" aria-hidden="true" />
                )}
              </div>
              <div className="pt-1 pb-8">
                <span className="text-xl mb-1 inline-block" aria-hidden="true">{step.icon}</span>
                <h3 className="text-foreground font-semibold text-base mb-1">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
