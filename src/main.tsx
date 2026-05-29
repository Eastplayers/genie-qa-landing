import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import './index.css';

/** Resolve the correct page component based on the current URL path. */
function resolveRoute(): React.ReactElement {
  const path = window.location.pathname.replace(/\/$/, ''); // strip trailing slash
  switch (path) {
    case '/privacy-policy':
      return <PrivacyPolicyPage />;
    case '/terms-of-service':
      return <TermsOfServicePage />;
    default:
      return <App />;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {resolveRoute()}
  </React.StrictMode>,
);
