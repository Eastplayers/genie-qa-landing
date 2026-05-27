/** Pricing tier configuration for a single plan */
export interface PricingTier {
  name: string;
  price: string; // e.g., "$0", "$49/mo", "Contact us"
  features: string[]; // minimum 3
  cta: {
    label: string; // "Start Free" | "Contact Sales"
    href: string;
  };
  recommended?: boolean;
}

/** Feature comparison row showing availability across tiers */
export interface FeatureComparison {
  name: string;
  tiers: Record<string, 'included' | 'excluded' | 'limited' | string>; // string for quantity values
}

/** Complete pricing configuration with tiers and feature comparison */
export interface PricingConfig {
  tiers: PricingTier[]; // minimum 3
  features: FeatureComparison[]; // minimum 4
}

/** FAQ item with topic categorization */
export interface FAQItem {
  question: string;
  answer: string;
  topic: 'coding' | 'export' | 'ai' | 'cicd' | 'security' | 'general';
}

/** Integration tool entry */
export interface IntegrationItem {
  name: string;
  category: 'cicd' | 'testing' | 'project-management' | 'communication';
  icon: string; // icon identifier or path
}
