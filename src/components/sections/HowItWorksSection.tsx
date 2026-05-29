import { SectionWrapper } from '../SectionWrapper';

// ─── Step Mockup Components (CSS/SVG only, no images) ────────────────────────

/** Mockup for the RECORD step: browser window with cursor and click indicators */
function RecordMockup() {
  return (
    <div
      className="mockup-container w-full max-w-md mx-auto rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-xl"
      data-testid="record-mockup"
      role="img"
      aria-label="Recording workflow mockup"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="flex-1 mx-4 h-6 rounded bg-background/60 flex items-center px-3">
          <span className="text-muted text-xs truncate">app.example.com/login</span>
        </div>
      </div>
      {/* Page content simulation */}
      <div className="p-6 space-y-4 bg-background/40">
        {/* Form fields */}
        <div className="space-y-3">
          <div className="h-8 rounded-md border border-border bg-surface px-3 flex items-center">
            <span className="text-muted text-xs">Email address</span>
          </div>
          <div className="h-8 rounded-md border border-accent/60 bg-surface px-3 flex items-center ring-2 ring-accent/30">
            <span className="text-foreground text-xs">user@company.com</span>
          </div>
        </div>
        {/* Click indicator */}
        <div className="relative">
          <div className="h-9 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Sign In</span>
          </div>
          {/* Ripple click effect */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-accent animate-ping opacity-60" aria-hidden="true" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent/40" aria-hidden="true" />
        </div>
        {/* Recording indicator */}
        <div className="flex items-center gap-2 pt-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs text-muted">Recording… 3 actions captured</span>
        </div>
      </div>
    </div>
  );
}

/** Mockup for the GENERATE step: AI analysis panel with test cases being generated */
function GenerateMockup() {
  return (
    <div
      className="mockup-container w-full max-w-md mx-auto rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-xl"
      data-testid="generate-mockup"
      role="img"
      aria-label="AI test generation mockup"
    >
      {/* Panel header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-accent" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="5" />
          </svg>
        </div>
        <span className="text-foreground text-sm font-medium">Genie AI — Generating Tests</span>
        <div className="ml-auto flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden="true" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden="true" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden="true" />
        </div>
      </div>
      {/* Generated test cases */}
      <div className="p-4 space-y-2 bg-background/40">
        {[
          { label: 'Happy path — valid credentials', status: 'done' },
          { label: 'Invalid email format', status: 'done' },
          { label: 'Empty password field', status: 'done' },
          { label: 'SQL injection attempt', status: 'generating' },
          { label: 'Rate limit exceeded', status: 'pending' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 py-1.5 px-3 rounded-md bg-surface/60">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                item.status === 'done'
                  ? 'bg-green-500'
                  : item.status === 'generating'
                  ? 'bg-accent animate-pulse'
                  : 'bg-border'
              }`}
              aria-hidden="true"
            />
            <span className="text-xs text-muted truncate">{item.label}</span>
          </div>
        ))}
        <div className="pt-1 text-xs text-accent font-medium">+12 more edge cases…</div>
      </div>
    </div>
  );
}

/** Mockup for the EXECUTE step: test run results dashboard */
function ExecuteMockup() {
  return (
    <div
      className="mockup-container w-full max-w-md mx-auto rounded-xl border border-border bg-surface-elevated overflow-hidden shadow-xl"
      data-testid="execute-mockup"
      role="img"
      aria-label="Test execution results mockup"
    >
      {/* Run header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <span className="text-foreground text-sm font-medium">Test Run #47</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">Passed</span>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
        {[
          { value: '17', label: 'Passed', color: 'text-green-400' },
          { value: '1', label: 'Failed', color: 'text-red-400' },
          { value: '2', label: 'Skipped', color: 'text-muted' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-3">
            <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            <span className="text-xs text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Test list */}
      <div className="p-3 space-y-1.5 bg-background/40">
        {[
          { name: 'Login — valid credentials', pass: true },
          { name: 'Login — invalid email', pass: true },
          { name: 'Login — empty password', pass: false },
          { name: 'Login — SQL injection', pass: true },
        ].map((test) => (
          <div key={test.name} className="flex items-center gap-2 text-xs">
            <span className={test.pass ? 'text-green-400' : 'text-red-400'} aria-hidden="true">
              {test.pass ? '✓' : '✗'}
            </span>
            <span className="text-muted truncate">{test.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step Data ────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    heading: 'RECORD',
    description:
      'Capture your user workflows directly in the browser — no scripting required. Genie QA observes every click, input, and navigation to build a complete picture of your process.',
    mockup: <RecordMockup />,
  },
  {
    number: '02',
    heading: 'GENERATE',
    description:
      'Our AI analyzes your recorded workflow and automatically generates a full test suite: happy paths, negative cases, edge cases, and security checks — all without manual effort.',
    mockup: <GenerateMockup />,
  },
  {
    number: '03',
    heading: 'EXECUTE',
    description:
      'Run your tests on demand or on a schedule. Get instant results with AI-assisted failure analysis so your team can ship with confidence every time.',
    mockup: <ExecuteMockup />,
  },
];

// ─── Section Component ────────────────────────────────────────────────────────

/**
 * Displays the product workflow as 3 large numbered steps with embedded mockups
 * in an alternating left/right desktop layout.
 *
 * Requirements: 2.3, 3.2, 3.4
 */
export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            From recording to results in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => {
            // Alternate: even index → content left / mockup right
            //            odd index  → mockup left / content right
            const isReversed = index % 2 === 1;

            return (
              <div
                key={step.number}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content side */}
                <div className="flex-1 space-y-4">
                  {/* Oversized muted step number */}
                  <div
                    className="text-8xl md:text-9xl font-black text-foreground/10 leading-none select-none"
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  {/* Bold uppercase heading */}
                  <h3 className="text-3xl md:text-4xl font-black tracking-widest text-foreground uppercase">
                    {step.heading}
                  </h3>
                  {/* Supporting paragraph */}
                  <p className="text-muted text-lg leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>

                {/* Mockup side */}
                <div className="flex-1 flex items-center justify-center">
                  {step.mockup}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
