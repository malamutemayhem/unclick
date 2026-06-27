import { describe, it, expect } from "vitest";
import { ParticleSwarm } from "../particle-swarm.js";

describe("ParticleSwarm", () => {
  it("optimizes a simple function", () => {
    const pso = new ParticleSwarm(
      (pos) => -(pos[0] * pos[0] + pos[1] * pos[1]),
      { dimensions: 2, particleCount: 20, bounds: [{ min: -10, max: 10 }, { min: -10, max: 10 }] },
    );
    const result = pso.run(100);
    expect(Math.abs(result.bestPosition[0])).toBeLessThan(2);
    expect(Math.abs(result.bestPosition[1])).toBeLessThan(2);
  });

  it("step increments iteration count", () => {
    const pso = new ParticleSwarm(
      (pos) => -pos[0] * pos[0],
      { dimensions: 1, particleCount: 5 },
    );
    const r1 = pso.step();
    expect(r1.iterations).toBe(1);
    const r2 = pso.step();
    expect(r2.iterations).toBe(2);
  });

  it("fitness improves over iterations", () => {
    const pso = new ParticleSwarm(
      (pos) => -(pos[0] - 5) * (pos[0] - 5),
      { dimensions: 1, particleCount: 15, bounds: [{ min: -50, max: 50 }] },
    );
    const first = pso.step();
    const last = pso.run(50);
    expect(last.bestFitness).toBeGreaterThanOrEqual(first.bestFitness);
  });

  it("getBest returns current best", () => {
    const pso = new ParticleSwarm(
      (pos) => -pos[0] * pos[0],
      { dimensions: 1, particleCount: 10 },
    );
    pso.run(10);
    const best = pso.getBest();
    expect(typeof best.fitness).toBe("number");
    expect(best.position).toHaveLength(1);
  });

  it("handles multiple dimensions", () => {
    const pso = new ParticleSwarm(
      (pos) => -pos.reduce((s, v) => s + v * v, 0),
      { dimensions: 5, particleCount: 20 },
    );
    const result = pso.run(50);
    expect(result.bestPosition).toHaveLength(5);
    expect(result.bestFitness).toBeGreaterThan(-100);
  });

  it("respects bounds", () => {
    const pso = new ParticleSwarm(
      (pos) => pos[0],
      { dimensions: 1, particleCount: 10, bounds: [{ min: 0, max: 5 }] },
    );
    const result = pso.run(30);
    expect(result.bestPosition[0]).toBeGreaterThanOrEqual(0);
    expect(result.bestPosition[0]).toBeLessThanOrEqual(5);
  });
});
