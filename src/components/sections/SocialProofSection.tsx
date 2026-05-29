import { SectionWrapper } from '../SectionWrapper';
import socialProofData from '@/config/social-proof.json';

/**
 * Social proof section displaying enhanced testimonial cards with star ratings,
 * "VERIFIED CUSTOMER" badges, before/after metrics, company logos, and
 * SVG/CSS illustrated avatars. Includes hover lift effect that respects
 * prefers-reduced-motion.
 *
 * Requirements: 2.5, 3.3, 3.4
 */

/** Renders 1–5 filled/empty star icons for a given rating. */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`star w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-muted/30'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** SVG/CSS illustrated avatar — unique per initials, no external images. */
function IllustratedAvatar({ initials, index }: { initials: string; index: number }) {
  // Cycle through a set of accent-adjacent hues for visual variety
  const hues = ['#e97d2c', '#3b82f6', '#8b5cf6'];
  const bg = hues[index % hues.length];

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="flex-shrink-0 rounded-full"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill={bg} fillOpacity="0.2" />
      {/* Subtle inner ring */}
      <circle cx="20" cy="20" r="19" fill="none" stroke={bg} strokeWidth="1" strokeOpacity="0.5" />
      {/* Head */}
      <circle cx="20" cy="16" r="6" fill={bg} fillOpacity="0.7" />
      {/* Body arc */}
      <path
        d="M8 36 Q8 28 20 28 Q32 28 32 36"
        fill={bg}
        fillOpacity="0.5"
      />
      {/* Initials overlay */}
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        fontWeight="700"
        fill={bg}
        fontFamily="system-ui, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}

/** Company logo rendered as a styled text badge — CSS/SVG only, no images. */
function CompanyLogo({ company }: { company: string }) {
  return (
    <div
      data-testid={`company-logo-${company.toLowerCase().replace(/\s+/g, '-')}`}
      aria-label={`${company} logo`}
      className="inline-flex items-center px-2 py-0.5 rounded border border-border bg-background/50 text-xs font-semibold text-muted tracking-wide"
    >
      {company}
    </div>
  );
}

export function SocialProofSection() {
  const { metric, testimonials, logos } = socialProofData;

  return (
    <SectionWrapper id="social-proof" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background text-sm text-muted mb-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-accent"
            >
              <path
                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path
                d="M23 21v-2a4 4 0 00-3-3.87"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.13a4 4 0 010 7.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Trusted by QA Teams</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real Results from Real Teams
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            QA professionals who switched to Genie QA measure the difference in hours saved,
            not features listed.
          </p>
        </div>

        {/* Headline metric */}
        <div className="text-center mb-12">
          <span className="text-5xl md:text-6xl font-bold text-accent">
            {metric.value}
          </span>
          <p className="text-muted text-lg mt-2">{metric.label}</p>
        </div>

        {/* Enhanced testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card surface-elevated border-luminance p-6 flex flex-col gap-4"
            >
              {/* Star rating */}
              <StarRating count={testimonial.stars} />

              {/* Verified badge */}
              <div className="inline-flex items-center gap-1 self-start">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-green-500"
                >
                  <path
                    d="M12 2L4 6v6c0 5.25 3.4 10.2 8 11.6 4.6-1.4 8-6.35 8-11.6V6l-8-4z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-green-500 text-xs font-semibold tracking-wider uppercase">
                  VERIFIED CUSTOMER
                </span>
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-foreground/90 text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              {/* Before/after metric */}
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-medium line-through">
                  {testimonial.metric.before}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-accent flex-shrink-0"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 font-medium">
                  {testimonial.metric.after}
                </span>
              </div>

              {/* Author header — illustrated avatar + name/role + company logo */}
              <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                <IllustratedAvatar initials={testimonial.avatar} index={index} />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground font-semibold text-sm truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-muted text-xs truncate">
                    {testimonial.role}
                  </p>
                </div>
                <CompanyLogo company={testimonial.company} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface-elevated text-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-green-500"
            >
              <path
                d="M12 2L4 6v6c0 5.25 3.4 10.2 8 11.6 4.6-1.4 8-6.35 8-11.6V6l-8-4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-foreground font-medium">
              Built with Playwright · 100% Native
            </span>
          </div>
        </div>

        {/* Integration logos */}
        <div className="text-center">
          <p className="text-muted text-sm mb-6">Integrates with your existing workflow</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="social-proof-logo w-28 h-12 rounded-lg surface-elevated flex items-center justify-center"
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
