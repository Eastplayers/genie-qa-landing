import { SectionWrapper } from '../SectionWrapper';

const features = [
  {
    icon: '⚡',
    title: 'Record Workflows in Seconds',
    description: 'Capture user actions directly from the browser and convert them into simple, readable test steps.',
  },
  {
    icon: '🤖',
    title: 'Generate Missing Test Cases Automatically',
    description: 'AI transforms recorded happy paths and requirements into negative scenarios and edge cases.',
  },
  {
    icon: '🧠',
    title: 'Expand Test Coverage Intelligently',
    description: 'If required steps are missing, Genie QA can create additional actions automatically to complete realistic scenarios.',
  },
  {
    icon: '☁️',
    title: 'Run Automated Tests in the Cloud',
    description: 'Create test suites and schedule runs without keeping your laptop running.',
  },
  {
    icon: '🔍',
    title: 'Understand Failures Faster',
    description: 'Track execution history and let AI summarize failures with suggested solutions.',
  },
  {
    icon: '👥',
    title: 'Work Together as a Team',
    description: 'Collaborate with QCs, BAs, PMs, and POs in one shared workspace.',
  },
];

/**
 * Displays benefit-focused feature cards in a responsive grid layout.
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 12.6, 12.7
 */
export function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Built for Teams Who Ship Fast
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Everything you need to automate QA without slowing down development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded bg-card border border-border flex flex-col"
            >
              <span className="text-3xl mb-4" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="text-foreground font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
