import { describe, it, expect } from "vitest";
import {
  trapezoid, simpson, midpointRule, gaussLegendre2, gaussLegendre3,
  adaptiveSimpson, romberg, monteCarloIntegrate,
} from "../numerical-integration.js";

const square = (x: number) => x * x;

describe("trapezoid", () => {
  it("integrates x^2 from 0 to 1", () => {
    expect(trapezoid(square, 0, 1, 1000)).toBeCloseTo(1 / 3, 4);
  });

  it("integrates constant", () => {
    expect(trapezoid(() => 5, 0, 3, 100)).toBeCloseTo(15, 6);
  });
});

describe("simpson", () => {
  it("integrates x^2 accurately", () => {
    expect(simpson(square, 0, 1, 100)).toBeCloseTo(1 / 3, 8);
  });

  it("integrates sin from 0 to pi", () => {
    expect(simpson(Math.sin, 0, Math.PI, 100)).toBeCloseTo(2, 6);
  });
});

describe("midpointRule", () => {
  it("integrates x^2", () => {
    expect(midpointRule(square, 0, 1, 1000)).toBeCloseTo(1 / 3, 4);
  });
});

describe("gaussLegendre2", () => {
  it("integrates linear exactly", () => {
    expect(gaussLegendre2(x => 3 * x + 1, 0, 2)).toBeCloseTo(8, 8);
  });
});

describe("gaussLegendre3", () => {
  it("integrates quadratic exactly", () => {
    expect(gaussLegendre3(square, 0, 1)).toBeCloseTo(1 / 3, 8);
  });
});

describe("adaptiveSimpson", () => {
  it("integrates sin accurately", () => {
    expect(adaptiveSimpson(Math.sin, 0, Math.PI)).toBeCloseTo(2, 8);
  });

  it("integrates x^3", () => {
    expect(adaptiveSimpson(x => x * x * x, 0, 2)).toBeCloseTo(4, 8);
  });
});

describe("romberg", () => {
  it("integrates e^x", () => {
    expect(romberg(Math.exp, 0, 1)).toBeCloseTo(Math.E - 1, 6);
  });
});

describe("monteCarloIntegrate", () => {
  it("integrates x^2 approximately", () => {
    const result = monteCarloIntegrate(square, 0, 1, 50000);
    expect(result.estimate).toBeCloseTo(1 / 3, 1);
    expect(result.variance).toBeGreaterThanOrEqual(0);
  });

  it("same seed gives same result", () => {
    const a = monteCarloIntegrate(square, 0, 1, 1000, 42);
    const b = monteCarloIntegrate(square, 0, 1, 1000, 42);
    expect(a.estimate).toBe(b.estimate);
  });
});
