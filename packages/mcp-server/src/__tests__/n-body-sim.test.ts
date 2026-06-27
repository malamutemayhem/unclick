import { describe, it, expect } from "vitest";
import { NBodySim } from "../n-body-sim.js";

describe("NBodySim", () => {
  it("step moves bodies", () => {
    const bodies = [
      { x: 0, y: 0, vx: 1, vy: 0, mass: 1 },
      { x: 10, y: 0, vx: -1, vy: 0, mass: 1 },
    ];
    const result = NBodySim.step(bodies, 0.1);
    expect(result[0].x).toBeGreaterThan(0);
    expect(result[1].x).toBeLessThan(10);
  });

  it("momentum is conserved", () => {
    const bodies = [
      { x: 0, y: 0, vx: 2, vy: 1, mass: 3 },
      { x: 5, y: 5, vx: -1, vy: 2, mass: 2 },
    ];
    const p0 = NBodySim.momentum(bodies);
    const after = NBodySim.step(bodies, 0.01);
    const p1 = NBodySim.momentum(after);
    expect(p1.px).toBeCloseTo(p0.px, 1);
    expect(p1.py).toBeCloseTo(p0.py, 1);
  });

  it("centerOfMass computes correctly", () => {
    const bodies = [
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 10, y: 0, vx: 0, vy: 0, mass: 1 },
    ];
    const com = NBodySim.centerOfMass(bodies);
    expect(com.x).toBeCloseTo(5, 3);
    expect(com.y).toBeCloseTo(0, 3);
    expect(com.mass).toBeCloseTo(2, 3);
  });

  it("totalEnergy returns a number", () => {
    const bodies = [
      { x: 0, y: 0, vx: 1, vy: 0, mass: 1 },
      { x: 5, y: 0, vx: 0, vy: 0, mass: 1 },
    ];
    const e = NBodySim.totalEnergy(bodies);
    expect(typeof e).toBe("number");
  });

  it("angularMomentum computes correctly", () => {
    const bodies = [
      { x: 1, y: 0, vx: 0, vy: 1, mass: 1 },
    ];
    const L = NBodySim.angularMomentum(bodies);
    expect(L).toBeCloseTo(1, 3);
  });

  it("circularOrbit generates correct velocity", () => {
    const body = NBodySim.circularOrbit(100, 10);
    expect(body.x).toBe(10);
    expect(body.vy).toBeCloseTo(Math.sqrt(100 / 10), 2);
  });

  it("three bodies interact", () => {
    const bodies = [
      { x: 0, y: 0, vx: 0, vy: 0, mass: 10 },
      { x: 3, y: 0, vx: 0, vy: 1, mass: 1 },
      { x: -3, y: 0, vx: 0, vy: -1, mass: 1 },
    ];
    const result = NBodySim.step(bodies, 0.01);
    expect(result.length).toBe(3);
  });
});
