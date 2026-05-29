/**
 * Bug Condition Exploration Property Test — Conversion Boost
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8**
 *
 * Property 1: Bug Condition — Bento Grid, Sticky CTA, MetricsStrip, and Playground Absent
 *
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms all four conversion weaknesses exist:
 *   1a. FeaturesSection uses role="tablist" instead of a Bento Grid (data-testid="bento-grid")
 *   1b. NavBar has no "Get Started" button with bg-accent when scrolled past hero
 *   1c. No data-testid="metrics-strip" component with ≥3 metric items
 *   1d. No #playground section with 3 scenario buttons
 *
 * DO NOT attempt to fix the test or the code when it fails.
 * NOTE: This test encodes the expected behavior — it will validate the fix when it passes
 * after implementation.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import App from '../src/App';

beforeEach(() => {
  cleanup();

  // Mock window.matchMedia (required by useMediaQuery hook)
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver (required by SectionWrapper)
  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: '0px',
    thresholds: [0.2],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;
});

describe('Property 1: Bug Condition — Bento Grid, Sticky CTA, MetricsStrip, and Playground Absent', () => {
  /**
   * Sub-property 1a — Bento Grid absent
   *
   * Render <App />, query #features, assert data-testid="bento-grid" exists AND
   * role="tablist" does NOT exist inside #features.
   *
   * Bug Condition: section.id === 'features' AND DOM contains role='tablist'
   *                AND NOT contains data-testid='bento-grid'
   * Expected Behavior: data-testid="bento-grid" present, no role="tablist",
   *                    at least one <code> or <pre> element,
   *                    at least one element with text "Passed" and one with text "Failed"
   *
   * Validates: Requirements 1.1, 1.2, 1.3
   */
  it('1a: #features contains data-testid="bento-grid" and no role="tablist"', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const featuresSection = container.querySelector('#features');
        expect(featuresSection).not.toBeNull();

        // Assert bento grid is present
        const bentoGrid = featuresSection!.querySelector('[data-testid="bento-grid"]');
        expect(bentoGrid).not.toBeNull();

        // Assert no tablist (tabbed interface replaced by bento grid)
        const tablist = featuresSection!.querySelector('[role="tablist"]');
        expect(tablist).toBeNull();

        // Assert at least one <code> or <pre> element (Playwright code block)
        const codeBlock = featuresSection!.querySelector('code, pre');
        expect(codeBlock).not.toBeNull();

        // Assert status tags "Passed" and "Failed" are present
        const allText = featuresSection!.textContent || '';
        expect(allText).toContain('Passed');
        expect(allText).toContain('Failed');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Sub-property 1b — Sticky CTA absent when scrolled
   *
   * Render <App />, mock window.scrollY past hero threshold, fire scroll event,
   * assert <nav> contains an element with text "Get Started" and class bg-accent.
   *
   * Bug Condition: isScrolled === true AND NOT nav contains 'Get Started' with bg-accent
   * Expected Behavior: <a> or <button> with text "Get Started", class bg-accent,
   *                    href="https://app.genieqa.app/login" inside <nav>
   *
   * Validates: Requirements 1.4, 1.5
   */
  it('1b: <nav> contains "Get Started" with bg-accent when scrolled past hero', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Mock scrollY past the hero threshold (NavBar typically triggers at ~100px)
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 200,
        });

        // Fire scroll event to trigger isScrolled state update
        fireEvent.scroll(window);

        const nav = container.querySelector('nav');
        expect(nav).not.toBeNull();

        // Assert "Get Started" CTA with bg-accent is present in nav
        const navElements = nav!.querySelectorAll('a, button');
        const getStartedElement = Array.from(navElements).find(
          (el) =>
            (el.textContent?.trim() === 'Get Started' ||
              el.textContent?.includes('Get Started')) &&
            el.className.includes('bg-accent')
        );
        expect(getStartedElement).not.toBeUndefined();

        // Assert it links to the registration URL
        if (getStartedElement && getStartedElement.tagName === 'A') {
          expect((getStartedElement as HTMLAnchorElement).href).toContain(
            'app.genieqa.app/login'
          );
        }

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Sub-property 1c — MetricsStrip absent
   *
   * Render <App />, assert data-testid="metrics-strip" exists and contains
   * at least 3 child elements with text-accent class.
   *
   * Bug Condition: NOT DOM contains data-testid='metrics-strip'
   *                OR count of metric elements < 3
   * Expected Behavior: data-testid="metrics-strip" present with exactly 3 metric items
   *                    showing "80%", "3×", "500+"
   *
   * Validates: Requirements 1.5
   */
  it('1c: data-testid="metrics-strip" exists with ≥3 metric items using text-accent', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Assert metrics strip is present
        const metricsStrip = container.querySelector('[data-testid="metrics-strip"]');
        expect(metricsStrip).not.toBeNull();

        // Assert at least 3 metric value elements with text-accent class
        const accentMetrics = metricsStrip!.querySelectorAll('[class*="text-accent"]');
        expect(accentMetrics.length).toBeGreaterThanOrEqual(3);

        // Assert the specific metric values are present
        const stripText = metricsStrip!.textContent || '';
        expect(stripText).toContain('80%');
        expect(stripText).toContain('3×');
        expect(stripText).toContain('500+');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Sub-property 1d — Playground absent
   *
   * Render <App />, assert #playground exists and contains exactly 3 <button> elements
   * with role="button" and aria-label containing the scenario name.
   *
   * Bug Condition: NOT DOM contains id='playground'
   * Expected Behavior: #playground section with 3 scenario buttons:
   *                    "E-commerce Checkout", "Reset Password", "Drag & Drop UI"
   *
   * Validates: Requirements 1.7, 1.8
   */
  it('1d: #playground exists with exactly 3 scenario buttons (role="button", aria-label)', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Assert playground section is present
        const playgroundSection = container.querySelector('#playground');
        expect(playgroundSection).not.toBeNull();

        // Assert exactly 3 scenario buttons with role="button"
        const scenarioButtons = playgroundSection!.querySelectorAll(
          'button[role="button"], [role="button"]'
        );
        expect(scenarioButtons.length).toBe(3);

        // Assert aria-labels contain the scenario names
        const ariaLabels = Array.from(scenarioButtons).map(
          (btn) => btn.getAttribute('aria-label') || ''
        );

        const hasEcommerce = ariaLabels.some((label) =>
          label.includes('E-commerce Checkout')
        );
        const hasResetPassword = ariaLabels.some((label) =>
          label.includes('Reset Password')
        );
        const hasDragDrop = ariaLabels.some((label) =>
          label.includes('Drag & Drop UI')
        );

        expect(hasEcommerce).toBe(true);
        expect(hasResetPassword).toBe(true);
        expect(hasDragDrop).toBe(true);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });
});
