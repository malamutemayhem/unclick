// AppTesting - admin-only surface that shows, per app, whether its MCP tools
// have been physically tested and what happened. Green = working, red = issue,
// amber = works but needs a manual step (key/login), grey = untested.
//
// Data comes from the build-time results file (src/data/app-test-results.json),
// maintained by the AppTesting loop. This page is read-only: it joins the full
// Apps catalog with the recorded results so every app has a row, then lets you
// filter by status and search by name. Admin access is enforced at the route.

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Check, X, AlertTriangle, Circle, Search, KeyRound } from "lucide-react";
import { APP_CATALOG, APP_COUNT } from "@/lib/appCatalog";
import {
  getAppTestResult,
  APP_TEST_UPDATED_AT,
  APP_TEST_STATUS_META,
  APP_TEST_STATUS_ORDER,
  type AppTestStatus,
} from "@/lib/appTestResults";
import { appMatchesSearch } from "@/lib/appSearch";

const YELLOW = "#E2B93B";

function StatusIcon({ status }: { status: AppTestStatus }) {
  if (status === "pass") return <Check className="h-3.5 w-3.5 text-emerald-300" />;
  if (status === "fail") return <X className="h-3.5 w-3.5 text-red-400" />;
  if (status === "attention") return <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />;
  return <Circle className="h-3.5 w-3.5 text-white/30" />;
}

function StatusBadge({ status }: { status: AppTestStatus }) {
  const meta = APP_TEST_STATUS_META[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${meta.tone}`}>
      <StatusIcon status={status} />
      {meta.label}
    </span>
  );
}

function whenLabel(testedAt?: string | null): string {
  if (!testedAt) return "-";
  // Date portion of the ISO string; locale-free so it stays stable.
  return testedAt.slice(0, 10);
}

const COLS = "grid-cols-[112px_minmax(110px,1fr)_minmax(80px,0.7fr)_46px_minmax(0,1.4fr)_minmax(0,1.4fr)_82px]";

export default function AdminAppTesting() {
  const [status, setStatus] = useState<AppTestStatus | "all">("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () => APP_CATALOG.map((app) => ({ app, result: getAppTestResult(app.slug) })),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<AppTestStatus, number> = { pass: 0, attention: 0, fail: 0, untested: 0 };
    for (const { result } of rows) c[result.status] += 1;
    return c;
  }, [rows]);

  const tested = counts.pass + counts.attention + counts.fail;
  const pctTested = APP_COUNT > 0 ? Math.round((tested / APP_COUNT) * 100) : 0;

  const filtered = useMemo(() => {
    return rows.filter(({ app, result }) => {
      if (status !== "all" && result.status !== status) return false;
      return appMatchesSearch(app, query);
    });
  }, [rows, status, query]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" style={{ color: YELLOW }} />
            <h1 className="text-2xl font-semibold text-white">AppTesting</h1>
          </div>
          <p className="mt-1 text-sm text-[#888]">
            Live test status of every app's MCP tools. Each result comes from physically calling a
            representative action, not from a guess.
          </p>
        </div>
        {APP_TEST_UPDATED_AT && (
          <span className="shrink-0 text-xs text-[#666]">Updated {whenLabel(APP_TEST_UPDATED_AT)}</span>
        )}
      </div>

      {/* What you are looking at */}
      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#999]">
        <p className="font-medium text-[#ccc]">How this fills in</p>
        <p className="mt-1">
          The AppTesting loop works through the catalog a batch at a time, calls a safe action on each app,
          and records the outcome. Paid or side-effecting actions (send, post, generate) are marked for a
          manual check rather than fired automatically. The Comments column holds admin notes and is
          preserved across runs.
        </p>
      </div>

      {/* Progress + status counts */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-4">
          <div className="text-xs uppercase tracking-wider text-[#888]">Tested</div>
          <div className="mt-2 text-3xl font-semibold text-white">{pctTested}%</div>
          <div className="mt-1 text-xs text-[#666]">{tested} of {APP_COUNT} apps</div>
        </div>
        <CountCard label="Working" value={counts.pass} color="#4ade80" onClick={() => setStatus("pass")} active={status === "pass"} />
        <CountCard label="Needs attention" value={counts.attention} color="#fbbf24" onClick={() => setStatus("attention")} active={status === "attention"} />
        <CountCard label="Issue" value={counts.fail} color="#f87171" onClick={() => setStatus("fail")} active={status === "fail"} />
        <CountCard label="Untested" value={counts.untested} color="#888" onClick={() => setStatus("untested")} active={status === "untested"} />
      </div>

      {/* Controls */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps by name or category..."
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 focus:border-[#E2B93B]/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <FilterChip label="All" active={status === "all"} onClick={() => setStatus("all")} />
          {APP_TEST_STATUS_ORDER.map((s) => (
            <FilterChip key={s} label={APP_TEST_STATUS_META[s].label} active={status === s} onClick={() => setStatus(s)} />
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#111111]">
        <div className="min-w-[940px]">
          <div className={`grid ${COLS} items-center gap-3 border-b border-white/[0.08] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white/35`}>
            <span>Status</span>
            <span>App</span>
            <span>Category</span>
            <span className="text-right">Actions</span>
            <span>Result</span>
            <span>Comments</span>
            <span className="text-right">Tested</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(({ app, result }) => (
              <div key={app.slug} className={`grid ${COLS} items-center gap-3 px-3 py-1.5 text-xs`}>
                <div><StatusBadge status={result.status} /></div>
                <Link to={`/apps/${app.slug}`} className="truncate font-medium text-white hover:text-[#9be4e6]">
                  {app.name}
                </Link>
                <span className="truncate text-white/45">{app.category}</span>
                <span className="text-right tabular-nums text-white/40">{app.toolCount}</span>
                <span className="truncate text-white/50" title={result.note ?? ""}>{result.note ?? "-"}</span>
                <span className="truncate text-white/70" title={result.comment ?? ""}>{result.comment ?? "-"}</span>
                <span className="text-right tabular-nums text-white/35">{whenLabel(result.testedAt)}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-8 text-center text-xs text-white/40">No apps match that filter.</div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {APP_TEST_STATUS_ORDER.map((s) => (
          <div key={s} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
            <StatusBadge status={s} />
            <span className="text-[11px] leading-5 text-white/50">{APP_TEST_STATUS_META[s].description}</span>
          </div>
        ))}
      </div>

      {/* Footer: where to fix amber */}
      <div className="mt-4">
        <Link
          to="/admin/keychain"
          className="inline-flex items-center gap-2 rounded-lg border border-[#E2B93B]/25 bg-[#E2B93B]/[0.06] px-3 py-2 text-xs text-[#E2B93B] transition-colors hover:bg-[#E2B93B]/10"
        >
          <KeyRound className="h-4 w-4" />
          Connect keys in Passport to clear "Needs attention"
        </Link>
      </div>
    </div>
  );
}

function CountCard({ label, value, color, onClick, active }: {
  label: string; value: number; color: string; onClick: () => void; active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border bg-[#111111] p-4 text-left transition-colors ${
        active ? "border-[#E2B93B]/50" : "border-white/[0.06] hover:border-white/15"
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-[#888]">{label}</div>
      <div className="mt-2 text-3xl font-semibold" style={{ color }}>{value}</div>
    </button>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "border-[#E2B93B]/40 bg-[#E2B93B]/15 text-[#E2B93B]"
          : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/65"
      }`}
    >
      {label}
    </button>
  );
}
