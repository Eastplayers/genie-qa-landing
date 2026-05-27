import { useRef, useState, useEffect, type ImgHTMLAttributes, type VideoHTMLAttributes } from 'react';

/**
 * LazyImage — renders an `<img>` with native `loading="lazy"` and
 * Intersection Observer fallback for browsers that don't support it.
 *
 * Use for all images below the fold to reduce initial page load time (Req 15.4).
 */
export function LazyImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    // If native lazy loading is supported, let the browser handle it
    if ('loading' in HTMLImageElement.prototype) {
      setShouldLoad(true);
      return;
    }

    // Fallback: use Intersection Observer for older browsers
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      loading="lazy"
      {...props}
      src={shouldLoad ? props.src : undefined}
      data-src={props.src}
    />
  );
}

/**
 * LazyVideo — renders a `<video>` with `preload="none"` and
 * Intersection Observer to defer loading until near the viewport.
 *
 * Use for all video content below the fold (Req 15.4).
 */
export function LazyVideo(props: VideoHTMLAttributes<HTMLVideoElement> & { sources?: { src: string; type: string }[] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { sources, children, ...videoProps } = props;

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      preload="none"
      {...videoProps}
    >
      {shouldLoad && sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
      {shouldLoad && children}
    </video>
  );
}
