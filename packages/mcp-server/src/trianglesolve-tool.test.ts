import { describe, it, expect } from "vitest";
import { triangleSolve } from "./trianglesolve-tool.js";

describe("triangleSolve", () => {
  it("solves a 3-4-5 right triangle", async () => {
    const r = await triangleSolve({ a: 3, b: 4, c: 5 }) as any;
    expect(r.type).toBe("right");
    expect(r.area).toBeCloseTo(6, 4);
    expect(r.perimeter).toBe(12);
  });

  it("identifies equilateral triangle", async () => {
    const r = await triangleSolve({ a: 5, b: 5, c: 5 }) as any;
    expect(r.side_type).toBe("equilateral");
    expect(r.angles.A).toBeCloseTo(60, 3);
  });

  it("returns error for invalid triangle", async () => {
    const r = await triangleSolve({ a: 1, b: 2, c: 10 }) as any;
    expect(r.error).toBeTruthy();
  });
});
