import { ReactNode } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import SkipNavLink from './SkipNavLink';

interface LegalLayoutProps {
  children: ReactNode;
}

/**
 * Minimal layout for legal pages (Privacy Policy, Terms of Service).
 * Reuses NavBar and Footer from the main landing page.
 */
export function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SkipNavLink />
      <header>
        <NavBar />
      </header>
      <main id="main-content" className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
