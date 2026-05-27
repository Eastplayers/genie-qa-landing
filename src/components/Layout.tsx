import { ReactNode } from 'react';
import SkipNavLink from './SkipNavLink';
import { NavBar } from './NavBar';
import { Footer } from './Footer';

interface LayoutProps {
  children?: ReactNode;
}

/**
 * Page layout providing semantic HTML structure.
 * Renders SkipNavLink as the first focusable element,
 * followed by header, main, and footer landmarks.
 *
 * Includes overflow-x-hidden to prevent horizontal scroll on mobile (Req 14.1).
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SkipNavLink />
      <header>
        <NavBar />
      </header>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
