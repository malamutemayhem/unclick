import { describe, it, expect } from "vitest";
import { normalDistribution } from "./normaldistr-tool.js";

describe("normalDistribution", () => {
  it("computes standard normal at 0", async () => {
    const r = await normalDistribution({ x: 0 }) as any;
    expect(r.cdf).toBeCloseTo(0.5, 4);
    expect(r.pdf).toBeCloseTo(0.3989, 3);
  });

  it("computes custom mean/stddev", async () => {
    const r = await normalDistribution({ x: 100, mean: 100, stddev: 15 }) as any;
    expect(r.percentile).toBeCloseTo(50, 0);
  });

  it("returns error for missing x", async () => {
    const r = await normalDistribution({}) as any;
    expect(r.error).toBeTruthy();
  });
});
