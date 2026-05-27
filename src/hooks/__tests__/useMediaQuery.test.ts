import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';

describe('useMediaQuery', () => {
  let listeners: Map<string, (event: MediaQueryListEvent) => void>;
  let matchesMap: Map<string, boolean>;

  beforeEach(() => {
    listeners = new Map();
    matchesMap = new Map();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn((query: string) => ({
        matches: matchesMap.get(query) ?? false,
        media: query,
        addEventListener: vi.fn((_event: string, handler: (event: MediaQueryListEvent) => void) => {
          listeners.set(query, handler);
        }),
        removeEventListener: vi.fn((_event: string, _handler: (event: MediaQueryListEvent) => void) => {
          listeners.delete(query);
        }),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('returns false when query does not match', () => {
    matchesMap.set('(min-width: 768px)', false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('returns true when query matches', () => {
    matchesMap.set('(min-width: 768px)', true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    matchesMap.set('(min-width: 768px)', false);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);

    act(() => {
      const handler = listeners.get('(min-width: 768px)');
      handler?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current).toBe(true);
  });

  it('cleans up listener on unmount', () => {
    matchesMap.set('(min-width: 768px)', false);
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(listeners.has('(min-width: 768px)')).toBe(true);

    unmount();
    expect(listeners.has('(min-width: 768px)')).toBe(false);
  });

  it('re-subscribes when query changes', () => {
    matchesMap.set('(min-width: 768px)', true);
    matchesMap.set('(min-width: 1024px)', false);

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: '(min-width: 768px)' } }
    );

    expect(result.current).toBe(true);

    rerender({ query: '(min-width: 1024px)' });
    expect(result.current).toBe(false);
  });
});
