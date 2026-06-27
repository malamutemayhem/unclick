import { describe, it, expect } from "vitest";
import { SimplexNoise } from "../simplex-noise.js";

describe("SimplexNoise", () => {
  it("noise2D returns values in range", () => {
    const noise = new SimplexNoise(42);
    for (let i = 0; i < 100; i++) {
      const v = noise.noise2D(i * 0.1, i * 0.2);
      expect(v).toBeGreaterThanOrEqual(-2);
      expect(v).toBeLessThanOrEqual(2);
    }
  });

  it("noise2D is deterministic with same seed", () => {
    const a = new SimplexNoise(42);
    const b = new SimplexNoise(42);
    expect(a.noise2D(1.5, 2.5)).toBe(b.noise2D(1.5, 2.5));
  });

  it("noise2D differs with different seeds", () => {
    const a = new SimplexNoise(1);
    const b = new SimplexNoise(2);
    expect(a.noise2D(1, 1)).not.toBe(b.noise2D(1, 1));
  });

  it("fbm produces values in range", () => {
    const noise = new SimplexNoise(42);
    const v = noise.fbm(1, 1, 4);
    expect(v).toBeGreaterThanOrEqual(-1);
    expect(v).toBeLessThanOrEqual(1);
  });

  it("fbm adds detail with more octaves", () => {
    const noise = new SimplexNoise(42);
    const samples1 = Array.from({ length: 20 }, (_, i) => noise.fbm(i * 0.1, 0, 1));
    const samples4 = Array.from({ length: 20 }, (_, i) => noise.fbm(i * 0.1, 0, 4));
    const variance1 = samples1.reduce((s, v) => s + v * v, 0) / 20;
    const variance4 = samples4.reduce((s, v) => s + v * v, 0) / 20;
    expect(variance1).not.toBe(variance4);
  });

  it("turbulence produces non-negative values", () => {
    const noise = new SimplexNoise(42);
    for (let i = 0; i < 50; i++) {
      expect(noise.turbulence(i * 0.1, i * 0.2)).toBeGreaterThanOrEqual(0);
    }
  });

  it("grid generates 2D noise field", () => {
    const noise = new SimplexNoise(42);
    const g = noise.grid(5, 5, 0.5);
    expect(g.length).toBe(5);
    expect(g[0].length).toBe(5);
  });

  it("noise is smooth (nearby values are similar)", () => {
    const noise = new SimplexNoise(42);
    const v1 = noise.noise2D(1.0, 1.0);
    const v2 = noise.noise2D(1.001, 1.001);
    expect(Math.abs(v1 - v2)).toBeLessThan(0.1);
  });
});
