import { SectionWrapper } from '../SectionWrapper';

interface ComparisonRow {
  dimension: string;
  manual: string;
  traditional: string;
  genieQa: string;
}

const comparisonData: ComparisonRow[] = [
  {
    dimension: 'Coding required',
    manual: 'None',
    traditional: 'Yes, extensive',
    genieQa: 'No coding needed',
  },
  {
    dimension: 'Edge case generation',
    manual: 'Manual effort',
    traditional: 'Manual effort',
    genieQa: 'AI-powered, automatic',
  },
  {
    dimension: 'Setup time',
    manual: 'None',
    traditional: 'Days to weeks',
    genieQa: 'Minutes',
  },
  {
    dimension: 'Test maintenance',
    manual: 'High (manual updates)',
    traditional: 'High (brittle selectors)',
    genieQa: 'Low (AI adapts)',
  },
  {
    dimension: 'Team collaboration',
    manual: 'Spreadsheets / docs',
    traditional: 'Code repositories',
    genieQa: 'Shared workspace',
  },
];

/**
 * Competitive differentiation section comparing Genie QA to alternative approaches.
 * Uses category descriptions rather than naming specific competitor products.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */
export function ComparisonSection() {
  return (
    <SectionWrapper id="comparison" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Why Teams Choose Genie QA
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Compare approaches and see where Genie QA stands out.
        </p>

        {/* Desktop table (≥768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Comparison of testing approaches">
            <caption className="sr-only">
              Feature comparison between manual testing, traditional automation, and Genie QA
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="text-left text-muted font-medium py-4 px-4 text-sm">
                  Feature
                </th>
                <th scope="col" className="text-center text-muted font-medium py-4 px-4 text-sm">
                  Manual Testing
                </th>
                <th scope="col" className="text-center text-muted font-medium py-4 px-4 text-sm">
                  Traditional Automation
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
                  <span className="text-muted text-xs">Traditional Automation</span>
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
