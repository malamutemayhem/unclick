import { describe, it, expect } from "vitest";
import { LinearRegression } from "../linear-regression.js";

describe("LinearRegression", () => {
  it("fits perfect linear data", () => {
    const xs = [1, 2, 3, 4, 5];
    const ys = [2, 4, 6, 8, 10];
    const model = LinearRegression.fit(xs, ys);
    expect(model.slope).toBeCloseTo(2, 8);
    expect(model.intercept).toBeCloseTo(0, 8);
    expect(model.rSquared).toBeCloseTo(1, 8);
  });

  it("predict returns expected values", () => {
    const model = LinearRegression.fit([0, 1], [0, 1]);
    expect(LinearRegression.predict(model, 5)).toBeCloseTo(5, 8);
  });

  it("residuals sum to approximately zero", () => {
    const xs = [1, 2, 3, 4];
    const ys = [1.1, 2.0, 2.9, 4.1];
    const model = LinearRegression.fit(xs, ys);
    const res = LinearRegression.residuals(xs, ys, model);
    const sum = res.reduce((s, r) => s + r, 0);
    expect(Math.abs(sum)).toBeLessThan(1e-10);
  });

  it("correlation of perfect data is 1", () => {
    expect(LinearRegression.correlation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 8);
  });

  it("negative correlation", () => {
    expect(LinearRegression.correlation([1, 2, 3], [6, 4, 2])).toBeCloseTo(-1, 8);
  });

  it("standardError is non-negative", () => {
    const xs = [1, 2, 3, 4, 5];
    const ys = [1.1, 2.0, 3.2, 3.9, 5.1];
    const model = LinearRegression.fit(xs, ys);
    expect(LinearRegression.standardError(xs, ys, model)).toBeGreaterThanOrEqual(0);
  });

  it("rSquared between 0 and 1", () => {
    const xs = [1, 2, 3, 4, 5];
    const ys = [1.5, 2.2, 2.8, 4.5, 5.0];
    const model = LinearRegression.fit(xs, ys);
    expect(model.rSquared).toBeGreaterThan(0);
    expect(model.rSquared).toBeLessThanOrEqual(1);
  });
});
