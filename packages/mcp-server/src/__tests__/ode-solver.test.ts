import { describe, it, expect } from "vitest";
import { euler, rk4, midpoint, eulerSystem, rk4System } from "../ode-solver.js";

describe("euler", () => {
  it("solves dy/dt = y (exponential growth)", () => {
    const result = euler((_t, y) => y, 1, 0, 1, 1000);
    expect(result.y[result.y.length - 1]).toBeCloseTo(Math.E, 1);
  });

  it("returns correct number of points", () => {
    const result = euler((_t, y) => -y, 1, 0, 1, 10);
    expect(result.t).toHaveLength(11);
    expect(result.y).toHaveLength(11);
  });
});

describe("rk4", () => {
  it("solves dy/dt = y more accurately than euler", () => {
    const eulerResult = euler((_t, y) => y, 1, 0, 1, 100);
    const rk4Result = rk4((_t, y) => y, 1, 0, 1, 100);
    const exact = Math.E;
    const eulerErr = Math.abs(eulerResult.y[eulerResult.y.length - 1] - exact);
    const rk4Err = Math.abs(rk4Result.y[rk4Result.y.length - 1] - exact);
    expect(rk4Err).toBeLessThan(eulerErr);
  });

  it("solves exponential decay", () => {
    const result = rk4((_t, y) => -y, 1, 0, 1, 100);
    expect(result.y[result.y.length - 1]).toBeCloseTo(1 / Math.E, 4);
  });

  it("solves constant ODE", () => {
    const result = rk4(() => 2, 0, 0, 5, 100);
    expect(result.y[result.y.length - 1]).toBeCloseTo(10, 4);
  });
});

describe("midpoint", () => {
  it("solves dy/dt = y", () => {
    const result = midpoint((_t, y) => y, 1, 0, 1, 100);
    expect(result.y[result.y.length - 1]).toBeCloseTo(Math.E, 2);
  });
});

describe("eulerSystem", () => {
  it("solves 2D system", () => {
    const result = eulerSystem(
      (_t, y) => [y[1], -y[0]],
      [1, 0], 0, Math.PI, 1000
    );
    expect(result.y[result.y.length - 1][0]).toBeCloseTo(-1, 0);
  });
});

describe("rk4System", () => {
  it("solves harmonic oscillator", () => {
    const result = rk4System(
      (_t, y) => [y[1], -y[0]],
      [1, 0], 0, 2 * Math.PI, 200
    );
    const last = result.y[result.y.length - 1];
    expect(last[0]).toBeCloseTo(1, 2);
    expect(last[1]).toBeCloseTo(0, 1);
  });

  it("returns correct structure", () => {
    const result = rk4System((_t, y) => [-y[0]], [1], 0, 1, 10);
    expect(result.t).toHaveLength(11);
    expect(result.y).toHaveLength(11);
    expect(result.y[0]).toHaveLength(1);
  });
});
