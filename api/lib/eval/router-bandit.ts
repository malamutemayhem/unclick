// Routing as gradient-free reinforcement: a contextual bandit over arms
// (model / seat / tool / writer-backend), rewarded by the PROOF signal from
// scoreTrace. This is "Reinforcement without weights" (a) from
// docs/path-a-learning-and-autonomy.md, made real.
//
// It does NOT replace the writerlane eligibility filter; it learns a PREFERENCE
// among eligible arms from observed proof-yield, so over time the system routes
// work to whatever actually produces verified completions fastest. Cheap,
// online-safe, no model training, no gradients.
//
// Pure and deterministic: the caller supplies the random source and the clock.
// Persistence (reading/writing arm stats) is the caller's job; this module is
// the math and the policy, fully unit-testable.

import type { RunScore } from "../score-trace.js";

/** Accumulated proof-reward statistics for one routing arm. */
export interface ArmStats {
  arm: string;
  /** Number of times this arm was chosen and scored. */
  pulls: number;
  /** Sum of proof rewards (+1 verified, 0 neutral, -1 false-green/stale). */
  rewardSum: number;
  /** Count of verified completions, for a human-readable success rate. */
  verified: number;
}

export function emptyArm(arm: string): ArmStats {
  return { arm, pulls: 0, rewardSum: 0, verified: 0 };
}

/** Mean proof-reward for an arm; 0 when never pulled (optimistic-neutral). */
export function meanReward(stats: ArmStats): number {
  return stats.pulls === 0 ? 0 : stats.rewardSum / stats.pulls;
}

/** Update an arm's stats from a scored run. Pure: returns a new record. */
export function updateArm(stats: ArmStats, score: RunScore): ArmStats {
  return {
    arm: stats.arm,
    pulls: stats.pulls + 1,
    rewardSum: stats.rewardSum + score.reward,
    verified: stats.verified + (score.outcome === "verified_completion" ? 1 : 0),
  };
}

export type BanditStrategy = "epsilon-greedy" | "ucb" | "thompson";

export interface SelectOptions {
  strategy?: BanditStrategy;
  /** Exploration rate for epsilon-greedy (0..1). */
  epsilon?: number;
  /** Total pulls across all arms, for UCB. Defaults to the sum of pulls. */
  totalPulls?: number;
  /** Random source in [0,1). Inject for deterministic tests. */
  random?: () => number;
}

export interface ArmSelection {
  arm: string;
  strategy: BanditStrategy;
  /** The score the strategy assigned the winner (mean, UCB bound, or sample). */
  value: number;
  /** Whether this was an exploration pick (epsilon-greedy only). */
  explored: boolean;
}

/**
 * Choose an arm among ELIGIBLE arms by learned proof-reward. Eligibility is the
 * caller's concern (e.g. the writerlane filter); this only ranks among the
 * arms it is given, so it never overrides safety/eligibility gates.
 */
export function selectArm(
  eligibleArms: ArmStats[],
  options: SelectOptions = {},
): ArmSelection {
  if (eligibleArms.length === 0) {
    throw new Error("selectArm requires at least one eligible arm");
  }
  const strategy = options.strategy ?? "epsilon-greedy";
  const random = options.random ?? Math.random;

  if (strategy === "epsilon-greedy") {
    const epsilon = options.epsilon ?? 0.1;
    if (random() < epsilon) {
      const idx = Math.floor(random() * eligibleArms.length) % eligibleArms.length;
      const arm = eligibleArms[idx];
      return { arm: arm.arm, strategy, value: meanReward(arm), explored: true };
    }
    const best = pickMax(eligibleArms, (a) => meanReward(a));
    return { arm: best.arm, strategy, value: meanReward(best), explored: false };
  }

  if (strategy === "ucb") {
    const total = options.totalPulls ?? eligibleArms.reduce((s, a) => s + a.pulls, 0);
    const best = pickMax(eligibleArms, (a) => ucbBound(a, total));
    return { arm: best.arm, strategy, value: ucbBound(best, total), explored: false };
  }

  // thompson: sample each arm from a Beta-like posterior built from its
  // verified/pull counts, pick the highest sample. Uses the injected RNG.
  const best = pickMax(eligibleArms, (a) => thompsonSample(a, random));
  return { arm: best.arm, strategy, value: meanReward(best), explored: false };
}

function pickMax<T>(items: T[], score: (t: T) => number): T {
  let best = items[0];
  let bestScore = score(best);
  for (let i = 1; i < items.length; i++) {
    const s = score(items[i]);
    if (s > bestScore) {
      best = items[i];
      bestScore = s;
    }
  }
  return best;
}

function ucbBound(stats: ArmStats, totalPulls: number): number {
  if (stats.pulls === 0) return Number.POSITIVE_INFINITY; // try unpulled arms first
  const exploration = Math.sqrt((2 * Math.log(Math.max(totalPulls, 1))) / stats.pulls);
  return meanReward(stats) + exploration;
}

function thompsonSample(stats: ArmStats, random: () => number): number {
  // Map rewards into a success count in [0, pulls]. reward in [-1,1] -> [0,1].
  const successes = Math.max(0, stats.verified);
  const failures = Math.max(0, stats.pulls - stats.verified);
  // Cheap Beta(successes+1, failures+1) approximation via averaged uniforms.
  const a = successes + 1;
  const b = failures + 1;
  return sampleBeta(a, b, random);
}

// Small, dependency-free Beta sampler good enough for arm ranking.
function sampleBeta(a: number, b: number, random: () => number): number {
  const x = sampleGamma(a, random);
  const y = sampleGamma(b, random);
  return x / (x + y);
}

function sampleGamma(k: number, random: () => number): number {
  // Sum-of-exponentials approximation for integer-ish shape; fine for ranking.
  const n = Math.max(1, Math.round(k));
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += -Math.log(1 - random());
  }
  return sum;
}

export interface ArmTable {
  arms: Record<string, ArmStats>;
}

export function emptyArmTable(): ArmTable {
  return { arms: {} };
}

/** Record a scored run against the arm that produced it. Pure. */
export function recordArmOutcome(table: ArmTable, arm: string, score: RunScore): ArmTable {
  const current = table.arms[arm] ?? emptyArm(arm);
  return { arms: { ...table.arms, [arm]: updateArm(current, score) } };
}

/** Human-readable leaderboard: arms sorted by mean proof-reward. */
export function armLeaderboard(table: ArmTable): Array<ArmStats & { meanReward: number; successRate: number }> {
  return Object.values(table.arms)
    .map((a) => ({
      ...a,
      meanReward: meanReward(a),
      successRate: a.pulls === 0 ? 0 : a.verified / a.pulls,
    }))
    .sort((x, y) => y.meanReward - x.meanReward || y.pulls - x.pulls);
}
