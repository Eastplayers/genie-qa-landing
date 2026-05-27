import { trackEvent, trackConversion } from '@/utils/analytics';

export interface CTAButtonProps {
  /** Visual variant — primary uses accent background, secondary uses outlined style */
  variant: 'primary' | 'secondary';
  /** Section identifier for analytics tracking */
  section: string;
  /** Optional URL — renders as <a> when provided, <button> otherwise */
  href?: string;
  /** Optional click handler — called after analytics tracking */
  onClick?: () => void;
  /** Button label content */
  children: React.ReactNode;
}

/**
 * Reusable CTA button component with built-in analytics tracking.
 *
 * - Fires a click event on every click (label, section, timestamp).
 * - Fires an additional conversion event for primary variant clicks.
 * - Renders as `<a>` when `href` is provided, `<button>` otherwise.
 * - Meets 44×44px minimum touch target and uses 0.5rem border-radius.
 *
 * Requirements: 1.1, 1.3, 1.6, 12.4, 12.8, 14.6, 16.1, 16.5
 */
export function CTAButton({ variant, section, href, onClick, children }: CTAButtonProps) {
  const handleClick = (e?: React.MouseEvent) => {
    const label = typeof children === 'string' ? children : '';

    // Always fire click event (Req 16.1)
    trackEvent({
      type: 'click',
      label,
      section,
      timestamp: Date.now(),
    });

    // Fire conversion event for primary CTA clicks (Req 16.5)
    if (variant === 'primary') {
      const destinationUrl = href ?? import.meta.env.VITE_REGISTRATION_URL ?? '';
      trackConversion(section, destinationUrl);
    }

    // If onClick handler provided, prevent default navigation and call it
    if (onClick) {
      e?.preventDefault();
      onClick();
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-6 py-3 rounded font-semibold text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';

  const variantClasses =
    variant === 'primary'
      ? 'bg-accent text-white hover:brightness-110 hover:opacity-90'
      : 'border-2 border-accent text-accent hover:bg-accent/10';

  const className = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={() => handleClick()}>
      {children}
    </button>
  );
}
