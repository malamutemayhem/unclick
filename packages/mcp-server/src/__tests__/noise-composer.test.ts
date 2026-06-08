import { describe, it, expect } from "vitest";
import {
  valueNoise, fbm, ridged, turbulence, warp, blend,
  remap, clampNoise, threshold,
} from "../noise-composer.js";

describe("valueNoise", () => {
  it("returns values in -1 to 1 range", () => {
    const noise = valueNoise(42);
    for (let i = 0; i < 100; i++) {
      const v = noise(i * 0.1, i * 0.2);
      expect(v).toBeGreaterThanOrEqual(-1);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("is deterministic", () => {
    const a = valueNoise(42);
    const b = valueNoise(42);
    expect(a(1.5, 2.3)).toBe(b(1.5, 2.3));
  });
});

describe("fbm", () => {
  it("produces layered noise", () => {
    const base = valueNoise(1);
    const composed = fbm(base, 4);
    const v = composed(5, 5);
    expect(typeof v).toBe("number");
    expect(Number.isFinite(v)).toBe(true);
  });
});

describe("ridged", () => {
  it("produces positive values", () => {
    const base = valueNoise(1);
    const r = ridged(base, 3);
    const v = r(3, 3);
    expect(v).toBeGreaterThanOrEqual(0);
  });
});

describe("turbulence", () => {
  it("produces positive values", () => {
    const base = valueNoise(1);
    const t = turbulence(base, 3);
    const v = t(3, 3);
    expect(v).toBeGreaterThanOrEqual(0);
  });
});

describe("warp", () => {
  it("distorts noise", () => {
    const base = valueNoise(1);
    const warped = warp(base, valueNoise(2), 2);
    const v = warped(5, 5);
    expect(typeof v).toBe("number");
  });
});

describe("blend", () => {
  it("mixes two noise functions", () => {
    const a = () => 0;
    const b = () => 1;
    const mixed = blend(a, b, 0.5);
    expect(mixed(0, 0)).toBeCloseTo(0.5);
  });
});

describe("remap", () => {
  it("remaps output range", () => {
    const fn = () => 0.5;
    const remapped = remap(fn, 0, 1, 10, 20);
    expect(remapped(0, 0)).toBeCloseTo(15);
  });
});

describe("clampNoise", () => {
  it("clamps to range", () => {
    const fn = () => 5;
    const clamped = clampNoise(fn, 0, 1);
    expect(clamped(0, 0)).toBe(1);
  });
});

describe("threshold", () => {
  it("binarizes output", () => {
    const fn = (x: number) => x;
    const t = threshold(fn, 0.5);
    expect(t(0.3, 0)).toBe(0);
    expect(t(0.7, 0)).toBe(1);
  });
});
