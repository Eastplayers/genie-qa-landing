import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Visual rhythm divider rendered between major landing page sections.
 *
 * Renders sparkle/star decorations (✦) using the accent color (#e97d2c) at
 * low opacity to maintain the dark theme aesthetic. When `prefers-reduced-motion`
 * is active, only static decorations are shown (no animation).
 *
 * Requirements: 2.7, 3.3, 3.8
 */
export function SectionDivider() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      data-testid="section-divider"
      aria-hidden="true"
      className="flex items-center justify-center gap-4 py-2"
    >
      {/* Left gradient line */}
      <div
        className="h-px flex-1 max-w-xs"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(233, 125, 44, 0.25))',
        }}
      />

      {/* Sparkle decorations */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs"
          style={{
            color: 'rgba(233, 125, 44, 0.35)',
            animation: prefersReducedMotion ? 'none' : undefined,
          }}
        >
          ✦
        </span>
        <span
          className="text-base"
          style={{
            color: 'rgba(233, 125, 44, 0.5)',
            animation: prefersReducedMotion ? 'none' : undefined,
          }}
        >
          ✦
        </span>
        <span
          className="text-xs"
          style={{
            color: 'rgba(233, 125, 44, 0.35)',
            animation: prefersReducedMotion ? 'none' : undefined,
          }}
        >
          ✦
        </span>
      </div>

      {/* Right gradient line */}
      <div
        className="h-px flex-1 max-w-xs"
        style={{
          background: 'linear-gradient(to left, transparent, rgba(233, 125, 44, 0.25))',
        }}
      />
    </div>
  );
}
