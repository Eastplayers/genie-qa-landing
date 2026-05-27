import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { initAnalytics, getConfigFromEnv } from './utils/analytics';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemSolutionSection } from './components/sections/ProblemSolutionSection';
import { PersonaSection } from './components/sections/PersonaSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { DemoSection } from './components/sections/DemoSection';
import { IntegrationsSection } from './components/sections/IntegrationsSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { BookDemoModal } from './components/BookDemoModal';

/**
 * Root application component.
 * Renders all landing page sections in order within the Layout.
 */
export default function App() {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

  useEffect(() => {
    const config = getConfigFromEnv();
    initAnalytics(config);
  }, []);

  return (
    <Layout>
      <HeroSection onBookDemo={() => setIsBookDemoOpen(true)} />
      <ProblemSolutionSection />
      <PersonaSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <IntegrationsSection />
      <ComparisonSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <BookDemoModal isOpen={isBookDemoOpen} onClose={() => setIsBookDemoOpen(false)} />
    </Layout>
  );
}
