import { SectionWrapper } from '../SectionWrapper';

interface ComparisonRow {
  dimension: string;
  manual: string;
  genericAi: string;
  traditional: string;
  genieQa: string;
}

const comparisonData: ComparisonRow[] = [
  {
    dimension: 'Test creation workflow',
    manual: 'Write test cases by hand',
    genericAi: 'Generic prompts, manual iteration',
    traditional: 'Code from scratch',
    genieQa: 'QA-native workflow from recorded flows',
  },
  {
    dimension: 'Browser & UI context',
    manual: 'Full context (human observes)',
    genericAi: 'No context — text-only generation',
    traditional: 'Full context (coded selectors)',
    genieQa: 'Real browser context with DOM awareness',
  },
  {
    dimension: 'Output quality',
    manual: 'N/A (manual execution)',
    genericAi: 'Requires manual script cleanup',
    traditional: 'Production-ready (if maintained)',
    genieQa: 'Production-ready Playwright scripts',
  },
  {
    dimension: 'Selector maintenance',
    manual: 'N/A',
    genericAi: 'No maintenance strategy',
    traditional: 'Manual updates when UI changes',
    genieQa: 'AI selector healing — adapts automatically',
  },
  {
    dimension: 'Test generation approach',
    manual: 'Human creativity',
    genericAi: 'Text-only generation, no DOM access',
    traditional: 'Manual coding per scenario',
    genieQa: 'DOM-aware generation from live UI',
  },
  {
    dimension: 'Edge case coverage',
    manual: 'Limited by time and experience',
    genericAi: 'Suggests cases but cannot verify them',
    traditional: 'Manual effort per case',
    genieQa: 'AI-generated from field analysis',
  },
  {
    dimension: 'Setup time',
    manual: 'None',
    genericAi: 'Minutes (but output needs rework)',
    traditional: 'Days to weeks',
    genieQa: 'Minutes — ready to run',
  },
];

/**
 * Competitive differentiation section comparing Genie QA to alternative approaches.
 * Three-column comparison: Manual Testing vs Generic AI (ChatGPT/Copilot) vs Traditional Automation vs Genie QA.
 * Implicitly addresses "why not just use ChatGPT?" through factual capability differences.
 *
 * Requirements: 2.9, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */
export function ComparisonSection() {
  return (
    <SectionWrapper id="comparison" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          How Genie QA Compares
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          AI-generated code is only useful if it actually runs against your UI.
          See how purpose-built QA tooling differs from general-purpose AI.
        </p>

        {/* Desktop table (≥768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Comparison of testing approaches">
            <caption className="sr-only">
              Feature comparison between manual testing, generic AI tools like ChatGPT and Copilot, traditional automation frameworks, and Genie QA
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="text-left text-muted font-medium py-4 px-4 text-sm">
                  Dimension
                </th>
                <th scope="col" className="text-center text-muted font-medium py-4 px-4 text-sm">
                  Manual Testing
                </th>
                <th scope="col" className="text-center text-muted font-medium py-4 px-4 text-sm">
                  Generic AI (ChatGPT/Copilot)
                </th>
                <th scope="col" className="text-center text-muted font-medium py-4 px-4 text-sm">
                  Traditional Frameworks
                </th>
                <th scope="col" className="text-center font-semibold py-4 px-4 text-sm text-accent">
                  Genie QA
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.dimension} className="border-b border-border">
                  <th scope="row" className="text-left text-foreground font-medium py-4 px-4 text-sm">
                    {row.dimension}
                  </th>
                  <td className="text-center text-muted py-4 px-4 text-sm">
                    {row.manual}
                  </td>
                  <td className="text-center text-muted py-4 px-4 text-sm">
                    {row.genericAi}
                  </td>
                  <td className="text-center text-muted py-4 px-4 text-sm">
                    {row.traditional}
                  </td>
                  <td className="text-center text-foreground font-medium py-4 px-4 text-sm bg-accent/5 border-x border-accent/20">
                    {row.genieQa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards (<768px) */}
        <div className="md:hidden space-y-4">
          {comparisonData.map((row) => (
            <div key={row.dimension} className="rounded bg-card border border-border p-4">
              <h3 className="text-foreground font-semibold text-sm mb-3">{row.dimension}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted text-xs">Manual Testing</span>
                  <span className="text-muted text-xs">{row.manual}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted text-xs">Generic AI (ChatGPT/Copilot)</span>
                  <span className="text-muted text-xs">{row.genericAi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted text-xs">Traditional Frameworks</span>
                  <span className="text-muted text-xs">{row.traditional}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-border">
                  <span className="text-accent text-xs font-medium">Genie QA</span>
                  <span className="text-foreground text-xs font-medium">{row.genieQa}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
