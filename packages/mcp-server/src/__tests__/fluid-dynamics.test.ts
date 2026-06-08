import { describe, it, expect } from "vitest";
import { FluidDynamics } from "../fluid-dynamics.js";

describe("FluidDynamics", () => {
  it("reynoldsNumber computes correctly", () => {
    const re = FluidDynamics.reynoldsNumber(2, 0.1, 1e-6);
    expect(re).toBeCloseTo(200000, 0);
  });

  it("bernoulli computes pressure at second point", () => {
    const p2 = FluidDynamics.bernoulli(1000, 5, 10, 101325, 10, 5);
    expect(typeof p2).toBe("number");
    expect(p2).toBeGreaterThan(0);
  });

  it("dragForce is proportional to velocity squared", () => {
    const d1 = FluidDynamics.dragForce(1.225, 10, 0.47, 1);
    const d2 = FluidDynamics.dragForce(1.225, 20, 0.47, 1);
    expect(d2 / d1).toBeCloseTo(4, 1);
  });

  it("liftForce computes correctly", () => {
    const lift = FluidDynamics.liftForce(1.225, 50, 1.2, 10);
    expect(lift).toBeGreaterThan(0);
  });

  it("machNumber computes ratio", () => {
    expect(FluidDynamics.machNumber(340, 340)).toBeCloseTo(1, 3);
    expect(FluidDynamics.machNumber(680, 340)).toBeCloseTo(2, 3);
  });

  it("flowRate is area times velocity", () => {
    expect(FluidDynamics.flowRate(2, 5)).toBeCloseTo(10, 3);
  });

  it("pressureDrop computes positive value", () => {
    const dp = FluidDynamics.pressureDrop(0.02, 10, 0.1, 1000, 2);
    expect(dp).toBeGreaterThan(0);
  });

  it("buoyancy equals rho * V * g", () => {
    const fb = FluidDynamics.buoyancy(1000, 0.001);
    expect(fb).toBeCloseTo(9.81, 1);
  });

  it("terminalVelocity computes correctly", () => {
    const vt = FluidDynamics.terminalVelocity(1, 0.47, 1.225, 0.01);
    expect(vt).toBeGreaterThan(0);
  });

  it("stokesLaw computes drag on sphere", () => {
    const f = FluidDynamics.stokesLaw(1, 0.1, 1);
    expect(f).toBeGreaterThan(0);
  });

  it("hydraulicDiameter for circular pipe", () => {
    const r = 0.05;
    const area = Math.PI * r * r;
    const perim = 2 * Math.PI * r;
    const dh = FluidDynamics.hydraulicDiameter(area, perim);
    expect(dh).toBeCloseTo(2 * r, 2);
  });

  it("froudeNumber computes correctly", () => {
    const fr = FluidDynamics.froudeNumber(3, 1);
    expect(fr).toBeCloseTo(3 / Math.sqrt(9.81), 2);
  });
});
