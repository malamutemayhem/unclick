// Admin dashboard for the proof-as-reward eval: shows how honest "done" really
// is across recent Boardroom jobs. Reads GET /api/eval-truth-rate (admin
// session auth) and renders the truth-rate, the hallucinated-completion rate,
// the outcome breakdown, and the job ids that need action.

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/lib/auth";
import { ShieldCheck, RefreshCw, Loader2, Lock, AlertTriangle, Clock } from "lucide-react";

const YELLOW = "#E2B93B";

interface TruthSummary {
  total: number;
  verified: number;
  falseGreen: number;
  stale: number;
  honestBlocker: number;
  inProgress: number;
  truthRate: number;
  hallucinatedCompletionRate: number;
  netReward: number;
}

interface TruthResponse {
  window_days: number;
  summary: TruthSummary | null;
  false_green_job_ids?: string[];
  stale_job_ids?: string[];
  note?: string;
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function StatCard({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "good" | "bad" | "neutral" }) {
  const color = tone === "good" ? "#4ade80" : tone === "bad" ? "#f87171" : "#fff";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
      <div className="text-xs uppercase tracking-wider text-[#888]">{label}</div>
      <div className="mt-2 text-3xl font-semibold" style={{ color }}>{value}</div>
      {hint && <div className="mt-1 text-xs text-[#666]">{hint}</div>}
    </div>
  );
}

export default function AdminTruthRate() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TruthResponse | null>(null);
  const [days, setDays] = useState(14);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/eval-truth-rate?days=${days}`, {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (r.status === 403) {
        navigate("/admin/you", { replace: true });
        return;
      }
      const body = await r.json();
      if (!r.ok) throw new Error(body.error ?? "Failed to load truth rate");
      setData(body as TruthResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session, navigate, days]);

  useEffect(() => {
    load();
  }, [load]);

  if (!session) {
    return (
      <div className="flex items-center gap-2 py-12 text-[#666]">
        <Lock className="h-4 w-4" />
        <span className="text-sm">Admin access required</span>
      </div>
    );
  }

  const summary = data?.summary ?? null;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" style={{ color: YELLOW }} />
            <h1 className="text-2xl font-semibold text-white">Truth Rate</h1>
          </div>
          <p className="mt-1 text-sm text-[#888]">
            How often "done" is actually backed by proof. Higher truth rate and lower fake-green is better.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-2 text-xs text-[#ccc]"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button
            onClick={load}
            className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#888] transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#999]">
        <p className="font-medium text-[#ccc]">What you are looking at</p>
        <p className="mt-1">
          Every recent job is graded by proof, not by an agent saying it finished. Verified means a fresh,
          head-bound passing check plus an independent verifier. Fake-green means it claimed done without
          that proof. Stale means an owner went quiet and the job needs recovery.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 py-12 text-[#666]">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Scoring recent jobs...</span>
        </div>
      )}

      {!loading && data && !summary && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-[#888]">{data.note ?? "No jobs in this window yet."}</p>
        </div>
      )}

      {!loading && summary && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Truth rate"
              value={pct(summary.truthRate)}
              hint="verified / (verified + fake-green)"
              tone={summary.truthRate >= 0.8 ? "good" : summary.truthRate >= 0.5 ? "neutral" : "bad"}
            />
            <StatCard
              label="Fake-green rate"
              value={pct(summary.hallucinatedCompletionRate)}
              hint="claimed done without proof"
              tone={summary.hallucinatedCompletionRate <= 0.1 ? "good" : summary.hallucinatedCompletionRate <= 0.3 ? "neutral" : "bad"}
            />
            <StatCard
              label="Net proof reward"
              value={String(summary.netReward)}
              hint={`across ${summary.total} jobs`}
              tone={summary.netReward > 0 ? "good" : summary.netReward < 0 ? "bad" : "neutral"}
            />
          </div>

          <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
            <div className="mb-3 text-xs uppercase tracking-wider text-[#888]">Outcome breakdown</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 text-center">
              <Breakdown label="Verified" value={summary.verified} color="#4ade80" />
              <Breakdown label="Fake-green" value={summary.falseGreen} color="#f87171" />
              <Breakdown label="Stale" value={summary.stale} color="#fbbf24" />
              <Breakdown label="Blocker" value={summary.honestBlocker} color="#888" />
              <Breakdown label="In progress" value={summary.inProgress} color="#888" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ActionList
              title="Fake-green jobs"
              icon={<AlertTriangle className="h-4 w-4 text-red-400" />}
              ids={data?.false_green_job_ids ?? []}
              empty="No fake-green jobs. Nice."
            />
            <ActionList
              title="Stale jobs (need recovery)"
              icon={<Clock className="h-4 w-4 text-amber-400" />}
              ids={data?.stale_job_ids ?? []}
              empty="No stale jobs."
            />
          </div>
        </>
      )}
    </div>
  );
}

function Breakdown({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold" style={{ color }}>{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-[#666]">{label}</div>
    </div>
  );
}

function ActionList({ title, icon, ids, empty }: { title: string; icon: React.ReactNode; ids: string[]; empty: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
        {icon}
        {title}
        <span className="ml-auto text-xs text-[#666]">{ids.length}</span>
      </div>
      {ids.length === 0 ? (
        <p className="text-xs text-[#666]">{empty}</p>
      ) : (
        <ul className="space-y-1">
          {ids.map((id) => (
            <li key={id} className="truncate font-mono text-xs text-[#aaa]">{id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
