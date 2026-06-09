import { describe, it, expect } from "vitest";
import { correlationCalc } from "./correlation-tool.js";

describe("correlationCalc", () => {
  it("detects perfect positive correlation", async () => {
    const r = await correlationCalc({ x: [1, 2, 3, 4, 5], y: [2, 4, 6, 8, 10] }) as any;
    expect(r.pearson_r).toBeCloseTo(1, 6);
    expect(r.r_squared).toBeCloseTo(1, 6);
    expect(r.strength).toBe("strong");
    expect(r.direction).toBe("positive");
  });

  it("detects perfect negative correlation", async () => {
    const r = await correlationCalc({ x: [1, 2, 3, 4], y: [10, 8, 6, 4] }) as any;
    expect(r.pearson_r).toBeCloseTo(-1, 6);
    expect(r.direction).toBe("negative");
  });

  it("detects no correlation", async () => {
    const r = await correlationCalc({ x: [1, 2, 3, 4], y: [5, 5, 5, 5] }) as any;
    expect(r.pearson_r).toBe(0);
    expect(r.strength).toBe("negligible");
  });

  it("computes regression line", async () => {
    const r = await correlationCalc({ x: [1, 2, 3], y: [2, 4, 6] }) as any;
    expect(r.regression_slope).toBeCloseTo(2, 6);
    expect(r.regression_intercept).toBeCloseTo(0, 6);
  });

  it("rejects mismatched lengths", async () => {
    await expect(correlationCalc({ x: [1, 2], y: [1] })).rejects.toThrow("same length");
  });

  it("rejects too few points", async () => {
    await expect(correlationCalc({ x: [1], y: [2] })).rejects.toThrow("at least 2");
  });

  it("stamps meta", async () => {
    const r = await correlationCalc({ x: [1, 2], y: [3, 4] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
