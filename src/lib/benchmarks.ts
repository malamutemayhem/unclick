/**
 * Benchmarks - shared types and pure scoring helpers.
 *
 * Plain English: a benchmark "suite" is an exam made of weighted
 * categories. A "run" is one sitting of that exam on a date. Each run has
 * four contestants. This module turns per-category scores into a single
 * score out of 100, and works out how many points UnClick adds (the lift).
 *
 * Everything here is pure (no network, no React) so it is easy to test and
 * can be reused by the API and any future automated harness.
 */

export const CONTESTANTS = [
  "codex_raw",
  "claude_raw",
  "codex_unclick",
  "claude_unclick",
] as const;

export type Contestant = (typeof CONTESTANTS)[number];

export type Engine = "codex" | "claude";

/** A human label for each contestant, for idiot-proof display. */
export const CONTESTANT_LABEL: Record<Contestant, string> = {
  codex_raw: "Codex alone",
  claude_raw: "Claude alone",
  codex_unclick: "Codex + UnClick",
  claude_unclick: "Claude + UnClick",
};

/** Engine + whether UnClick is attached, derived from the contestant key. */
export function contestantParts(c: Contestant): { engine: Engine; usesUnclick: boolean } {
  return {
    engine: c.startsWith("codex") ? "codex" : "claude",
    usesUnclick: c.endsWith("unclick"),
  };
}

export interface SuiteCategory {
  key: string;
  label: string;
  weight: number;
  description?: string;
  /** True for categories where UnClick is expected to help (tool use, memory). */
  unclick_strength?: boolean;
  /** Where the tasks come from, for the "what is this test" explainer. */
  origin?: "famous" | "custom" | "mixed";
  /** Plain-English provenance, e.g. "HumanEval / SWE-bench style". */
  basis?: string;
}

/** Friendly label + colour hint for a category's origin. */
export const ORIGIN_LABEL: Record<NonNullable<SuiteCategory["origin"]>, string> = {
  famous: "Based on a famous public benchmark",
  custom: "Custom UnClick test",
  mixed: "Mix of public benchmark + custom",
};

export interface BenchmarkSuite {
  id: string;
  slug: string;
  title: string;
  description: string;
  version: string;
  categories: SuiteCategory[];
  max_score: number;
}

/** One category's raw score within a result: points out of a max. */
export interface CategoryScore {
  score: number;
  max: number;
}

export type CategoryScores = Record<string, CategoryScore>;

export interface BenchmarkResult {
  contestant: Contestant;
  engine: Engine;
  uses_unclick: boolean;
  overall_score: number;
  tasks_total: number;
  tasks_passed: number;
  category_scores: CategoryScores;
  evidence?: Record<string, unknown>;
}

export interface BenchmarkRun {
  id: string;
  suite_id: string;
  run_label: string;
  run_date: string;
  status: "draft" | "complete";
  source: "manual" | "script" | "auto" | "seed_sample";
  notes: string;
  results: BenchmarkResult[];
}

/** Clamp a number into [min, max]. */
function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Round to two decimals (scores are stored as numeric(5,2)). */
export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Turn per-category scores into one score out of 100.
 *
 * For each category we take the fraction passed (score / max), multiply by
 * the category weight, and sum. When the weights sum to 100 the result is a
 * clean 0-100 number. If weights sum to something else we normalise so the
 * result is still on a 0-100 scale and never misleads.
 */
export function computeOverall(
  categoryScores: CategoryScores,
  categories: SuiteCategory[],
): number {
  const totalWeight = categories.reduce((sum, c) => sum + (c.weight || 0), 0);
  if (totalWeight <= 0) return 0;

  let weighted = 0;
  for (const cat of categories) {
    const cs = categoryScores[cat.key];
    if (!cs || cs.max <= 0) continue;
    const fraction = clamp(cs.score / cs.max, 0, 1);
    weighted += fraction * cat.weight;
  }
  // Normalise onto 0-100 regardless of how the weights were set.
  return round2((weighted / totalWeight) * 100);
}

/** Find a result for a contestant in a run, or undefined. */
export function resultFor(run: BenchmarkRun, contestant: Contestant): BenchmarkResult | undefined {
  return run.results.find((r) => r.contestant === contestant);
}

export interface EngineLift {
  engine: Engine;
  rawScore: number | null;
  unclickScore: number | null;
  /** Points UnClick adds (unclick - raw). Null if either side is missing. */
  lift: number | null;
}

/**
 * Work out, per engine, how many points UnClick adds. This is the headline
 * "UnClick lift" the report leans on.
 */
export function engineLifts(run: BenchmarkRun): EngineLift[] {
  const engines: Engine[] = ["claude", "codex"];
  return engines.map((engine) => {
    const raw = run.results.find((r) => r.engine === engine && !r.uses_unclick);
    const unclick = run.results.find((r) => r.engine === engine && r.uses_unclick);
    const rawScore = raw ? raw.overall_score : null;
    const unclickScore = unclick ? unclick.overall_score : null;
    const lift =
      rawScore !== null && unclickScore !== null ? round2(unclickScore - rawScore) : null;
    return { engine, rawScore, unclickScore, lift };
  });
}

/** The average UnClick lift across engines, for a single headline number. */
export function averageLift(run: BenchmarkRun): number | null {
  const lifts = engineLifts(run)
    .map((e) => e.lift)
    .filter((l): l is number => l !== null);
  if (lifts.length === 0) return null;
  return round2(lifts.reduce((s, l) => s + l, 0) / lifts.length);
}

/** Format a lift with an explicit sign, e.g. "+14" or "-3". */
export function formatLift(lift: number | null): string {
  if (lift === null) return "n/a";
  const rounded = Math.round(lift);
  return rounded >= 0 ? `+${rounded}` : `${rounded}`;
}
