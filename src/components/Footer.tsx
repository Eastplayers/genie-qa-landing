/**
 * Footer component with legal links, brand/copyright, social links, and login.
 *
 * - Legal links (Privacy Policy, Terms of Service, Contact) open in same tab
 * - Social links (GitHub, LinkedIn) open in new tab with rel="noopener noreferrer"
 * - Login link styled as text (no filled background), matching NavBar login style
 * - Copyright uses dynamic year via new Date().getFullYear()
 *
 * Requirements: 18.1, 18.2, 18.3, 18.4, 18.5
 */
export function Footer() {
  const loginUrl = import.meta.env.VITE_LOGIN_URL ?? '/login';
  const contactUrl = import.meta.env.VITE_CONTACT_URL ?? '/contact';
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-border bg-card" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and copyright */}
          <div className="flex flex-col gap-2">
            <span className="text-foreground font-bold text-xl">Genie QA</span>
            <p className="text-muted text-sm">
              &copy; {currentYear} Genie QA. All rights reserved.
            </p>
          </div>

          {/* Legal links */}
          <nav className="flex flex-col gap-1" aria-label="Legal links">
            <span className="text-foreground font-medium text-sm mb-1">Legal</span>
            <a
              href="/privacy-policy"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              Terms of Service
            </a>
            <a
              href={contactUrl}
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              Contact
            </a>
          </nav>

          {/* Social links and Login */}
          <nav className="flex flex-col gap-1" aria-label="Social links">
            <span className="text-foreground font-medium text-sm mb-1">Connect</span>
            <a
              href="https://github.com/genieqa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/company/genieqa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              LinkedIn
            </a>
            <a
              href={loginUrl}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded px-2 py-2 w-fit inline-flex items-center"
            >
              Login
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
