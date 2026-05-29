/**
 * Bug Condition Exploration Property Test — UX Overhaul
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10**
 *
 * Property 1: Bug Condition — Missing Modern UX Patterns
 *
 * CRITICAL: This test is EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists — the page lacks social proof strip, split-screen
 * comparison, large numbered steps, tabbed features, billing toggle, enhanced
 * testimonials, visual rhythm dividers, and "Meet Genie" AI personality section.
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

describe('Property 1: Bug Condition — Missing Modern UX Patterns', () => {
  /**
   * Test that HeroSection contains a social proof strip with avatar stack,
   * user count badge ("Join 500+ QA teams"), and outcome metrics
   * ("85% less manual testing · 3X faster releases").
   *
   * Bug Condition: section.id == 'hero' AND NOT hasSocialProofStrip(section)
   * Validates: Requirements 1.1, 1.10
   */
  it('HeroSection contains social proof strip with avatar stack, user count, and outcome metrics', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const heroSection = container.querySelector('#hero');
        expect(heroSection).not.toBeNull();

        // Query for social proof strip data-testid
        const socialProofStrip = heroSection!.querySelector('[data-testid="social-proof-strip"]');
        expect(socialProofStrip).not.toBeNull();

        // Query for avatar images within the social proof strip
        const avatarImages = socialProofStrip!.querySelectorAll('img, [class*="avatar"], svg[class*="avatar"]');
        expect(avatarImages.length).toBeGreaterThanOrEqual(4);

        // Query for user count text
        const stripText = socialProofStrip!.textContent || '';
        expect(stripText).toContain('500+');

        // Query for outcome metrics
        expect(stripText).toMatch(/85%.*less.*manual.*testing|3X.*faster.*releases/i);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that HeroSection contains a trust line with checkmark icons and muted text
   * ("No credit card · Setup in 2 min · Cancel anytime").
   *
   * Validates: Requirement 1.1
   */
  it('HeroSection contains trust line with checkmark icons and muted text', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const heroSection = container.querySelector('#hero');
        expect(heroSection).not.toBeNull();

        // Query for trust line data-testid
        const trustLine = heroSection!.querySelector('[data-testid="trust-line"]');
        expect(trustLine).not.toBeNull();

        // Verify trust line contains expected text
        const trustText = trustLine!.textContent || '';
        expect(trustText).toContain('No credit card');
        expect(trustText).toContain('Setup in 2 min');
        expect(trustText).toContain('Cancel anytime');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that ProblemSolutionSection renders a split-screen interactive comparison
   * with left panel "WITHOUT Genie QA" (red-tinted) and right panel "WITH Genie QA" (green-tinted).
   *
   * Bug Condition: section.id == 'problem-solution' AND NOT hasSplitScreenComparison(section)
   * Validates: Requirement 1.2
   */
  it('ProblemSolutionSection renders split-screen interactive comparison with WITHOUT/WITH panels', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const problemSection = container.querySelector('#problem-solution');
        expect(problemSection).not.toBeNull();

        // Query for split comparison data-testid
        const splitComparison = problemSection!.querySelector('[data-testid="split-comparison"]');
        expect(splitComparison).not.toBeNull();

        // Query for panel headings
        const panelText = splitComparison!.textContent || '';
        expect(panelText).toMatch(/WITHOUT\s+Genie\s*QA/i);
        expect(panelText).toMatch(/WITH\s+Genie\s*QA/i);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that HowItWorksSection renders exactly 3 steps with large "01", "02", "03" numbers,
   * bold uppercase headings ("RECORD", "GENERATE", "EXECUTE"), and embedded mockup elements.
   *
   * Bug Condition: section.id == 'how-it-works' AND NOT hasLargeNumberedSteps(section)
   * Validates: Requirement 1.3
   */
  it('HowItWorksSection renders 3 large numbered steps with bold uppercase headings and mockups', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const howItWorksSection = container.querySelector('#how-it-works');
        expect(howItWorksSection).not.toBeNull();

        const sectionText = howItWorksSection!.textContent || '';

        // Query for large step numbers "01", "02", "03"
        expect(sectionText).toContain('01');
        expect(sectionText).toContain('02');
        expect(sectionText).toContain('03');

        // Query for bold uppercase headings
        expect(sectionText).toContain('RECORD');
        expect(sectionText).toContain('GENERATE');
        expect(sectionText).toContain('EXECUTE');

        // Query for embedded mockup containers
        const mockupContainers = howItWorksSection!.querySelectorAll(
          '[data-testid*="mockup"], [class*="mockup"], [role="img"]'
        );
        expect(mockupContainers.length).toBeGreaterThanOrEqual(3);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that FeaturesSection renders a tabbed interface with category tabs
   * ("Recording", "AI Generation", "Execution", "Collaboration") and tab panel content.
   *
   * Bug Condition: section.id == 'features' AND NOT hasTabbedInterface(section)
   * Validates: Requirement 1.4
   */
  it('FeaturesSection renders tabbed interface with category tabs and tab panels', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const featuresSection = container.querySelector('#features');
        expect(featuresSection).not.toBeNull();

        // Query for tablist role
        const tablist = featuresSection!.querySelector('[role="tablist"]');
        expect(tablist).not.toBeNull();

        // Query for individual tabs
        const tabs = featuresSection!.querySelectorAll('[role="tab"]');
        expect(tabs.length).toBeGreaterThanOrEqual(4);

        // Verify tab labels
        const tabTexts = Array.from(tabs).map((tab) => tab.textContent?.trim() || '');
        expect(tabTexts).toContain('Recording');
        expect(tabTexts).toContain('AI Generation');
        expect(tabTexts).toContain('Execution');
        expect(tabTexts).toContain('Collaboration');

        // Query for tab panel
        const tabpanel = featuresSection!.querySelector('[role="tabpanel"]');
        expect(tabpanel).not.toBeNull();

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that PricingSection renders a Monthly/Annual billing toggle with discount badge ("Save 20%").
   *
   * Bug Condition: section.id == 'pricing' AND NOT hasBillingToggle(section)
   * Validates: Requirement 1.6
   */
  it('PricingSection renders Monthly/Annual billing toggle with discount badge', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const pricingSection = container.querySelector('#pricing');
        expect(pricingSection).not.toBeNull();

        // Query for toggle/switch element (button with role="switch" or input type="checkbox" styled as toggle)
        const toggle = pricingSection!.querySelector(
          '[role="switch"], input[type="checkbox"], [data-testid="billing-toggle"]'
        );
        expect(toggle).not.toBeNull();

        // Query for Monthly/Annual text
        const sectionText = pricingSection!.textContent || '';
        expect(sectionText).toMatch(/monthly/i);
        expect(sectionText).toMatch(/annual/i);

        // Query for discount badge text
        expect(sectionText).toContain('Save 20%');

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that SocialProofSection renders enhanced testimonial cards with star ratings,
   * "VERIFIED CUSTOMER" badges, and company logos.
   *
   * Bug Condition: section.id == 'social-proof' AND NOT hasEnhancedTestimonials(section)
   * Validates: Requirement 1.5
   */
  it('SocialProofSection renders enhanced testimonials with star ratings, verified badges, and logos', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        const socialProofSection = container.querySelector('#social-proof');
        expect(socialProofSection).not.toBeNull();

        // Query for star rating elements (★ characters or SVG stars)
        const starElements = socialProofSection!.querySelectorAll(
          '[class*="star"], [aria-label*="star"], [data-testid*="star"]'
        );
        expect(starElements.length).toBeGreaterThan(0);

        // Query for "VERIFIED CUSTOMER" badge text
        const sectionText = socialProofSection!.textContent || '';
        expect(sectionText).toMatch(/VERIFIED\s*CUSTOMER/i);

        // Query for company logo images
        const logoImages = socialProofSection!.querySelectorAll(
          'img[alt*="logo"], [data-testid*="company-logo"], [aria-label*="logo"]'
        );
        expect(logoImages.length).toBeGreaterThan(0);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that visual rhythm dividers (sparkle ✦ decorations or gradient lines) exist
   * between major sections.
   *
   * Bug Condition: section.id == 'section-divider' AND NOT hasVisualRhythmDividers()
   * Validates: Requirement 1.7
   */
  it('Visual rhythm dividers exist between major sections', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Query for section divider elements
        const dividers = container.querySelectorAll('[data-testid="section-divider"]');
        expect(dividers.length).toBeGreaterThan(0);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that a "Meet Genie" AI personality section exists with AI avatar,
   * mode cards ("Smart Mode", "Guided Mode"), and demo content.
   *
   * Bug Condition: section.id == 'meet-genie' AND NOT hasAIPersonalitySection()
   * Validates: Requirement 1.8
   */
  it('"Meet Genie" AI personality section exists with avatar and mode cards', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<App />);

        // Query for #meet-genie section
        const meetGenieSection = container.querySelector('#meet-genie');
        expect(meetGenieSection).not.toBeNull();

        // Query for mode card content
        const sectionText = meetGenieSection!.textContent || '';
        expect(sectionText).toMatch(/Smart\s*Mode/i);
        expect(sectionText).toMatch(/Guided\s*Mode/i);

        cleanup();
      }),
      { numRuns: 1 }
    );
  });

  /**
   * Test that section headings use large typography (classes containing text-5xl or larger)
   * and sections use generous spacing (classes containing py-24 or larger).
   *
   * Bug Condition: section.typography.maxHeadingSize < 'text-5xl'
   * Validates: Requirement 1.9
   */
  it('Section headings use large typography (≥text-5xl) and generous spacing (≥py-24)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'problem-solution', 'pricing'),
        (sectionId) => {
          const { container } = render(<App />);

          const section = container.querySelector(`#${sectionId}`);
          expect(section).not.toBeNull();

          // Check for large typography classes on headings (text-5xl, text-6xl, text-7xl)
          const headings = section!.querySelectorAll('h1, h2');
          const hasLargeTypography = Array.from(headings).some((heading) => {
            const classes = heading.className || '';
            return (
              classes.includes('text-5xl') ||
              classes.includes('text-6xl') ||
              classes.includes('text-7xl')
            );
          });
          expect(hasLargeTypography).toBe(true);

          // Check for generous spacing on the section element itself
          const sectionClasses = section!.className || '';
          const hasGenerousSpacing =
            sectionClasses.includes('py-24') ||
            sectionClasses.includes('py-28') ||
            sectionClasses.includes('py-32');
          expect(hasGenerousSpacing).toBe(true);

          cleanup();
        }
      ),
      { numRuns: 3 }
    );
  });
});
