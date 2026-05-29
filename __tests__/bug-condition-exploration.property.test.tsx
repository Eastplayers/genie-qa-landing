/**
 * Bug Condition Exploration Property Test
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10**
 *
 * Property 1: Bug Condition — Landing Page Premium Visual Deficiency
 *
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists — the page lacks premium visual treatments,
 * animated demos, required sections, and outcome-focused CTAs.
 *
 * DO NOT attempt to fix the test or the code when it fails.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
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

describe('Property 1: Bug Condition — Landing Page Premium Visual Deficiency', () => {
  /**
   * Test that the Hero section contains elements with CSS animation properties.
   * Will fail because HeroDashboardMockup.tsx is static with no @keyframes or animation-name.
   *
   * Validates: Requirement 1.1
   */
  it('Hero section contains CSS animation elements (animated AI demo)', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // The hero section should contain elements with animation-related classes
        // indicating @keyframes-based CSS animations (typing, cursor-scan, status-pulse)
        const heroSection = container.querySelector('#hero');
        expect(heroSection).not.toBeNull();

        // Look for elements with animation classes that indicate CSS @keyframes usage
        const animatedElements = heroSection!.querySelectorAll(
          '[class*="animate-"], [class*="typing"], [class*="cursor-scan"], [class*="status-pulse"]'
        );

        expect(animatedElements.length).toBeGreaterThan(0);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that the Hero h1 contains audience-specific language.
   * Will fail because current headline is "Automation Testing Without Writing Complex Code" (generic).
   *
   * Validates: Requirement 1.2
   */
  it('Hero headline contains audience-specific language ("Manual Test Flows", "Without Writing Code")', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const heroSection = container.querySelector('#hero');
        expect(heroSection).not.toBeNull();

        const h1 = heroSection!.querySelector('h1');
        expect(h1).not.toBeNull();

        const headlineText = h1!.textContent || '';

        // The headline should contain audience-specific language that communicates
        // the specific pain solved (turning manual test flows into automation)
        expect(headlineText).toContain('Manual Test Flows');
        expect(headlineText).toContain('Without Writing Code');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that the DOM contains sections with IDs security-privacy, technical-credibility, and transformation.
   * Will fail because these sections don't exist in the current page.
   *
   * Validates: Requirements 1.9, 1.10, 1.6
   */
  it('DOM contains required section IDs: security-privacy, technical-credibility, transformation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('security-privacy', 'technical-credibility', 'transformation'),
        (sectionId) => {
          const { container } = render(<App />);

          const section = container.querySelector(`#${sectionId}`);
          expect(section).not.toBeNull();

          cleanup();
        }
      ),
      { numRuns: 3 }
    );
  });

  /**
   * Test that feature cards use layered surface classes (.surface-elevated, .surface-ai)
   * rather than flat bg-card border border-border.
   * Will fail because all cards currently use flat treatment.
   *
   * Validates: Requirement 1.3
   */
  it('Feature cards use premium surface classes (.surface-elevated, .surface-ai) instead of flat bg-card', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const featuresSection = container.querySelector('#features');
        expect(featuresSection).not.toBeNull();

        // Get all padded containers within the features section (p-6 or p-8)
        const cards = featuresSection!.querySelectorAll('[class*="p-6"], [class*="p-8"]');
        expect(cards.length).toBeGreaterThan(0);

        // At least some cards should use premium surface classes
        const premiumCards = Array.from(cards).filter(
          (card) =>
            card.classList.contains('surface-elevated') ||
            card.classList.contains('surface-ai')
        );

        expect(premiumCards.length).toBeGreaterThan(0);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that CTA buttons contain outcome-focused labels rather than generic "Start Free".
   * Will fail because current CTAs use "Start Free" and "Book Demo".
   *
   * Validates: Requirement 1.4
   */
  it('CTA buttons contain outcome-focused labels ("Generate Your First Test", "Start Automating for Free")', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Check hero CTA for outcome-focused label
        const heroSection = container.querySelector('#hero');
        expect(heroSection).not.toBeNull();

        const heroCTAs = heroSection!.querySelectorAll('a, button');
        const heroCTATexts = Array.from(heroCTAs).map(
          (el) => el.textContent?.trim() || ''
        );

        // Hero should have "Generate Your First Test" instead of "Start Free"
        expect(heroCTATexts).toContain('Generate Your First Test');

        // Final CTA section should have "Start Automating for Free" instead of "Start Free"
        const finalCTASection = container.querySelector('#final-cta');
        expect(finalCTASection).not.toBeNull();

        const finalCTAs = finalCTASection!.querySelectorAll('a, button');
        const finalCTATexts = Array.from(finalCTAs).map(
          (el) => el.textContent?.trim() || ''
        );

        expect(finalCTATexts).toContain('Start Automating for Free');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that the comparison section includes a "Generic AI" column addressing ChatGPT/Copilot.
   * Will fail because current comparison only has Manual/Traditional/GenieQA columns.
   *
   * Validates: Requirement 1.8
   */
  it('Comparison section includes a "Generic AI" column addressing ChatGPT/Copilot', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const comparisonSection = container.querySelector('#comparison');
        expect(comparisonSection).not.toBeNull();

        // The comparison table should have a column header mentioning "Generic AI"
        // or "ChatGPT" or "Copilot"
        const tableHeaders = comparisonSection!.querySelectorAll('th');
        const headerTexts = Array.from(tableHeaders).map(
          (th) => th.textContent?.trim() || ''
        );

        const hasGenericAIColumn = headerTexts.some(
          (text) =>
            text.includes('Generic AI') ||
            text.includes('ChatGPT') ||
            text.includes('Copilot')
        );

        expect(hasGenericAIColumn).toBe(true);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });
});
