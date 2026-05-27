import { useMediaQuery } from './useMediaQuery';

/**
 * Returns `true` if the user has enabled the `prefers-reduced-motion: reduce` preference.
 * Used to disable animations and show content in its final state immediately.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
