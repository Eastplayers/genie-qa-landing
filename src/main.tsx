import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { OnboardingTestingPage } from './pages/solutions/OnboardingTestingPage';
import { AnalyticsTestingPage } from './pages/solutions/AnalyticsTestingPage';
import './index.css';

/** Resolve the correct page component based on the current URL path. */
function resolveRoute(): React.ReactElement {
  const path = window.location.pathname.replace(/\/$/, ''); // strip trailing slash
  switch (path) {
    case '/privacy-policy':
      return <PrivacyPolicyPage />;
    case '/terms-of-service':
      return <TermsOfServicePage />;
    case '/solutions/onboarding-testing':
      return <OnboardingTestingPage />;
    case '/solutions/analytics-testing':
      return <AnalyticsTestingPage />;
    default:
      return <App />;
  }
}

/**
 * If the URL has a hash (e.g. /#how-it-works), scroll to that section after
 * the landing page has mounted. Used when navigating from solution/legal pages.
 */
function scrollToHashOnMount() {
  const hash = window.location.hash; // e.g. "#how-it-works"
  if (!hash) return;
  const sectionId = hash.slice(1); // strip the leading #
  // Wait for React to finish rendering before querying the DOM
  requestAnimationFrame(() => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {resolveRoute()}
  </React.StrictMode>,
);

// Scroll to hash section after landing page mounts (e.g. navigating from /#how-it-works)
scrollToHashOnMount();
