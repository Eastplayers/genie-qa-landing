import { SectionWrapper } from '../SectionWrapper';

const trustSignals = [
  {
    title: 'Built on Playwright',
    subtitle: 'Not a wrapper',
    description:
      'Genie QA generates native Playwright scripts — not abstracted wrappers. Your tests use the same API thousands of engineering teams rely on.',
    isAI: false,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <path
          d="M7 8l-4 4 4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 8l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 4l-4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Human-Reviewable Outputs',
    subtitle: 'No black box',
    description:
      'Every generated test is readable TypeScript. Review, edit, and understand exactly what each step does before running it.',
    isAI: false,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'DOM-Aware Generation',
    subtitle: 'Understands real UI',
    description:
      'The AI analyzes live DOM structure, form fields, and element relationships — not just screenshots or text descriptions.',
    isAI: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M10 6.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Auto-Healing Selectors',
    subtitle: 'Maintains itself',
    description:
      'When your UI changes, selectors adapt automatically. No more broken tests after every deploy.',
    isAI: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Production-Ready Export',
    subtitle: 'Real Playwright scripts',
    description:
      'Export tests directly into your CI/CD pipeline. No conversion step, no manual cleanup — just working automation.',
    isAI: false,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <path
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 4v12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 12l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Version-Controlled Workflows',
    subtitle: 'Engineering-grade',
    description:
      'Workflows are stored as structured data you can version, branch, and diff — just like your application code.',
    isAI: false,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="6" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M12 11c0 4-6 4-6 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 11c0 4 6 4 6 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

/**
 * Technical Credibility section — addresses QA audience skepticism toward AI
 * marketing by presenting 6 concrete trust signals that demonstrate engineering
 * rigor and transparency.
 *
 * Requirements: 2.11
 */
export function TechnicalCredibilitySection() {
  return (
    <SectionWrapper id="technical-credibility" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
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
                d="M12 2L4 6v6c0 5.25 3.4 10.2 8 11.6 4.6-1.4 8-6.35 8-11.6V6l-8-4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Engineering-Grade AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Teams Trust Genie QA
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            No hype, no black boxes. Every output is transparent, reviewable, and built on
            the same tools your engineering team already trusts.
          </p>
        </div>

        {/* Trust signal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className={`surface-elevated p-6 flex flex-col gap-3${signal.isAI ? ' surface-ai' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center">
                  {signal.icon}
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-base">
                    {signal.title}
                  </h3>
                  <span className="text-muted text-xs">{signal.subtitle}</span>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
