// Learned router: pick a routing arm among the ones a hard eligibility filter
// already allows, using the bandit's proof-learned preference. This revives the
// idea behind the dead writerlane-router (eligibility + static scoring) by
// adding a LEARNED term that comes from real proof outcomes, not hand-tuned
// constants.
//
// Separation of concerns (deliberate):
//   - eligibility  -> caller's hard filter (safety, cost gates, warm seat).
//     We never override it; we only choose among arms it permits.
//   - preference   -> learned here from scoreTrace rewards via the bandit.
//
// Pure and deterministic (inject the RNG). Persistence of the arm table is the
// caller's job.

import type { RunScore } from "../score-trace.js";
import {
  selectArm,
  recordArmOutcome,
  emptyArmTable,
  armLeaderboard,
  type ArmTable,
  type ArmStats,
  type SelectOptions,
  type ArmSelection,
} from "./router-bandit.js";

/** One scored historical decision: which arm ran, and how it scored. */
export interface ArmOutcomeEvent {
  arm: string;
  score: RunScore;
}

/** Replay historical proof outcomes into an arm table (the "learning" step). */
export function buildArmTable(events: ArmOutcomeEvent[]): ArmTable {
  let table = emptyArmTable();
  for (const e of events) {
    table = recordArmOutcome(table, e.arm, e.score);
  }
  return table;
}

export interface RouteDecision {
  /** The chosen arm, guaranteed to be one of the eligible arms. */
  arm: string;
  selection: ArmSelection;
  /** True when no learned history existed for any eligible arm (cold start). */
  coldStart: boolean;
  /** The eligible arms considered, with their current stats. */
  considered: ArmStats[];
}

/**
 * Route among eligible arms using learned proof-reward. On a cold start (no arm
 * has any pulls yet) it still returns a deterministic choice (the first
 * eligible arm under epsilon-greedy exploitation), so behaviour is safe before
 * any learning has happened.
 */
export function routeAmong(
  eligibleArmNames: string[],
  table: ArmTable,
  options: SelectOptions = {},
): RouteDecision {
  if (eligibleArmNames.length === 0) {
    throw new Error("routeAmong requires at least one eligible arm");
  }
  const considered: ArmStats[] = eligibleArmNames.map(
    (name) => table.arms[name] ?? { arm: name, pulls: 0, rewardSum: 0, verified: 0 },
  );
  const coldStart = considered.every((a) => a.pulls === 0);
  const selection = selectArm(considered, options);
  return { arm: selection.arm, selection, coldStart, considered };
}

export interface RoutingPromotion {
  /** Whether the learned routing table is allowed to take effect. */
  promote: boolean;
  reasons: string[];
  leaderboard: ReturnType<typeof armLeaderboard>;
}

/**
 * Gate before letting learned routing take over from the static default. The
 * same "must earn it" discipline as the eval gate: only promote learned routing
 * once an arm has enough evidence AND a non-negative mean proof-reward, so a
 * noisy or net-harmful table can never silently take the wheel.
 */
export function evaluateRoutingPromotion(
  table: ArmTable,
  opts: { minPullsPerArm?: number; minMeanReward?: number } = {},
): RoutingPromotion {
  const minPulls = opts.minPullsPerArm ?? 20;
  const minMean = opts.minMeanReward ?? 0;
  const board = armLeaderboard(table);
  const reasons: string[] = [];

  if (board.length === 0) {
    return { promote: false, reasons: ["no arms recorded yet"], leaderboard: board };
  }

  const leader = board[0];
  if (leader.pulls < minPulls) {
    reasons.push(`leader "${leader.arm}" has ${leader.pulls} pulls (< ${minPulls} required)`);
  }
  if (leader.meanReward < minMean) {
    reasons.push(
      `leader "${leader.arm}" mean proof-reward ${round(leader.meanReward)} < ${minMean}`,
    );
  }

  if (reasons.length > 0) return { promote: false, reasons, leaderboard: board };
  return {
    promote: true,
    reasons: [
      `leader "${leader.arm}" earned promotion: ${leader.pulls} pulls, mean reward ${round(leader.meanReward)}, success ${(leader.successRate * 100).toFixed(0)}%`,
    ],
    leaderboard: board,
  };
}

function round(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 1e6) / 1e6;
}
