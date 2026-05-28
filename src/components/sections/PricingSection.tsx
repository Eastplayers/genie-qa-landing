import { SectionWrapper } from '../SectionWrapper';
import { CTAButton } from '../CTAButton';
import type { PricingConfig, PricingTier, FeatureComparison } from '@/config/types';
import defaultConfig from '@/config/pricing.json';

interface PricingSectionProps {
  /** Optional config for testing; defaults to importing from pricing.json */
  config?: PricingConfig;
}

/**
 * Displays pricing tier cards and a feature comparison table.
 *
 * - Renders minimum 3 tier cards with name, price, features (≥3), and CTA button.
 * - Visually highlights the recommended tier with a distinct border and badge.
 * - CTA: "Start Free" for Free/Pro navigates to registration URL;
 *   "Contact Sales" for Enterprise navigates to contact page.
 * - Side-by-side layout ≥768px, stacked <768px.
 * - Feature comparison table with checkmark/dash/quantity per tier-feature cell.
 *
 * Requirements: 8.1, 8.2, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9
 */
export function PricingSection({ config = defaultConfig }: PricingSectionProps) {
  const { tiers, features } = config;

  const registrationUrl = 'https://app.genieqa.app/login';
  const contactUrl = 'https://app.genieqa.app/login';

  return (
    <SectionWrapper id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Choose the plan that fits your team. Upgrade anytime as you grow.
        </p>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              tier={tier}
              registrationUrl={registrationUrl}
              contactUrl={contactUrl}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable features={features} tiers={tiers} />
      </div>
    </SectionWrapper>
  );
}

interface TierCardProps {
  tier: PricingTier;
  registrationUrl: string;
  contactUrl: string;
}

function TierCard({ tier, registrationUrl, contactUrl }: TierCardProps) {
  const isRecommended = tier.recommended === true;
  const isEnterprise = tier.cta.label === 'Contact Sales';
  const ctaHref = isEnterprise ? contactUrl : registrationUrl;

  return (
    <div
      className={`relative flex flex-col p-6 rounded bg-card border ${
        isRecommended
          ? 'border-accent ring-2 ring-accent'
          : 'border-border'
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded">
          Recommended
        </span>
      )}

      <h3 className="text-foreground font-bold text-xl mb-2">{tier.name}</h3>
      <p className="text-foreground text-3xl font-bold mb-4">{tier.price}</p>

      <ul className="flex-1 space-y-2 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="text-muted text-sm flex items-start gap-2">
            <span className="text-accent mt-0.5" aria-hidden="true">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto [&>a]:w-full [&>button]:w-full">
        <CTAButton
          variant="primary"
          section="pricing"
          href={ctaHref}
        >
          {tier.cta.label}
        </CTAButton>
      </div>

      {/* Risk reducer / spacer — keeps buttons aligned across cards */}
      <p className={`text-xs mt-3 text-center h-4 ${tier.price === '$0' ? 'text-muted' : 'text-transparent select-none'}`}>
        {tier.price === '$0' ? 'No credit card required' : '\u00A0'}
      </p>
    </div>
  );
}

interface FeatureComparisonTableProps {
  features: FeatureComparison[];
  tiers: PricingTier[];
}

function FeatureComparisonTable({ features, tiers }: FeatureComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse" aria-label="Feature comparison across pricing tiers">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="text-left text-foreground font-semibold py-3 px-4">
              Feature
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.name}
                scope="col"
                className="text-center text-foreground font-semibold py-3 px-4"
              >
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => (
            <tr key={feature.name} className="border-b border-border">
              <td className="text-muted py-3 px-4">{feature.name}</td>
              {tiers.map((tier) => (
                <td
                  key={`${feature.name}-${tier.name}`}
                  className="text-center py-3 px-4"
                >
                  <FeatureIndicator value={feature.tiers[tier.name]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface FeatureIndicatorProps {
  value: string | undefined;
}

function FeatureIndicator({ value }: FeatureIndicatorProps) {
  if (!value || value === 'excluded') {
    return <span className="text-muted" aria-label="Not included">—</span>;
  }

  if (value === 'included') {
    return <span className="text-accent" aria-label="Included">✓</span>;
  }

  // For 'limited' or any quantity/text value, display the value itself
  if (value === 'limited') {
    return <span className="text-muted">Limited</span>;
  }

  return <span className="text-foreground">{value}</span>;
}
