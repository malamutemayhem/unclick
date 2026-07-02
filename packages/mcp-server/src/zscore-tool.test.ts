import { describe, it, expect } from "vitest";
import { zscoreCalculate } from "./zscore-tool.js";

describe("zscoreCalculate", () => {
  it("calculates z-score for a value at the mean", async () => {
    const r = await zscoreCalculate({ value: 100, mean: 100, stddev: 15 }) as any;
    expect(r.z_score).toBe(0);
    expect(r.percentile).toBeCloseTo(50, 0);
  });

  it("calculates z-score above the mean", async () => {
    const r = await zscoreCalculate({ value: 130, mean: 100, stddev: 15 }) as any;
    expect(r.z_score).toBe(2);
    expect(r.is_significant_95).toBe(true);
  });

  it("returns error for zero stddev", async () => {
    const r = await zscoreCalculate({ value: 5, mean: 5, stddev: 0 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for missing args", async () => {
    const r = await zscoreCalculate({}) as any;
    expect(r.error).toBeTruthy();
  });
});
