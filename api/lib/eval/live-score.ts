// Batch live scoring: take a list of real Boardroom jobs, run each through the
// live adapter + scoreTrace, and roll the results into the truth-rate
// dashboard. This is the function a cron/admin surface calls to get a real
// "how honest is our 'done' lately" number.
//
// Pure: callers pass the jobs and `nowMs`. Fetching the jobs from Supabase is
// the caller's job (kept out so this stays unit-testable).

import { scoreTrace, summarizeTruthRate, type RunScore, type TruthRateSummary } from "../score-trace.js";
import { jobToRunTrace, type LiveAdapterInput } from "./live-adapter.js";

export interface LiveJobScore {
  jobId: string;
  score: RunScore;
}

export interface LiveScoreReport {
  scored: LiveJobScore[];
  summary: TruthRateSummary;
  /** The jobs that scored as false-green, surfaced for action. */
  falseGreenJobIds: string[];
  /** The jobs that scored as stale, eligible for recovery. */
  staleJobIds: string[];
}

/** Score a batch of live jobs and summarize. Each input carries one job. */
export function scoreLiveJobs(
  inputs: Array<LiveAdapterInput & { jobId?: string }>,
): LiveScoreReport {
  const scored: LiveJobScore[] = inputs.map((input) => {
    const trace = jobToRunTrace(input);
    const score = scoreTrace(trace);
    return { jobId: input.jobId ?? input.job.id, score };
  });

  const summary = summarizeTruthRate(scored.map((s) => s.score));

  return {
    scored,
    summary,
    falseGreenJobIds: scored.filter((s) => s.score.outcome === "false_green").map((s) => s.jobId),
    staleJobIds: scored.filter((s) => s.score.outcome === "stale").map((s) => s.jobId),
  };
}
