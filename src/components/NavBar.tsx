import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CTAButton } from './CTAButton';

const NAV_LINKS = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.id);
const NAVBAR_HEIGHT = 64;

/**
 * Fixed navigation bar with responsive hamburger menu.
 *
 * Desktop (≥768px): Horizontal nav links, Login link, and Primary CTA.
 * Mobile (<768px): Hamburger icon that opens a vertical overlay with focus trap.
 *
 * Requirements: 1.5, 1.7, 2.1, 2.2, 2.3, 2.5, 14.2, 14.3, 14.6, 17.4
 */
export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeSection = useScrollSpy(SECTION_IDS);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const loginUrl = 'https://app.genieqa.app/login';
  const registrationUrl = 'https://app.genieqa.app/login';

  // Track scroll position for background transition (transparent → opaque past Hero)
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      const threshold = heroElement
        ? heroElement.offsetTop + heroElement.offsetHeight - NAVBAR_HEIGHT
        : window.innerHeight;
      setIsScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (isMenuOpen) {
      closeMenu();
    }
  };

  // Focus trap for mobile menu
  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key !== 'Tab') return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement | undefined;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement | undefined;

    if (!firstElement || !lastElement) return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Focus first menu item when menu opens
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isMenuOpen]);

  const navBgClass = isScrolled
    ? 'bg-background/95 backdrop-blur-sm shadow-lg'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBgClass}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a
            href="/"
            className="text-foreground font-bold text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            aria-label="Genie QA home"
          >
            Genie QA
          </a>

          {/* Desktop navigation */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1 ${
                    activeSection === link.id
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={loginUrl}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-2 py-1"
              >
                Login
              </a>
              <CTAButton variant="primary" section="navbar" href={registrationUrl}>
                Start Free
              </CTAButton>
              {isScrolled && (
                <CTAButton variant="primary" section="navbar-sticky" href={registrationUrl}>
                  Get Started
                </CTAButton>
              )}
            </div>
          )}

          {/* Hamburger button (mobile) */}
          {isMobile && (
            <button
              ref={hamburgerRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-foreground rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isMenuOpen ? (
                <CloseIcon />
              ) : (
                <HamburgerIcon />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobile && isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="navigation"
          aria-label="Mobile navigation"
          onKeyDown={handleMenuKeyDown}
          className="fixed inset-0 top-16 bg-background/98 backdrop-blur-sm z-40 flex flex-col items-center pt-8 gap-2 overflow-y-auto"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`min-w-[44px] min-h-[44px] px-6 py-3 text-lg font-medium rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeSection === link.id
                  ? 'text-accent'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={loginUrl}
            className="min-w-[44px] min-h-[44px] px-6 py-3 text-lg font-medium text-muted hover:text-foreground transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Login
          </a>
          <div className="mt-4">
            <CTAButton variant="primary" section="navbar" href={registrationUrl}>
              Start Free
            </CTAButton>
          </div>
          {isScrolled && (
            <div className="mt-2">
              <CTAButton variant="primary" section="navbar-sticky-mobile" href={registrationUrl}>
                Get Started
              </CTAButton>
            </div>
          )}
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="mt-8 min-w-[44px] min-h-[44px] px-6 py-3 text-sm text-muted hover:text-foreground rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Close Menu
          </button>
        </div>
      )}
    </nav>
  );
}

/** Hamburger icon — 3 horizontal lines */
function HamburgerIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

/** Close icon — X shape */
function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
