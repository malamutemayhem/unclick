import { describe, it, expect } from "vitest";
import { PerlinNoise, ValueNoise } from "../noise-gen.js";

describe("PerlinNoise", () => {
  it("noise2d returns values in [-1, 1] range", () => {
    const p = new PerlinNoise(123);
    for (let i = 0; i < 100; i++) {
      const v = p.noise2d(i * 0.1, i * 0.07);
      expect(v).toBeGreaterThanOrEqual(-1);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("same seed produces same output", () => {
    const a = new PerlinNoise(42);
    const b = new PerlinNoise(42);
    expect(a.noise2d(1.5, 2.3)).toBe(b.noise2d(1.5, 2.3));
  });

  it("different seeds produce different output", () => {
    const a = new PerlinNoise(1);
    const b = new PerlinNoise(2);
    expect(a.noise2d(1.5, 2.3)).not.toBe(b.noise2d(1.5, 2.3));
  });

  it("fbm produces output", () => {
    const p = new PerlinNoise(42);
    const v = p.fbm(1.0, 2.0, 4);
    expect(typeof v).toBe("number");
    expect(Number.isFinite(v)).toBe(true);
  });

  it("turbulence returns non-negative values", () => {
    const p = new PerlinNoise(42);
    for (let i = 0; i < 50; i++) {
      expect(p.turbulence(i * 0.1, i * 0.2)).toBeGreaterThanOrEqual(0);
    }
  });

  it("ridge returns non-negative values", () => {
    const p = new PerlinNoise(42);
    for (let i = 0; i < 50; i++) {
      expect(p.ridge(i * 0.1, i * 0.2)).toBeGreaterThanOrEqual(0);
    }
  });

  it("generateGrid returns correct dimensions", () => {
    const p = new PerlinNoise(42);
    const grid = p.generateGrid(16, 8, 0.1);
    expect(grid).toHaveLength(8);
    expect(grid[0]).toHaveLength(16);
  });

  it("generateGrid values are finite", () => {
    const p = new PerlinNoise(42);
    const grid = p.generateGrid(4, 4, 0.1);
    for (const row of grid) {
      for (const v of row) {
        expect(Number.isFinite(v)).toBe(true);
      }
    }
  });
});

describe("ValueNoise", () => {
  it("noise2d returns finite values", () => {
    const vn = new ValueNoise(42);
    for (let i = 0; i < 50; i++) {
      const v = vn.noise2d(i * 0.1, i * 0.07);
      expect(Number.isFinite(v)).toBe(true);
    }
  });

  it("same seed produces same output", () => {
    const a = new ValueNoise(10);
    const b = new ValueNoise(10);
    expect(a.noise2d(3.5, 1.2)).toBe(b.noise2d(3.5, 1.2));
  });

  it("different seeds produce different output", () => {
    const a = new ValueNoise(10);
    const b = new ValueNoise(99);
    expect(a.noise2d(3.5, 1.2)).not.toBe(b.noise2d(3.5, 1.2));
  });
});
