import { describe, it, expect } from "vitest";
import { BranchPredictor, runBenchmark } from "../branch-predictor.js";

describe("BranchPredictor", () => {
  it("always-taken predicts true", () => {
    const bp = new BranchPredictor("always-taken");
    const r = bp.predict(0x100, true);
    expect(r.predicted).toBe(true);
    expect(r.correct).toBe(true);
  });

  it("always-not-taken predicts false", () => {
    const bp = new BranchPredictor("always-not-taken");
    const r = bp.predict(0x100, true);
    expect(r.predicted).toBe(false);
    expect(r.correct).toBe(false);
  });

  it("one-bit adapts after one misprediction", () => {
    const bp = new BranchPredictor("one-bit");
    bp.predict(0x100, true);
    bp.predict(0x100, true);
    const r = bp.predict(0x100, true);
    expect(r.predicted).toBe(true);
    expect(r.correct).toBe(true);
  });

  it("two-bit requires two misses to flip", () => {
    const bp = new BranchPredictor("two-bit");
    bp.predict(0x100, true);
    bp.predict(0x100, true);
    bp.predict(0x100, true);
    const r1 = bp.predict(0x100, false);
    expect(r1.predicted).toBe(true);
    const r2 = bp.predict(0x100, false);
    expect(r2.predicted).toBe(true);
    const r3 = bp.predict(0x100, false);
    expect(r3.predicted).toBe(false);
  });

  it("accuracy tracks correct predictions", () => {
    const bp = new BranchPredictor("always-taken");
    bp.predict(0x100, true);
    bp.predict(0x200, true);
    bp.predict(0x300, false);
    expect(bp.accuracy).toBeCloseTo(2 / 3);
  });

  it("mispredictionRate is complement of accuracy", () => {
    const bp = new BranchPredictor("always-taken");
    bp.predict(0x100, true);
    bp.predict(0x200, false);
    expect(bp.mispredictionRate).toBeCloseTo(0.5);
  });

  it("totalPredictions counts all", () => {
    const bp = new BranchPredictor("two-bit");
    bp.predict(0x100, true);
    bp.predict(0x200, false);
    bp.predict(0x300, true);
    expect(bp.totalPredictions).toBe(3);
  });

  it("reset clears state", () => {
    const bp = new BranchPredictor("two-bit");
    bp.predict(0x100, true);
    bp.predict(0x100, true);
    bp.reset();
    expect(bp.totalPredictions).toBe(0);
    expect(bp.accuracy).toBe(0);
  });

  it("gshare uses global history", () => {
    const bp = new BranchPredictor("gshare");
    bp.predict(0x100, true);
    bp.predict(0x100, false);
    expect(bp.totalPredictions).toBe(2);
  });

  it("predictorType returns type", () => {
    const bp = new BranchPredictor("gshare");
    expect(bp.predictorType).toBe("gshare");
  });

  it("size returns table size", () => {
    const bp = new BranchPredictor("two-bit", 512);
    expect(bp.size).toBe(512);
  });

  it("getStats returns summary", () => {
    const bp = new BranchPredictor("two-bit");
    bp.predict(0x100, true);
    const stats = bp.getStats();
    expect(stats.predictions).toBe(1);
    expect(stats.accuracy).toBeGreaterThanOrEqual(0);
  });
});

describe("runBenchmark", () => {
  it("runs pattern and returns results", () => {
    const bp = new BranchPredictor("two-bit");
    const pattern = [true, true, true, false, true, true, true, false];
    const results = runBenchmark(bp, pattern);
    expect(results).toHaveLength(8);
  });

  it("two-bit handles repeating pattern well", () => {
    const bp = new BranchPredictor("two-bit");
    const pattern: boolean[] = [];
    for (let i = 0; i < 100; i++) pattern.push(true);
    runBenchmark(bp, pattern);
    expect(bp.accuracy).toBeGreaterThan(0.9);
  });
});
