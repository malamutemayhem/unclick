import { describe, it, expect } from "vitest";
import {
  linearFit, quadraticFit, polynomialFit,
  exponentialFit, powerFit, residuals, rootMeanSquareError,
} from "../curve-fit.js";

describe("linearFit", () => {
  it("fits perfect line", () => {
    const points = [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 7 }];
    const fit = linearFit(points);
    expect(fit.coefficients[0]).toBeCloseTo(1);
    expect(fit.coefficients[1]).toBeCloseTo(2);
    expect(fit.rSquared).toBeCloseTo(1);
  });

  it("predicts values", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 4 }];
    const fit = linearFit(points);
    expect(fit.predict(3)).toBeCloseTo(6);
  });

  it("handles noisy data", () => {
    const points = [{ x: 0, y: 0.1 }, { x: 1, y: 2.1 }, { x: 2, y: 3.9 }, { x: 3, y: 6.1 }];
    const fit = linearFit(points);
    expect(fit.rSquared).toBeGreaterThan(0.99);
  });
});

describe("quadraticFit", () => {
  it("fits parabola", () => {
    const points = [
      { x: -2, y: 4 }, { x: -1, y: 1 }, { x: 0, y: 0 },
      { x: 1, y: 1 }, { x: 2, y: 4 },
    ];
    const fit = quadraticFit(points);
    expect(fit.coefficients[2]).toBeCloseTo(1, 0);
    expect(fit.rSquared).toBeCloseTo(1);
  });
});

describe("polynomialFit", () => {
  it("fits cubic", () => {
    const points = [
      { x: -2, y: -8 }, { x: -1, y: -1 }, { x: 0, y: 0 },
      { x: 1, y: 1 }, { x: 2, y: 8 },
    ];
    const fit = polynomialFit(points, 3);
    expect(fit.predict(3)).toBeCloseTo(27, 0);
    expect(fit.rSquared).toBeCloseTo(1);
  });
});

describe("exponentialFit", () => {
  it("fits exponential growth", () => {
    const points = [
      { x: 0, y: 1 }, { x: 1, y: 2.72 }, { x: 2, y: 7.39 }, { x: 3, y: 20.09 },
    ];
    const fit = exponentialFit(points);
    expect(fit.coefficients[0]).toBeCloseTo(1, 0);
    expect(fit.rSquared).toBeGreaterThan(0.99);
  });
});

describe("powerFit", () => {
  it("fits power law", () => {
    const points = [
      { x: 1, y: 1 }, { x: 2, y: 4 }, { x: 3, y: 9 }, { x: 4, y: 16 },
    ];
    const fit = powerFit(points);
    expect(fit.coefficients[1]).toBeCloseTo(2, 0);
    expect(fit.rSquared).toBeCloseTo(1);
  });
});

describe("residuals", () => {
  it("computes residuals", () => {
    const points = [{ x: 0, y: 1 }, { x: 1, y: 3 }];
    const res = residuals(points, x => 2 * x + 1);
    expect(res[0]).toBeCloseTo(0);
    expect(res[1]).toBeCloseTo(0);
  });
});

describe("rootMeanSquareError", () => {
  it("returns 0 for perfect fit", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    expect(rootMeanSquareError(points, x => x)).toBeCloseTo(0);
  });

  it("returns positive for imperfect fit", () => {
    const points = [{ x: 0, y: 0.5 }, { x: 1, y: 1.5 }];
    expect(rootMeanSquareError(points, x => x)).toBeGreaterThan(0);
  });
});
