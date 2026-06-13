// scoreTrace: proof-derived outcome scoring for agent runs.
//
// The keystone of the continuous-improvement loop (see
// docs/path-a-eval-harness-spec.md). It converts a run's EXISTING proof
// artifacts into a single reward, so policy changes (routing, prompts,
// recovery) can later be measured against frozen fixtures instead of narrated.
//
// Design rules:
//  - Reward is PROOF-DERIVED, never self-reported. We read the xpass receipt
//    verdict, its head-SHA binding/staleness, and the completion-policy code.
//    We never trust an agent saying "done".
//  - Pure and deterministic. No DB, no network, no clock unless injected. This
//    is what lets it run inside the eval harness over historical traces.
//  - Structurally typed against the real shapes
//    (packages/.../xpass-aggregated-verdict-tool.ts emits `xpass_receipt_v1`;
//    api/lib/fishbowl-completion-policy.ts emits the result codes) without
//    importing across the package boundary, so this helper stays dependency
//    free and trivially testable.

/** Minimal slice of an xpass_receipt_v1 that scoring needs. */
export interface XPassReceiptSlice {
  kind?: string;
  verdict: "pass" | "pending" | "fail" | string;
  provenance?: {
    head_sha?: string | null;
  } | null;
  staleness?: {
    stale_checks?: string[];
    unscoped_checks?: string[];
    target_sha?: string | null;
  } | null;
}

/** The completion-policy result codes that gate "done". */
export type CompletionPolicyCode =
  | "allowed"
  | "missing_proof"
  | "git_proof_required"
  | "release_or_live_proof_required"
  | "ui_screenshot_required"
  | "independent_verifier_required";

/** What actually happened to the work, observed from git/Fishbowl, not claimed. */
export type RunDisposition =
  | "closed" // the job was marked done
  | "reopened" // closed then reopened (false-green tell)
  | "stale" // owner went stale / lease expired
  | "abandoned" // dropped with an honest blocker
  | "open"; // still in flight

export interface RunTrace {
  /** The agent that closed/owns the run, for self-close detection. */
  closerAgentId?: string | null;
  /** The agent that produced the verifying proof, if any. */
  verifierAgentId?: string | null;
  /** Observed disposition from git/Fishbowl state. */
  disposition: RunDisposition;
  /** The xpass aggregated receipt for the run's target, if one exists. */
  xpassReceipt?: XPassReceiptSlice | null;
  /** The current PR/target head SHA, to check the receipt is bound to it. */
  currentHeadSha?: string | null;
  /** The completion-policy decision recorded when the job was closed. */
  completionCode?: CompletionPolicyCode | null;
  /** Whether a human later corrected the outcome. */
  userCorrected?: boolean;
  /** Whether the change was rolled back. */
  rolledBack?: boolean;
}

export type RunOutcome =
  | "verified_completion"
  | "false_green"
  | "stale"
  | "honest_blocker"
  | "in_progress";

export interface RunScore {
  /** +1 verified, 0 neutral/no-op, -1 false-green or penalized failure. */
  reward: number;
  outcome: RunOutcome;
  /** Human-readable why, for dashboards and fixture review. */
  reason: string;
  /** The specific proof signals that drove the score, for auditing. */
  signals: string[];
}

function receiptIsFreshPass(
  receipt: XPassReceiptSlice | null | undefined,
  currentHeadSha: string | null | undefined,
  signals: string[],
): boolean {
  if (!receipt) {
    signals.push("no xpass receipt");
    return false;
  }
  if (receipt.verdict !== "pass") {
    signals.push(`xpass verdict is "${receipt.verdict}"`);
    return false;
  }
  const stale = receipt.staleness?.stale_checks ?? [];
  const unscoped = receipt.staleness?.unscoped_checks ?? [];
  if (stale.length > 0) {
    signals.push(`stale checks: ${stale.join(", ")}`);
    return false;
  }
  if (unscoped.length > 0) {
    signals.push(`unscoped checks: ${unscoped.join(", ")}`);
    return false;
  }
  // The verdict must be bound to the CURRENT head, or it proves nothing.
  if (currentHeadSha) {
    const head = receipt.provenance?.head_sha ?? null;
    if (head !== currentHeadSha) {
      signals.push(
        `receipt head_sha (${head ?? "none"}) does not match current head (${currentHeadSha})`,
      );
      return false;
    }
    signals.push("xpass pass bound to current head");
  } else {
    signals.push("xpass pass (head binding not checked: no current head provided)");
  }
  return true;
}

/**
 * Score a run from its proof artifacts. Pure and deterministic.
 *
 * Reward scale (see eval spec):
 *   +1 verified_completion - closed AND a fresh, head-bound xpass pass exists
 *                            AND it was not self-closed without an independent
 *                            verifier.
 *    0 honest_blocker / in_progress - no proof yet, but no false claim either.
 *   -1 false_green - claimed done without fresh, head-bound proof, OR reopened,
 *                    OR user-corrected, OR rolled back.
 *   -1 stale - owner went stale (penalized so recovery is rewarded later).
 */
export function scoreTrace(trace: RunTrace): RunScore {
  const signals: string[] = [];

  // Hard-negative observations override everything: these are proof the claim
  // was wrong, regardless of any receipt.
  if (trace.rolledBack) {
    return {
      reward: -1,
      outcome: "false_green",
      reason: "Change was rolled back after completion.",
      signals: ["rolled_back"],
    };
  }
  if (trace.userCorrected) {
    return {
      reward: -1,
      outcome: "false_green",
      reason: "A human corrected the outcome after it was reported done.",
      signals: ["user_corrected"],
    };
  }
  if (trace.disposition === "reopened") {
    return {
      reward: -1,
      outcome: "false_green",
      reason: "Job was closed then reopened: the original completion was not real.",
      signals: ["reopened"],
    };
  }

  if (trace.disposition === "stale") {
    return {
      reward: -1,
      outcome: "stale",
      reason: "Owner went stale before producing proof. Eligible for recovery.",
      signals: ["stale_owner"],
    };
  }

  if (trace.disposition === "open") {
    return {
      reward: 0,
      outcome: "in_progress",
      reason: "Run still in flight; no terminal proof yet.",
      signals: ["open"],
    };
  }

  if (trace.disposition === "abandoned") {
    return {
      reward: 0,
      outcome: "honest_blocker",
      reason: "Run abandoned with an honest blocker; no false completion claimed.",
      signals: ["abandoned_with_blocker"],
    };
  }

  // disposition === "closed": the interesting case. Demand fresh, head-bound proof.
  const fresh = receiptIsFreshPass(trace.xpassReceipt, trace.currentHeadSha, signals);

  // A self-closed job with no independent verifier is not trustworthy proof,
  // mirroring fishbowl-completion-policy's independent_verifier_required.
  const selfClosedNoVerifier =
    !!trace.closerAgentId &&
    (!trace.verifierAgentId || trace.verifierAgentId === trace.closerAgentId);

  if (trace.completionCode && trace.completionCode !== "allowed") {
    signals.push(`completion policy code: ${trace.completionCode}`);
    return {
      reward: -1,
      outcome: "false_green",
      reason: `Marked done but completion gate withheld approval (${trace.completionCode}).`,
      signals,
    };
  }

  if (!fresh) {
    return {
      reward: -1,
      outcome: "false_green",
      reason: "Marked done without a fresh, head-bound passing proof.",
      signals,
    };
  }

  if (selfClosedNoVerifier) {
    signals.push("self-closed without an independent verifier");
    return {
      reward: -1,
      outcome: "false_green",
      reason: "Closed by its own author with no independent verifier proof.",
      signals,
    };
  }

  signals.push("independent verifier present");
  return {
    reward: 1,
    outcome: "verified_completion",
    reason: "Closed with a fresh, head-bound passing proof and an independent verifier.",
    signals,
  };
}

export interface TruthRateSummary {
  total: number;
  verified: number;
  falseGreen: number;
  stale: number;
  honestBlocker: number;
  inProgress: number;
  /** verified / (verified + falseGreen), the headline metric. 0 when n/a. */
  truthRate: number;
  /** falseGreen / total, the pain metric to drive down. 0 when total is 0. */
  hallucinatedCompletionRate: number;
  /** Sum of rewards across the batch. */
  netReward: number;
}

/** Aggregate a batch of scored runs into the dashboard metrics from the spec. */
export function summarizeTruthRate(scores: RunScore[]): TruthRateSummary {
  const summary: TruthRateSummary = {
    total: scores.length,
    verified: 0,
    falseGreen: 0,
    stale: 0,
    honestBlocker: 0,
    inProgress: 0,
    truthRate: 0,
    hallucinatedCompletionRate: 0,
    netReward: 0,
  };

  for (const s of scores) {
    summary.netReward += s.reward;
    switch (s.outcome) {
      case "verified_completion":
        summary.verified++;
        break;
      case "false_green":
        summary.falseGreen++;
        break;
      case "stale":
        summary.stale++;
        break;
      case "honest_blocker":
        summary.honestBlocker++;
        break;
      case "in_progress":
        summary.inProgress++;
        break;
    }
  }

  const decided = summary.verified + summary.falseGreen;
  summary.truthRate = decided === 0 ? 0 : summary.verified / decided;
  summary.hallucinatedCompletionRate =
    summary.total === 0 ? 0 : summary.falseGreen / summary.total;

  return summary;
}
