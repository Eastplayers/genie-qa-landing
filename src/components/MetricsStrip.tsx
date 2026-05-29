/**
 * MetricsStrip — displays 3 bold social proof metrics below the Hero section.
 *
 * Metrics:
 * 1. 80%  — reduction in maintenance time
 * 2. 3×   — faster test creation
 * 3. 500+ — QA teams using Genie QA
 *
 * Wrapped in SectionWrapper so scroll depth analytics fire automatically.
 *
 * Requirements: 2.5, 3.8
 */
import { SectionWrapper } from './SectionWrapper';

/** A single metric item: large accent-colored value + supporting label. */
function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-5xl md:text-6xl font-bold text-accent">{value}</span>
      <p className="text-muted text-sm mt-1 text-center">{label}</p>
    </div>
  );
}

export function MetricsStrip() {
  return (
    <SectionWrapper id="metrics-strip" className="py-12 px-4">
      <div
        data-testid="metrics-strip"
        className="flex flex-wrap justify-center gap-8 md:gap-16"
      >
        <MetricItem value="80%" label="reduction in maintenance time" />
        <MetricItem value="3×" label="faster test creation" />
        <MetricItem value="500+" label="QA teams using Genie QA" />
      </div>
    </SectionWrapper>
  );
}
