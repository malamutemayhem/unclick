import { describe, it, expect } from "vitest";
import { exponentialGrowth } from "./expgrowth-tool.js";

describe("exponentialGrowth", () => {
  it("computes growth", async () => {
    const r = await exponentialGrowth({ initial: 100, rate: 0.1, time: 10 }) as any;
    expect(r.final).toBeCloseTo(271.8281828, 3);
    expect(r.is_growth).toBe(true);
    expect(r.doubling_time).toBeCloseTo(6.93147, 3);
  });
  it("computes decay", async () => {
    const r = await exponentialGrowth({ initial: 100, rate: -0.1, time: 10 }) as any;
    expect(r.is_growth).toBe(false);
    expect(r.half_life).toBeCloseTo(6.93147, 3);
  });
  it("returns error for missing args", async () => {
    const r = await exponentialGrowth({}) as any;
    expect(r.error).toBeTruthy();
  });
});
