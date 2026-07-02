import { describe, it, expect } from "vitest";
import { polygonCalculate } from "./polygon-tool.js";

describe("polygonCalculate", () => {
  it("calculates a square", async () => {
    const r = await polygonCalculate({ sides: 4, side_length: 10 }) as any;
    expect(r.perimeter).toBe(40);
    expect(r.area).toBeCloseTo(100, 4);
    expect(r.interior_angle).toBe(90);
    expect(r.diagonals).toBe(2);
  });

  it("calculates a hexagon", async () => {
    const r = await polygonCalculate({ sides: 6, side_length: 1 }) as any;
    expect(r.interior_angle).toBe(120);
    expect(r.diagonals).toBe(9);
    expect(r.area).toBeCloseTo(2.598076, 4);
  });

  it("returns error for fewer than 3 sides", async () => {
    const r = await polygonCalculate({ sides: 2, side_length: 5 }) as any;
    expect(r.error).toBeTruthy();
  });
});
