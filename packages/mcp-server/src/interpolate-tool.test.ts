import { describe, it, expect } from "vitest";
import { interpolateCalc } from "./interpolate-tool.js";

describe("interpolateCalc", () => {
  it("interpolates midpoint", async () => {
    const r = await interpolateCalc({ x1: 0, y1: 0, x2: 10, y2: 20, x: 5 }) as any;
    expect(r.result_y).toBe(10);
    expect(r.t).toBe(0.5);
    expect(r.is_extrapolation).toBe(false);
  });

  it("detects extrapolation", async () => {
    const r = await interpolateCalc({ x1: 0, y1: 0, x2: 10, y2: 20, x: 15 }) as any;
    expect(r.result_y).toBe(30);
    expect(r.is_extrapolation).toBe(true);
  });

  it("returns error for same x values", async () => {
    const r = await interpolateCalc({ x1: 5, y1: 0, x2: 5, y2: 10, x: 5 }) as any;
    expect(r.error).toBeTruthy();
  });
});
