import { describe, it, expect } from "vitest";
import { RegressionCalc } from "../regression-calc.js";

describe("RegressionCalc", () => {
  const linearData = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
    { x: 4, y: 8 },
    { x: 5, y: 10 },
  ];

  it("linear fits perfectly linear data", () => {
    const result = RegressionCalc.linear(linearData);
    expect(result.slope).toBe(2);
    expect(result.intercept).toBe(0);
    expect(result.rSquared).toBe(1);
    expect(result.correlation).toBe(1);
  });

  it("predict returns correct values", () => {
    const result = RegressionCalc.linear(linearData);
    expect(result.predict(6)).toBe(12);
    expect(result.predict(0)).toBe(0);
  });

  it("handles noisy data", () => {
    const noisy = [
      { x: 1, y: 2.1 },
      { x: 2, y: 3.8 },
      { x: 3, y: 6.2 },
      { x: 4, y: 7.9 },
      { x: 5, y: 10.1 },
    ];
    const result = RegressionCalc.linear(noisy);
    expect(result.slope).toBeCloseTo(2, 0);
    expect(result.rSquared).toBeGreaterThan(0.99);
  });

  it("polynomial fits quadratic data", () => {
    const quadratic = [
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 5 },
      { x: 3, y: 10 },
      { x: 4, y: 17 },
    ];
    const result = RegressionCalc.polynomial(quadratic, 2);
    expect(result.coefficients.length).toBe(3);
    expect(result.predict(2)).toBeCloseTo(5, 0);
  });

  it("residuals measure fit error", () => {
    const result = RegressionCalc.linear(linearData);
    const residuals = RegressionCalc.residuals(linearData, result);
    expect(residuals.every((r) => Math.abs(r) < 0.001)).toBe(true);
  });

  it("standardError measures prediction accuracy", () => {
    const noisy = [
      { x: 1, y: 2.5 },
      { x: 2, y: 3.5 },
      { x: 3, y: 6.5 },
    ];
    const result = RegressionCalc.linear(noisy);
    const se = RegressionCalc.standardError(noisy, result);
    expect(se).toBeGreaterThan(0);
  });

  it("handles single point", () => {
    const result = RegressionCalc.linear([{ x: 1, y: 2 }]);
    expect(result.slope).toBe(0);
  });
});
