// The improvement loop: propose a policy change, score it against the frozen
// baseline, accept ONLY if it beats baseline. This is "evolving done honestly"
// (docs/path-a-learning-and-autonomy.md): a candidate ships only when it raises
// the metrics on a frozen fixture set, never on self-report.
//
// A "policy" here is a pure scoring policy: given a RunTrace it may, for
// example, be stricter or looser about what counts as proof. We re-score the
// fixtures under the candidate policy, then gate against the baseline. Pure: no
// IO, fully unit-testable. The default policy is plain scoreTrace.

import { scoreTrace, summarizeTruthRate, type RunScore, type RunTrace } from "../score-trace.js";
import { EVAL_FIXTURES, type EvalFixture } from "./fixtures.js";
import {
  baselineFromRun,
  gateAgainstBaseline,
  type EvalBaseline,
  type EvalRun,
  type FixtureResult,
  type GateResult,
} from "./harness.js";

/** A scoring policy: anything that turns a trace into a score. */
export type ScoringPolicy = (trace: RunTrace) => RunScore;

/** The default policy is the shipped scorer. */
export const defaultPolicy: ScoringPolicy = scoreTrace;

/** Run the fixtures under an arbitrary policy (mirrors harness.runEval). */
export function runEvalWithPolicy(
  policy: ScoringPolicy,
  fixtures: readonly EvalFixture[] = EVAL_FIXTURES,
): EvalRun {
  const results: FixtureResult[] = fixtures.map((f) => {
    const score = policy(f.trace);
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

export interface PolicyCandidate {
  name: string;
  policy: ScoringPolicy;
}

export type CandidateDecision = "accepted" | "rejected";

export interface CandidateEvaluation {
  name: string;
  decision: CandidateDecision;
  gate: GateResult;
  run: EvalRun;
  /** truthRate delta vs baseline (positive = better). */
  truthRateDelta: number;
  netRewardDelta: number;
}

/**
 * Evaluate one policy candidate against a frozen baseline. Accepted only if the
 * gate passes (no fixture failures, no metric regression, no fixture drift).
 * Acceptance never means "ship automatically"; it means "this candidate is
 * eligible to be promoted by a human / a separate, gated step".
 */
export function evaluateCandidate(
  candidate: PolicyCandidate,
  baseline: EvalBaseline,
  fixtures: readonly EvalFixture[] = EVAL_FIXTURES,
): CandidateEvaluation {
  const run = runEvalWithPolicy(candidate.policy, fixtures);
  const gate = gateAgainstBaseline(run, baseline);
  return {
    name: candidate.name,
    decision: gate.ok ? "accepted" : "rejected",
    gate,
    run,
    truthRateDelta: round(run.summary.truthRate - baseline.truthRate),
    netRewardDelta: run.summary.netReward - baseline.netReward,
  };
}

export interface ImprovementRoundResult {
  baseline: EvalBaseline;
  evaluations: CandidateEvaluation[];
  /** The accepted candidate with the best truthRate delta, if any. */
  winner: CandidateEvaluation | null;
}

/**
 * One round of the loop: take the current baseline and a set of candidate
 * policies, evaluate each, and pick the best accepted one as the winner. If no
 * candidate beats baseline, winner is null and nothing changes (the safe
 * default: drift is impossible because acceptance requires beating the gate).
 */
export function runImprovementRound(
  baseline: EvalBaseline,
  candidates: PolicyCandidate[],
  fixtures: readonly EvalFixture[] = EVAL_FIXTURES,
): ImprovementRoundResult {
  const evaluations = candidates.map((c) => evaluateCandidate(c, baseline, fixtures));
  const accepted = evaluations.filter((e) => e.decision === "accepted");
  accepted.sort((a, b) => b.truthRateDelta - a.truthRateDelta || b.netRewardDelta - a.netRewardDelta);
  return {
    baseline,
    evaluations,
    winner: accepted[0] ?? null,
  };
}

/** Mint a fresh baseline from the default policy (the "current truth"). */
export function currentBaseline(
  note: string,
  fixtures: readonly EvalFixture[] = EVAL_FIXTURES,
): EvalBaseline {
  return baselineFromRun(runEvalWithPolicy(defaultPolicy, fixtures), note);
}

function round(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 1e6) / 1e6;
}
