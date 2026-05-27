import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from '../useScrollSpy';

describe('useScrollSpy', () => {
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

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns the first section ID as default active', () => {
    const { result } = renderHook(() => useScrollSpy(['hero', 'features', 'pricing']));
    expect(result.current).toBe('hero');
  });

  it('returns empty string when no section IDs provided', () => {
    const { result } = renderHook(() => useScrollSpy([]));
    expect(result.current).toBe('');
  });

  it('observes all sections that exist in the DOM', () => {
    const section1 = document.createElement('section');
    section1.id = 'hero';
    const section2 = document.createElement('section');
    section2.id = 'features';
    document.body.appendChild(section1);
    document.body.appendChild(section2);

    renderHook(() => useScrollSpy(['hero', 'features']));

    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(section1);
    expect(mockObserve).toHaveBeenCalledWith(section2);
  });

  it('updates active ID to the most visible section', () => {
    const section1 = document.createElement('section');
    section1.id = 'hero';
    const section2 = document.createElement('section');
    section2.id = 'features';
    document.body.appendChild(section1);
    document.body.appendChild(section2);

    const { result } = renderHook(() => useScrollSpy(['hero', 'features']));

    act(() => {
      observeCallback([
        { target: section1, intersectionRatio: 0.2, isIntersecting: true } as Partial<IntersectionObserverEntry>,
        { target: section2, intersectionRatio: 0.8, isIntersecting: true } as Partial<IntersectionObserverEntry>,
      ]);
    });

    expect(result.current).toBe('features');
  });

  it('skips sections not found in the DOM', () => {
    const section1 = document.createElement('section');
    section1.id = 'hero';
    document.body.appendChild(section1);

    renderHook(() => useScrollSpy(['hero', 'nonexistent']));

    expect(mockObserve).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledWith(section1);
  });

  it('disconnects on unmount', () => {
    const section1 = document.createElement('section');
    section1.id = 'hero';
    document.body.appendChild(section1);

    const { unmount } = renderHook(() => useScrollSpy(['hero']));
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('uses multiple thresholds for granular detection', () => {
    const section1 = document.createElement('section');
    section1.id = 'hero';
    document.body.appendChild(section1);

    renderHook(() => useScrollSpy(['hero']));

    const constructorCall = (window.IntersectionObserver as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    const options = constructorCall[1];
    expect(options.threshold).toEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  });
});
