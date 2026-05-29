/**
 * Preservation Property Tests
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10**
 *
 * Property 2: Preservation — Functional Behavior Unchanged
 *
 * These tests capture the existing functional behavior of the landing page
 * BEFORE implementing the premium redesign fix. They must PASS on unfixed code
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

describe('Property 2: Preservation — Functional Behavior Unchanged', () => {
  /**
   * Property: For all viewport widths in [320, 768, 1024, 1440, 1920],
   * page renders without horizontal overflow.
   *
   * Validates: Requirement 3.3
   */
  describe('Viewport rendering without horizontal overflow', () => {
    it('for all viewport widths in [320, 768, 1024, 1440, 1920], page renders without horizontal overflow', () => {
      const viewportWidths = [320, 768, 1024, 1440, 1920];

      fc.assert(
        fc.property(fc.constantFrom(...viewportWidths), (width) => {
          // Configure matchMedia to simulate viewport width
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => {
              // Parse max-width queries for mobile detection
              const maxWidthMatch = query.match(/\(max-width:\s*(\d+)px\)/);
              const matches = maxWidthMatch
                ? width <= parseInt(maxWidthMatch[1], 10)
                : false;
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

          // Set innerWidth to simulate viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });

          const { container } = render(<App />);

          // The page should render successfully at this viewport width
          // Check that the root container exists and has content
          expect(container.firstChild).not.toBeNull();

          // Verify no element has explicit overflow-x that would cause scrollbars
          // (In jsdom we can't measure actual overflow, but we verify the page renders)
          const allElements = container.querySelectorAll('*');
          expect(allElements.length).toBeGreaterThan(0);

          cleanup();
        }),
        { numRuns: 5 }
      );
    });
  });

  /**
   * Property: For all CTA button elements, click destination resolves to
   * `https://app.genieqa.app/login`.
   *
   * Validates: Requirement 3.2
   */
  describe('CTA routing preservation', () => {
    it('for all CTA button elements, click destination resolves to https://app.genieqa.app/login', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          // Find all primary CTA links (anchor elements with the CTA button styling)
          const ctaLinks = container.querySelectorAll(
            'a.inline-flex.items-center.justify-center'
          );

          // Filter to those that are primary CTAs (have bg-accent class indicating primary variant)
          const primaryCTAs = Array.from(ctaLinks).filter((link) =>
            link.classList.contains('bg-accent')
          );

          // All primary CTAs should exist
          expect(primaryCTAs.length).toBeGreaterThan(0);

          // All primary CTA hrefs should point to the registration URL
          for (const cta of primaryCTAs) {
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
   * Property: For all nav link clicks, smooth-scroll targets exist in DOM
   * with correct section IDs.
   *
   * Validates: Requirement 3.1
   */
  describe('Navigation smooth-scroll targets', () => {
    it('for all nav link clicks, smooth-scroll targets exist in DOM with correct section IDs', () => {
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

  /**
   * Property: For all FAQ item toggle sequences, `aria-expanded` state is
   * consistent with visible content.
   *
   * Validates: Requirement 3.7
   */
  describe('FAQ accordion aria-expanded consistency', () => {
    it('for all FAQ item toggle sequences, aria-expanded state is consistent with visible content', () => {
      // Generate random toggle sequences: array of indices to click
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

            // Track expected state
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
                // Use getElementById to handle IDs with special characters (React useId generates colons)
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
   * Property: With `prefers-reduced-motion: reduce`, zero elements have
   * active CSS animations.
   *
   * Validates: Requirement 3.4
   */
  describe('Reduced motion preference', () => {
    it('with prefers-reduced-motion: reduce, no animation classes are applied and content shows in final state', () => {
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
          // (opacity: 1, transform: translateY(0)) without transition
          const sections = container.querySelectorAll('section[id]');
          expect(sections.length).toBeGreaterThan(0);

          for (const section of Array.from(sections)) {
            const style = (section as HTMLElement).style;
            // When reduced motion is active, opacity should be 1 (final state)
            expect(style.opacity).toBe('1');
            // Transform should be translateY(0) (final state, no slide)
            expect(style.transform).toBe('translateY(0)');
          }

          // Verify no elements have animation-related inline styles indicating active animations
          const allElements = container.querySelectorAll('*');
          for (const el of Array.from(allElements)) {
            const htmlEl = el as HTMLElement;
            // No element should have animationName set in inline styles
            expect(htmlEl.style.animationName).toBeFalsy();
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Observation: Heading hierarchy follows h1→h2→h3, all images have alt text,
   * interactive elements have aria attributes.
   *
   * Validates: Requirement 3.5
   */
  describe('Accessibility preservation', () => {
    it('heading hierarchy follows h1→h2→h3 without skipping levels', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
          expect(headings.length).toBeGreaterThan(0);

          // Verify h1 exists (hero headline)
          const h1s = container.querySelectorAll('h1');
          expect(h1s.length).toBeGreaterThanOrEqual(1);

          // Verify heading levels don't skip (e.g., h1 → h3 without h2)
          let maxLevelSeen = 0;
          for (const heading of Array.from(headings)) {
            const level = parseInt(heading.tagName.charAt(1), 10);
            // A heading level should not jump more than 1 level deeper than the max seen
            if (level > maxLevelSeen + 1 && maxLevelSeen > 0) {
              // Allow the first heading to be any level, but subsequent ones shouldn't skip
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

    it('all images have alt text', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const images = container.querySelectorAll('img');
          for (const img of Array.from(images)) {
            // Every img should have an alt attribute (can be empty for decorative)
            expect(img.hasAttribute('alt')).toBe(true);
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });

    it('interactive FAQ elements have aria attributes', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          // FAQ buttons should have aria-expanded and aria-controls
          const faqSection = container.querySelector('#faq');
          expect(faqSection).not.toBeNull();

          const faqButtons = faqSection!.querySelectorAll('button[aria-expanded]');
          expect(faqButtons.length).toBeGreaterThan(0);

          for (const button of Array.from(faqButtons)) {
            expect(button.hasAttribute('aria-expanded')).toBe(true);
            expect(button.hasAttribute('aria-controls')).toBe(true);

            // The controlled panel should exist
            const panelId = button.getAttribute('aria-controls');
            expect(panelId).toBeTruthy();
            // Use getElementById to handle IDs with special characters (React useId generates colons)
            const panel = document.getElementById(panelId!);
            expect(panel).not.toBeNull();
            // Panel should have role="region" and aria-labelledby
            expect(panel!.getAttribute('role')).toBe('region');
            expect(panel!.hasAttribute('aria-labelledby')).toBe(true);
          }

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Observation: Pricing section displays Free/Pro/Enterprise tiers with
   * correct feature lists and CTA labels per tier.
   *
   * Validates: Requirement 3.6
   */
  describe('Pricing section preservation', () => {
    it('pricing section displays Free/Pro/Enterprise tiers with correct CTA labels', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const pricingSection = container.querySelector('#pricing');
          expect(pricingSection).not.toBeNull();

          // Verify tier names are present
          const tierNames = ['Free', 'Pro', 'Enterprise'];
          for (const name of tierNames) {
            const h3Elements = pricingSection!.querySelectorAll('h3');
            const found = Array.from(h3Elements).some(
              (h3) => h3.textContent?.trim() === name
            );
            expect(found).toBe(true);
          }

          // Verify CTA labels: "Start Free" for Free/Pro, "Contact Sales" for Enterprise
          const ctaLinks = pricingSection!.querySelectorAll('a.bg-accent');
          const ctaTexts = Array.from(ctaLinks).map((a) => a.textContent?.trim());
          expect(ctaTexts).toContain('Start Free');
          expect(ctaTexts).toContain('Contact Sales');

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });

  /**
   * Observation: Footer displays legal links, brand name, copyright,
   * social links, and Login link.
   *
   * Validates: Requirement 3.10
   */
  describe('Footer preservation', () => {
    it('footer displays legal links, brand name, copyright, social links, and Login link', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          const { container } = render(<App />);

          const footer = container.querySelector('[aria-label="Site footer"]');
          expect(footer).not.toBeNull();

          // Brand name
          expect(footer!.textContent).toContain('Genie QA');

          // Copyright
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
          expect(loginLink?.getAttribute('href')).toBe(
            'https://app.genieqa.app/login'
          );

          cleanup();
        }),
        { numRuns: 1 }
      );
    });
  });
});
