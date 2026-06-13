import { describe, it, expect } from "vitest";
import { geometricSeries } from "./geomseries-tool.js";

describe("geometricSeries", () => {
  it("computes finite sum", async () => {
    const r = await geometricSeries({ a: 1, r: 2, n: 5 }) as any;
    expect(r.finite_sum).toBe(31);
    expect(r.nth_term).toBe(16);
  });
  it("computes convergent infinite sum", async () => {
    const r = await geometricSeries({ a: 1, r: 0.5, n: 10 }) as any;
    expect(r.converges).toBe(true);
    expect(r.infinite_sum).toBeCloseTo(2, 4);
  });
  it("returns error for invalid n", async () => {
    const r = await geometricSeries({ a: 1, r: 2, n: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});
