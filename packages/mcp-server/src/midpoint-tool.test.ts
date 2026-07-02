import { describe, it, expect } from "vitest";
import { midpointCalc } from "./midpoint-tool.js";

describe("midpointCalc", () => {
  it("finds midpoint of (0,0) and (10,10)", async () => {
    const r = await midpointCalc({ x1: 0, y1: 0, x2: 10, y2: 10 }) as any;
    expect(r.midpoint.x).toBe(5);
    expect(r.midpoint.y).toBe(5);
    expect(r.distance).toBeCloseTo(14.14213562, 4);
  });

  it("computes slope", async () => {
    const r = await midpointCalc({ x1: 0, y1: 0, x2: 4, y2: 2 }) as any;
    expect(r.slope).toBe(0.5);
  });

  it("returns error for missing coords", async () => {
    const r = await midpointCalc({ x1: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});
