import { useState, useEffect } from 'react';
import { SectionWrapper } from '../SectionWrapper';
import { CTAButton } from '../CTAButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { trackEvent } from '../../utils/analytics';

interface Scenario {
  id: string;
  label: string;
  lines: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'ecommerce-checkout',
    label: 'E-commerce Checkout',
    lines: [
      "await page.goto('https://shop.example.com/cart');",
      "await page.fill('[data-testid=\"email\"]', 'user@test.com');",
      "await page.fill('[data-testid=\"card-number\"]', '4111111111111111');",
      "await page.fill('[data-testid=\"expiry\"]', '12/26');",
      "await page.fill('[data-testid=\"cvv\"]', '123');",
      "await page.click('[data-testid=\"place-order\"]');",
      "await expect(page.locator('[data-testid=\"order-confirmation\"]')).toBeVisible();",
      "await expect(page.locator('[data-testid=\"order-number\"]')).toContainText('ORD-');",
    ],
  },
  {
    id: 'reset-password',
    label: 'Reset Password',
    lines: [
      "await page.goto('https://app.example.com/forgot-password');",
      "await page.fill('[data-testid=\"email\"]', 'user@test.com');",
      "await page.click('[data-testid=\"send-reset-link\"]');",
      "await expect(page.locator('[data-testid=\"success-message\"]')).toBeVisible();",
      "await page.goto('https://app.example.com/reset-password?token=abc123');",
      "await page.fill('[data-testid=\"new-password\"]', 'NewPass@2024');",
      "await page.fill('[data-testid=\"confirm-password\"]', 'NewPass@2024');",
      "await page.click('[data-testid=\"reset-submit\"]');",
    ],
  },
  {
    id: 'drag-and-drop',
    label: 'Drag & Drop UI',
    lines: [
      "await page.goto('https://app.example.com/board');",
      "const source = page.locator('[data-testid=\"card-todo-1\"]');",
      "const target = page.locator('[data-testid=\"column-in-progress\"]');",
      "await source.dragTo(target);",
      "await expect(target.locator('[data-testid=\"card-todo-1\"]')).toBeVisible();",
      "await expect(page.locator('[data-testid=\"column-todo\"]').locator('[data-testid=\"card-todo-1\"]')).not.toBeVisible();",
    ],
  },
];

/**
 * AI Playground Section — lets visitors pick a scenario and see simulated
 * Playwright TypeScript output with a typing effect, no login required.
 *
 * Requirements: 2.7, 2.8, 2.9, 3.3, 3.4, 3.9
 */
export function AIPlaygroundSection() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const reducedMotion = useReducedMotion();

  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenario) ?? null;

  // Typing simulation: increment visibleLines every 80ms, or show all immediately for reduced motion
  useEffect(() => {
    if (activeScenario === null) {
      return;
    }

    if (reducedMotion) {
      setVisibleLines(activeScenario.lines.length);
      return;
    }

    // Already fully revealed — nothing to do
    if (visibleLines >= activeScenario.lines.length) {
      return;
    }

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= activeScenario.lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [selectedScenario, reducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleScenarioSelect(scenario: Scenario) {
    setSelectedScenario(scenario.id);
    setVisibleLines(0);
    trackEvent({
      type: 'demo_interaction',
      label: `playground-scenario-${scenario.id}`,
      section: 'playground',
      timestamp: Date.now(),
    });
  }

  return (
    <SectionWrapper id="playground" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See AI-Generated Tests in Action
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Pick a scenario and watch Genie QA generate Playwright tests — no signup required.
          </p>
        </div>

        {/* Scenario picker */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Test scenario picker">
          {SCENARIOS.map((scenario) => {
            const isActive = selectedScenario === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                role="button"
                aria-label={`Select scenario: ${scenario.label}`}
                aria-pressed={isActive}
                onClick={() => handleScenarioSelect(scenario)}
                className={[
                  'px-5 py-2.5 rounded font-medium text-sm transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isActive
                    ? 'bg-accent text-white'
                    : 'bg-card border border-border text-foreground hover:border-accent hover:text-accent',
                ].join(' ')}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>

        {/* Output area */}
        <div className="rounded-lg bg-[#1a1a1a] border border-border overflow-hidden">
          {/* Terminal header bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50">
            <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
            <span className="ml-3 text-muted text-xs font-mono">
              {activeScenario ? `${activeScenario.label}.spec.ts` : 'Select a scenario above'}
            </span>
          </div>

          {/* Output label */}
          <div className="px-4 pt-3">
            <p className="text-muted text-xs">Preview — simulated output</p>
          </div>

          {/* Code output */}
          <pre
            aria-label="Simulated test output preview"
            aria-live="polite"
            contentEditable={false}
            className="px-4 py-4 text-sm font-mono text-green-300 overflow-x-auto min-h-[200px] whitespace-pre"
          >
            {activeScenario === null ? (
              <span className="text-muted italic">// Choose a scenario to see generated tests</span>
            ) : (
              activeScenario.lines.slice(0, visibleLines).map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))
            )}
            {activeScenario !== null && visibleLines < activeScenario.lines.length && (
              <span className="inline-block w-2 h-4 bg-green-300 animate-pulse align-middle" aria-hidden="true" />
            )}
          </pre>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <CTAButton
            variant="primary"
            section="playground"
            href="https://app.genieqa.app/login"
          >
            Generate tests for your own app →
          </CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
