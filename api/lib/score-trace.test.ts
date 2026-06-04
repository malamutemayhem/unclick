import { describe, it, expect } from "vitest";
import {
  scoreTrace,
  summarizeTruthRate,
  type RunTrace,
  type XPassReceiptSlice,
} from "./score-trace.js";

const freshPass: XPassReceiptSlice = {
  kind: "xpass_receipt_v1",
  verdict: "pass",
  provenance: { head_sha: "abc123" },
  staleness: { stale_checks: [], unscoped_checks: [], target_sha: "abc123" },
};

function baseClosed(overrides: Partial<RunTrace> = {}): RunTrace {
  return {
    disposition: "closed",
    closerAgentId: "agent-builder",
    verifierAgentId: "agent-reviewer",
    xpassReceipt: freshPass,
    currentHeadSha: "abc123",
    completionCode: "allowed",
    ...overrides,
  };
}

describe("scoreTrace", () => {
  it("rewards a verified completion: fresh head-bound pass + independent verifier", () => {
    const score = scoreTrace(baseClosed());
    expect(score.reward).toBe(1);
    expect(score.outcome).toBe("verified_completion");
    expect(score.signals).toContain("independent verifier present");
  });

  it("penalizes false-green: closed with no receipt", () => {
    const score = scoreTrace(baseClosed({ xpassReceipt: null }));
    expect(score.reward).toBe(-1);
    expect(score.outcome).toBe("false_green");
    expect(score.signals).toContain("no xpass receipt");
  });

  it("penalizes false-green: receipt verdict is not pass", () => {
    const score = scoreTrace(
      baseClosed({ xpassReceipt: { ...freshPass, verdict: "pending" } }),
    );
    expect(score.reward).toBe(-1);
    expect(score.outcome).toBe("false_green");
  });

  it("penalizes false-green: pass receipt is stale", () => {
    const score = scoreTrace(
      baseClosed({
        xpassReceipt: {
          ...freshPass,
          staleness: { stale_checks: ["testpass"], unscoped_checks: [], target_sha: "abc123" },
        },
      }),
    );
    expect(score.reward).toBe(-1);
    expect(score.signals.some((s) => s.includes("stale checks"))).toBe(true);
  });

  it("penalizes false-green: receipt head_sha does not match current head", () => {
    const score = scoreTrace(
      baseClosed({
        xpassReceipt: { ...freshPass, provenance: { head_sha: "OLD999" } },
      }),
    );
    expect(score.reward).toBe(-1);
    expect(score.signals.some((s) => s.includes("does not match current head"))).toBe(true);
  });

  it("penalizes false-green: self-closed without an independent verifier", () => {
    const score = scoreTrace(
      baseClosed({ verifierAgentId: "agent-builder" }), // same as closer
    );
    expect(score.reward).toBe(-1);
    expect(score.outcome).toBe("false_green");
    expect(score.signals).toContain("self-closed without an independent verifier");
  });

  it("penalizes false-green: completion policy withheld approval", () => {
    const score = scoreTrace(baseClosed({ completionCode: "git_proof_required" }));
    expect(score.reward).toBe(-1);
    expect(score.reason).toContain("git_proof_required");
  });

  it("hard-negatives override a passing receipt: rolled back", () => {
    const score = scoreTrace(baseClosed({ rolledBack: true }));
    expect(score.reward).toBe(-1);
    expect(score.signals).toEqual(["rolled_back"]);
  });

  it("hard-negatives override: user corrected", () => {
    const score = scoreTrace(baseClosed({ userCorrected: true }));
    expect(score.reward).toBe(-1);
    expect(score.signals).toEqual(["user_corrected"]);
  });

  it("penalizes reopened work as false-green", () => {
    const score = scoreTrace(baseClosed({ disposition: "reopened" }));
    expect(score.reward).toBe(-1);
    expect(score.outcome).toBe("false_green");
  });

  it("penalizes a stale owner (eligible for recovery)", () => {
    const score = scoreTrace({ disposition: "stale" });
    expect(score.reward).toBe(-1);
    expect(score.outcome).toBe("stale");
  });

  it("scores an honest blocker as neutral", () => {
    const score = scoreTrace({ disposition: "abandoned" });
    expect(score.reward).toBe(0);
    expect(score.outcome).toBe("honest_blocker");
  });

  it("scores an in-flight run as neutral", () => {
    const score = scoreTrace({ disposition: "open" });
    expect(score.reward).toBe(0);
    expect(score.outcome).toBe("in_progress");
  });

  it("accepts a verified completion even without a current head when none is known", () => {
    const score = scoreTrace(baseClosed({ currentHeadSha: null }));
    expect(score.reward).toBe(1);
    expect(score.signals.some((s) => s.includes("head binding not checked"))).toBe(true);
  });
});

describe("summarizeTruthRate", () => {
  it("computes truth rate and hallucinated-completion rate", () => {
    const scores = [
      scoreTrace(baseClosed()), // verified
      scoreTrace(baseClosed()), // verified
      scoreTrace(baseClosed({ xpassReceipt: null })), // false-green
      scoreTrace({ disposition: "abandoned" }), // honest blocker
      scoreTrace({ disposition: "open" }), // in progress
    ];
    const s = summarizeTruthRate(scores);
    expect(s.total).toBe(5);
    expect(s.verified).toBe(2);
    expect(s.falseGreen).toBe(1);
    expect(s.honestBlocker).toBe(1);
    expect(s.inProgress).toBe(1);
    // truthRate = verified / (verified + falseGreen) = 2/3
    expect(s.truthRate).toBeCloseTo(2 / 3, 5);
    // hallucinated = falseGreen / total = 1/5
    expect(s.hallucinatedCompletionRate).toBeCloseTo(0.2, 5);
    expect(s.netReward).toBe(1); // +1 +1 -1 +0 +0
  });

  it("handles an empty batch without dividing by zero", () => {
    const s = summarizeTruthRate([]);
    expect(s.total).toBe(0);
    expect(s.truthRate).toBe(0);
    expect(s.hallucinatedCompletionRate).toBe(0);
  });
});
