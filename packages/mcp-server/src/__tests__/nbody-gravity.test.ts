import { describe, it, expect } from "vitest";
import { NBodyGravity } from "../nbody-gravity.js";

describe("NBodyGravity", () => {
  it("two bodies attract each other", () => {
    const sim = new NBodyGravity([
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1e10 },
      { x: 100, y: 0, vx: 0, vy: 0, mass: 1e10 },
    ]);
    sim.step(1);
    const state = sim.getState();
    expect(state[0].x).toBeGreaterThan(0);
    expect(state[1].x).toBeLessThan(100);
  });

  it("simulate returns history", () => {
    const sim = new NBodyGravity([
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 1, y: 0, vx: 0, vy: 0, mass: 1 },
    ], 1);
    const history = sim.simulate(0.1, 5);
    expect(history.length).toBe(6);
  });

  it("center of mass is conserved", () => {
    const sim = new NBodyGravity([
      { x: 0, y: 0, vx: 1, vy: 0, mass: 1 },
      { x: 10, y: 0, vx: -1, vy: 0, mass: 1 },
    ], 1);
    const cm1 = sim.centerOfMass();
    sim.step(0.01);
    const cm2 = sim.centerOfMass();
    expect(cm2.x).toBeCloseTo(cm1.x, 5);
  });

  it("totalEnergy is computed", () => {
    const sim = new NBodyGravity([
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 1, y: 0, vx: 0, vy: 0, mass: 1 },
    ], 1);
    const energy = sim.totalEnergy();
    expect(typeof energy).toBe("number");
    expect(energy).toBeLessThan(0);
  });

  it("single body stays put", () => {
    const sim = new NBodyGravity([{ x: 5, y: 5, vx: 0, vy: 0, mass: 100 }]);
    sim.step(1);
    const state = sim.getState();
    expect(state[0].x).toBe(5);
    expect(state[0].y).toBe(5);
  });

  it("getState returns copy", () => {
    const sim = new NBodyGravity([{ x: 0, y: 0, vx: 0, vy: 0, mass: 1 }]);
    const state = sim.getState();
    state[0].x = 999;
    expect(sim.getState()[0].x).toBe(0);
  });
});
