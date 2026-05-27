import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CTAButton } from './CTAButton';

vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn(),
  trackConversion: vi.fn(),
}));

import { trackEvent, trackConversion } from '@/utils/analytics';

describe('CTAButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders as a button when no href is provided', () => {
    render(
      <CTAButton variant="primary" section="hero">
        Start Free
      </CTAButton>,
    );
    const button = screen.getByRole('button', { name: 'Start Free' });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders as an anchor when href is provided', () => {
    render(
      <CTAButton variant="primary" section="hero" href="https://app.example.com/register">
        Start Free
      </CTAButton>,
    );
    const link = screen.getByRole('link', { name: 'Start Free' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://app.example.com/register');
  });

  it('applies primary variant styles (accent background)', () => {
    render(
      <CTAButton variant="primary" section="hero">
        Start Free
      </CTAButton>,
    );
    const button = screen.getByRole('button', { name: 'Start Free' });
    expect(button.className).toContain('bg-accent');
  });

  it('applies secondary variant styles (outlined, no solid accent background)', () => {
    render(
      <CTAButton variant="secondary" section="hero">
        Book Demo
      </CTAButton>,
    );
    const button = screen.getByRole('button', { name: 'Book Demo' });
    expect(button.className).toContain('border-accent');
    expect(button.className).toContain('text-accent');
    // Should not have a solid bg-accent (only hover:bg-accent/10 is acceptable)
    const classes = button.className.split(' ');
    expect(classes).not.toContain('bg-accent');
  });

  it('fires trackEvent on click with label, section, and timestamp', () => {
    render(
      <CTAButton variant="secondary" section="pricing">
        Book Demo
      </CTAButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Book Demo' }));

    expect(trackEvent).toHaveBeenCalledTimes(1);
    const event = (trackEvent as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(event.type).toBe('click');
    expect(event.label).toBe('Book Demo');
    expect(event.section).toBe('pricing');
    expect(typeof event.timestamp).toBe('number');
  });

  it('fires trackConversion additionally for primary variant clicks', () => {
    render(
      <CTAButton variant="primary" section="hero" href="https://app.example.com/register">
        Start Free
      </CTAButton>,
    );
    fireEvent.click(screen.getByRole('link', { name: 'Start Free' }));

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackConversion).toHaveBeenCalledTimes(1);
    expect(trackConversion).toHaveBeenCalledWith('hero', 'https://app.example.com/register');
  });

  it('does NOT fire trackConversion for secondary variant clicks', () => {
    render(
      <CTAButton variant="secondary" section="demo">
        Book Demo
      </CTAButton>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Book Demo' }));

    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackConversion).not.toHaveBeenCalled();
  });

  it('meets minimum 44x44px touch target via min-w and min-h classes', () => {
    render(
      <CTAButton variant="primary" section="hero">
        Start Free
      </CTAButton>,
    );
    const button = screen.getByRole('button', { name: 'Start Free' });
    expect(button.className).toContain('min-w-[44px]');
    expect(button.className).toContain('min-h-[44px]');
  });

  it('applies border-radius via rounded class', () => {
    render(
      <CTAButton variant="primary" section="hero">
        Start Free
      </CTAButton>,
    );
    const button = screen.getByRole('button', { name: 'Start Free' });
    expect(button.className).toContain('rounded');
  });
});
