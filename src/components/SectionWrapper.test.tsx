import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SectionWrapper } from './SectionWrapper';
import * as analytics from '../utils/analytics';

// Mock IntersectionObserver
let observerCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockObserve.mockReset();
  mockDisconnect.mockReset();

  global.IntersectionObserver = vi.fn((callback) => {
    observerCallback = callback as typeof observerCallback;
    return {
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: vi.fn(),
      root: null,
      rootMargin: '0px',
      thresholds: [0.2],
      takeRecords: () => [],
    };
  }) as unknown as typeof IntersectionObserver;

  // Default: no reduced motion
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
});

describe('SectionWrapper', () => {
  it('renders a section element with the given id', () => {
    render(
      <SectionWrapper id="features">
        <p>Content</p>
      </SectionWrapper>
    );

    const section = document.getElementById('features');
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe('SECTION');
  });

  it('renders children content', () => {
    render(
      <SectionWrapper id="test-section">
        <h2>Hello World</h2>
      </SectionWrapper>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies optional className', () => {
    render(
      <SectionWrapper id="test" className="py-16 px-4">
        <p>Content</p>
      </SectionWrapper>
    );

    const section = document.getElementById('test');
    expect(section).toHaveClass('py-16', 'px-4');
  });

  it('starts with opacity 0 and translateY(30px) before intersection', () => {
    render(
      <SectionWrapper id="hidden-section">
        <p>Hidden</p>
      </SectionWrapper>
    );

    const section = document.getElementById('hidden-section');
    expect(section?.style.opacity).toBe('0');
    expect(section?.style.transform).toBe('translateY(30px)');
  });

  it('animates to opacity 1 and translateY(0) when intersecting', () => {
    render(
      <SectionWrapper id="visible-section">
        <p>Visible</p>
      </SectionWrapper>
    );

    // Simulate intersection wrapped in act to flush state updates
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    const section = document.getElementById('visible-section');
    expect(section?.style.opacity).toBe('1');
    expect(section?.style.transform).toBe('translateY(0)');
  });

  it('applies ease-out transition with 300ms duration', () => {
    render(
      <SectionWrapper id="animated-section">
        <p>Animated</p>
      </SectionWrapper>
    );

    const section = document.getElementById('animated-section');
    expect(section?.style.transition).toContain('300ms');
    expect(section?.style.transition).toContain('ease-out');
  });

  it('skips animation and shows final state when reduced motion is preferred', () => {
    // Override matchMedia to return reduced motion
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

    render(
      <SectionWrapper id="no-motion-section">
        <p>No Motion</p>
      </SectionWrapper>
    );

    const section = document.getElementById('no-motion-section');
    expect(section?.style.opacity).toBe('1');
    expect(section?.style.transform).toBe('translateY(0)');
    // No transition property when reduced motion is preferred
    expect(section?.style.transition).toBe('');
  });

  it('does not block pointer events during animation', () => {
    render(
      <SectionWrapper id="clickable-section">
        <button>Click me</button>
      </SectionWrapper>
    );

    const section = document.getElementById('clickable-section');
    // pointer-events should not be set to 'none'
    expect(section?.style.pointerEvents).not.toBe('none');
  });

  it('uses IntersectionObserver with threshold 0.2 and triggerOnce', () => {
    render(
      <SectionWrapper id="observer-section">
        <p>Observed</p>
      </SectionWrapper>
    );

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: 0.2 })
    );
    expect(mockObserve).toHaveBeenCalled();
  });

  describe('scroll depth analytics', () => {
    it('fires scroll_depth event when a tracked section enters viewport', () => {
      const trackEventSpy = vi.spyOn(analytics, 'trackEvent');

      render(
        <SectionWrapper id="features">
          <p>Features content</p>
        </SectionWrapper>
      );

      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });

      expect(trackEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'scroll_depth',
          label: 'features',
          section: 'features',
          timestamp: expect.any(Number),
        })
      );

      trackEventSpy.mockRestore();
    });

    it('fires scroll_depth event only once per section per page load', () => {
      const trackEventSpy = vi.spyOn(analytics, 'trackEvent');

      render(
        <SectionWrapper id="pricing">
          <p>Pricing content</p>
        </SectionWrapper>
      );

      // First intersection
      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });

      // Simulate a second intersection (shouldn't happen with triggerOnce, but guard against it)
      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });

      const scrollDepthCalls = trackEventSpy.mock.calls.filter(
        (call) => call[0].type === 'scroll_depth'
      );
      expect(scrollDepthCalls).toHaveLength(1);

      trackEventSpy.mockRestore();
    });

    it('does not fire scroll_depth event for non-tracked sections', () => {
      const trackEventSpy = vi.spyOn(analytics, 'trackEvent');

      render(
        <SectionWrapper id="trust-indicators">
          <p>Trust indicators</p>
        </SectionWrapper>
      );

      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });

      expect(trackEventSpy).not.toHaveBeenCalled();

      trackEventSpy.mockRestore();
    });

    it('does not fire scroll_depth event before section is visible', () => {
      const trackEventSpy = vi.spyOn(analytics, 'trackEvent');

      render(
        <SectionWrapper id="hero">
          <p>Hero content</p>
        </SectionWrapper>
      );

      // No intersection triggered yet
      expect(trackEventSpy).not.toHaveBeenCalled();

      trackEventSpy.mockRestore();
    });
  });
});
