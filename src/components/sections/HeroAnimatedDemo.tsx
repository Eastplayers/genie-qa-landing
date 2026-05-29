import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Animated AI demonstration component for the Hero section.
 * Shows a two-panel layout:
 * - Left: Mock form UI with an animated "AI cursor" scanning elements
 * - Right: Mock code editor with Playwright/TypeScript lines appearing via typing animation
 * - Status badge transitioning through "Analyzing" → "Generating" → "Ready"
 *
 * Uses pure CSS @keyframes only — no JS animation libraries, no Lottie, no video.
 * Respects prefers-reduced-motion by showing the final state immediately.
 */
export function HeroAnimatedDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="w-full rounded border border-border shadow-xl overflow-hidden bg-card"
      role="img"
      aria-label="AI demonstration showing Genie QA analyzing a form and generating Playwright test code"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400/60" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/60" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-400/60" aria-hidden="true" />
          </div>
          <span className="text-muted text-xs ml-2">Genie QA — AI Test Generation</span>
        </div>
        <StatusBadge animate={!prefersReducedMotion} />
      </div>

      {/* Two-panel content */}
      <div className="flex flex-col sm:flex-row min-h-[220px]">
        {/* Left panel: Mock form UI with AI cursor */}
        <FormPanel animate={!prefersReducedMotion} />

        {/* Right panel: Mock code editor with typing animation */}
        <CodeEditorPanel animate={!prefersReducedMotion} />
      </div>
    </div>
  );
}

/* ─── Status Badge ─── */

interface StatusBadgeProps {
  animate: boolean;
}

/**
 * Status badge that transitions through "Analyzing" → "Generating" → "Ready"
 * using CSS animation-delay for staggered visibility.
 */
function StatusBadge({ animate }: StatusBadgeProps) {
  if (!animate) {
    // Reduced motion: show final state immediately
    return (
      <span className="px-2 py-1 rounded bg-green-400/20 text-green-400 text-xs font-medium">
        Ready
      </span>
    );
  }

  return (
    <span className="relative h-5 w-[90px]" aria-hidden="true">
      {/* Analyzing — visible 0s–2s */}
      <span
        className="absolute inset-0 flex items-center justify-center px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium animate-status-pulse"
        style={{ animation: 'status-pulse 2s ease-in-out 1', animationFillMode: 'forwards', opacity: 0, animationDelay: '0s' }}
      >
        Analyzing
      </span>
      {/* Generating — visible 2s–4s */}
      <span
        className="absolute inset-0 flex items-center justify-center px-2 py-1 rounded bg-yellow-400/20 text-yellow-400 text-xs font-medium animate-status-pulse"
        style={{ animation: 'status-pulse 2s ease-in-out 1', animationFillMode: 'forwards', opacity: 0, animationDelay: '2s' }}
      >
        Generating
      </span>
      {/* Ready — visible from 4s onward */}
      <span
        className="absolute inset-0 flex items-center justify-center px-2 py-1 rounded bg-green-400/20 text-green-400 text-xs font-medium"
        style={{ animation: 'fade-in-up 0.5s ease-out forwards', opacity: 0, animationDelay: '4s' }}
      >
        Ready
      </span>
    </span>
  );
}

/* ─── Form Panel (Left) ─── */

interface FormPanelProps {
  animate: boolean;
}

/**
 * Mock form UI with an animated "AI cursor" that scans form elements
 * using CSS @keyframes translateY animation.
 */
function FormPanel({ animate }: FormPanelProps) {
  return (
    <div className="flex-1 p-4 border-b sm:border-b-0 sm:border-r border-border relative">
      <p className="text-muted text-[10px] uppercase tracking-wider mb-3 font-medium">
        Form Analysis
      </p>

      {/* Mock form fields */}
      <div className="space-y-3">
        <FormField label="Email" placeholder="user@example.com" />
        <FormField label="Password" placeholder="••••••••" />
        <FormField label="Remember me" type="checkbox" />
        <div className="mt-3">
          <div className="w-full h-8 rounded bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-accent text-xs font-medium">Sign In</span>
          </div>
        </div>
      </div>

      {/* AI Cursor — animated scan indicator */}
      {animate ? (
        <div
          className="absolute left-2 top-10 w-1 h-6 rounded-full bg-accent/60 animate-cursor-scan"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

function FormField({ label, placeholder, type }: { label: string; placeholder?: string; type?: string }) {
  if (type === 'checkbox') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3.5 h-3.5 rounded-sm border border-border bg-background" aria-hidden="true" />
        <span className="text-muted text-xs">{label}</span>
      </div>
    );
  }

  return (
    <div>
      <span className="text-muted text-[10px] block mb-1">{label}</span>
      <div className="w-full h-7 rounded border border-border bg-background px-2 flex items-center">
        <span className="text-muted/50 text-xs">{placeholder}</span>
      </div>
    </div>
  );
}

/* ─── Code Editor Panel (Right) ─── */

interface CodeEditorPanelProps {
  animate: boolean;
}

/** Lines of Playwright/TypeScript code shown in the mock editor. */
const CODE_LINES = [
  { indent: 0, text: "test('login flow', async ({ page }) => {" },
  { indent: 1, text: "await page.goto('/login');" },
  { indent: 1, text: "await page.fill('[name=email]', 'user@example.com');" },
  { indent: 1, text: "await page.fill('[name=password]', 'secure123');" },
  { indent: 1, text: "await page.click('button:has-text(\"Sign In\")');" },
  { indent: 1, text: "await expect(page).toHaveURL('/dashboard');" },
  { indent: 0, text: '});' },
];

/**
 * Mock code editor with Playwright/TypeScript lines appearing via CSS typing animation.
 * Each line uses overflow: hidden + width animation for the typing effect.
 */
function CodeEditorPanel({ animate }: CodeEditorPanelProps) {
  return (
    <div className="flex-1 p-4 bg-background/50">
      <p className="text-muted text-[10px] uppercase tracking-wider mb-3 font-medium">
        Generated Test
      </p>

      <div className="font-mono text-[11px] leading-5 space-y-0.5">
        {CODE_LINES.map((line, index) => (
          <CodeLine
            key={index}
            indent={line.indent}
            text={line.text}
            animate={animate}
            delayMs={index * 600 + 1000}
          />
        ))}
      </div>
    </div>
  );
}

interface CodeLineProps {
  indent: number;
  text: string;
  animate: boolean;
  delayMs: number;
}

/**
 * A single code line with typing animation.
 * Uses overflow: hidden + width 0→100% for the typing effect.
 */
function CodeLine({ indent, text, animate, delayMs }: CodeLineProps) {
  const paddingLeft = indent * 16;

  if (!animate) {
    // Reduced motion: show all lines in final state
    return (
      <div className="text-foreground/90 whitespace-nowrap" style={{ paddingLeft }}>
        {colorizeCode(text)}
      </div>
    );
  }

  return (
    <div
      className="whitespace-nowrap overflow-hidden animate-typing text-foreground/90"
      style={{
        paddingLeft,
        width: '0',
        animation: `typing 1.5s steps(${text.length}, end) forwards`,
        animationDelay: `${delayMs}ms`,
      }}
    >
      {colorizeCode(text)}
    </div>
  );
}

/** Simple syntax highlighting for Playwright code. */
function colorizeCode(text: string) {
  // Highlight keywords
  const parts = text.split(/(await|async|test|expect|page|const|let)/g);

  return (
    <>
      {parts.map((part, i) => {
        const isKeyword = /^(await|async|test|expect|const|let)$/.test(part);
        const isMethod = /^(page)$/.test(part);

        if (isKeyword) {
          return (
            <span key={i} className="text-purple-400">
              {part}
            </span>
          );
        }
        if (isMethod) {
          return (
            <span key={i} className="text-accent">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
