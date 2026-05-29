import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { initAnalytics, getConfigFromEnv } from './utils/analytics';
import { HeroSection } from './components/sections/HeroSection';
import { PersonaSection } from './components/sections/PersonaSection';
import { ProblemSolutionSection } from './components/sections/ProblemSolutionSection';
import { TransformationSection } from './components/sections/TransformationSection';
import { BentoFeaturesSection } from './components/sections/BentoFeaturesSection';
import { AIPlaygroundSection } from './components/sections/AIPlaygroundSection';
import { MetricsStrip } from './components/MetricsStrip';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { TechnicalCredibilitySection } from './components/sections/TechnicalCredibilitySection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { DemoSection } from './components/sections/DemoSection';
import { SecurityPrivacySection } from './components/sections/SecurityPrivacySection';
import { MeetGenieSection } from './components/sections/MeetGenieSection';
import { IntegrationsSection } from './components/sections/IntegrationsSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { BookDemoModal } from './components/BookDemoModal';
import { SectionDivider } from './components/SectionDivider';

/**
 * Root application component.
 * Renders all landing page sections in psychological storytelling flow:
 * Hook → Clarity → Pain → Transformation → Solution → Proof → Simplicity → Trust → Differentiation → CTA
 */
export default function App() {
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

  useEffect(() => {
    const config = getConfigFromEnv();
    initAnalytics(config);
  }, []);

  return (
    <Layout>
      {/* Hook — grab attention */}
      <HeroSection />
      <MetricsStrip />
      <SectionDivider />
      {/* Clarity — who this is for */}
      <PersonaSection />
      <SectionDivider />
      {/* Pain/Before — the problem */}
      <ProblemSolutionSection />
      <SectionDivider />
      {/* Before/After — transformation narrative */}
      <TransformationSection />
      <SectionDivider />
      {/* Solution — feature mapping */}
      <BentoFeaturesSection />
      <SectionDivider />
      {/* Proof — social proof and technical credibility */}
      <SocialProofSection />
      <AIPlaygroundSection />
      <TechnicalCredibilitySection />
      <IntegrationsSection />
      <SectionDivider />
      {/* Simplicity — how it works */}
      <HowItWorksSection />
      <DemoSection />
      <SectionDivider />
      {/* Trust — security and privacy */}
      <SecurityPrivacySection />
      {/* AI Personality — Meet Genie */}
      <MeetGenieSection />
      <SectionDivider />
      {/* Differentiation — competitive comparison */}
      <ComparisonSection />
      <SectionDivider />
      {/* Conversion — pricing, FAQ, final CTA */}
      <PricingSection />
      <SectionDivider />
      <FAQSection />
      <FinalCTASection />
      <BookDemoModal isOpen={isBookDemoOpen} onClose={() => setIsBookDemoOpen(false)} />
    </Layout>
  );
}
