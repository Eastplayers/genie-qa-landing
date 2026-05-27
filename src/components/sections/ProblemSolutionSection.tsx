import { SectionWrapper } from '../SectionWrapper';

interface PainSolutionPair {
  pain: string;
  solution: string;
}

const pairs: PainSolutionPair[] = [
  {
    pain: 'Writing test cases manually',
    solution: 'Record workflows once',
  },
  {
    pain: 'Missing edge cases during testing',
    solution: 'AI expands test coverage automatically',
  },
  {
    pain: 'Repeating regression tasks every release',
    solution: 'Schedule automated execution',
  },
  {
    pain: 'Depending on automation engineers',
    solution: 'Run tests without keeping your machine online',
  },
  {
    pain: 'Difficult collaboration across QA and Product teams',
    solution: 'Collaborate in one centralized workspace',
  },
];

/**
 * Contrasts current QA pain points with Genie QA improvements.
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */
export function ProblemSolutionSection() {
  return (
    <SectionWrapper id="problem-solution" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          QA Doesn't Have to Be Painful
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          See how Genie QA transforms your testing workflow.
        </p>

        {/* Column headers — visible on desktop only */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-6 max-w-4xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-semibold border border-red-500/20">
              Before Genie QA
            </span>
          </div>
          <div className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold border border-green-500/20">
              After Genie QA
            </span>
          </div>
        </div>

        {/* Pain/Solution pairs */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {pairs.map((pair, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch"
            >
              {/* Pain point */}
              <div className="flex items-center gap-3 p-4 rounded bg-card border border-red-500/20">
                <span className="text-red-400 text-lg flex-shrink-0" aria-hidden="true">
                  ❌
                </span>
                <span className="text-muted text-sm">{pair.pain}</span>
              </div>

              {/* Arrow connector — visible on mobile */}
              <div className="flex justify-center md:hidden -my-2">
                <span className="text-accent text-xl" aria-hidden="true">↓</span>
              </div>

              {/* Solution */}
              <div className="flex items-center gap-3 p-4 rounded bg-card border border-green-500/20">
                <span className="text-green-400 text-lg flex-shrink-0" aria-hidden="true">
                  ✅
                </span>
                <span className="text-foreground text-sm font-medium">{pair.solution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
