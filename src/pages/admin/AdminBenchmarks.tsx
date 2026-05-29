/**
 * AdminBenchmarks - the benchmark report card at /admin/benchmarks
 *
 * Admin-only. Answers one question in plain English: is UnClick making
 * agents better? It shows the latest contest between four contestants
 * (Codex and Claude, each with and without UnClick), the points UnClick
 * adds, a per-category breakdown, and a dated history so progress over
 * time is obvious at a glance.
 *
 * Data comes from /api/benchmarks (admin-gated, service-role). The scoring
 * and "lift" maths live in src/lib/benchmarks.ts.
 */

import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/lib/auth";
import {
  Loader2,
  Lock,
  RefreshCw,
  Trophy,
  Sparkles,
  Trash2,
  Code2,
  Brain,
  BookOpen,
  Wrench,
  Database,
} from "lucide-react";
import {
  CONTESTANT_LABEL,
  ORIGIN_LABEL,
  engineLifts,
  formatLift,
  resultFor,
  type BenchmarkRun,
  type BenchmarkResult,
  type BenchmarkSuite,
  type SuiteCategory,
  type Contestant,
  type Engine,
} from "@/lib/benchmarks";

const YELLOW = "#E2B93B";
const TEAL = "#61C1C4";

const CATEGORY_ICON: Record<string, typeof Code2> = {
  coding: Code2,
  reasoning: Brain,
  knowledge: BookOpen,
  tool_use: Wrench,
  memory: Database,
};

// ── Row coercion: Supabase returns numeric columns as strings, so we ────────
// normalise the raw API rows into the typed shapes the lib expects.

interface RawRun {
  id: string;
  suite_id: string;
  run_label: string;
  run_date: string;
  status: string;
  source: string;
  notes: string;
  results?: RawResult[];
}
interface RawResult {
  contestant: string;
  engine: string;
  uses_unclick: boolean;
  overall_score: number | string;
  tasks_total: number | string;
  tasks_passed: number | string;
  category_scores: Record<string, { score: number | string; max: number | string }>;
  evidence?: Record<string, unknown>;
}

function toResult(r: RawResult): BenchmarkResult {
  const cats: Record<string, { score: number; max: number }> = {};
  for (const [k, v] of Object.entries(r.category_scores ?? {})) {
    cats[k] = { score: Number(v.score), max: Number(v.max) };
  }
  return {
    contestant: r.contestant as Contestant,
    engine: r.engine as Engine,
    uses_unclick: Boolean(r.uses_unclick),
    overall_score: Number(r.overall_score),
    tasks_total: Number(r.tasks_total),
    tasks_passed: Number(r.tasks_passed),
    category_scores: cats,
    evidence: r.evidence ?? {},
  };
}

function toRun(r: RawRun): BenchmarkRun {
  return {
    id: r.id,
    suite_id: r.suite_id,
    run_label: r.run_label,
    run_date: r.run_date,
    status: (r.status as BenchmarkRun["status"]) ?? "complete",
    source: (r.source as BenchmarkRun["source"]) ?? "manual",
    notes: r.notes ?? "",
    results: (r.results ?? []).map(toResult),
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// ── Small presentational pieces ──────────────────────────────────────────────

function ScoreCardInner({ result, lift }: { result: BenchmarkResult; lift: number | null }) {
  const accent = result.uses_unclick ? TEAL : "#888";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#aaa]">{CONTESTANT_LABEL[result.contestant]}</p>
        {result.uses_unclick && lift !== null && (
          <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
            {formatLift(lift)} with UnClick
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tabular-nums" style={{ color: accent }}>
          {Math.round(result.overall_score)}
        </span>
        <span className="text-sm text-[#666]">/100</span>
      </div>
      {result.tasks_total > 0 && (
        <p className="mt-1 text-[11px] text-[#666]">
          {result.tasks_passed} of {result.tasks_total} tasks passed
        </p>
      )}
    </div>
  );
}

function ContestantPair({
  run,
  engine,
}: {
  run: BenchmarkRun;
  engine: Engine;
}) {
  const raw = run.results.find((r) => r.engine === engine && !r.uses_unclick);
  const unclick = run.results.find((r) => r.engine === engine && r.uses_unclick);
  const lift =
    raw && unclick ? Math.round(unclick.overall_score - raw.overall_score) : null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {raw ? <ScoreCardInner result={raw} lift={null} /> : <EmptyCard label={`${engine} alone`} />}
      {unclick ? (
        <ScoreCardInner result={unclick} lift={lift} />
      ) : (
        <EmptyCard label={`${engine} + UnClick`} />
      )}
    </div>
  );
}

function EmptyCard({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] p-5">
      <p className="text-xs text-[#555] capitalize">{label}</p>
      <p className="mt-2 text-sm text-[#444]">No score recorded</p>
    </div>
  );
}

const ORIGIN_COLOR: Record<string, string> = {
  famous: TEAL,
  custom: YELLOW,
  mixed: "#9b8cff",
};

function WhatsInTheExam({ suite, categories }: { suite: BenchmarkSuite; categories: SuiteCategory[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
      <p className="text-sm font-semibold text-white">What is in the exam</p>
      <p className="mt-1 text-xs leading-relaxed text-[#888]">
        {suite.description ||
          "A mix of well-known public benchmark styles plus custom UnClick tasks."}
      </p>
      <ul className="mt-4 space-y-3">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICON[cat.key] ?? Sparkles;
          const origin = cat.origin ?? "custom";
          const color = ORIGIN_COLOR[origin] ?? "#888";
          return (
            <li key={cat.key} className="flex gap-3">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${color}1a`, color }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[#ddd]">{cat.label}</span>
                  <span className="text-[11px] text-[#666]">worth {cat.weight} of 100</span>
                  {cat.unclick_strength && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: `${TEAL}1a`, color: TEAL }}
                    >
                      UnClick strength
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-[#999]">{cat.description}</p>
                <p className="mt-1 text-[11px]" style={{ color }}>
                  {ORIGIN_LABEL[origin]}
                  {cat.basis ? ` (${cat.basis})` : ""}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/[0.06] pt-3 text-[11px] text-[#777]">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: TEAL }} /> Famous public benchmark
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: "#9b8cff" }} /> Mix
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: YELLOW }} /> Custom UnClick test
        </span>
      </div>
    </div>
  );
}

function CategoryBreakdown({ run, categories }: { run: BenchmarkRun; categories: SuiteCategory[] }) {
  function frac(result: BenchmarkResult | undefined, key: string): number {
    if (!result) return 0;
    const cs = result.category_scores[key];
    if (!cs || cs.max <= 0) return 0;
    return Math.max(0, Math.min(1, cs.score / cs.max)) * 100;
  }

  const lanes: { contestant: Contestant; color: string }[] = [
    { contestant: "claude_raw", color: "#888" },
    { contestant: "claude_unclick", color: TEAL },
    { contestant: "codex_raw", color: "#888" },
    { contestant: "codex_unclick", color: "#9b8cff" },
  ];

  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const Icon = CATEGORY_ICON[cat.key] ?? Sparkles;
        return (
          <div key={cat.key} className="rounded-xl border border-white/[0.06] bg-[#111111] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#888]" />
              <span className="text-sm font-medium text-[#ddd]">{cat.label}</span>
              {cat.unclick_strength && (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{ background: `${TEAL}1a`, color: TEAL }}
                >
                  UnClick strength
                </span>
              )}
              <span className="ml-auto text-[11px] text-[#555]">weight {cat.weight}</span>
            </div>
            <div className="space-y-1.5">
              {lanes.map(({ contestant, color }) => {
                const pct = frac(resultFor(run, contestant), cat.key);
                return (
                  <div key={contestant} className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-[11px] text-[#777]">
                      {CONTESTANT_LABEL[contestant]}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-[#888]">
                      {Math.round(pct)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HistoryTable({ runs }: { runs: BenchmarkRun[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#111111]">
      <table className="w-full text-left text-xs">
        <thead className="text-[#666]">
          <tr className="border-b border-white/[0.06]">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Run</th>
            <th className="px-4 py-3 font-medium">Claude</th>
            <th className="px-4 py-3 font-medium">Codex</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            const lifts = engineLifts(run);
            const claude = lifts.find((l) => l.engine === "claude");
            const codex = lifts.find((l) => l.engine === "codex");
            return (
              <tr key={run.id} className="border-b border-white/[0.04] last:border-0">
                <td className="px-4 py-3 text-[#aaa] tabular-nums">{formatDate(run.run_date)}</td>
                <td className="px-4 py-3 text-[#888]">
                  {run.run_label || "(untitled)"}
                  {run.source === "seed_sample" && (
                    <span className="ml-2 rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-[#777]">
                      sample
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <LiftCell raw={claude?.rawScore ?? null} unclick={claude?.unclickScore ?? null} lift={claude?.lift ?? null} />
                </td>
                <td className="px-4 py-3">
                  <LiftCell raw={codex?.rawScore ?? null} unclick={codex?.unclickScore ?? null} lift={codex?.lift ?? null} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LiftCell({ raw, unclick, lift }: { raw: number | null; unclick: number | null; lift: number | null }) {
  if (raw === null && unclick === null) return <span className="text-[#555]">-</span>;
  return (
    <span className="tabular-nums text-[#aaa]">
      {raw === null ? "-" : Math.round(raw)}
      <span className="text-[#555]"> &rarr; </span>
      <span style={{ color: TEAL }}>{unclick === null ? "-" : Math.round(unclick)}</span>
      {lift !== null && (
        <span className={`ml-1.5 ${lift >= 0 ? "text-emerald-300" : "text-red-300"}`}>
          ({formatLift(lift)})
        </span>
      )}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminBenchmarks() {
  const { session } = useSession();
  const navigate = useNavigate();

  const [adminVerified, setAdminVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suite, setSuite] = useState<BenchmarkSuite | null>(null);
  const [latest, setLatest] = useState<BenchmarkRun | null>(null);
  const [history, setHistory] = useState<BenchmarkRun[]>([]);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/benchmarks?action=overview", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (r.status === 403) {
        setAdminVerified(false);
        navigate("/admin/you", { replace: true });
        return;
      }
      setAdminVerified(true);
      const body = await r.json();
      if (!r.ok) throw new Error(body.error ?? "Failed to load benchmarks");
      setSuite(
        body.suite
          ? { ...body.suite, categories: (body.suite.categories as SuiteCategory[]) ?? [] }
          : null,
      );
      setLatest(body.latest ? toRun(body.latest) : null);
      setHistory((body.history ?? []).map(toRun));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  async function removeSample(runId: string) {
    if (!session) return;
    await fetch("/api/benchmarks?action=delete_run", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: runId }),
    });
    load();
  }

  if (adminVerified === false) {
    return (
      <div className="flex items-center gap-2 py-12 text-[#666]">
        <Lock className="h-4 w-4" />
        <span className="text-sm">Admin access required</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-[#666]">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading benchmarks...</span>
      </div>
    );
  }

  const categories = suite?.categories ?? [];
  const lifts = latest ? engineLifts(latest) : [];
  const claudeLift = lifts.find((l) => l.engine === "claude")?.lift ?? null;
  const codexLift = lifts.find((l) => l.engine === "codex")?.lift ?? null;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" style={{ color: YELLOW }} />
            <h1 className="text-2xl font-semibold text-white">Benchmarks</h1>
          </div>
          <p className="mt-1 text-sm text-[#888]">Is UnClick making agents better? This is the scoreboard.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-[#888] transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {/* What you're looking at */}
      <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#999]">
        <p className="font-medium text-[#ccc]">What you are looking at</p>
        <p className="mt-1">
          We give the same exam to four contestants: Codex and Claude, each on their own and again with
          UnClick attached. The score is out of 100 (higher is better). The green number shows how many
          points UnClick adds. Watch the dated history below to see progress over time.
        </p>
      </div>

      {suite && categories.length > 0 && (
        <div className="mb-6">
          <WhatsInTheExam suite={suite} categories={categories} />
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {!suite && (
        <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-8 text-center">
          <p className="text-sm text-[#888]">No benchmark suite is set up yet.</p>
        </div>
      )}

      {suite && !latest && (
        <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-8 text-center">
          <p className="text-sm text-[#888]">No runs recorded yet for {suite.title}.</p>
          <p className="mt-1 text-xs text-[#666]">
            Record one with the helper in <code className="text-[#888]">scripts/benchmark-record.mjs</code>.
          </p>
        </div>
      )}

      {suite && latest && (
        <>
          {/* Latest contest */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-white">Latest contest</h2>
            <span className="text-xs text-[#666]">
              {latest.run_label || "(untitled)"} &middot; {formatDate(latest.run_date)}
            </span>
            {latest.source === "seed_sample" && (
              <>
                <span className="rounded-full bg-[#E2B93B]/10 px-2 py-0.5 text-[10px] font-medium" style={{ color: YELLOW }}>
                  Sample data
                </span>
                <button
                  onClick={() => removeSample(latest.id)}
                  className="flex items-center gap-1 text-[11px] text-[#666] hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3" /> Remove sample
                </button>
              </>
            )}
          </div>

          {/* Headline takeaway */}
          {(claudeLift !== null || codexLift !== null) && (
            <p className="mb-5 text-sm text-[#bbb]">
              On this exam, UnClick added{" "}
              {claudeLift !== null && (
                <>
                  <span className="font-semibold text-emerald-300">{formatLift(claudeLift)}</span> to Claude
                </>
              )}
              {claudeLift !== null && codexLift !== null && " and "}
              {codexLift !== null && (
                <>
                  <span className="font-semibold text-emerald-300">{formatLift(codexLift)}</span> to Codex
                </>
              )}
              .
            </p>
          )}

          <div className="mb-8 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-wide text-[#666]">Claude</p>
              <ContestantPair run={latest} engine="claude" />
            </div>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-wide text-[#666]">Codex</p>
              <ContestantPair run={latest} engine="codex" />
            </div>
          </div>

          {/* Category breakdown */}
          {categories.length > 0 && (
            <>
              <h2 className="mb-3 text-sm font-semibold text-white">Where the points come from</h2>
              <div className="mb-8">
                <CategoryBreakdown run={latest} categories={categories} />
              </div>
            </>
          )}

          {/* History */}
          <h2 className="mb-3 text-sm font-semibold text-white">History (newest first)</h2>
          <HistoryTable runs={history} />
        </>
      )}

      <div className="mt-6 text-[11px] text-[#555]">
        <Link to="/admin/checks" className="hover:text-[#888]">
          XPass quality gates
        </Link>
      </div>
    </div>
  );
}
