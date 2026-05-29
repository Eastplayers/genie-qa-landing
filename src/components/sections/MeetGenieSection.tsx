import { SectionWrapper } from '../SectionWrapper';

/* ─── AI Avatar SVG ─── */

function GenieAvatar() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      role="img"
      aria-label="Genie AI agent avatar"
    >
      {/* Outer glow ring */}
      <circle cx="60" cy="60" r="58" stroke="#e97d2c" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Inner background */}
      <circle cx="60" cy="60" r="50" fill="#1a1a2e" />
      <circle cx="60" cy="60" r="50" fill="url(#avatarGradient)" />
      {/* Face */}
      <circle cx="60" cy="52" r="22" fill="#e97d2c" fillOpacity="0.15" stroke="#e97d2c" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="52" cy="50" r="4" fill="#e97d2c" />
      <circle cx="68" cy="50" r="4" fill="#e97d2c" />
      <circle cx="53" cy="49" r="1.5" fill="white" />
      <circle cx="69" cy="49" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M52 58 Q60 65 68 58" stroke="#e97d2c" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Neural network dots */}
      <circle cx="30" cy="35" r="3" fill="#e97d2c" fillOpacity="0.6" />
      <circle cx="90" cy="35" r="3" fill="#e97d2c" fillOpacity="0.6" />
      <circle cx="20" cy="60" r="2.5" fill="#e97d2c" fillOpacity="0.4" />
      <circle cx="100" cy="60" r="2.5" fill="#e97d2c" fillOpacity="0.4" />
      <circle cx="30" cy="85" r="3" fill="#e97d2c" fillOpacity="0.6" />
      <circle cx="90" cy="85" r="3" fill="#e97d2c" fillOpacity="0.6" />
      {/* Connection lines */}
      <line x1="33" y1="35" x2="38" y2="38" stroke="#e97d2c" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="87" y1="35" x2="82" y2="38" stroke="#e97d2c" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="23" y1="60" x2="38" y2="60" stroke="#e97d2c" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="97" y1="60" x2="82" y2="60" stroke="#e97d2c" strokeWidth="1" strokeOpacity="0.4" />
      {/* Sparkle accents */}
      <text x="14" y="28" fontSize="10" fill="#e97d2c" fillOpacity="0.7">✦</text>
      <text x="96" y="28" fontSize="10" fill="#e97d2c" fillOpacity="0.7">✦</text>
      <defs>
        <radialGradient id="avatarGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e97d2c" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#e97d2c" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── In-Action Demo Mock ─── */

const demoSteps = [
  { icon: '🔍', label: 'Scanning page structure…', status: 'done' },
  { icon: '🧠', label: 'Identifying 12 interactive elements', status: 'done' },
  { icon: '⚡', label: 'Generating 34 test cases', status: 'active' },
  { icon: '✅', label: 'Ready to execute', status: 'pending' },
];

function InActionDemo() {
  return (
    <div className="surface-elevated rounded-xl p-6 border border-border">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-muted font-mono">genie — analyzing checkout.html</span>
      </div>

      {/* Step list */}
      <div className="space-y-3">
        {demoSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-base w-6 text-center" aria-hidden="true">{step.icon}</span>
            <span
              className={`text-sm font-mono ${
                step.status === 'done'
                  ? 'text-green-400'
                  : step.status === 'active'
                  ? 'text-accent'
                  : 'text-muted'
              }`}
            >
              {step.label}
            </span>
            {step.status === 'done' && (
              <span className="ml-auto text-green-400 text-xs">✓</span>
            )}
            {step.status === 'active' && (
              <span className="ml-auto text-accent text-xs animate-pulse">●</span>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>Test generation progress</span>
          <span className="text-accent">75%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full"
            style={{ width: '75%' }}
            role="progressbar"
            aria-valuenow={75}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Test generation 75% complete"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Mode Cards ─── */

const modeCards = [
  {
    mode: 'Smart Mode',
    tagline: 'AI decides what to test',
    description:
      "Point Genie at any page and step back. It reads the UI, figures out what matters, and builds a full test suite — no instructions needed. Like having a senior QA engineer who never sleeps.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="#e97d2c" strokeWidth="1.5" />
        <path d="M9 14l3 3 7-7" stroke="#e97d2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: 'Autonomous',
    badgeColor: 'bg-accent/15 text-accent',
  },
  {
    mode: 'Guided Mode',
    tagline: 'You direct, AI executes',
    description:
      "You know your app best. Tell Genie exactly what to test — specific flows, edge cases, regression scenarios — and it handles the heavy lifting of writing and running every test case.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="12" stroke="#e97d2c" strokeWidth="1.5" />
        <path d="M10 14h8M14 10l4 4-4 4" stroke="#e97d2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: 'Collaborative',
    badgeColor: 'bg-accent/15 text-accent',
  },
];

/**
 * "Meet Genie" AI Personality Section.
 *
 * Introduces Genie as a personified AI team member with a stylized avatar,
 * an in-action demo mock showing AI analyzing a page and generating tests,
 * and two mode cards (Smart Mode vs Guided Mode) that highlight how Genie
 * adapts to different working styles.
 *
 * Uses SectionWrapper for scroll-depth analytics and entrance animation.
 *
 * Requirements: 2.8, 3.4, 3.7
 */
export function MeetGenieSection() {
  return (
    <SectionWrapper id="meet-genie" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ─── Section Header ─── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-6">
            <span aria-hidden="true">✦</span>
            <span>MEET YOUR AI TEAMMATE</span>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <GenieAvatar />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Meet <span className="text-accent">Genie</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Not just a tool — a QA teammate that thinks, adapts, and gets things done.
            Genie learns your app, spots what needs testing, and writes the tests so you don't have to.
          </p>
        </div>

        {/* ─── In-Action Demo + Intro ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          {/* Left: narrative */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Watch Genie work
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Drop Genie onto any page and it immediately gets to work — scanning the DOM,
              identifying interactive elements, and generating a comprehensive test suite.
              What used to take a QA engineer hours now takes seconds.
            </p>
            <ul className="space-y-3">
              {[
                'Reads your UI like a human tester would',
                'Generates edge cases you might never think of',
                'Writes clean, maintainable Playwright scripts',
                'Runs tests and reports results in plain English',
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: demo mock */}
          <div>
            <InActionDemo />
          </div>
        </div>

        {/* ─── Mode Cards ─── */}
        <div className="mb-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Works the way <em className="not-italic text-accent">you</em> work
            </h3>
            <p className="text-muted max-w-xl mx-auto">
              Whether you want full autonomy or hands-on control, Genie has a mode for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modeCards.map((card, index) => (
              <div
                key={index}
                className="surface-elevated border-luminance p-8 rounded-xl flex flex-col gap-4"
              >
                {/* Icon + badge row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                {/* Mode name + tagline */}
                <div>
                  <h4 className="text-foreground font-bold text-xl mb-1">
                    {card.mode}
                  </h4>
                  <p className="text-accent text-sm font-medium">
                    {card.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom tagline ─── */}
        <div className="text-center mt-12">
          <p className="text-muted text-base">
            Either way, Genie handles the repetitive work — so your team can focus on building.
          </p>
        </div>

      </div>
    </SectionWrapper>
  );
}
