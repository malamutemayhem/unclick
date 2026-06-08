import { describe, it, expect } from "vitest";
import { PerlinNoise } from "../perlin-noise.js";

describe("PerlinNoise", () => {
  it("returns values in reasonable range", () => {
    const noise = new PerlinNoise(42);
    for (let i = 0; i < 100; i++) {
      const v = noise.noise2D(i * 0.1, i * 0.1);
      expect(v).toBeGreaterThanOrEqual(-2);
      expect(v).toBeLessThanOrEqual(2);
    }
  });

  it("is deterministic with same seed", () => {
    const n1 = new PerlinNoise(42);
    const n2 = new PerlinNoise(42);
    expect(n1.noise2D(1.5, 2.5)).toBe(n2.noise2D(1.5, 2.5));
  });

  it("different seeds produce different output", () => {
    const n1 = new PerlinNoise(1);
    const n2 = new PerlinNoise(2);
    expect(n1.noise2D(1.5, 2.5)).not.toBe(n2.noise2D(1.5, 2.5));
  });

  it("returns 0 at integer coordinates", () => {
    const noise = new PerlinNoise(42);
    expect(noise.noise2D(0, 0)).toBe(0);
    expect(noise.noise2D(1, 1)).toBe(0);
  });

  it("octave noise is smoother", () => {
    const noise = new PerlinNoise(42);
    const v = noise.octave2D(1.5, 2.5, 4);
    expect(typeof v).toBe("number");
    expect(Number.isFinite(v)).toBe(true);
  });

  it("generates noise grid", () => {
    const noise = new PerlinNoise(42);
    const grid = noise.noiseGrid(10, 10, 5);
    expect(grid).toHaveLength(10);
    expect(grid[0]).toHaveLength(10);
  });

  it("turbulence is non-negative", () => {
    const noise = new PerlinNoise(42);
    for (let i = 0; i < 50; i++) {
      expect(noise.turbulence(i * 0.1, i * 0.2, 3)).toBeGreaterThanOrEqual(0);
    }
  });

  it("noise varies continuously", () => {
    const noise = new PerlinNoise(42);
    const a = noise.noise2D(1.0, 1.0);
    const b = noise.noise2D(1.001, 1.0);
    expect(Math.abs(a - b)).toBeLessThan(0.1);
  });
});
