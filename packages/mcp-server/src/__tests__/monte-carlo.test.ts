import { describe, it, expect } from "vitest";
import { MonteCarlo } from "../monte-carlo.js";

describe("MonteCarlo", () => {
  it("simulate produces statistical summary", () => {
    const result = MonteCarlo.simulate(() => Math.random() * 100, 5000);
    expect(result.mean).toBeGreaterThan(40);
    expect(result.mean).toBeLessThan(60);
    expect(result.stdDev).toBeGreaterThan(20);
    expect(result.min).toBeGreaterThanOrEqual(0);
    expect(result.max).toBeLessThanOrEqual(100);
  });

  it("simulate provides percentiles", () => {
    const result = MonteCarlo.simulate(() => Math.random() * 100, 5000);
    expect(Number(result.percentiles["5"])).toBeLessThan(Number(result.percentiles["95"]));
    expect(Number(result.percentiles["25"])).toBeLessThan(Number(result.percentiles["75"]));
  });

  it("simulate provides histogram", () => {
    const result = MonteCarlo.simulate(() => Math.random() * 10, 1000);
    expect(result.histogram.length).toBe(10);
    const totalCount = result.histogram.reduce((s, h) => s + h.count, 0);
    expect(totalCount).toBe(1000);
  });

  it("risk models probabilistic scenarios", () => {
    const result = MonteCarlo.risk([
      { probability: 0.7, outcome: 100 },
      { probability: 0.2, outcome: 50 },
      { probability: 0.1, outcome: -200 },
    ], 5000);
    expect(result.mean).toBeGreaterThan(50);
    expect(result.mean).toBeLessThan(100);
  });

  it("portfolio simulates returns", () => {
    const result = MonteCarlo.portfolio([
      { expectedReturn: 0.08, stdDev: 0.15, weight: 0.6 },
      { expectedReturn: 0.04, stdDev: 0.05, weight: 0.4 },
    ], 12, 1000);
    expect(result.mean).toBeDefined();
    expect(result.stdDev).toBeGreaterThan(0);
  });

  it("pi estimates pi value", () => {
    const result = MonteCarlo.pi(50000);
    expect(result.estimate).toBeCloseTo(Math.PI, 0);
    expect(result.error).toBeLessThan(0.1);
  });

  it("convergence shows improving estimates", () => {
    const checkpoints = [100, 1000, 5000];
    const result = MonteCarlo.convergence(() => Math.random(), checkpoints);
    expect(result.length).toBe(3);
    expect(result[0].iterations).toBe(100);
    expect(result[2].iterations).toBe(5000);
  });
});
