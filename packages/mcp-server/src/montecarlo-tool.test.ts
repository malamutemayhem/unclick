import { describe, it, expect } from "vitest";
import { monteCarloEstimate } from "./montecarlo-tool.js";

describe("monteCarloEstimate", () => {
  it("estimates pi", async () => {
    const r = await monteCarloEstimate({ method: "pi", samples: 100000 }) as any;
    expect(r.estimate).toBeCloseTo(Math.PI, 1);
    expect(r.method).toBe("pi");
    expect(r.samples).toBe(100000);
    expect(r.points_inside).toBeGreaterThan(0);
  });

  it("estimates integral of x^2 from 0 to 1", async () => {
    const r = await monteCarloEstimate({
      method: "integral",
      expression: "x*x",
      a: 0,
      b: 1,
      samples: 100000,
    }) as any;
    expect(r.estimate).toBeCloseTo(1 / 3, 1);
    expect(r.method).toBe("integral");
  });

  it("respects seed for reproducibility", async () => {
    const r1 = await monteCarloEstimate({ method: "pi", samples: 1000, seed: 42 }) as any;
    const r2 = await monteCarloEstimate({ method: "pi", samples: 1000, seed: 42 }) as any;
    expect(r1.estimate).toBe(r2.estimate);
  });

  it("rejects invalid method", async () => {
    await expect(monteCarloEstimate({ method: "bogus" })).rejects.toThrow("method must be");
  });

  it("rejects missing expression for integral", async () => {
    await expect(monteCarloEstimate({ method: "integral" })).rejects.toThrow("expression");
  });

  it("stamps meta", async () => {
    const r = await monteCarloEstimate({ method: "pi", samples: 100 }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
