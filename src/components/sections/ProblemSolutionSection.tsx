import { SectionWrapper } from '../SectionWrapper';

/** Metric row shown inside a mock UI panel. */
interface MockMetric {
  label: string;
  value: string;
  sub?: string;
}

const withoutMetrics: MockMetric[] = [
  { label: 'Time spent on manual testing', value: '14 hrs/week', sub: '↑ per engineer' },
  { label: 'Bugs reaching production', value: '23%', sub: 'of releases' },
  { label: 'Test coverage', value: '41%', sub: 'average' },
  { label: 'Automation rate', value: '12%', sub: 'of test suite' },
];

const withMetrics: MockMetric[] = [
  { label: 'Time spent on manual testing', value: '2 hrs/week', sub: '↓ 85% reduction' },
  { label: 'Bugs reaching production', value: '3%', sub: 'of releases' },
  { label: 'Test coverage', value: '94%', sub: 'average' },
  { label: 'Automation rate', value: '89%', sub: 'of test suite' },
];

/** A single metric row inside the mock UI panel. */
function MetricRow({ metric, variant }: { metric: MockMetric; variant: 'red' | 'green' }) {
  const valueColor = variant === 'red' ? '#f87171' : '#4ade80';
  const subColor = variant === 'red' ? 'rgba(248,113,113,0.7)' : 'rgba(74,222,128,0.7)';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: '6px',
        background: variant === 'red' ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)',
        marginBottom: '8px',
      }}
    >
      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', flex: 1 }}>
        {metric.label}
      </span>
      <div style={{ textAlign: 'right', marginLeft: '12px' }}>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: valueColor }}>
          {metric.value}
        </span>
        {metric.sub && (
          <div style={{ fontSize: '0.7rem', color: subColor }}>{metric.sub}</div>
        )}
      </div>
    </div>
  );
}

/** Mock browser chrome bar at the top of each panel. */
function MockBrowserBar({ variant }: { variant: 'red' | 'green' }) {
  const dotColors =
    variant === 'red'
      ? ['#f87171', '#fbbf24', 'rgba(255,255,255,0.2)']
      : ['#4ade80', '#fbbf24', 'rgba(255,255,255,0.2)'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        borderBottom:
          variant === 'red'
            ? '1px solid rgba(239,68,68,0.2)'
            : '1px solid rgba(34,197,94,0.2)',
        marginBottom: '12px',
      }}
    >
      {dotColors.map((color, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: color,
            display: 'inline-block',
          }}
        />
      ))}
      <span
        style={{
          flex: 1,
          height: '16px',
          borderRadius: '4px',
          background: 'rgba(255,255,255,0.06)',
          marginLeft: '8px',
        }}
      />
    </div>
  );
}

/** Left panel — WITHOUT Genie QA (red-tinted). */
function WithoutPanel() {
  return (
    <div
      style={{
        flex: 1,
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '12px',
        background: 'rgba(239,68,68,0.04)',
        padding: '20px',
        minWidth: 0,
      }}
    >
      {/* Panel header */}
      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          ✗ WITHOUT Genie QA
        </span>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          Manual QA workflow
        </p>
      </div>

      {/* Mock browser UI */}
      <div
        style={{
          borderRadius: '8px',
          border: '1px solid rgba(239,68,68,0.15)',
          background: 'rgba(0,0,0,0.3)',
          padding: '12px',
          overflow: 'hidden',
        }}
      >
        <MockBrowserBar variant="red" />
        {withoutMetrics.map((metric, i) => (
          <MetricRow key={i} metric={metric} variant="red" />
        ))}
        {/* Status bar */}
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '0.9rem' }}>⚠️</span>
          <span style={{ fontSize: '0.75rem', color: '#f87171' }}>
            3 regressions found in production
          </span>
        </div>
      </div>
    </div>
  );
}

/** Right panel — WITH Genie QA (green-tinted). */
function WithPanel() {
  return (
    <div
      style={{
        flex: 1,
        border: '1px solid rgba(34,197,94,0.3)',
        borderRadius: '12px',
        background: 'rgba(34,197,94,0.04)',
        padding: '20px',
        minWidth: 0,
      }}
    >
      {/* Panel header */}
      <div style={{ marginBottom: '16px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(34,197,94,0.12)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: '#4ade80',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          ✓ WITH Genie QA
        </span>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          Automated QA workflow
        </p>
      </div>

      {/* Mock browser UI */}
      <div
        style={{
          borderRadius: '8px',
          border: '1px solid rgba(34,197,94,0.15)',
          background: 'rgba(0,0,0,0.3)',
          padding: '12px',
          overflow: 'hidden',
        }}
      >
        <MockBrowserBar variant="green" />
        {withMetrics.map((metric, i) => (
          <MetricRow key={i} metric={metric} variant="green" />
        ))}
        {/* Status bar */}
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '0.9rem' }}>✅</span>
          <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>
            All 247 tests passed · 0 regressions
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Contrasts current QA pain points with Genie QA improvements using a
 * split-screen interactive comparison with red-tinted "without" and
 * green-tinted "with" mock UI panels.
 *
 * Requirements: 2.2, 3.2
 */
export function ProblemSolutionSection() {
  return (
    <SectionWrapper id="problem-solution" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          QA Doesn't Have to Be Painful
        </h2>
        <p className="text-muted text-center max-w-2xl mx-auto mb-12 text-lg">
          See how Genie QA transforms your testing workflow.
        </p>

        {/* Split-screen comparison container */}
        <div
          data-testid="split-comparison"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            alignItems: 'stretch',
          }}
          className="split-comparison-panels"
        >
          <WithoutPanel />

          {/* VS divider */}
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '1px',
                flex: 1,
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                padding: '6px 10px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              VS
            </span>
            <div
              style={{
                width: '1px',
                flex: 1,
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)',
              }}
            />
          </div>

          <WithPanel />
        </div>

        {/* Mobile: stack panels vertically via CSS */}
        <style>{`
          @media (max-width: 767px) {
            .split-comparison-panels {
              flex-direction: column !important;
            }
          }
        `}</style>
      </div>
    </SectionWrapper>
  );
}
