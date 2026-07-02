import { describe, it, expect } from "vitest";
import { percentileCalc } from "./percentile-tool.js";

describe("percentileCalc", () => {
  it("computes default percentiles", async () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    const r = await percentileCalc({ data }) as any;
    expect(r.percentiles.p50).toBeCloseTo(50.5, 1);
    expect(r.percentiles.p25).toBeCloseTo(25.75, 1);
    expect(r.percentiles.p75).toBeCloseTo(75.25, 1);
  });

  it("computes custom percentiles", async () => {
    const data = [10, 20, 30, 40, 50];
    const r = await percentileCalc({ data, percentiles: [0, 50, 100] }) as any;
    expect(r.percentiles.p0).toBe(10);
    expect(r.percentiles.p50).toBe(30);
    expect(r.percentiles.p100).toBe(50);
  });

  it("finds percentile rank of a value", async () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
    const r = await percentileCalc({ data, value: 50 }) as any;
    expect(r.value_percentile.percentile).toBeCloseTo(49.5, 0);
  });

  it("handles single element", async () => {
    const r = await percentileCalc({ data: [42] }) as any;
    expect(r.percentiles.p50).toBe(42);
    expect(r.min).toBe(42);
    expect(r.max).toBe(42);
  });

  it("rejects empty data", async () => {
    await expect(percentileCalc({ data: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await percentileCalc({ data: [1, 2, 3] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
