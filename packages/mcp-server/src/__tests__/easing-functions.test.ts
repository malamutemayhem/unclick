import { describe, it, expect } from "vitest";
import {
  linear, easeInQuad, easeOutQuad, easeInOutQuad,
  easeInCubic, easeOutCubic, easeInSine, easeOutSine,
  easeInExpo, easeOutExpo, easeOutBounce, easeInBack,
  easeInElastic, easeOutElastic,
  interpolate, steps, chain,
} from "../easing-functions.js";

describe("basic easings", () => {
  const fns = [
    linear, easeInQuad, easeOutQuad, easeInOutQuad,
    easeInCubic, easeOutCubic, easeInSine, easeOutSine,
    easeInExpo, easeOutExpo, easeOutBounce, easeInBack,
    easeInElastic, easeOutElastic,
  ];

  it("all return 0 at t=0", () => {
    for (const fn of fns) {
      expect(fn(0)).toBeCloseTo(0, 1);
    }
  });

  it("all return 1 at t=1", () => {
    for (const fn of fns) {
      expect(fn(1)).toBeCloseTo(1, 1);
    }
  });

  it("linear is identity", () => {
    expect(linear(0.5)).toBe(0.5);
  });

  it("easeIn starts slow", () => {
    expect(easeInQuad(0.25)).toBeLessThan(0.25);
  });

  it("easeOut starts fast", () => {
    expect(easeOutQuad(0.25)).toBeGreaterThan(0.25);
  });
});

describe("interpolate", () => {
  it("interpolates between values", () => {
    expect(interpolate(0, 100, 0.5)).toBe(50);
  });

  it("uses easing function", () => {
    const result = interpolate(0, 100, 0.5, easeInQuad);
    expect(result).toBeLessThan(50);
  });
});

describe("steps", () => {
  it("generates step values", () => {
    const s = steps(4, 1);
    expect(s).toHaveLength(5);
    expect(s[0]).toBe(0);
    expect(s[4]).toBe(1);
  });
});

describe("chain", () => {
  it("chains easings together", () => {
    const chained = chain(easeInQuad, easeOutQuad);
    expect(chained(0)).toBeCloseTo(0);
    expect(chained(1)).toBeCloseTo(1);
  });
});
