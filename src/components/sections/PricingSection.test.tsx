import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PricingSection } from './PricingSection';
import type { PricingConfig } from '@/config/types';

vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackConversion: vi.fn(),
}));

beforeEach(() => {
  // Mock IntersectionObserver for SectionWrapper
  global.IntersectionObserver = vi.fn((callback) => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: '0px',
    thresholds: [0.2],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;

  // Mock matchMedia for useReducedMotion/useMediaQuery
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const testConfig: PricingConfig = {
  tiers: [
    {
      name: 'Free',
      price: '$0',
      features: ['1 user', '5 workflows', 'Basic AI generation'],
      cta: { label: 'Start Free', href: '/register' },
      recommended: false,
    },
    {
      name: 'Pro',
      price: '$49/mo',
      features: ['10 users', 'Unlimited workflows', 'Advanced AI generation', 'Priority support'],
      cta: { label: 'Start Free', href: '/register' },
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      features: ['Unlimited users', 'Custom integrations', 'Dedicated support'],
      cta: { label: 'Contact Sales', href: '/contact' },
      recommended: false,
    },
  ],
  features: [
    { name: 'Users', tiers: { Free: '1', Pro: '10', Enterprise: 'Unlimited' } },
    { name: 'AI Usage', tiers: { Free: '50/mo', Pro: 'included', Enterprise: 'included' } },
    { name: 'Storage', tiers: { Free: '1 GB', Pro: '50 GB', Enterprise: 'Unlimited' } },
    { name: 'Support', tiers: { Free: 'excluded', Pro: 'included', Enterprise: 'included' } },
  ],
};

describe('PricingSection', () => {
  it('renders with section id "pricing"', () => {
    const { container } = render(<PricingSection config={testConfig} />);
    const section = container.querySelector('#pricing');
    expect(section).toBeInTheDocument();
  });

  it('renders all tier names', () => {
    render(<PricingSection config={testConfig} />);
    // Tier names appear in both card headings and table headers
    expect(screen.getAllByText('Free').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Pro').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Enterprise').length).toBeGreaterThanOrEqual(1);
  });

  it('renders all tier prices', () => {
    render(<PricingSection config={testConfig} />);
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$49/mo')).toBeInTheDocument();
    expect(screen.getByText('Contact us')).toBeInTheDocument();
  });

  it('renders at least 3 features per tier', () => {
    render(<PricingSection config={testConfig} />);
    // Each tier has at least 3 features listed
    expect(screen.getByText('1 user')).toBeInTheDocument();
    expect(screen.getByText('5 workflows')).toBeInTheDocument();
    expect(screen.getByText('Basic AI generation')).toBeInTheDocument();
    expect(screen.getByText('10 users')).toBeInTheDocument();
    expect(screen.getByText('Unlimited users')).toBeInTheDocument();
  });

  it('visually highlights the recommended tier with accent border', () => {
    const { container } = render(<PricingSection config={testConfig} />);
    // The Pro tier card should have accent styling — find the h3 heading
    const proHeading = screen.getByRole('heading', { name: 'Pro', level: 3 });
    const proCard = proHeading.closest('div[class*="border-accent"]');
    expect(proCard).not.toBeNull();
    expect(proCard?.className).toContain('ring-accent');
  });

  it('displays "Recommended" badge on the recommended tier', () => {
    render(<PricingSection config={testConfig} />);
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('renders "Start Free" CTA for Free and Pro tiers', () => {
    render(<PricingSection config={testConfig} />);
    const startFreeButtons = screen.getAllByText('Start Free');
    expect(startFreeButtons.length).toBe(2);
  });

  it('renders "Contact Sales" CTA for Enterprise tier', () => {
    render(<PricingSection config={testConfig} />);
    expect(screen.getByText('Contact Sales')).toBeInTheDocument();
  });

  it('renders feature comparison table with all feature names', () => {
    render(<PricingSection config={testConfig} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('AI Usage')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders checkmark for "included" features in comparison table', () => {
    const { container } = render(<PricingSection config={testConfig} />);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    // "included" values should render as checkmarks
    const checkmarks = within(table!).getAllByLabelText('Included');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('renders dash for "excluded" features in comparison table', () => {
    const { container } = render(<PricingSection config={testConfig} />);
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    const dashes = within(table!).getAllByLabelText('Not included');
    expect(dashes.length).toBeGreaterThan(0);
  });

  it('renders quantity values as text in comparison table', () => {
    render(<PricingSection config={testConfig} />);
    // Quantity values like "1", "10", "50 GB" should appear as text
    expect(screen.getByText('1 GB')).toBeInTheDocument();
    expect(screen.getByText('50 GB')).toBeInTheDocument();
  });

  it('uses responsive grid classes for tier cards', () => {
    const { container } = render(<PricingSection config={testConfig} />);
    const grid = container.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');
    expect(grid).not.toBeNull();
  });
});
