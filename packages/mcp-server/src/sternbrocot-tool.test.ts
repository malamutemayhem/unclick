import { describe, it, expect } from "vitest";
import { sternBrocotTree } from "./sternbrocot-tool.js";

describe("sternBrocotTree", () => {
  it("finds exact rational", async () => {
    const r = (await sternBrocotTree({ target: 0.5, max_denominator: 100 })) as any;
    expect(r.best_approximation.p).toBe(1);
    expect(r.best_approximation.q).toBe(2);
    expect(r.error).toBeCloseTo(0, 10);
  });

  it("approximates pi", async () => {
    const r = (await sternBrocotTree({ target: Math.PI, max_denominator: 1000 })) as any;
    expect(r.best_approximation.q).toBeLessThanOrEqual(1000);
    expect(r.error).toBeLessThan(0.001);
  });

  it("returns continued fraction terms", async () => {
    const r = (await sternBrocotTree({ target: 1.5, max_denominator: 100 })) as any;
    expect(r.continued_fraction[0]).toBe(1);
    expect(r.continued_fraction[1]).toBe(2);
  });

  it("returns convergents", async () => {
    const r = (await sternBrocotTree({ target: Math.sqrt(2), max_denominator: 100 })) as any;
    expect(r.convergents.length).toBeGreaterThan(0);
    expect(r.convergents[0].p).toBe(1);
    expect(r.convergents[0].q).toBe(1);
  });

  it("stamps meta", async () => {
    const r = (await sternBrocotTree({ target: 1, max_denominator: 10 })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
