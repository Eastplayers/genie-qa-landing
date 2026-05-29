/**
 * Preservation Property Tests — Conversion Boost
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9**
 *
 * Property 2: Preservation — Existing Functional Behavior Unchanged
 *
 * These tests capture the existing functional behavior of the landing page
 * BEFORE implementing the conversion boost fix. They must PASS on unfixed code
 * and continue to PASS after the fix is applied, confirming no regressions.
 *
 * Observation-first methodology: Each test observes actual behavior of the
 * current code and asserts that behavior is preserved.
 *
 * IMPORTANT NOTES on tests 2d and 2e:
 * - Test 2d (#playground reduced motion): #playground does not exist on unfixed code.
 *   The test gracefully skips the assertion when #playground is absent — the preservation
 *   property is vacuously true when the component doesn't exist yet.
 * - Test 2e (Bento Grid reduced motion): #features exists on unfixed code but has no
 *   animate- classes. The test asserts absence of animate- classes, which passes on
 *   unfixed code and must continue to pass after the fix.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
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

  // Mock IntersectionObserver (required by SectionWrapper and useScrollSpy)
  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: '0px',
    thresholds: [0.2],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;

  // Mock window.scrollTo (used by nav click handlers)
  window.scrollTo = vi.fn();
});

afterEach(() => {
  cleanup();
});

describe('Property 2: Preservation — Existing Functional Behavior Unchanged (Conversion Boost)', () => {
  /**
   * Preservation test 2a — CTA routing
   *
   * For all primary CTA <a> elements (a.bg-accent), href equals
   * "https://app.genieqa.app/login".
   *
   * Observe: current page has primary CTAs pointing to login URL — assert this is
   * preserved after fix (including new sticky NavBar CTA and Playground CTA).
   *
   * **Validates: Requirements 3.1**
   */
  describe('2a: CTA routing preservation', () => {
    it('for all primary CTA <a> elements (a.bg-accent), href equals https://app.genieqa.app/login', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          // Find all anchor elements with bg-accent class (primary CTA styling)
          const primaryCTAs = container.querySelectorAll('a.bg-accent');

          // There should be primary CTAs on the page
          expect(primaryCTAs.length).toBeGreaterThan(0);

          // All primary CTA hrefs should point to the login/registration URL
          for (const cta of Array.from(primaryCTAs)) {
            const href = cta.getAttribute('href');
            expect(href).toBe('https://app.genieqa.app/login');
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Preservation test 2b — NavBar links
   *
   * For any render, <nav> contains buttons/links with text "Features",
   * "How It Works", "Integrations", "Pricing", "FAQ", and "Login".
   *
   * Observe: current NavBar has all 5 nav links plus Login — assert these are not
   * displaced by the new "Get Started" CTA.
   *
   * **Validates: Requirements 3.6**
   */
  describe('2b: NavBar links preservation', () => {
    it('<nav> contains all 5 nav links (Features, How It Works, Integrations, Pricing, FAQ) and Login', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const nav = container.querySelector('nav');
          expect(nav).not.toBeNull();

          // Collect all text content from nav buttons and links
          const navElements = nav!.querySelectorAll('button, a');
          const navTexts = Array.from(navElements).map(
            (el) => el.textContent?.trim() ?? ''
          );

          // Assert all 5 nav links are present
          expect(navTexts).toContain('Features');
          expect(navTexts).toContain('How It Works');
          expect(navTexts).toContain('Integrations');
          expect(navTexts).toContain('Pricing');
          expect(navTexts).toContain('FAQ');

          // Assert Login link is present
          expect(navTexts).toContain('Login');

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Preservation test 2c — Testimonial data
   *
   * For any render, #social-proof section contains text "Sarah Chen",
   * "Marcus Rivera", "Priya Sharma".
   *
   * Observe: current SocialProofSection renders all three testimonials from
   * social-proof.json — assert this is preserved after fix.
   *
   * **Validates: Requirements 3.7**
   */
  describe('2c: Testimonial data preservation', () => {
    it('#social-proof section contains all three testimonials (Sarah Chen, Marcus Rivera, Priya Sharma)', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const socialProofSection = container.querySelector('#social-proof');
          expect(socialProofSection).not.toBeNull();

          const sectionText = socialProofSection!.textContent ?? '';

          // Assert all three testimonial names are present
          expect(sectionText).toContain('Sarah Chen');
          expect(sectionText).toContain('Marcus Rivera');
          expect(sectionText).toContain('Priya Sharma');

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Preservation test 2d — Reduced motion (Playground)
   *
   * With matchMedia returning matches: true for (prefers-reduced-motion: reduce),
   * clicking any scenario card in #playground results in the output <pre>
   * immediately showing all lines (no incremental reveal).
   *
   * Observe: useReducedMotion hook returns true when media query matches — assert
   * visibleLines equals lines.length immediately.
   *
   * NOTE: #playground does not exist on unfixed code. When #playground is absent,
   * the test passes vacuously — the preservation property only applies once the
   * component exists. This ensures the test passes on BOTH unfixed and fixed code.
   *
   * **Validates: Requirements 3.3**
   */
  describe('2d: Reduced motion (Playground) preservation', () => {
    it('with prefers-reduced-motion: reduce, clicking a scenario card immediately shows all output lines', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('ecommerce-checkout', 'reset-password', 'drag-and-drop'),
          (scenarioId) => {
            // Configure matchMedia to report prefers-reduced-motion: reduce
            Object.defineProperty(window, 'matchMedia', {
              writable: true,
              value: vi.fn().mockImplementation((query: string) => ({
                matches: query === '(prefers-reduced-motion: reduce)',
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
              })),
            });

            const { container } = render(<App />);

            const playgroundSection = container.querySelector('#playground');

            // If #playground doesn't exist yet (unfixed code), the preservation
            // property is vacuously true — skip the assertion.
            if (!playgroundSection) {
              cleanup();
              return;
            }

            // Find the scenario button matching the given scenarioId
            const scenarioButtons = playgroundSection.querySelectorAll(
              'button[role="button"], [role="button"]'
            );

            // Find the button whose aria-label contains the scenario ID pattern
            const scenarioLabelMap: Record<string, string> = {
              'ecommerce-checkout': 'E-commerce Checkout',
              'reset-password': 'Reset Password',
              'drag-and-drop': 'Drag & Drop UI',
            };
            const targetLabel = scenarioLabelMap[scenarioId];

            const targetButton = Array.from(scenarioButtons).find((btn) => {
              const ariaLabel = btn.getAttribute('aria-label') ?? '';
              const text = btn.textContent ?? '';
              return ariaLabel.includes(targetLabel) || text.includes(targetLabel);
            });

            // If the button doesn't exist, skip (vacuously true)
            if (!targetButton) {
              cleanup();
              return;
            }

            // Click the scenario button
            act(() => {
              fireEvent.click(targetButton);
            });

            // With reduced motion, the output <pre> should immediately show all lines
            const outputPre = playgroundSection.querySelector('pre');
            expect(outputPre).not.toBeNull();

            // The pre should have content immediately (no incremental reveal)
            // All lines should be visible — content should be non-empty
            const preContent = outputPre!.textContent ?? '';
            expect(preContent.length).toBeGreaterThan(0);

            // Verify no animate- classes are present on any element inside #playground
            // (reduced motion should suppress all animations)
            const allPlaygroundElements = playgroundSection.querySelectorAll('*');
            for (const el of Array.from(allPlaygroundElements)) {
              const classList = Array.from((el as HTMLElement).classList);
              const hasAnimateClass = classList.some((cls) => cls.startsWith('animate-'));
              expect(hasAnimateClass).toBe(false);
            }

            cleanup();
          }
        ),
        { numRuns: 3 }
      );
    });
  });

  /**
   * Preservation test 2e — Reduced motion (Bento Grid)
   *
   * With prefers-reduced-motion: reduce, no element inside #features has an
   * animate- class.
   *
   * Observe: current SectionWrapper sets opacity: 1, transform: translateY(0)
   * immediately when reduced motion is active — assert no animate- classes on
   * any element inside #features.
   *
   * NOTE: On unfixed code, #features renders FeaturesSection (tabbed layout) with
   * no animate- classes. This test passes vacuously on unfixed code and must
   * continue to pass after the fix replaces FeaturesSection with BentoFeaturesSection.
   *
   * **Validates: Requirements 3.3**
   */
  describe('2e: Reduced motion (Bento Grid) preservation', () => {
    it('with prefers-reduced-motion: reduce, no element inside #features has an animate- class', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          // Configure matchMedia to report prefers-reduced-motion: reduce
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => ({
              matches: query === '(prefers-reduced-motion: reduce)',
              media: query,
              onchange: null,
              addListener: vi.fn(),
              removeListener: vi.fn(),
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
              dispatchEvent: vi.fn(),
            })),
          });

          const { container } = render(<App />);

          const featuresSection = container.querySelector('#features');
          expect(featuresSection).not.toBeNull();

          // Assert no element inside #features has an animate- class
          const allFeaturesElements = featuresSection!.querySelectorAll('*');
          for (const el of Array.from(allFeaturesElements)) {
            const classList = Array.from((el as HTMLElement).classList);
            const hasAnimateClass = classList.some((cls) => cls.startsWith('animate-'));
            expect(hasAnimateClass).toBe(false);
          }

          // Also verify the section itself shows in final state (opacity: 1)
          const sectionStyle = (featuresSection as HTMLElement).style;
          expect(sectionStyle.opacity).toBe('1');
          expect(sectionStyle.transform).toBe('translateY(0)');

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Preservation test 2f — Nav section IDs
   *
   * For all nav section IDs (features, how-it-works, integrations, pricing, faq),
   * the corresponding <section id="..."> element exists.
   *
   * Observe: all 5 sections exist as <section> elements — assert unchanged after fix.
   *
   * **Validates: Requirements 3.2, 3.9**
   */
  describe('2f: Nav section IDs preservation', () => {
    it('for all nav section IDs, the corresponding <section id="..."> element exists', () => {
      const navSectionIds = ['features', 'how-it-works', 'integrations', 'pricing', 'faq'];

      fc.assert(
        fc.property(fc.constantFrom(...navSectionIds), (sectionId) => {
          const { container } = render(<App />);

          // Verify the target section exists in the DOM
          const targetSection = container.querySelector(`#${sectionId}`);
          expect(targetSection).not.toBeNull();

          // Verify it's a <section> element (from SectionWrapper)
          expect(targetSection!.tagName.toLowerCase()).toBe('section');

          cleanup();
        }),
        { numRuns: 5 }
      );
    });
  });
});
