import { describe, it, expect } from "vitest";
import { RungeKutta } from "../runge-kutta.js";

describe("RungeKutta", () => {
  it("rk4 solves dy/dt = y (exponential growth)", () => {
    const result = RungeKutta.rk4((t, y) => y, 0, 1, 0.01, 100);
    expect(result.y[result.y.length - 1]).toBeCloseTo(Math.E, 3);
  });

  it("rk4 solves dy/dt = -y (exponential decay)", () => {
    const result = RungeKutta.rk4((t, y) => -y, 0, 1, 0.01, 100);
    expect(result.y[result.y.length - 1]).toBeCloseTo(1 / Math.E, 3);
  });

  it("rk4 returns correct number of points", () => {
    const result = RungeKutta.rk4((t, y) => 1, 0, 0, 0.1, 10);
    expect(result.t.length).toBe(11);
    expect(result.y.length).toBe(11);
  });

  it("rk4System solves harmonic oscillator", () => {
    const result = RungeKutta.rk4System(
      (t, y) => [y[1], -y[0]],
      0, [1, 0], 0.01, 628
    );
    expect(result.y[result.y.length - 1][0]).toBeCloseTo(1, 1);
  });

  it("euler is less accurate than rk4", () => {
    const exact = Math.E;
    const euler = RungeKutta.euler((t, y) => y, 0, 1, 0.1, 10);
    const rk4 = RungeKutta.rk4((t, y) => y, 0, 1, 0.1, 10);
    const eulerErr = Math.abs(euler.y[10] - exact);
    const rk4Err = Math.abs(rk4.y[10] - exact);
    expect(rk4Err).toBeLessThan(eulerErr);
  });

  it("midpoint is more accurate than euler", () => {
    const exact = Math.E;
    const euler = RungeKutta.euler((t, y) => y, 0, 1, 0.1, 10);
    const mid = RungeKutta.midpoint((t, y) => y, 0, 1, 0.1, 10);
    const eulerErr = Math.abs(euler.y[10] - exact);
    const midErr = Math.abs(mid.y[10] - exact);
    expect(midErr).toBeLessThan(eulerErr);
  });

  it("constant function stays constant", () => {
    const result = RungeKutta.rk4(() => 0, 0, 5, 0.1, 10);
    expect(result.y[10]).toBeCloseTo(5, 8);
  });
});
