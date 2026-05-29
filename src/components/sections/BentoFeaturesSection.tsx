import { useCallback, useRef } from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { trackEvent } from '../../utils/analytics';

// ---------------------------------------------------------------------------
// Debounce helper — avoids analytics spam on rapid hover/focus events
// ---------------------------------------------------------------------------

function useDebouncedTrack(delayMs = 300) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (cellId: string) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        trackEvent({
          type: 'demo_interaction',
          label: `bento-cell-${cellId}`,
          section: 'features',
          timestamp: Date.now(),
        });
        timerRef.current = null;
      }, delayMs);
    },
    [delayMs]
  );
}

// ---------------------------------------------------------------------------
// Cell 1 — AI Test Generation (large, md:col-span-2)
// ---------------------------------------------------------------------------

function AITestGenerationCell() {
  return (
    <div className="rounded-xl bg-[#1a1a1a] border border-white/10 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">AI Generation</p>
          <h3 className="text-lg font-semibold text-foreground">AI Test Generation</h3>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-green-500/20 text-green-400">
            Passed
          </span>
          <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-red-500/20 text-red-400">
            Failed
          </span>
        </div>
      </div>

      {/* Syntax-highlighted Playwright TypeScript code block */}
      <pre className="rounded-lg bg-black/40 border border-white/5 p-4 overflow-x-auto text-xs leading-relaxed">
        <code>
          <span className="text-purple-400">const</span>
          {' '}
          <span className="text-foreground/80">{'{ test, expect }'}</span>
          {' '}
          <span className="text-purple-400">=</span>
          {' '}
          <span className="text-blue-400">require</span>
          <span className="text-foreground/60">(</span>
          <span className="text-green-400">'@playwright/test'</span>
          <span className="text-foreground/60">);</span>
          {'\n\n'}
          <span className="text-purple-400">test</span>
          <span className="text-foreground/60">(</span>
          <span className="text-green-400">'login — happy path'</span>
          <span className="text-foreground/60">, </span>
          <span className="text-purple-400">async</span>
          {' '}
          <span className="text-foreground/60">({'{ page }'}) =&gt; {'{'}</span>
          {'\n  '}
          <span className="text-purple-400">await</span>
          {' '}
          <span className="text-foreground/80">page</span>
          <span className="text-foreground/60">.</span>
          <span className="text-blue-400">goto</span>
          <span className="text-foreground/60">(</span>
          <span className="text-green-400">'https://app.example.com/login'</span>
          <span className="text-foreground/60">);</span>
          {'\n  '}
          <span className="text-purple-400">await</span>
          {' '}
          <span className="text-foreground/80">page</span>
          <span className="text-foreground/60">.</span>
          <span className="text-blue-400">fill</span>
          <span className="text-foreground/60">(</span>
          <span className="text-yellow-400">'#email'</span>
          <span className="text-foreground/60">, </span>
          <span className="text-green-400">'user@test.com'</span>
          <span className="text-foreground/60">);</span>
          {'\n  '}
          <span className="text-purple-400">await</span>
          {' '}
          <span className="text-foreground/80">page</span>
          <span className="text-foreground/60">.</span>
          <span className="text-blue-400">fill</span>
          <span className="text-foreground/60">(</span>
          <span className="text-yellow-400">'#password'</span>
          <span className="text-foreground/60">, </span>
          <span className="text-green-400">'secret123'</span>
          <span className="text-foreground/60">);</span>
          {'\n  '}
          <span className="text-purple-400">await</span>
          {' '}
          <span className="text-foreground/80">page</span>
          <span className="text-foreground/60">.</span>
          <span className="text-blue-400">click</span>
          <span className="text-foreground/60">(</span>
          <span className="text-yellow-400">'button[type="submit"]'</span>
          <span className="text-foreground/60">);</span>
          {'\n  '}
          <span className="text-purple-400">await</span>
          {' '}
          <span className="text-blue-400">expect</span>
          <span className="text-foreground/60">(</span>
          <span className="text-foreground/80">page</span>
          <span className="text-foreground/60">).</span>
          <span className="text-blue-400">toHaveURL</span>
          <span className="text-foreground/60">(</span>
          <span className="text-yellow-400">/dashboard/</span>
          <span className="text-foreground/60">);</span>
          {'\n'}
          <span className="text-foreground/60">{'}'});</span>
        </code>
      </pre>

      {/* Generated test case list */}
      <div className="space-y-2">
        <p className="text-xs text-muted/60 uppercase tracking-wider">Generated test cases</p>
        {[
          { label: 'Happy path — valid credentials', color: 'bg-green-500/20 text-green-400' },
          { label: 'Empty email field', color: 'bg-yellow-500/20 text-yellow-400' },
          { label: 'Invalid email format', color: 'bg-yellow-500/20 text-yellow-400' },
          { label: 'Wrong password (3 attempts)', color: 'bg-red-500/20 text-red-400' },
        ].map(({ label, color }) => (
          <div key={label} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${color}`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cell 2 — Test Suite Management (1-col)
// ---------------------------------------------------------------------------

function TestSuiteManagementCell() {
  return (
    <div className="rounded-xl surface-elevated border border-white/10 p-6 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Execution</p>
        <h3 className="text-lg font-semibold text-foreground">Test Suite Management</h3>
      </div>

      {/* Pass/fail summary */}
      <div className="flex items-center gap-4">
        <div className="flex-1 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-center">
          <p className="text-2xl font-bold text-green-400">4</p>
          <p className="text-xs text-muted/70 mt-0.5">Passed</p>
        </div>
        <div className="flex-1 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-center">
          <p className="text-2xl font-bold text-red-400">1</p>
          <p className="text-xs text-muted/70 mt-0.5">Failed</p>
        </div>
      </div>

      {/* Test list with dot indicators */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-muted/60 uppercase tracking-wider">Suite run · 2 min ago</p>
          <span className="text-xs text-green-400 font-semibold">80% pass</span>
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
            <span className="text-foreground/80 flex-1 truncate">{name}</span>
            <span className={status === 'pass' ? 'text-green-400' : 'text-red-400'}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cell 3 — Export & Reports (1-col)
// ---------------------------------------------------------------------------

function ExportReportsCell() {
  return (
    <div className="rounded-xl surface-elevated border border-white/10 p-6 space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Collaboration</p>
        <h3 className="text-lg font-semibold text-foreground">Export &amp; Reports</h3>
      </div>

      {/* Playwright script output snippet */}
      <pre className="rounded-lg bg-black/40 border border-white/5 p-3 overflow-x-auto text-xs leading-relaxed">
        <code>
          <span className="text-muted/50">{'# playwright.config.ts'}</span>
          {'\n'}
          <span className="text-purple-400">export default</span>
          {' '}
          <span className="text-blue-400">defineConfig</span>
          <span className="text-foreground/60">({'{'}</span>
          {'\n  '}
          <span className="text-yellow-400">reporter</span>
          <span className="text-foreground/60">: [</span>
          {'\n    '}
          <span className="text-foreground/60">[</span>
          <span className="text-green-400">'html'</span>
          <span className="text-foreground/60">, {'{ '}outputFolder: </span>
          <span className="text-green-400">'reports'</span>
          <span className="text-foreground/60">{' }'}],</span>
          {'\n    '}
          <span className="text-foreground/60">[</span>
          <span className="text-green-400">'json'</span>
          <span className="text-foreground/60">, {'{ '}outputFile: </span>
          <span className="text-green-400">'results.json'</span>
          <span className="text-foreground/60">{' }'}],</span>
          {'\n  '}
          <span className="text-foreground/60">],</span>
          {'\n'}
          <span className="text-foreground/60">{'}'});</span>
        </code>
      </pre>

      {/* Download Report label */}
      <div className="flex items-center gap-3 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3">
        <span className="text-accent text-lg" aria-hidden="true">↓</span>
        <div>
          <p className="text-sm font-semibold text-foreground">Download Report</p>
          <p className="text-xs text-muted/70">HTML · JSON · CSV</p>
        </div>
      </div>

      {/* Recording sub-item */}
      <div className="rounded-lg bg-white/5 border border-white/10 px-4 py-3">
        <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Recording</p>
        <p className="text-xs text-foreground/70">
          One-click Chrome extension captures workflows and auto-generates stable selectors.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Replaces FeaturesSection with a CSS Grid bento layout.
 * Surfaces all 4 feature categories: Recording, AI Generation, Execution, Collaboration.
 * Fires debounced analytics events on cell hover/focus.
 * No role="tablist" or role="tab" — each cell is a region.
 * Requirements: 2.1, 2.2, 2.3, 3.4, 3.5
 */
export function BentoFeaturesSection() {
  const debouncedTrack = useDebouncedTrack();

  const makeCellHandlers = (cellId: string) => ({
    onMouseEnter: () => debouncedTrack(cellId),
    onFocus: () => debouncedTrack(cellId),
  });

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

        {/* Bento grid */}
        <div
          data-testid="bento-grid"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Cell 1 — AI Test Generation (spans 2 cols on md+) */}
          <div
            role="region"
            aria-label="AI Test Generation"
            className="md:col-span-2"
            {...makeCellHandlers('ai-test-generation')}
          >
            <AITestGenerationCell />
          </div>

          {/* Cell 2 — Test Suite Management */}
          <div
            role="region"
            aria-label="Test Suite Management"
            {...makeCellHandlers('test-suite-management')}
          >
            <TestSuiteManagementCell />
          </div>

          {/* Cell 3 — Export & Reports (also surfaces Recording and Collaboration) */}
          <div
            role="region"
            aria-label="Export and Reports"
            className="md:col-span-1"
            {...makeCellHandlers('export-reports')}
          >
            <ExportReportsCell />
          </div>

          {/* Cell 4 — Recording (dedicated cell to ensure all 4 categories are visible) */}
          <div
            role="region"
            aria-label="Recording"
            className="md:col-span-2"
            {...makeCellHandlers('recording')}
          >
            <div className="rounded-xl surface-elevated border border-white/10 p-6 space-y-4 h-full">
              <div>
                <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">Recording</p>
                <h3 className="text-lg font-semibold text-foreground">Capture Workflows in Seconds</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Record real user interactions directly from the browser and convert them into clean,
                readable test steps — no code required.
              </p>
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
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'One-click browser recording via Chrome extension',
                  'Auto-generates stable aria/data-testid selectors',
                  'Captures inputs, clicks, navigation, and form submissions',
                  'Editable step list before saving',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs text-muted">
                    <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
