import { SectionWrapper } from '../SectionWrapper';

interface Integration {
  name: string;
  icon: React.ReactNode;
  status: 'available' | 'coming-soon';
}

const integrations: Integration[] = [
  { name: 'Playwright', icon: <PlaywrightIcon />, status: 'available' },
  { name: 'Jira', icon: <JiraIcon />, status: 'coming-soon' },
  { name: 'GitHub Actions', icon: <GitHubIcon />, status: 'coming-soon' },
  { name: 'GitLab CI', icon: <GitLabIcon />, status: 'coming-soon' },
  { name: 'Jenkins', icon: <JenkinsIcon />, status: 'coming-soon' },
  { name: 'Slack', icon: <SlackIcon />, status: 'coming-soon' },
];

/**
 * Displays supported integrations with recognizable SVG icons and availability badges.
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */
export function IntegrationsSection() {
  return (
    <SectionWrapper id="integrations" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Fits Into Your Existing Workflow
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Connect with the tools your team already uses.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex flex-col items-center justify-center p-6 rounded bg-card border border-border relative group transition-all duration-200 hover:border-accent/40"
            >
              <div className="w-10 h-10 mb-3 text-muted group-hover:text-foreground transition-colors duration-200 flex items-center justify-center">
                {integration.icon}
              </div>
              <span className="text-foreground font-medium text-sm text-center mb-2">
                {integration.name}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  integration.status === 'available'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-border/50 text-muted border border-border'
                }`}
              >
                {integration.status === 'available' ? 'Available' : 'Coming Soon'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* SVG Icons — monochrome, using currentColor for theme compatibility */

function PlaywrightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
    </svg>
  );
}

function JiraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M11.53 2c0 4.97 4.03 9 9 9h1.47v1.47c0 4.97-4.03 9-9 9H2v-1.47c0-4.97 4.03-9 9-9h1.47V2h-.94zm.94 9.53H11c-4.14 0-7.53 3.2-7.97 7.27h.5c0-3.87 3.13-7 7-7h1.94v-0.27z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function GitLabIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M12 21.35l3.33-10.26h-6.66L12 21.35zm0 0L5.34 11.09h3.33L12 21.35zm0 0l3.33-10.26h3.33L12 21.35zM5.34 11.09L4 7.09l4.67 4H5.34zm13.32 0h-3.33L20 7.09l-1.34 4z" />
    </svg>
  );
}

function JenkinsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
      <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
    </svg>
  );
}
