import { describe, it, expect } from "vitest";
import { ParticleFilter } from "../particle-filter.js";

describe("ParticleFilter", () => {
  it("initializes with correct number of particles", () => {
    const pf = new ParticleFilter(100, () => [0]);
    expect(pf.size()).toBe(100);
  });

  it("estimate returns weighted mean", () => {
    const pf = new ParticleFilter(1000, () => [5]);
    const est = pf.estimate();
    expect(est[0]).toBeCloseTo(5, 0);
  });

  it("predict applies transition function", () => {
    const pf = new ParticleFilter(10, () => [0]);
    pf.predict((s) => [s[0] + 1]);
    const est = pf.estimate();
    expect(est[0]).toBeCloseTo(1, 0);
  });

  it("update reweights particles", () => {
    const pf = new ParticleFilter(100, () => [Math.random() * 10]);
    pf.update((s) => (s[0] > 4 && s[0] < 6) ? 10 : 0.01);
    const est = pf.estimate();
    expect(est[0]).toBeGreaterThan(3);
    expect(est[0]).toBeLessThan(7);
  });

  it("resample creates equally weighted particles", () => {
    const pf = new ParticleFilter(50, () => [0]);
    pf.update(() => 1);
    pf.resample();
    const particles = pf.getParticles();
    expect(particles[0].weight).toBeCloseTo(1 / 50);
  });

  it("effectiveSampleSize is max when equal weights", () => {
    const pf = new ParticleFilter(100, () => [0]);
    const ess = pf.effectiveSampleSize();
    expect(ess).toBeCloseTo(100, 0);
  });

  it("maxWeight returns highest weight", () => {
    const pf = new ParticleFilter(10, () => [0]);
    expect(pf.maxWeight()).toBeCloseTo(0.1);
  });

  it("getParticles returns copies", () => {
    const pf = new ParticleFilter(5, () => [1, 2]);
    const particles = pf.getParticles();
    expect(particles.length).toBe(5);
    expect(particles[0].state).toEqual([1, 2]);
  });
});
