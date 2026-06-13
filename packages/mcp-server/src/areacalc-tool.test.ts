import { describe, it, expect } from "vitest";
import { areaCalculate } from "./areacalc-tool.js";

describe("areaCalculate", () => {
  it("computes circle area", async () => {
    const r = await areaCalculate({ shape: "circle", radius: 5 }) as any;
    expect(r.area).toBeCloseTo(78.5398, 3);
    expect(r.perimeter).toBeCloseTo(31.4159, 3);
  });

  it("computes rectangle area", async () => {
    const r = await areaCalculate({ shape: "rectangle", width: 4, height: 6 }) as any;
    expect(r.area).toBe(24);
    expect(r.perimeter).toBe(20);
  });

  it("computes triangle area", async () => {
    const r = await areaCalculate({ shape: "triangle", base: 10, height: 5 }) as any;
    expect(r.area).toBe(25);
  });

  it("returns error for invalid shape", async () => {
    const r = await areaCalculate({ shape: "hexagon" }) as any;
    expect(r.error).toBeTruthy();
  });
});
