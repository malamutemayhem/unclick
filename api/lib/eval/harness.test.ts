import { describe, it, expect } from "vitest";
import {
  runEval,
  baselineFromRun,
  gateAgainstBaseline,
  renderReport,
  type EvalBaseline,
} from "./harness.js";
import { EVAL_FIXTURES } from "./fixtures.js";

describe("eval harness", () => {
  it("scores every frozen fixture exactly as expected (no mismatches)", () => {
    const run = runEval();
    expect(run.results).toHaveLength(EVAL_FIXTURES.length);
    expect(run.mismatches).toEqual([]);
  });

  it("produces sensible headline metrics over the fixture set", () => {
    const run = runEval();
    // 1 verified, the rest false-green/stale/blocker/in-progress.
    expect(run.summary.verified).toBe(1);
    expect(run.summary.falseGreen).toBeGreaterThanOrEqual(7);
    // truthRate = verified / (verified + falseGreen)
    expect(run.summary.truthRate).toBeGreaterThan(0);
    expect(run.summary.truthRate).toBeLessThan(1);
  });

  it("a run gates as pass against a baseline minted from itself", () => {
    const run = runEval();
    const baseline = baselineFromRun(run, "self");
    const gate = gateAgainstBaseline(run, baseline);
    expect(gate.ok).toBe(true);
    expect(gate.status).toBe("pass");
  });

  it("detects a regression when truthRate drops below baseline", () => {
    const run = runEval();
    const inflated: EvalBaseline = {
      ...baselineFromRun(run, "inflated"),
      truthRate: run.summary.truthRate + 0.5, // pretend baseline was better
    };
    const gate = gateAgainstBaseline(run, inflated);
    expect(gate.ok).toBe(false);
    expect(gate.status).toBe("regressed");
    expect(gate.reasons.some((r) => r.includes("truthRate regressed"))).toBe(true);
  });

  it("detects a drifted baseline fixture outcome", () => {
    const run = runEval();
    const baseline = baselineFromRun(run, "drift");
    // Corrupt one baseline fixture's expected outcome.
    baseline.fixtures[0] = { ...baseline.fixtures[0], outcome: "stale", reward: -1 };
    const gate = gateAgainstBaseline(run, baseline);
    expect(gate.ok).toBe(false);
    expect(gate.reasons.some((r) => r.includes("drifted"))).toBe(true);
  });

  it("flags fixtures-failed when a fixture would score unexpectedly", () => {
    const run = runEval([
      {
        id: "intentionally-wrong",
        description: "expectation deliberately mismatched to exercise the gate",
        trace: { disposition: "open" },
        expectedOutcome: "verified_completion",
        expectedReward: 1,
      },
    ]);
    const baseline = baselineFromRun(runEval(), "real");
    const gate = gateAgainstBaseline(run, baseline);
    expect(gate.status).toBe("fixtures-failed");
    expect(gate.ok).toBe(false);
  });

  it("renders a markdown report with headline metrics and a gate section", () => {
    const run = runEval();
    const baseline = baselineFromRun(run, "self");
    const md = renderReport(run, baseline);
    expect(md).toContain("# Proof-as-Reward Eval Report");
    expect(md).toContain("Truth rate");
    expect(md).toContain("Baseline gate");
    expect(md).toContain("verified-with-independent-verifier");
  });
});
