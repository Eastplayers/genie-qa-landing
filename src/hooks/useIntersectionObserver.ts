import { useEffect, useRef, useState, type RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  /** Visibility threshold to trigger (0-1). Default 0.2 (20%). */
  threshold?: number;
  /** Root margin for the observer. */
  rootMargin?: string;
  /** Whether to disconnect after first intersection. Default true. */
  triggerOnce?: boolean;
}

/**
 * Observes when a referenced element enters the viewport at a configurable threshold.
 * Returns the latest IntersectionObserverEntry for checking `isIntersecting`.
 *
 * Used for entrance animations and scroll-depth analytics.
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = true } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        if (!observerEntry) return;
        setEntry(observerEntry);

        if (observerEntry.isIntersecting && triggerOnce) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return entry;
}
