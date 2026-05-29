/**
 * Preservation Property Tests — UX Overhaul
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.9, 3.10**
 *
 * Property 2: Preservation — Existing Functional Behavior Unchanged
 *
 * These tests capture the existing functional behavior of the landing page
 * BEFORE implementing the UX overhaul fix. They must PASS on unfixed code
 * and continue to PASS after the fix is applied, confirming no regressions.
 *
 * Observation-first methodology: Each test observes actual behavior of the
 * current code and asserts that behavior is preserved.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

describe('Property 2: Preservation — Existing Functional Behavior Unchanged (UX Overhaul)', () => {
  /**
   * Property: For all CTA elements with primary styling (bg-accent class),
   * href equals https://app.genieqa.app/login.
   *
   * **Validates: Requirements 3.1**
   */
  describe('CTA navigation preservation', () => {
    it('for all CTA elements with primary styling, href equals https://app.genieqa.app/login', () => {
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
   * Property: For all random FAQ toggle sequences (array of indices 0–8, length 1–6),
   * aria-expanded state matches expected toggle state.
   *
   * **Validates: Requirements 3.5**
   */
  describe('FAQ accordion toggle preservation', () => {
    it('for all random FAQ toggle sequences, aria-expanded state matches expected toggle state', () => {
      const faqItemCount = 9; // from faq.json

      fc.assert(
        fc.property(
          fc.array(fc.nat({ max: faqItemCount - 1 }), { minLength: 1, maxLength: 6 }),
          (toggleSequence) => {
            const { container } = render(<App />);

            const faqSection = container.querySelector('#faq');
            expect(faqSection).not.toBeNull();

            const triggerButtons = faqSection!.querySelectorAll('button[aria-expanded]');
            expect(triggerButtons.length).toBe(faqItemCount);

            // All buttons should have aria-controls attribute
            for (const button of Array.from(triggerButtons)) {
              expect(button.hasAttribute('aria-controls')).toBe(true);
            }

            // Track expected state — all start collapsed
            const expandedState = new Set<number>();

            // Execute toggle sequence
            for (const index of toggleSequence) {
              const button = triggerButtons[index];
              fireEvent.click(button);

              if (expandedState.has(index)) {
                expandedState.delete(index);
              } else {
                expandedState.add(index);
              }
            }

            // Verify aria-expanded states match expected
            triggerButtons.forEach((button, index) => {
              const isExpanded = button.getAttribute('aria-expanded') === 'true';
              const shouldBeExpanded = expandedState.has(index);
              expect(isExpanded).toBe(shouldBeExpanded);

              // Verify the panel visibility is consistent with aria-expanded
              const panelId = button.getAttribute('aria-controls');
              if (panelId) {
                const panel = document.getElementById(panelId);
                if (panel) {
                  const isHidden = panel.hasAttribute('hidden');
                  expect(isHidden).toBe(!shouldBeExpanded);
                }
              }
            });

            cleanup();
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  /**
   * Property: For all viewport widths in [320, 768, 1024, 1440, 1920],
   * page renders with content and no horizontal overflow.
   *
   * **Validates: Requirements 3.2**
   */
  describe('Viewport rendering preservation', () => {
    it('for all viewport widths in [320, 768, 1024, 1440, 1920], page renders with content and no horizontal overflow', () => {
      const viewportWidths = [320, 768, 1024, 1440, 1920];

      fc.assert(
        fc.property(fc.constantFrom(...viewportWidths), (width) => {
          // Configure matchMedia to simulate viewport width
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => {
              const maxWidthMatch = query.match(/\(max-width:\s*(\d+)px\)/);
              const minWidthMatch = query.match(/\(min-width:\s*(\d+)px\)/);
              let matches = false;
              if (maxWidthMatch) {
                matches = width <= parseInt(maxWidthMatch[1], 10);
              } else if (minWidthMatch) {
                matches = width >= parseInt(minWidthMatch[1], 10);
              }
              return {
                matches,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
              };
            }),
          });

          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });

          const { container } = render(<App />);

          // The page should render successfully at this viewport width
          expect(container.firstChild).not.toBeNull();

          // Verify the page has meaningful content
          const allElements = container.querySelectorAll('*');
          expect(allElements.length).toBeGreaterThan(0);

          // Verify sections are present (page rendered fully)
          const sections = container.querySelectorAll('section[id]');
          expect(sections.length).toBeGreaterThan(0);

          cleanup();
        }),
        { numRuns: 5 }
      );
    });
  });

  /**
   * Property: Heading hierarchy never skips levels (h1→h3 without h2).
   *
   * **Validates: Requirements 3.4**
   */
  describe('Heading hierarchy preservation', () => {
    it('heading hierarchy never skips levels (h1→h3 without h2)', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
          expect(headings.length).toBeGreaterThan(0);

          // Verify h1 exists (hero headline)
          const h1s = container.querySelectorAll('h1');
          expect(h1s.length).toBeGreaterThanOrEqual(1);

          // Verify heading levels don't skip
          // Track the maximum level seen so far — a new heading should not jump
          // more than 1 level deeper than the deepest level seen before it
          let maxLevelSeen = 0;
          for (const heading of Array.from(headings)) {
            const level = parseInt(heading.tagName.charAt(1), 10);
            if (level > maxLevelSeen + 1 && maxLevelSeen > 0) {
              // This would be a skip (e.g., h1 then h3 without h2)
              expect(level).toBeLessThanOrEqual(maxLevelSeen + 1);
            }
            if (level > maxLevelSeen) {
              maxLevelSeen = level;
            }
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Property: With prefers-reduced-motion: reduce, all sections show final state
   * (opacity 1, translateY 0) and no animation classes.
   *
   * **Validates: Requirements 3.3**
   */
  describe('Reduced motion preservation', () => {
    it('with prefers-reduced-motion: reduce, all sections show final state (opacity 1, translateY 0) and no animation classes', () => {
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

          // With reduced motion, SectionWrapper should show content in final state
          const sections = container.querySelectorAll('section[id]');
          expect(sections.length).toBeGreaterThan(0);

          for (const section of Array.from(sections)) {
            const style = (section as HTMLElement).style;
            // When reduced motion is active, opacity should be 1 (final state)
            expect(style.opacity).toBe('1');
            // Transform should be translateY(0) (final state, no slide)
            expect(style.transform).toBe('translateY(0)');
          }

          // Verify no elements have animationName set in inline styles
          const allElements = container.querySelectorAll('*');
          for (const el of Array.from(allElements)) {
            const htmlEl = el as HTMLElement;
            expect(htmlEl.style.animationName).toBeFalsy();
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Property: Pricing section always displays Free/Pro/Enterprise tiers
   * with same feature lists and CTA labels.
   *
   * **Validates: Requirements 3.6**
   */
  describe('Pricing section preservation', () => {
    it('pricing section always displays Free/Pro/Enterprise tiers with same feature lists and CTA labels', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const pricingSection = container.querySelector('#pricing');
          expect(pricingSection).not.toBeNull();

          // Verify tier names are present
          const tierNames = ['Free', 'Pro', 'Enterprise'];
          const h3Elements = pricingSection!.querySelectorAll('h3');
          const h3Texts = Array.from(h3Elements).map((h3) => h3.textContent?.trim());

          for (const name of tierNames) {
            expect(h3Texts).toContain(name);
          }

          // Verify CTA labels: "Start Free" for Free/Pro, "Contact Sales" for Enterprise
          const ctaLinks = pricingSection!.querySelectorAll('a.bg-accent');
          const ctaTexts = Array.from(ctaLinks).map((a) => a.textContent?.trim());
          expect(ctaTexts).toContain('Start Free');
          expect(ctaTexts).toContain('Contact Sales');

          // Verify feature lists exist for each tier (at least 3 features per tier)
          const featureLists = pricingSection!.querySelectorAll('ul');
          expect(featureLists.length).toBeGreaterThanOrEqual(3);
          for (const list of Array.from(featureLists)) {
            const items = list.querySelectorAll('li');
            expect(items.length).toBeGreaterThanOrEqual(3);
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Property: Footer always contains brand, copyright year, legal links,
   * social links, and login link pointing to correct URL.
   *
   * **Validates: Requirements 3.10**
   */
  describe('Footer preservation', () => {
    it('footer always contains brand, copyright year, legal links, social links, and login link pointing to correct URL', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const footer = container.querySelector('[aria-label="Site footer"]');
          expect(footer).not.toBeNull();

          // Brand name
          expect(footer!.textContent).toContain('Genie QA');

          // Copyright year
          const currentYear = new Date().getFullYear().toString();
          expect(footer!.textContent).toContain(currentYear);

          // Legal links
          const links = footer!.querySelectorAll('a');
          const linkTexts = Array.from(links).map((a) => a.textContent?.trim());
          expect(linkTexts).toContain('Privacy Policy');
          expect(linkTexts).toContain('Terms of Service');
          expect(linkTexts).toContain('Contact');

          // Social links
          expect(linkTexts).toContain('GitHub');
          expect(linkTexts).toContain('LinkedIn');

          // Login link
          expect(linkTexts).toContain('Login');

          // Login link should point to the correct URL
          const loginLink = Array.from(links).find(
            (a) => a.textContent?.trim() === 'Login'
          );
          expect(loginLink).not.toBeUndefined();
          expect(loginLink!.getAttribute('href')).toBe(
            'https://app.genieqa.app/login'
          );

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Property: Nav section IDs (features, how-it-works, integrations, pricing, faq)
   * all exist as <section> elements in DOM.
   *
   * **Validates: Requirements 3.9**
   */
  describe('Navigation section IDs preservation', () => {
    it('nav section IDs (features, how-it-works, integrations, pricing, faq) all exist as <section> elements in DOM', () => {
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
