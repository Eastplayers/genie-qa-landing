export type {
  PricingTier,
  FeatureComparison,
  PricingConfig,
  FAQItem,
  IntegrationItem,
} from './types';

import pricingData from './pricing.json';
import faqData from './faq.json';
import integrationsData from './integrations.json';
import type { PricingConfig, FAQItem, IntegrationItem } from './types';

export const pricingConfig: PricingConfig = pricingData;
export const faqConfig: FAQItem[] = faqData as FAQItem[];
export const integrationsConfig: IntegrationItem[] = integrationsData as IntegrationItem[];
