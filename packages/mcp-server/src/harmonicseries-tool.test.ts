import { describe, it, expect } from "vitest";
import { harmonicSeries } from "./harmonicseries-tool.js";

describe("harmonicSeries", () => {
  it("computes H(4)", async () => {
    const r = await harmonicSeries({ n: 4 }) as any;
    expect(r.harmonic_sum).toBeCloseTo(2.08333, 4);
  });
  it("computes H(1)", async () => {
    const r = await harmonicSeries({ n: 1 }) as any;
    expect(r.harmonic_sum).toBe(1);
  });
  it("returns error for n=0", async () => {
    const r = await harmonicSeries({ n: 0 }) as any;
    expect(r.error).toBeTruthy();
  });
});
