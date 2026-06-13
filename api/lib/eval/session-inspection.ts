// Session-start inspection: the "onboarding inspection on every Hi" wired into
// the load_memory bookend. On every session, a seat connected to UnClick can
// call this to (1) read what is going on (truth rate, fresh fake-green/stale
// jobs), and (2) when friction RECURS, emit a structured improvement job for
// the Autopilot Improver lane instead of normalizing the friction (AUTOPILOT.md:
// "Continuous Improvement owns repeated resistance").
//
// It never self-edits and never takes destructive action. It inspects, reports,
// and (when warranted) PROPOSES a front-of-line improvement job that Autopilot's
// gated build process picks up. That keeps the chain of command visible:
// measure + propose here, build under the existing safety gates there.
//
// Pure and deterministic: caller passes the current signals and thresholds.

import type { TruthRateSummary } from "../score-trace.js";

export interface SessionInspectionInput {
  truthSummary: TruthRateSummary | null;
  falseGreenJobIds: string[];
  staleJobIds: string[];
  /** How many recent inspections in a row already flagged the same friction. */
  recurringFrictionStreak?: number;
  thresholds?: InspectionThresholds;
}

export interface InspectionThresholds {
  /** Fake-green rate above this is "needs attention". */
  maxHallucinatedRate: number;
  /** This many stale jobs (or more) is "needs attention". */
  maxStaleJobs: number;
  /** Raise an improvement job only after friction recurs this many times. */
  improvementJobAfterStreak: number;
}

export const DEFAULT_THRESHOLDS: InspectionThresholds = {
  maxHallucinatedRate: 0.2,
  maxStaleJobs: 3,
  improvementJobAfterStreak: 2,
};

export type InspectionStatus = "healthy" | "watch" | "needs_attention";

/** A proposed front-of-line improvement job for the Autopilot Improver lane. */
export interface ImprovementJobProposal {
  title: string;
  rationale: string;
  /** Evidence the proposal is built on (job ids, metrics), for the ledger. */
  evidence: string[];
  /** Improver lane handles this; it is gated, not auto-built. */
  lane: "improver";
  priority: "normal" | "high" | "urgent";
}

export interface SessionInspection {
  status: InspectionStatus;
  /** Plain-English headline a seat can show on session start. */
  headline: string;
  /** Specific observations. */
  notes: string[];
  /** What the seat should look at first, in order. */
  nextActions: string[];
  /** A proposed improvement job, only when friction recurs. Null otherwise. */
  improvementJob: ImprovementJobProposal | null;
}

/**
 * Build the session-start inspection. Read-only by construction: it returns a
 * report and at most a PROPOSED job; it changes nothing. The improvement job is
 * emitted only when the same friction has recurred past the streak threshold,
 * so a single bad day does not spam the board.
 */
export function buildSessionInspection(input: SessionInspectionInput): SessionInspection {
  const t = { ...DEFAULT_THRESHOLDS, ...(input.thresholds ?? {}) };
  const streak = input.recurringFrictionStreak ?? 0;
  const notes: string[] = [];
  const nextActions: string[] = [];

  if (!input.truthSummary || input.truthSummary.total === 0) {
    return {
      status: "healthy",
      headline: "No recent jobs to inspect. Board is quiet.",
      notes: ["No jobs scored in the window."],
      nextActions: [],
      improvementJob: null,
    };
  }

  const s = input.truthSummary;
  const hallucinated = s.hallucinatedCompletionRate;
  const staleCount = input.staleJobIds.length;
  const fakeGreenCount = input.falseGreenJobIds.length;

  let status: InspectionStatus = "healthy";

  if (hallucinated > t.maxHallucinatedRate) {
    status = "needs_attention";
    notes.push(`Fake-green rate ${pct(hallucinated)} is above the ${pct(t.maxHallucinatedRate)} line.`);
    if (fakeGreenCount > 0) {
      nextActions.push(`Review ${fakeGreenCount} fake-green job(s): ${input.falseGreenJobIds.slice(0, 5).join(", ")}.`);
    }
  }

  if (staleCount >= t.maxStaleJobs) {
    status = status === "needs_attention" ? "needs_attention" : "watch";
    notes.push(`${staleCount} stale job(s) need recovery.`);
    nextActions.push(`Recover stale job(s): ${input.staleJobIds.slice(0, 5).join(", ")}.`);
  }

  if (status === "healthy") {
    notes.push(`Truth rate ${pct(s.truthRate)} across ${s.total} jobs. Looking good.`);
  }

  const frictionPresent = status !== "healthy";
  const improvementJob =
    frictionPresent && streak + 1 >= t.improvementJobAfterStreak
      ? proposeImprovementJob(s, fakeGreenCount, staleCount, streak + 1)
      : null;

  const headline =
    status === "needs_attention"
      ? "Attention: proof quality is slipping. See notes."
      : status === "watch"
        ? "Mostly healthy, with a few things to watch."
        : `Healthy. Truth rate ${pct(s.truthRate)}.`;

  return { status, headline, notes, nextActions, improvementJob };
}

function proposeImprovementJob(
  s: TruthRateSummary,
  fakeGreenCount: number,
  staleCount: number,
  streak: number,
): ImprovementJobProposal {
  const drivers: string[] = [];
  if (fakeGreenCount > 0) drivers.push(`${fakeGreenCount} fake-green`);
  if (staleCount > 0) drivers.push(`${staleCount} stale`);
  const priority: ImprovementJobProposal["priority"] =
    s.hallucinatedCompletionRate > 0.4 ? "urgent" : streak >= 3 ? "high" : "normal";

  return {
    lane: "improver",
    priority,
    title: `Recurring proof-quality friction (${drivers.join(", ")})`,
    rationale:
      `This friction has recurred ${streak} inspections in a row. Per the Improver lane, ` +
      `turn the repeated resistance into a front-of-line improvement job rather than ` +
      `normalizing it. Truth rate is ${pct(s.truthRate)}, fake-green rate ${pct(s.hallucinatedCompletionRate)}.`,
    evidence: [
      `truth_rate=${round(s.truthRate)}`,
      `hallucinated_completion_rate=${round(s.hallucinatedCompletionRate)}`,
      `false_green=${fakeGreenCount}`,
      `stale=${staleCount}`,
      `recurring_streak=${streak}`,
    ],
  };
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}
function round(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 1e6) / 1e6;
}
