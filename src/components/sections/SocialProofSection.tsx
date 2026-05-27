import { SectionWrapper } from '../SectionWrapper';
import socialProofData from '@/config/social-proof.json';

/**
 * Social proof section displaying user metrics, testimonial, and company logos.
 * Builds visitor trust through evidence of adoption.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */
export function SocialProofSection() {
  const { metric, testimonial, logos } = socialProofData;

  return (
    <SectionWrapper id="social-proof" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline metric */}
        <div className="mb-10">
          <span className="text-5xl md:text-6xl font-bold text-accent">{metric.value}</span>
          <p className="text-muted text-lg mt-2">{metric.label}</p>
        </div>

        {/* Testimonial */}
        <blockquote className="max-w-2xl mx-auto mb-12 p-6 rounded bg-card border border-border">
          <p className="text-foreground text-lg italic leading-relaxed mb-4">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="text-muted text-sm">
            <span className="font-medium text-foreground">{testimonial.name}</span>
            {' — '}
            {testimonial.role}, {testimonial.company}
          </footer>
        </blockquote>

        {/* Company logos */}
        <div>
          <p className="text-muted text-sm mb-4">Join teams from companies like yours</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="w-24 h-10 rounded bg-border/30 border border-border flex items-center justify-center"
                aria-label={logo.name}
              >
                <span className="text-muted text-xs font-medium">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
