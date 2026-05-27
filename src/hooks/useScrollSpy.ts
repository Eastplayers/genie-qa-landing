import { useEffect, useState } from 'react';

/**
 * Observes multiple sections by their IDs and returns the ID of the section
 * currently most visible in the viewport. Used for nav link highlighting.
 */
export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    if (sectionIds.length === 0) return;

    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        }

        // Find the section with the highest visibility ratio
        let maxRatio = 0;
        let mostVisibleId = activeId;

        for (const [id, ratio] of visibilityMap) {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        }

        if (maxRatio > 0) {
          setActiveId(mostVisibleId);
        }
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    const elements: Element[] = [];
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, activeId]);

  return activeId;
}
