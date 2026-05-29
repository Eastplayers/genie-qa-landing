import { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { trackEvent } from '../../utils/analytics';

// ---------------------------------------------------------------------------
// Tab data
// ---------------------------------------------------------------------------

interface TabContent {
  id: string;
  label: string;
  heading: string;
  description: string;
  benefits: string[];
}

const TABS: TabContent[] = [
  {
    id: 'recording',
    label: 'Recording',
    heading: 'Capture Workflows in Seconds',
    description:
      'Record real user interactions directly from the browser and convert them into clean, readable test steps — no code required.',
    benefits: [
      'One-click browser recording via Chrome extension',
      'Auto-generates selectors using stable aria/data-testid attributes',
      'Captures inputs, clicks, navigation, and form submissions',
      'Editable step list before saving',
    ],
  },
  {
    id: 'ai-generation',
    label: 'AI Generation',
    heading: 'Generate Edge Cases Automatically',
    description:
      'AI transforms your happy-path recordings and requirements into negative scenarios, boundary tests, and edge cases you would never think to write manually.',
    benefits: [
      'Generates negative and boundary test cases from a single recording',
      'Expands partial workflows with missing prerequisite steps',
      'Understands field types, validation rules, and form logic',
      'Produces human-readable test case descriptions',
    ],
  },
  {
    id: 'execution',
    label: 'Execution',
    heading: 'Run Tests in the Cloud',
    description:
      'Schedule and execute test suites in the cloud without keeping your laptop running. Track results, view screenshots, and get AI-powered failure summaries.',
    benefits: [
      'Cloud execution — no local browser required',
      'Parallel test runs across multiple suites',
      'Screenshot and video capture on failure',
      'AI failure summaries with suggested fixes',
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    heading: 'One Workspace for the Whole Team',
    description:
      'QAs, BAs, PMs, and POs work together in a shared workspace. Review test cases, approve changes, and track coverage without switching tools.',
    benefits: [
      'Shared project workspace with role-based access',
      'Test case review and approval workflows',
      'Coverage tracking across features and sprints',
      'Integrates with Jira, Linear, and GitHub',
    ],
  },
];

// ---------------------------------------------------------------------------
// Screenshot mockup — pure TSX/CSS, no images
// ---------------------------------------------------------------------------

function RecordingMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-xs text-muted space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-muted/60 text-xs">Recording…</span>
      </div>
      {[
        { step: '1', action: 'navigate', value: 'https://app.example.com/login' },
        { step: '2', action: 'fill', value: '#email → user@example.com' },
        { step: '3', action: 'fill', value: '#password → ••••••••' },
        { step: '4', action: 'click', value: 'button[type="submit"]' },
        { step: '5', action: 'assert', value: 'URL contains /dashboard' },
      ].map(({ step, action, value }) => (
        <div key={step} className="flex gap-2">
          <span className="text-accent/70 w-4 shrink-0">{step}.</span>
          <span className="text-foreground/60 w-16 shrink-0">{action}</span>
          <span className="text-foreground/80 truncate">{value}</span>
        </div>
      ))}
    </div>
  );
}

function AIGenerationMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <p className="text-xs text-muted/70 uppercase tracking-wider">Generated test cases</p>
      {[
        { label: 'Happy path — valid credentials', color: 'bg-green-500/20 text-green-400' },
        { label: 'Empty email field', color: 'bg-yellow-500/20 text-yellow-400' },
        { label: 'Invalid email format', color: 'bg-yellow-500/20 text-yellow-400' },
        { label: 'Wrong password (3 attempts)', color: 'bg-red-500/20 text-red-400' },
        { label: 'SQL injection in email field', color: 'bg-red-500/20 text-red-400' },
      ].map(({ label, color }) => (
        <div key={label} className={`rounded-lg px-3 py-2 text-xs font-medium ${color}`}>
          {label}
        </div>
      ))}
    </div>
  );
}

function ExecutionMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-muted/70 uppercase tracking-wider">Suite run · 2 min ago</p>
        <span className="text-xs text-green-400 font-semibold">92% pass</span>
      </div>
      {[
        { name: 'Login — happy path', status: 'pass' },
        { name: 'Login — empty email', status: 'pass' },
        { name: 'Login — wrong password', status: 'pass' },
        { name: 'Login — SQL injection', status: 'fail' },
        { name: 'Dashboard loads', status: 'pass' },
      ].map(({ name, status }) => (
        <div key={name} className="flex items-center gap-3 text-xs">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              status === 'pass' ? 'bg-green-400' : 'bg-red-400'
            }`}
          />
          <span className="text-foreground/80 flex-1">{name}</span>
          <span className={status === 'pass' ? 'text-green-400' : 'text-red-400'}>
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function CollaborationMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <p className="text-xs text-muted/70 uppercase tracking-wider">Team workspace</p>
      {[
        { name: 'Alice (QA)', action: 'Approved 12 test cases', time: '5m ago', color: 'bg-purple-500/30 text-purple-300' },
        { name: 'Bob (BA)', action: 'Added acceptance criteria', time: '22m ago', color: 'bg-blue-500/30 text-blue-300' },
        { name: 'Carol (PM)', action: 'Reviewed coverage report', time: '1h ago', color: 'bg-teal-500/30 text-teal-300' },
      ].map(({ name, action, time, color }) => (
        <div key={name} className="flex items-start gap-3">
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold shrink-0 ${color}`}>
            {name.charAt(0)}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground/80 font-medium">{name}</p>
            <p className="text-xs text-muted/70 truncate">{action}</p>
          </div>
          <span className="text-xs text-muted/50 shrink-0">{time}</span>
        </div>
      ))}
    </div>
  );
}

const MOCKUPS: Record<string, () => JSX.Element> = {
  recording: RecordingMockup,
  'ai-generation': AIGenerationMockup,
  execution: ExecutionMockup,
  collaboration: CollaborationMockup,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Displays feature categories in a tabbed interface with screenshot mockups.
 * Supports keyboard navigation (ArrowLeft/ArrowRight, Home, End, Enter/Space).
 * Fires analytics events on tab selection.
 * Requirements: 2.4, 3.4, 3.7
 */
export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activateTab = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const tab = TABS[index];
      if (tab) {
        trackEvent({
          type: 'demo_interaction',
          label: `features-tab-${tab.id}`,
          section: 'features',
          timestamp: Date.now(),
          metadata: { tabId: tab.id, tabLabel: tab.label },
        });
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
          nextIndex = (index + 1) % TABS.length;
          break;
        case 'ArrowLeft':
          nextIndex = (index - 1 + TABS.length) % TABS.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = TABS.length - 1;
          break;
        case 'Enter':
        case ' ':
          activateTab(index);
          return;
        default:
          return;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(nextIndex);
        tabRefs.current[nextIndex]?.focus();
      }
    },
    [activateTab]
  );


  return (
    <SectionWrapper id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          Built for Teams Who Ship Fast
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Everything you need to automate QA without slowing down development.
        </p>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Feature categories"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {TABS.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                role="tab"
                id={`features-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`features-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => activateTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={[
                  'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isActive
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-white/5 text-muted hover:bg-white/10 hover:text-foreground',
                ].join(' ')}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        {TABS.map((tab, index) => {
          const isActive = index === activeIndex;
          const Mockup = MOCKUPS[tab.id] as (() => JSX.Element) | undefined;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`features-panel-${tab.id}`}
              aria-labelledby={`features-tab-${tab.id}`}
              hidden={!isActive}
              tabIndex={0}
            >
              {isActive && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center surface-elevated border-luminance p-8 rounded-2xl">
                  {/* Text content */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {tab.heading}
                    </h3>
                    <p className="text-muted leading-relaxed mb-6">
                      {tab.description}
                    </p>
                    <ul className="space-y-3">
                      {tab.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm text-muted">
                          <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                            ✓
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mockup */}
                  <div>
                    {Mockup && <Mockup />}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
