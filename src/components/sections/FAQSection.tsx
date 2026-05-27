import { useState, useId } from 'react';
import { SectionWrapper } from '../SectionWrapper';
import type { FAQItem } from '../../config/types';
import rawItems from '../../config/faq.json';

const defaultItems = rawItems as FAQItem[];

interface FAQSectionProps {
  /** Optional items prop for testing; defaults to faq.json data. */
  items?: FAQItem[];
}

/**
 * Displays frequently asked questions in an accessible accordion format.
 * All items are collapsed on initial load. Each item toggles independently
 * (multiple items can be open simultaneously).
 *
 * Accessibility:
 * - Each trigger button has `aria-expanded` and `aria-controls`
 * - Keyboard operable via Enter/Space (native button behavior)
 * - Answer panels use `role="region"` with `aria-labelledby`
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 17.5
 */
export function FAQSection({ items = defaultItems }: FAQSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const baseId = useId();

  const toggle = (index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <SectionWrapper id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          Everything you need to know about Genie QA.
        </p>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isExpanded = expandedItems.has(index);
            const triggerId = `${baseId}-trigger-${index}`;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div
                key={index}
                className="rounded bg-card border border-border overflow-hidden"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-foreground font-medium hover:bg-border/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-colors"
                >
                  <span>{item.question}</span>
                  <svg
                    className={`w-5 h-5 text-muted flex-shrink-0 ml-4 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isExpanded}
                  className="px-6 pb-4"
                >
                  <p className="text-muted text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
