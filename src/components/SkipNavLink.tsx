/**
 * Skip navigation link — the first focusable element on the page.
 * Allows keyboard and screen reader users to bypass the navigation bar
 * and jump directly to the main content area.
 *
 * Requirements: 17.6
 */
export default function SkipNavLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[60] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-accent focus-visible:text-white focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      Skip to main content
    </a>
  );
}
