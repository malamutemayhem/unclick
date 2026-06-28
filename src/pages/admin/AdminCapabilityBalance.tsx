import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  Flame,
  Gauge,
  Loader2,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";
import type { CapabilityBalanceRow, CapabilityBalanceState, CapabilityBalanceSummary } from "@/lib/capabilityBalance";

interface CapabilityBalanceResponse {
  summary: CapabilityBalanceSummary;
}

const STATE_COPY: Record<CapabilityBalanceState, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  healthy: {
    label: "Healthy",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    icon: CheckCircle2,
  },
  hot: {
    label: "Hot",
    className: "border-[#61C1C4]/25 bg-[#61C1C4]/10 text-[#61C1C4]",
    icon: Flame,
  },
  should_use: {
    label: "Should use",
    className: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]",
    icon: ArrowUpRight,
  },
  cold: {
    label: "Cold",
    className: "border-white/[0.08] bg-white/[0.04] text-[#999]",
    icon: CircleDashed,
  },
  redundant: {
    label: "Redundant",
    className: "border-white/[0.08] bg-white/[0.04] text-[#aaa]",
    icon: RotateCcw,
  },
  broken: {
    label: "Broken",
    className: "border-red-400/30 bg-red-400/10 text-red-300",
    icon: ShieldAlert,
  },
  costly: {
    label: "Costly",
    className: "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B]",
    icon: Gauge,
  },
  uncertain: {
    label: "Uncertain",
    className: "border-white/[0.08] bg-white/[0.04] text-[#aaa]",
    icon: AlertTriangle,
  },
};

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: value >= 100 ? 2 : 4,
  }).format(value);
}

function formatPeriod(summary: CapabilityBalanceSummary | null): string {
  if (!summary) return "Last 30 days";
  const start = new Date(summary.periodStart);
  const end = new Date(summary.periodEnd);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) return "Last 30 days";
  return `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} - ${end.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

function timeAgo(iso: string | null): string {
  if (!iso) return "No use";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function StateBadge({ state }: { state: CapabilityBalanceState }) {
  const copy = STATE_COPY[state];
  const Icon = copy.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${copy.className}`}>
      <Icon className="h-3 w-3" />
      {copy.label}
    </span>
  );
}

function MetricCard({ label, value, detail, tone = "teal" }: {
  label: string;
  value: string;
  detail: string;
  tone?: "teal" | "yellow" | "red" | "muted";
}) {
  const toneClass =
    tone === "yellow" ? "text-[#E2B93B]" :
    tone === "red" ? "text-red-300" :
    tone === "muted" ? "text-[#aaa]" :
    "text-[#61C1C4]";
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
      <p className="text-xs font-medium uppercase text-[#777]">{label}</p>
      <p className={`mt-3 text-2xl font-semibold tabular-nums ${toneClass}`}>{value}</p>
      <p className="mt-1 text-xs text-[#777]">{detail}</p>
    </div>
  );
}

function BalanceRow({ row }: { row: CapabilityBalanceRow }) {
  const maxBar = Math.max(row.targetMonthlyUses, row.actualUses, row.expectedUses, 1);
  const actualWidth = Math.min(100, Math.max(2, (row.actualUses / maxBar) * 100));
  const expectedWidth = Math.min(100, Math.max(row.expectedUses > 0 ? 2 : 0, (row.expectedUses / maxBar) * 100));

  return (
    <tr className="border-t border-white/[0.06] align-top hover:bg-white/[0.02]">
      <td className="px-4 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-white">{row.label}</span>
          <span className="text-[11px] uppercase tracking-wide text-[#666]">{row.ownerSurface} / {row.category}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <StateBadge state={row.state} />
        <p className="mt-2 max-w-[260px] text-xs leading-5 text-[#777]">{row.reason}</p>
      </td>
      <td className="px-4 py-4">
        <div className="w-40 space-y-2">
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-[#777]">
              <span>Actual</span>
              <span>{formatCount(row.actualUses)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-[#61C1C4]" style={{ width: `${actualWidth}%` }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-[11px] text-[#777]">
              <span>Expected</span>
              <span>{formatCount(row.expectedUses)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-[#E2B93B]" style={{ width: `${expectedWidth}%` }} />
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-right text-sm tabular-nums text-[#ddd]">
        <div>{formatCount(row.missedUses)}</div>
        <div className="mt-1 text-[11px] text-[#666]">{row.failures} fail</div>
      </td>
      <td className="px-4 py-4 text-right text-sm tabular-nums text-[#ddd]">
        <div>{row.successRate === null ? "-" : `${row.successRate}%`}</div>
        <div className="mt-1 text-[11px] text-[#666]">{formatUsd(row.costUsd)}</div>
      </td>
      <td className="px-4 py-4">
        <div className="max-w-[220px] text-xs leading-5 text-[#aaa]">{row.recommendedAction}</div>
        <div className="mt-2 text-[11px] text-[#666]">
          {timeAgo(row.lastUsedAt)} / {row.sourceCount} source{row.sourceCount === 1 ? "" : "s"}
        </div>
      </td>
    </tr>
  );
}

export default function AdminCapabilityBalance() {
  const { session, loading: sessionLoading } = useSession();
  const [summary, setSummary] = useState<CapabilityBalanceSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const accessToken = session?.access_token ?? "";

  const loadSummary = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/capability-balance?action=summary", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const body = await response.json().catch(() => ({})) as Partial<CapabilityBalanceResponse> & { error?: string };
      if (!response.ok || !body.summary) {
        throw new Error(body.error ?? `Request failed: ${response.status}`);
      }
      setSummary(body.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load capability balance");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadSummary();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadSummary]);

  const rows = useMemo(() => summary?.rows ?? [], [summary]);
  const attention = useMemo(() => summary?.attention ?? [], [summary]);

  if (sessionLoading) {
    return (
      <div className="flex items-center gap-2 py-12 text-[#666]">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading session...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 text-sm text-[#999]">
        Sign in to view capability balance.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-3 py-1 text-xs font-medium text-[#61C1C4]">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Capability Balance
          </div>
          <h1 className="text-2xl font-semibold text-white">Usage balance</h1>
          <p className="mt-1 text-sm text-[#888]">{formatPeriod(summary)} product-health signals</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void loadSummary()}
          disabled={loading}
          className="border-white/[0.08] bg-white/[0.04] text-[#ddd] hover:bg-white/[0.08] hover:text-white"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-5 grid gap-3 md:grid-cols-5">
        <MetricCard
          label="Attention"
          value={formatCount((summary?.totals.shouldUse ?? 0) + (summary?.totals.broken ?? 0) + (summary?.totals.costly ?? 0))}
          detail="Should-use, broken, costly"
          tone={(summary?.totals.broken ?? 0) > 0 ? "red" : "yellow"}
        />
        <MetricCard
          label="Actual"
          value={formatCount(summary?.totals.actualUses ?? 0)}
          detail="Observed usage signals"
        />
        <MetricCard
          label="Expected"
          value={formatCount(summary?.totals.expectedUses ?? 0)}
          detail="Should-have-used signals"
          tone="yellow"
        />
        <MetricCard
          label="Hot"
          value={formatCount(summary?.totals.hot ?? 0)}
          detail="High-usage capabilities"
        />
        <MetricCard
          label="Gaps"
          value={formatCount(summary?.totals.sourceGaps ?? 0)}
          detail="Unavailable sources"
          tone={(summary?.totals.sourceGaps ?? 0) > 0 ? "yellow" : "muted"}
        />
      </div>

      {attention.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-semibold text-[#E2B93B]">Attention queue</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {attention.slice(0, 4).map((row) => (
              <div key={row.key} className="rounded-lg border border-white/[0.06] bg-black/10 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{row.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[#777]">{row.recommendedAction}</p>
                  </div>
                  <StateBadge state={row.state} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {summary?.sourceGaps.length ? (
        <section className="mb-5 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-white">Source gaps</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.sourceGaps.map((gap) => (
              <span key={gap} className="rounded-md border border-[#E2B93B]/20 bg-[#E2B93B]/10 px-2 py-1 text-[11px] text-[#E2B93B]">
                {gap}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <h2 className="text-sm font-semibold text-white">Capability board</h2>
          <span className="text-xs text-[#666]">{formatCount(rows.length)} capabilities</span>
        </div>
        {loading && !summary ? (
          <div className="flex items-center gap-2 p-6 text-sm text-[#777]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading balance...
          </div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-sm text-[#777]">No capability signals found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-[#666]">
                  <th className="px-4 py-3 font-medium">Capability</th>
                  <th className="px-4 py-3 font-medium">State</th>
                  <th className="px-4 py-3 font-medium">Use</th>
                  <th className="px-4 py-3 text-right font-medium">Missed</th>
                  <th className="px-4 py-3 text-right font-medium">Health</th>
                  <th className="px-4 py-3 font-medium">Balance action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => <BalanceRow key={row.key} row={row} />)}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
