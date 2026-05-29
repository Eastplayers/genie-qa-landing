import { SectionWrapper } from '../SectionWrapper';

interface Persona {
  icon: string;
  role: string;
  pain: string;
  benefit: string;
}

const personas: Persona[] = [
  {
    icon: '🧪',
    role: 'Manual QC / Tester',
    pain: 'Tired of writing the same regression tests every sprint',
    benefit: 'Record once, let AI generate complete coverage automatically',
  },
  {
    icon: '📋',
    role: 'Business Analyst',
    pain: 'Requirements get lost between documentation and testing',
    benefit: 'Turn requirements into verified test scenarios without coding',
  },
  {
    icon: '🎯',
    role: 'Product Manager / Owner',
    pain: 'No visibility into what\'s actually being tested',
    benefit: 'See test coverage across features in one dashboard',
  },
];

/**
 * Persona section helping visitors self-identify by role.
 * Displays role-specific pain points and how Genie QA addresses them.
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
export function PersonaSection() {
  return (
    <SectionWrapper id="personas" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Built for Your Role
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          See how Genie QA fits your workflow — no matter your title.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div
              key={persona.role}
              className="p-6 rounded bg-card border border-border flex flex-col"
            >
              <span className="text-4xl mb-4" aria-hidden="true">
                {persona.icon}
              </span>
              <h3 className="text-foreground font-semibold text-lg mb-3">
                {persona.role}
              </h3>
              <p className="text-red-400/80 text-sm mb-3 flex items-start gap-2">
                <span aria-hidden="true" className="flex-shrink-0">😩</span>
                <span>{persona.pain}</span>
              </p>
              <p className="text-green-400/80 text-sm flex items-start gap-2">
                <span aria-hidden="true" className="flex-shrink-0">✨</span>
                <span>{persona.benefit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
