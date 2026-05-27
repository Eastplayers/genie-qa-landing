import { SectionWrapper } from '../SectionWrapper';

const inputSteps = [
  'Open Login page',
  'Enter email',
  'Enter password',
  'Click Login',
];

const aiGeneratedCases = [
  'Valid login',
  'Empty email',
  'Empty password',
  'Invalid credentials',
  'Session expired',
  'Multiple concurrent login attempts',
  'SQL injection attempt',
  'Slow network response',
  'Missing required field validation',
];

/**
 * AI Wow Moment — demonstrates how one recorded flow becomes
 * comprehensive test coverage via AI generation.
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export function DemoSection() {
  return (
    <SectionWrapper id="demo" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Watch AI Turn One Flow Into Complete Test Coverage
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Record once. Let AI think beyond the happy path.
          </p>
        </div>

        {/* Two-column comparison */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input column */}
          <div className="rounded bg-card border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Input</span>
              <span className="text-muted text-xs">— Recorded workflow</span>
            </div>
            <ol className="space-y-3">
              {inputSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-border text-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-muted text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* AI Output column */}
          <div className="rounded bg-card border border-accent/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">AI Generated Output</span>
            </div>
            <ul className="space-y-2">
              {aiGeneratedCases.map((testCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0" aria-hidden="true">✓</span>
                  <span className="text-foreground text-sm">{testCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrow between columns on mobile */}
        <div className="flex justify-center md:hidden -mt-3 mb-3">
          <span className="text-accent text-2xl" aria-hidden="true">→</span>
        </div>
      </div>
    </SectionWrapper>
  );
}
