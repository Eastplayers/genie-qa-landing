import { useRef, useEffect, type ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { trackEvent } from '../utils/analytics';

/** Section IDs that should fire scroll_depth analytics events. */
const TRACKED_SECTIONS = new Set([
  'hero',
  'problem-solution',
  'features',
  'how-it-works',
  'demo',
  'integrations',
  'pricing',
  'faq',
  'final-cta',
]);

interface SectionWrapperProps {
  /** Section ID used as scroll target for navigation links. */
  id: string;
  /** Section content. */
  children: ReactNode;
  /** Optional additional class names. */
  className?: string;
}

/**
 * Wraps each page section with a `<section>` element, providing:
 * - A scroll-target `id` for navigation links
 * - Entrance animation (fade-in + slide-up 30px, 300ms ease-out)
 * - Reduced-motion support (skips animation, shows final state immediately)
 * - Animation runs only once per element per page load (triggerOnce)
 * - Interactive elements remain clickable during animation (no pointer-events blocking)
 * - Scroll depth analytics event fired once per section per page load (Req 16.2)
 */
export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasFiredScrollDepth = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const entry = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
    triggerOnce: true,
  });

  const isVisible = entry?.isIntersecting ?? false;

  // Fire scroll_depth event once when section enters viewport (Req 16.2)
  useEffect(() => {
    if (isVisible && !hasFiredScrollDepth.current && TRACKED_SECTIONS.has(id)) {
      hasFiredScrollDepth.current = true;
      trackEvent({
        type: 'scroll_depth',
        label: id,
        section: id,
        timestamp: Date.now(),
      });
    }
  }, [isVisible, id]);

  // When reduced motion is preferred, skip animation entirely — show final state.
  const shouldAnimate = !prefersReducedMotion;
  const showContent = prefersReducedMotion || isVisible;

  const animationStyle: React.CSSProperties = shouldAnimate
    ? {
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }
    : {
        opacity: 1,
        transform: 'translateY(0)',
      };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={animationStyle}
    >
      {children}
    </section>
  );
}
