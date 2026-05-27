import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../useIntersectionObserver';
import { type RefObject } from 'react';

describe('useIntersectionObserver', () => {
  let observeCallback: (entries: Partial<IntersectionObserverEntry>[]) => void;
  let mockObserve: ReturnType<typeof vi.fn>;
  let mockDisconnect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockObserve = vi.fn();
    mockDisconnect = vi.fn();

    const MockIntersectionObserver = vi.fn((callback: (entries: Partial<IntersectionObserverEntry>[]) => void) => {
      observeCallback = callback;
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: vi.fn(),
      };
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: MockIntersectionObserver,
    });
  });

  it('returns undefined initially', () => {
    const ref = { current: document.createElement('div') } as RefObject<Element>;
    const { result } = renderHook(() => useIntersectionObserver(ref));
    expect(result.current).toBeUndefined();
  });

  it('observes the referenced element', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    renderHook(() => useIntersectionObserver(ref));
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('uses default threshold of 0.2', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    renderHook(() => useIntersectionObserver(ref));

    const constructorCall = (window.IntersectionObserver as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(constructorCall[1]).toEqual(
      expect.objectContaining({ threshold: 0.2 })
    );
  });

  it('accepts custom threshold', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    renderHook(() => useIntersectionObserver(ref, { threshold: 0.5 }));

    const constructorCall = (window.IntersectionObserver as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(constructorCall[1]).toEqual(
      expect.objectContaining({ threshold: 0.5 })
    );
  });

  it('returns the intersection entry when element intersects', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    const { result } = renderHook(() => useIntersectionObserver(ref));

    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.5,
      target: element,
    } as Partial<IntersectionObserverEntry>;

    act(() => {
      observeCallback([mockEntry]);
    });

    expect(result.current).toEqual(expect.objectContaining({ isIntersecting: true }));
  });

  it('disconnects after first intersection when triggerOnce is true (default)', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    renderHook(() => useIntersectionObserver(ref));

    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.5,
      target: element,
    } as Partial<IntersectionObserverEntry>;

    act(() => {
      observeCallback([mockEntry]);
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('does not disconnect when triggerOnce is false', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    renderHook(() => useIntersectionObserver(ref, { triggerOnce: false }));

    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.5,
      target: element,
    } as Partial<IntersectionObserverEntry>;

    act(() => {
      observeCallback([mockEntry]);
    });

    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  it('does not observe when ref is null', () => {
    const ref = { current: null } as RefObject<Element | null>;
    renderHook(() => useIntersectionObserver(ref));
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('disconnects on unmount', () => {
    const element = document.createElement('div');
    const ref = { current: element } as RefObject<Element>;
    const { unmount } = renderHook(() => useIntersectionObserver(ref));
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
