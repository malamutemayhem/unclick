import { describe, it, expect } from "vitest";
import { anneal, linearSchedule, exponentialSchedule, annealWithSchedule } from "../simulated-annealing.js";

describe("simulated-annealing", () => {
  it("finds minimum of a simple function", () => {
    const result = anneal({
      initial: 50,
      energy: (x) => (x - 10) * (x - 10),
      neighbor: (x) => x + (Math.random() - 0.5) * 10,
      temperature: 100,
      coolingRate: 0.003,
      maxIterations: 5000,
    });
    expect(Math.abs(result.best - 10)).toBeLessThan(5);
    expect(result.bestEnergy).toBeLessThan(25);
  });

  it("returns iteration count", () => {
    const result = anneal({
      initial: 0,
      energy: (x) => x * x,
      neighbor: (x) => x + (Math.random() - 0.5),
      temperature: 10,
      coolingRate: 0.01,
      maxIterations: 200,
    });
    expect(result.iterations).toBeLessThanOrEqual(200);
    expect(result.iterations).toBeGreaterThan(0);
  });

  it("respects maxIterations", () => {
    const result = anneal({
      initial: 0,
      energy: (x) => x * x,
      neighbor: (x) => x + 1,
      temperature: 1000,
      coolingRate: 0.0001,
      maxIterations: 50,
    });
    expect(result.iterations).toBe(50);
  });

  it("cools temperature over time", () => {
    const result = anneal({
      initial: 0,
      energy: (x) => x * x,
      neighbor: (x) => x + (Math.random() - 0.5),
      temperature: 100,
      coolingRate: 0.01,
      maxIterations: 100,
    });
    expect(result.finalTemperature).toBeLessThan(100);
  });

  it("handles array state", () => {
    const result = anneal<number[]>({
      initial: [5, 5],
      energy: (s) => s[0] * s[0] + s[1] * s[1],
      neighbor: (s) => [s[0] + (Math.random() - 0.5) * 2, s[1] + (Math.random() - 0.5) * 2],
      temperature: 50,
      coolingRate: 0.005,
      maxIterations: 3000,
    });
    expect(result.bestEnergy).toBeLessThan(10);
  });
});

describe("schedules", () => {
  it("linearSchedule decreases linearly", () => {
    const sched = linearSchedule(100, 0, 100);
    expect(sched(0)).toBe(100);
    expect(sched(50)).toBeCloseTo(50);
    expect(sched(100)).toBe(0);
    expect(sched(150)).toBe(0);
  });

  it("exponentialSchedule decays", () => {
    const sched = exponentialSchedule(100, 0.9);
    expect(sched(0)).toBe(100);
    expect(sched(1)).toBeCloseTo(90);
    expect(sched(10)).toBeCloseTo(100 * Math.pow(0.9, 10));
  });

  it("annealWithSchedule works", () => {
    const result = annealWithSchedule({
      initial: 20,
      energy: (x) => (x - 5) * (x - 5),
      neighbor: (x) => x + (Math.random() - 0.5) * 4,
      schedule: linearSchedule(50, 0.1, 1000),
      maxIterations: 1000,
      temperature: 50,
    });
    expect(Math.abs(result.best - 5)).toBeLessThan(5);
  });
});
