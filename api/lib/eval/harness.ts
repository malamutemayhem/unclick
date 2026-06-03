// Proof-as-reward eval harness: run scoreTrace over the frozen fixtures,
// compare to a baseline, and gate policy changes on "must beat baseline".
//
// See docs/path-a-eval-harness-spec.md. This is the regression discipline that
// separates real learning from drift: a change ships only if it does not
// regress any protected fixture and does not lower the aggregate truth metrics.
//
// Pure: scoring + comparison + report rendering, no IO. The IO (reading the
// frozen baseline file, writing the report) lives in the runnable script
// scripts/eval-report.mjs so this stays unit-testable.

import { scoreTrace, summarizeTruthRate, type RunScore, type TruthRateSummary } from "../score-trace.js";
import { EVAL_FIXTURES, type EvalFixture } from "./fixtures.js";

export interface FixtureResult {
  id: string;
  passed: boolean;
  expectedOutcome: string;
  actualOutcome: string;
  expectedReward: number;
  actualReward: number;
  score: RunScore;
}

export interface EvalRun {
  results: FixtureResult[];
  summary: TruthRateSummary;
  /** Fixtures whose scored outcome did not match expectation. */
  mismatches: FixtureResult[];
}

/** Score every fixture and check each against its expected outcome/reward. */
export function runEval(fixtures: readonly EvalFixture[] = EVAL_FIXTURES): EvalRun {
  const results: FixtureResult[] = fixtures.map((f) => {
    const score = scoreTrace(f.trace);
    const passed = score.outcome === f.expectedOutcome && score.reward === f.expectedReward;
    return {
      id: f.id,
      passed,
      expectedOutcome: f.expectedOutcome,
      actualOutcome: score.outcome,
      expectedReward: f.expectedReward,
      actualReward: score.reward,
      score,
    };
  });

  return {
    results,
    summary: summarizeTruthRate(results.map((r) => r.score)),
    mismatches: results.filter((r) => !r.passed),
  };
}

/** The shape persisted as the frozen baseline (docs/eval-baseline.json). */
export interface EvalBaseline {
  generated_note: string;
  truthRate: number;
  hallucinatedCompletionRate: number;
  netReward: number;
  /** Per-fixture expected outcome, so a silent fixture edit is caught. */
  fixtures: Array<{ id: string; outcome: string; reward: number }>;
}

export function baselineFromRun(run: EvalRun, note: string): EvalBaseline {
  return {
    generated_note: note,
    truthRate: round(run.summary.truthRate),
    hallucinatedCompletionRate: round(run.summary.hallucinatedCompletionRate),
    netReward: run.summary.netReward,
    fixtures: run.results.map((r) => ({
      id: r.id,
      outcome: r.actualOutcome,
      reward: r.actualReward,
    })),
  };
}

export type GateStatus = "pass" | "regressed" | "fixtures-failed";

export interface GateResult {
  status: GateStatus;
  ok: boolean;
  reasons: string[];
}

/**
 * The merge rail: a candidate run must (a) have every fixture score as expected,
 * (b) not lower truthRate or netReward vs baseline, (c) not raise the
 * hallucinated-completion rate, and (d) not flip any baseline fixture's outcome.
 */
export function gateAgainstBaseline(run: EvalRun, baseline: EvalBaseline): GateResult {
  const reasons: string[] = [];

  if (run.mismatches.length > 0) {
    for (const m of run.mismatches) {
      reasons.push(
        `fixture "${m.id}" expected ${m.expectedOutcome}/${m.expectedReward} but got ${m.actualOutcome}/${m.actualReward}`,
      );
    }
    return { status: "fixtures-failed", ok: false, reasons };
  }

  if (round(run.summary.truthRate) < baseline.truthRate) {
    reasons.push(
      `truthRate regressed: ${round(run.summary.truthRate)} < baseline ${baseline.truthRate}`,
    );
  }
  if (round(run.summary.hallucinatedCompletionRate) > baseline.hallucinatedCompletionRate) {
    reasons.push(
      `hallucinated-completion rate worsened: ${round(run.summary.hallucinatedCompletionRate)} > baseline ${baseline.hallucinatedCompletionRate}`,
    );
  }
  if (run.summary.netReward < baseline.netReward) {
    reasons.push(`netReward regressed: ${run.summary.netReward} < baseline ${baseline.netReward}`);
  }

  const byId = new Map(run.results.map((r) => [r.id, r]));
  for (const bf of baseline.fixtures) {
    const cur = byId.get(bf.id);
    if (!cur) {
      reasons.push(`baseline fixture "${bf.id}" is missing from the current run`);
      continue;
    }
    if (cur.actualOutcome !== bf.outcome || cur.actualReward !== bf.reward) {
      reasons.push(
        `baseline fixture "${bf.id}" outcome drifted: was ${bf.outcome}/${bf.reward}, now ${cur.actualOutcome}/${cur.actualReward}`,
      );
    }
  }

  if (reasons.length > 0) return { status: "regressed", ok: false, reasons };
  return { status: "pass", ok: true, reasons: ["meets or beats baseline on all metrics and fixtures"] };
}

/** Render a human-readable markdown report of a run (optionally vs baseline). */
export function renderReport(run: EvalRun, baseline?: EvalBaseline): string {
  const s = run.summary;
  const lines: string[] = [];
  lines.push("# Proof-as-Reward Eval Report");
  lines.push("");
  lines.push("Generated by scripts/eval-report.mjs. Do not edit by hand.");
  lines.push("");
  lines.push("## Headline metrics");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("| --- | ---: |");
  lines.push(`| Truth rate (verified / decided) | ${pct(s.truthRate)} |`);
  lines.push(`| Hallucinated-completion rate | ${pct(s.hallucinatedCompletionRate)} |`);
  lines.push(`| Net reward | ${s.netReward} |`);
  lines.push(`| Total runs scored | ${s.total} |`);
  lines.push("");
  lines.push("## Outcome breakdown");
  lines.push("");
  lines.push("| Outcome | Count |");
  lines.push("| --- | ---: |");
  lines.push(`| verified_completion | ${s.verified} |`);
  lines.push(`| false_green | ${s.falseGreen} |`);
  lines.push(`| stale | ${s.stale} |`);
  lines.push(`| honest_blocker | ${s.honestBlocker} |`);
  lines.push(`| in_progress | ${s.inProgress} |`);
  lines.push("");

  if (baseline) {
    const gate = gateAgainstBaseline(run, baseline);
    lines.push("## Baseline gate");
    lines.push("");
    lines.push(`Status: **${gate.status}**`);
    lines.push("");
    for (const r of gate.reasons) lines.push(`- ${r}`);
    lines.push("");
  }

  lines.push("## Per-fixture results");
  lines.push("");
  lines.push("| Fixture | Outcome | Reward | OK |");
  lines.push("| --- | --- | ---: | :---: |");
  for (const r of run.results) {
    lines.push(`| ${r.id} | ${r.actualOutcome} | ${r.actualReward} | ${r.passed ? "yes" : "NO"} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function round(n: number): number {
  return Math.round(n * 1e6) / 1e6;
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}
