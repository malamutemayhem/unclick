import { describe, it, expect } from "vitest";
import { varianceCalc } from "./variancecalc-tool.js";

describe("varianceCalc", () => {
  it("computes variance and stddev", async () => {
    const r = await varianceCalc({ values: [2, 4, 4, 4, 5, 5, 7, 9] }) as any;
    expect(r.mean).toBe(5);
    expect(r.population_variance).toBe(4);
    expect(r.population_stddev).toBe(2);
  });
  it("computes median", async () => {
    const r = await varianceCalc({ values: [1, 3, 5] }) as any;
    expect(r.median).toBe(3);
  });
  it("returns error for fewer than 2 values", async () => {
    const r = await varianceCalc({ values: [5] }) as any;
    expect(r.error).toBeTruthy();
  });
});
