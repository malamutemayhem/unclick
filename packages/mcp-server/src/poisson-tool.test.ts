import { describe, it, expect } from "vitest";
import { poissonProbability } from "./poisson-tool.js";

describe("poissonProbability", () => {
  it("computes P(X=3) for lambda=2", async () => {
    const r = await poissonProbability({ k: 3, lambda: 2 }) as any;
    expect(r.pmf).toBeCloseTo(0.18045, 4);
    expect(r.mean).toBe(2);
  });
  it("computes P(X=0)", async () => {
    const r = await poissonProbability({ k: 0, lambda: 1 }) as any;
    expect(r.pmf).toBeCloseTo(0.36788, 4);
  });
  it("returns error for negative lambda", async () => {
    const r = await poissonProbability({ k: 1, lambda: -1 }) as any;
    expect(r.error).toBeTruthy();
  });
});
