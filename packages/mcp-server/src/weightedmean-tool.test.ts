import { describe, it, expect } from "vitest";
import { weightedMean } from "./weightedmean-tool.js";

describe("weightedMean", () => {
  it("computes weighted mean", async () => {
    const r = await weightedMean({ values: [80, 90], weights: [1, 3] }) as any;
    expect(r.weighted_mean).toBe(87.5);
  });
  it("falls back to arithmetic mean without weights", async () => {
    const r = await weightedMean({ values: [10, 20, 30] }) as any;
    expect(r.arithmetic_mean).toBe(20);
    expect(r.weighted_mean).toBe(20);
  });
  it("returns error for empty values", async () => {
    const r = await weightedMean({ values: [] }) as any;
    expect(r.error).toBeTruthy();
  });
});
