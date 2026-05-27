/**
 * High-fidelity dashboard mockup component used as the Hero visual.
 * Renders a simplified but realistic-looking Genie QA dashboard UI
 * showing test cases with status indicators.
 *
 * This can be replaced with a real product screenshot later.
 */
export function HeroDashboardMockup() {
  return (
    <div
      className="w-full rounded border border-border shadow-xl overflow-hidden bg-card"
      role="img"
      aria-label="Genie QA dashboard showing generated test cases with pass/fail status indicators"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-background border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/60" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/60" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-green-400/60" aria-hidden="true" />
        </div>
        <span className="text-muted text-xs ml-2">Genie QA — Test Cases</span>
      </div>

      {/* Content area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-36 border-r border-border p-3 gap-2 bg-background/50">
          <SidebarItem icon="📊" label="Dashboard" />
          <SidebarItem icon="🔄" label="Workflows" />
          <SidebarItem icon="📋" label="Test Cases" active />
          <SidebarItem icon="▶️" label="Runs" />
          <SidebarItem icon="⚙️" label="Settings" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-foreground text-sm font-semibold">Login Flow — Generated Tests</p>
              <p className="text-muted text-xs">9 test cases · 7 passed · 1 failed · 1 pending</p>
            </div>
            <div className="px-2 py-1 rounded bg-accent/20 text-accent text-xs font-medium">
              AI Generated
            </div>
          </div>

          {/* Test case list */}
          <div className="space-y-1.5">
            <TestCaseRow status="pass" name="Valid login with correct credentials" />
            <TestCaseRow status="pass" name="Empty email shows validation error" />
            <TestCaseRow status="pass" name="Empty password shows validation error" />
            <TestCaseRow status="fail" name="Invalid credentials show error message" />
            <TestCaseRow status="pass" name="SQL injection attempt is blocked" />
            <TestCaseRow status="pass" name="Session expired redirects to login" />
            <TestCaseRow status="pass" name="Multiple rapid login attempts" />
            <TestCaseRow status="pending" name="Slow network response handling" />
            <TestCaseRow status="pass" name="Missing required field validation" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
        active ? 'bg-accent/10 text-accent font-medium' : 'text-muted'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function TestCaseRow({ status, name }: { status: 'pass' | 'fail' | 'pending'; name: string }) {
  const statusConfig = {
    pass: { icon: '✓', color: 'text-green-400', bg: 'bg-green-400/10' },
    fail: { icon: '✗', color: 'text-red-400', bg: 'bg-red-400/10' },
    pending: { icon: '○', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-border/20 transition-colors">
      <span className={`w-5 h-5 flex items-center justify-center rounded text-xs ${config.bg} ${config.color}`}>
        {config.icon}
      </span>
      <span className="text-foreground text-xs">{name}</span>
    </div>
  );
}
