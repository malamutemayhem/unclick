// AppTesting - admin-only surface that shows, per app, whether its MCP tools
// have been physically tested and what happened. Green = working, red = issue,
// amber = works but needs a manual step (key/login), grey = untested.
//
// Data comes from the build-time results file (src/data/app-test-results.json),
// maintained by the AppTesting loop. This page is read-only: it joins the full
// Apps catalog with the recorded results so every app has a row, then lets you
// filter by status and search by name. Admin access is enforced at the route.

import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Check, X, AlertTriangle, Circle, Search, KeyRound, ChevronDown, ChevronUp, ExternalLink, Loader2 } from "lucide-react";
import { APP_CATALOG, APP_COUNT } from "@/lib/appCatalog";
import {
  getAppTestResult,
  APP_TEST_UPDATED_AT,
  APP_TEST_STATUS_META,
  APP_TEST_STATUS_ORDER,
  type AppTestStatus,
} from "@/lib/appTestResults";
import {
  manualWorkFor,
  MANUAL_WORK_META,
  NEEDS_HUMAN_KINDS,
  type ManualWork,
  type ManualWorkKind,
} from "@/lib/appManualWork";
import { appMatchesSearch } from "@/lib/appSearch";
import { useSession } from "@/lib/auth";

const YELLOW = "#E2B93B";

// Apps a human has personally verified end to end (real inbox, real root
// folder, real push). These start ticked; everything else starts unticked.
// An explicit save in app_human_checks overrides this default per slug.
const DEFAULT_HUMAN_CHECKED = new Set<string>([
  "gmail",
  "google-drive",
  "onedrive",
  "dropbox",
  "github",
  "vercel",
  "supabase",
  "higgsfield",
]);

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

const COLS = "grid-cols-[112px_minmax(110px,1fr)_minmax(80px,0.7fr)_46px_minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_82px_96px]";

// The "Manual work" cell: what a human still has to do before this app works.
// Auto-derived per app (see src/lib/appManualWork.ts). Once the app tests green
// the step is satisfied, so the cell dims and says so instead of nagging.
function ManualWorkCell({ work, status }: { work: ManualWork; status: AppTestStatus }) {
  if (work.kind === "none") {
    if (work.optionalKey) {
      return <span className="text-[11px] text-white/40" title={work.detail}>Key optional</span>;
    }
    if (work.internal) {
      return <span className="text-[11px] text-white/40" title={work.detail}>Internal</span>;
    }
    return <span className="text-white/25">-</span>;
  }
  const meta = MANUAL_WORK_META[work.kind];
  const satisfied = status === "pass";
  const external = work.url && !work.url.startsWith("/");
  return (
    <div className={satisfied ? "opacity-50" : undefined}>
      <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${meta.tone}`}>
        {work.label}
      </span>
      <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-white/40" title={work.detail}>
        {satisfied ? "Done: working here already." : work.detail}
        {!satisfied && work.url && (
          external ? (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-0.5 text-[#9be4e6] hover:underline"
            >
              Open
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ) : (
            <Link to={work.url} className="ml-1 text-[#9be4e6] hover:underline">
              Connect
            </Link>
          )
        )}
      </p>
    </div>
  );
}

// The interactive "Human checked" checkbox. Optimistic: the parent flips the
// value immediately and persists in the background; this cell just renders the
// current state plus a saving/disabled affordance.
function HumanCheckCell({
  checked,
  saving,
  disabled,
  onToggle,
}: {
  checked: boolean;
  saving: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={checked ? "Human checked" : "Not human checked"}
        disabled={disabled || saving}
        onClick={onToggle}
        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-emerald-300/40 bg-emerald-300/15 text-emerald-200"
            : "border-white/15 bg-white/[0.03] text-transparent hover:border-white/30"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        {saving
          ? <Loader2 className="h-3 w-3 animate-spin text-white/50" />
          : <Check className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function ExpandableCell({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  if (!text || text === "-") return <span className={`text-white/40 ${className ?? ""}`}>-</span>;
  const needsExpand = text.length > 50;
  if (!needsExpand) return <span className={className}>{text}</span>;
  return (
    <div className={className}>
      <button type="button" onClick={toggle} className="flex w-full items-start gap-1 text-left">
        <span className={open ? "" : "line-clamp-1"}>{text}</span>
        {open
          ? <ChevronUp className="mt-0.5 h-3 w-3 shrink-0 text-white/30" />
          : <ChevronDown className="mt-0.5 h-3 w-3 shrink-0 text-white/30" />}
      </button>
    </div>
  );
}

export default function AdminAppTesting() {
  const { session } = useSession();
  const [status, setStatus] = useState<AppTestStatus | "all">("all");
  const [work, setWork] = useState<ManualWorkKind | "all" | "needs">("all");
  const [query, setQuery] = useState("");

  // Human-checked state. `overrides` holds only slugs with an explicit stored
  // value; everything else falls back to DEFAULT_HUMAN_CHECKED.
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [savingSlugs, setSavingSlugs] = useState<Set<string>>(() => new Set());
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load the stored overrides once we have an admin session.
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    fetch("/api/app-human-checks", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then((r) => (r.ok ? r.json() : { checks: {} }))
      .then((body) => {
        if (!cancelled && body && typeof body.checks === "object") {
          setOverrides(body.checks as Record<string, boolean>);
        }
      })
      .catch(() => { /* keep built-in defaults on failure */ });
    return () => { cancelled = true; };
  }, [session]);

  const isChecked = useCallback(
    (slug: string): boolean => overrides[slug] ?? DEFAULT_HUMAN_CHECKED.has(slug),
    [overrides],
  );

  const toggleChecked = useCallback(
    (slug: string) => {
      if (!session) { setSaveError("Sign in to save."); return; }
      const next = !(overrides[slug] ?? DEFAULT_HUMAN_CHECKED.has(slug));
      // Optimistic: flip immediately, persist in the background, revert on error.
      setOverrides((prev) => ({ ...prev, [slug]: next }));
      setSavingSlugs((prev) => new Set(prev).add(slug));
      setSaveError(null);
      fetch("/api/app-human-checks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ slug, checked: next }),
      })
        .then(async (r) => {
          if (!r.ok) {
            const body = await r.json().catch(() => ({}));
            throw new Error(body.error ?? "Failed to save.");
          }
        })
        .catch((e) => {
          setOverrides((prev) => ({ ...prev, [slug]: !next }));
          setSaveError(e instanceof Error ? e.message : "Failed to save.");
        })
        .finally(() => {
          setSavingSlugs((prev) => {
            const copy = new Set(prev);
            copy.delete(slug);
            return copy;
          });
        });
    },
    [session, overrides],
  );

  const rows = useMemo(
    () =>
      APP_CATALOG.map((app) => ({
        app,
        result: getAppTestResult(app.slug),
        work: manualWorkFor(app),
      })),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<AppTestStatus, number> = { pass: 0, attention: 0, fail: 0, untested: 0 };
    for (const { result } of rows) c[result.status] += 1;
    return c;
  }, [rows]);

  // Outstanding manual work: the human step is still needed AND the app is not
  // already passing (a pass means the step is satisfied on this deployment).
  const workCounts = useMemo(() => {
    const c: Record<ManualWorkKind, number> = { none: 0, signin: 0, bot_setup: 0, provider_key: 0, env_key: 0 };
    for (const { result, work: w } of rows) {
      if (result.status === "pass") continue;
      c[w.kind] += 1;
    }
    return c;
  }, [rows]);
  const needsHumanCount = NEEDS_HUMAN_KINDS.reduce((n, k) => n + workCounts[k], 0);

  const tested = counts.pass + counts.attention + counts.fail;
  const pctTested = APP_COUNT > 0 ? Math.round((tested / APP_COUNT) * 100) : 0;

  const filtered = useMemo(() => {
    return rows.filter(({ app, result, work: w }) => {
      if (status !== "all" && result.status !== status) return false;
      if (work === "needs") {
        if (!NEEDS_HUMAN_KINDS.includes(w.kind) || result.status === "pass") return false;
      } else if (work !== "all" && w.kind !== work) {
        return false;
      }
      return appMatchesSearch(app, query);
    });
  }, [rows, status, work, query]);

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
        <p className="mt-1">
          Apps with an <span className="text-red-300">Issue</span> status are hidden from the public Apps
          store until a retest passes; this page is their system of record while they are out.
        </p>
        <p className="mt-1">
          <span className="text-[#ccc]">Human checked</span> is a separate, manual sign-off: tick it once a
          person has verified the app for real (checked the inbox, listed the root folder). It saves the
          moment you tick or untick.
        </p>
        <p className="mt-1">
          <span className="text-[#ccc]">Manual work</span> shows what only a human can do before an app
          works: get an API key from the provider, click a sign-in, create a bot, or set a server env var.
          It is derived from each app's connection metadata, and dims once the app tests green.
          Outstanding right now: <span className="text-[#ccc]">{needsHumanCount} apps</span>
          {" "}({workCounts.provider_key} API keys, {workCounts.signin} sign-ins,{" "}
          {workCounts.bot_setup} bot or app setups, {workCounts.env_key} env vars).
        </p>
      </div>

      {saveError && (
        <div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">
          {saveError}
        </div>
      )}

      {/* Progress + status counts */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
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

      {/* Manual-work filter: jump straight to the apps waiting on a human */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-white/35">Manual work</span>
        <FilterChip label="All" active={work === "all"} onClick={() => setWork("all")} />
        <FilterChip label={`Needs a human (${needsHumanCount})`} active={work === "needs"} onClick={() => setWork("needs")} />
        {NEEDS_HUMAN_KINDS.map((k) => (
          <FilterChip key={k} label={MANUAL_WORK_META[k].label} active={work === k} onClick={() => setWork(k)} />
        ))}
        <FilterChip label="None" active={work === "none"} onClick={() => setWork("none")} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.03]">
        <div className="min-w-[1080px]">
          <div className={`grid ${COLS} items-center gap-3 border-b border-white/[0.08] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white/35`}>
            <span>Status</span>
            <span>App</span>
            <span>Category</span>
            <span className="text-right">Actions</span>
            <span>Result</span>
            <span>Manual work</span>
            <span>Comments</span>
            <span className="text-right">Tested</span>
            <span className="text-center">Human checked</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(({ app, result, work: w }) => (
              <div key={app.slug} className={`grid ${COLS} items-start gap-3 px-3 py-2 text-xs`}>
                <div className="flex flex-col items-start gap-1">
                  <StatusBadge status={result.status} />
                  {result.status === "fail" && (
                    <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white/40">
                      Hidden from store
                    </span>
                  )}
                </div>
                <Link to={`/apps/${app.slug}`} className="truncate font-medium text-white hover:text-[#9be4e6]">
                  {app.name}
                </Link>
                <span className="truncate text-white/45">{app.category}</span>
                <span className="text-right tabular-nums text-white/40">{app.toolCount}</span>
                <ExpandableCell text={result.note ?? "-"} className="text-white/50" />
                <ManualWorkCell work={w} status={result.status} />
                <ExpandableCell text={result.comment ?? "-"} className="text-white/70" />
                <span className="text-right tabular-nums text-white/35">{whenLabel(result.testedAt)}</span>
                <HumanCheckCell
                  checked={isChecked(app.slug)}
                  saving={savingSlugs.has(app.slug)}
                  disabled={!session}
                  onToggle={() => toggleChecked(app.slug)}
                />
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

      {/* Manual-work legend */}
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {NEEDS_HUMAN_KINDS.map((k) => (
          <div key={k} className="flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
            <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium ${MANUAL_WORK_META[k].tone}`}>
              {MANUAL_WORK_META[k].label}
            </span>
            <span className="text-[11px] leading-5 text-white/50">{MANUAL_WORK_META[k].description}</span>
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
      className={`rounded-xl border bg-white/[0.03] p-4 text-left transition-colors ${
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
