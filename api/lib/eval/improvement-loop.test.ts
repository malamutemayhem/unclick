import { describe, it, expect } from "vitest";
import {
  currentBaseline,
  defaultPolicy,
  evaluateCandidate,
  runEvalWithPolicy,
  runImprovementRound,
  type ScoringPolicy,
} from "./improvement-loop.js";
import { scoreTrace } from "../score-trace.js";

// A candidate that scores identically to the shipped policy.
const samePolicy: ScoringPolicy = (t) => scoreTrace(t);

// A BROKEN candidate: calls every closed job verified regardless of proof.
// This must be REJECTED because it flips false-green fixtures and inflates
// truthRate dishonestly (fixtures will mismatch).
const recklessPolicy: ScoringPolicy = (t) => {
  if (t.disposition === "closed") {
    return { reward: 1, outcome: "verified_completion", reason: "reckless", signals: [] };
  }
  return scoreTrace(t);
};

describe("improvement loop", () => {
  it("baseline minted from the default policy gates itself as pass", () => {
    const baseline = currentBaseline("test");
    const evalResult = evaluateCandidate({ name: "same", policy: samePolicy }, baseline);
    expect(evalResult.decision).toBe("accepted");
    expect(evalResult.truthRateDelta).toBe(0);
  });

  it("rejects a reckless candidate that fakes verified completions", () => {
    const baseline = currentBaseline("test");
    const evalResult = evaluateCandidate({ name: "reckless", policy: recklessPolicy }, baseline);
    expect(evalResult.decision).toBe("rejected");
    // It fails because fixtures no longer score as expected.
    expect(evalResult.gate.status).toBe("fixtures-failed");
  });

  it("a round with only a same-as-baseline candidate has a winner with zero delta", () => {
    const baseline = currentBaseline("test");
    const round = runImprovementRound(baseline, [{ name: "same", policy: samePolicy }]);
    expect(round.winner).not.toBeNull();
    expect(round.winner?.name).toBe("same");
    expect(round.winner?.truthRateDelta).toBe(0);
  });

  it("a round where every candidate regresses has no winner (nothing ships)", () => {
    const baseline = currentBaseline("test");
    const round = runImprovementRound(baseline, [{ name: "reckless", policy: recklessPolicy }]);
    expect(round.winner).toBeNull();
    expect(round.evaluations[0].decision).toBe("rejected");
  });

  it("runEvalWithPolicy matches the default harness for the shipped policy", () => {
    const run = runEvalWithPolicy(defaultPolicy);
    expect(run.mismatches).toEqual([]);
    expect(run.summary.verified).toBe(1);
  });
});
