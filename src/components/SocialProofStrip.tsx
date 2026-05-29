/**
 * SocialProofStrip — displays social proof signals below the hero CTAs.
 *
 * Contains:
 * 1. Overlapping avatar stack (4-5 circular SVG/CSS illustrations)
 * 2. User count badge ("Join 500+ QA teams")
 * 3. Outcome metrics with directional arrows ("85% less manual testing · 3X faster releases")
 * 4. Trust line with checkmark icons ("No credit card · Setup in 2 min · Cancel anytime")
 *
 * All avatars use CSS/SVG only (no heavy images) per Lighthouse ≥90 requirement.
 *
 * Requirements: 2.1, 2.10, 3.1, 3.7
 */

/** SVG avatar colors for the overlapping stack */
const AVATAR_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

/** Individual SVG avatar — lightweight circular illustration */
function Avatar({ color, index }: { color: string; index: number }) {
  return (
    <svg
      className="avatar w-9 h-9 rounded-full border-2 border-background"
      style={{ marginLeft: index === 0 ? 0 : '-0.5rem', zIndex: 5 - index }}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="18" fill={color} />
      <circle cx="18" cy="14" r="6" fill="rgba(255,255,255,0.85)" />
      <ellipse cx="18" cy="30" rx="10" ry="8" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}

/** Checkmark icon for trust line items */
function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-500 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SocialProofStrip() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {/* Social proof strip: avatars + count + metrics */}
      <div
        data-testid="social-proof-strip"
        className="flex flex-wrap items-center gap-4"
      >
        {/* Overlapping avatar stack */}
        <div className="flex items-center">
          {AVATAR_COLORS.map((color, i) => (
            <Avatar key={i} color={color} index={i} />
          ))}
        </div>

        {/* User count badge */}
        <span className="text-sm font-medium text-foreground">
          Join 500+ QA teams
        </span>

        {/* Outcome metrics with directional arrows */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            85% less manual testing
          </span>
          <span className="text-muted/50">·</span>
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            3X faster releases
          </span>
        </div>
      </div>

      {/* Trust line */}
      <div
        data-testid="trust-line"
        className="flex flex-wrap items-center gap-3 text-sm text-muted"
      >
        <span className="inline-flex items-center gap-1.5">
          <CheckIcon />
          No credit card
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckIcon />
          Setup in 2 min
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckIcon />
          Cancel anytime
        </span>
      </div>
    </div>
  );
}
