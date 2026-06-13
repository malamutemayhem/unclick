import { describe, it, expect } from "vitest";
import { binomialProbability } from "./binomprob-tool.js";

describe("binomialProbability", () => {
  it("computes coin flip probability", async () => {
    const r = await binomialProbability({ n: 10, k: 5, p: 0.5 }) as any;
    expect(r.pmf_exact).toBeCloseTo(0.24609375, 6);
    expect(r.mean).toBe(5);
  });

  it("computes edge case k=0", async () => {
    const r = await binomialProbability({ n: 5, k: 0, p: 0.3 }) as any;
    expect(r.pmf_exact).toBeCloseTo(0.16807, 4);
    expect(r.cdf_at_most_k).toBeCloseTo(0.16807, 4);
  });

  it("returns error for invalid p", async () => {
    const r = await binomialProbability({ n: 10, k: 5, p: 1.5 }) as any;
    expect(r.error).toBeTruthy();
  });

  it("returns error for k > n", async () => {
    const r = await binomialProbability({ n: 5, k: 10, p: 0.5 }) as any;
    expect(r.error).toBeTruthy();
  });
});
