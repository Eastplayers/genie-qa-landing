import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FAQSection } from './FAQSection';
import type { FAQItem } from '../../config/types';

beforeEach(() => {
  // Mock matchMedia for useReducedMotion / useMediaQuery
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

  // Mock IntersectionObserver for SectionWrapper
  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: '0px',
    thresholds: [0.2],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;
});

const testItems: FAQItem[] = [
  {
    question: 'Do I need to write code?',
    answer: 'No coding is required.',
    topic: 'coding',
  },
  {
    question: 'Can I export Playwright scripts?',
    answer: 'Yes, all tests can be exported.',
    topic: 'export',
  },
  {
    question: 'How does AI customization work?',
    answer: 'AI analyzes your workflows.',
    topic: 'ai',
  },
];

describe('FAQSection', () => {
  it('renders all FAQ questions', () => {
    render(<FAQSection items={testItems} />);
    for (const item of testItems) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it('renders all items collapsed on initial load', () => {
    render(<FAQSection items={testItems} />);
    const buttons = screen.getAllByRole('button');
    for (const button of buttons) {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands an item when its trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<FAQSection items={testItems} />);

    const firstButton = screen.getByRole('button', { name: /Do I need to write code/i });
    await user.click(firstButton);

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    const panelId = firstButton.getAttribute('aria-controls')!;
    const panel = document.getElementById(panelId)!;
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('collapses an expanded item when clicked again', async () => {
    const user = userEvent.setup();
    render(<FAQSection items={testItems} />);

    const firstButton = screen.getByRole('button', { name: /Do I need to write code/i });
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps other items unchanged when one is toggled', async () => {
    const user = userEvent.setup();
    render(<FAQSection items={testItems} />);

    const firstButton = screen.getByRole('button', { name: /Do I need to write code/i });
    const secondButton = screen.getByRole('button', { name: /Can I export/i });

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(secondButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has aria-controls linking trigger to panel', () => {
    render(<FAQSection items={testItems} />);
    const buttons = screen.getAllByRole('button');

    for (const button of buttons) {
      const panelId = button.getAttribute('aria-controls');
      expect(panelId).toBeTruthy();
      const panel = document.getElementById(panelId!);
      expect(panel).toBeInTheDocument();
    }
  });

  it('is keyboard operable with Enter key', async () => {
    const user = userEvent.setup();
    render(<FAQSection items={testItems} />);

    const firstButton = screen.getByRole('button', { name: /Do I need to write code/i });
    firstButton.focus();
    await user.keyboard('{Enter}');

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('is keyboard operable with Space key', async () => {
    const user = userEvent.setup();
    render(<FAQSection items={testItems} />);

    const firstButton = screen.getByRole('button', { name: /Do I need to write code/i });
    firstButton.focus();
    await user.keyboard(' ');

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('loads from faq.json by default when no items prop is provided', () => {
    render(<FAQSection />);
    // faq.json has 5 items
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it('renders the section with id="faq" for nav scroll target', () => {
    const { container } = render(<FAQSection items={testItems} />);
    const section = container.querySelector('section#faq');
    expect(section).toBeInTheDocument();
  });
});
