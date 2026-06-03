// Frozen regression fixtures for the proof-as-reward eval harness.
//
// See docs/path-a-eval-harness-spec.md. Each fixture is a real-shaped run
// trace plus the outcome scoreTrace() must produce. Following the Recovery-Bench
// pattern, every incident class UnClick actually hits (false-green, stale,
// self-close, rolled-back, honest blocker) is captured as a replayable case.
//
// These are FROZEN. They are the baseline a policy change must beat. Add new
// fixtures when new incidents occur; do NOT edit existing ones to make a change
// pass. Pure data, no imports beyond the trace types.

import type { RunTrace, RunOutcome, XPassReceiptSlice } from "../score-trace.js";

export interface EvalFixture {
  id: string;
  /** Why this case exists, for review. */
  description: string;
  trace: RunTrace;
  /** The outcome scoreTrace must return for this trace. */
  expectedOutcome: RunOutcome;
  /** The reward scoreTrace must return. */
  expectedReward: number;
}

const freshPass: XPassReceiptSlice = {
  kind: "xpass_receipt_v1",
  verdict: "pass",
  provenance: { head_sha: "head-current" },
  staleness: { stale_checks: [], unscoped_checks: [], target_sha: "head-current" },
};

export const EVAL_FIXTURES: readonly EvalFixture[] = [
  {
    id: "verified-with-independent-verifier",
    description:
      "Healthy path: closed with a fresh head-bound xpass pass and a separate verifier agent.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: freshPass,
      currentHeadSha: "head-current",
      completionCode: "allowed",
    },
    expectedOutcome: "verified_completion",
    expectedReward: 1,
  },
  {
    id: "false-green-no-receipt",
    description: "Marked done with no xpass receipt at all. The classic fake-green.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: null,
      currentHeadSha: "head-current",
      completionCode: "allowed",
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-stale-receipt",
    description: "Pass receipt exists but a check is stale for the current head.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: {
        ...freshPass,
        staleness: { stale_checks: ["testpass"], unscoped_checks: [], target_sha: "head-current" },
      },
      currentHeadSha: "head-current",
      completionCode: "allowed",
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-head-mismatch",
    description: "Pass receipt is bound to an older head than the current PR head.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: { ...freshPass, provenance: { head_sha: "head-old" } },
      currentHeadSha: "head-current",
      completionCode: "allowed",
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-self-closed",
    description: "Author closed their own job with no independent verifier.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-builder",
      xpassReceipt: freshPass,
      currentHeadSha: "head-current",
      completionCode: "allowed",
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-policy-withheld",
    description: "Completion gate withheld approval (git proof required) but job was closed anyway.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: freshPass,
      currentHeadSha: "head-current",
      completionCode: "git_proof_required",
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-reopened",
    description: "Closed then reopened: the original completion was not real.",
    trace: { disposition: "reopened", xpassReceipt: freshPass, currentHeadSha: "head-current" },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-rolled-back",
    description: "Hard negative: a passing receipt cannot save a change that was rolled back.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: freshPass,
      currentHeadSha: "head-current",
      completionCode: "allowed",
      rolledBack: true,
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "false-green-user-corrected",
    description: "Hard negative: a human corrected the outcome after it was reported done.",
    trace: {
      disposition: "closed",
      closerAgentId: "agent-builder",
      verifierAgentId: "agent-reviewer",
      xpassReceipt: freshPass,
      currentHeadSha: "head-current",
      completionCode: "allowed",
      userCorrected: true,
    },
    expectedOutcome: "false_green",
    expectedReward: -1,
  },
  {
    id: "stale-owner",
    description: "Owner went stale before producing proof. Should be flagged for recovery.",
    trace: { disposition: "stale" },
    expectedOutcome: "stale",
    expectedReward: -1,
  },
  {
    id: "honest-blocker",
    description: "Abandoned with an honest blocker; no false completion claimed.",
    trace: { disposition: "abandoned" },
    expectedOutcome: "honest_blocker",
    expectedReward: 0,
  },
  {
    id: "in-progress",
    description: "Still in flight; no terminal proof yet.",
    trace: { disposition: "open" },
    expectedOutcome: "in_progress",
    expectedReward: 0,
  },
];
