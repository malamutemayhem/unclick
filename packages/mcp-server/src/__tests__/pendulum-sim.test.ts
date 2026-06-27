import { describe, it, expect } from "vitest";
import { PendulumSim } from "../pendulum-sim.js";

describe("PendulumSim", () => {
  it("step updates angle and velocity", () => {
    const state = PendulumSim.step({ angle: 0.5, angularVelocity: 0 }, 1, 0.01);
    expect(state.angularVelocity).not.toBe(0);
    expect(state.angle).not.toBe(0.5);
  });

  it("period matches small-angle formula", () => {
    const T = PendulumSim.period(1);
    expect(T).toBeCloseTo(2 * Math.PI * Math.sqrt(1 / 9.81), 2);
  });

  it("maxVelocity from rest at angle", () => {
    const vMax = PendulumSim.maxVelocity(Math.PI / 4, 1);
    expect(vMax).toBeGreaterThan(0);
  });

  it("energy is conserved without damping", () => {
    let state = { angle: 0.3, angularVelocity: 0 };
    const e0 = PendulumSim.energy(state, 1, 1);
    for (let i = 0; i < 100; i++) {
      state = PendulumSim.step(state, 1, 0.001);
    }
    const e1 = PendulumSim.energy(state, 1, 1);
    expect(e1.total).toBeCloseTo(e0.total, 1);
  });

  it("energy decreases with damping", () => {
    let state = { angle: 0.5, angularVelocity: 0 };
    const e0 = PendulumSim.energy(state, 1, 1);
    for (let i = 0; i < 200; i++) {
      state = PendulumSim.step(state, 1, 0.01, 9.81, 0.5);
    }
    const e1 = PendulumSim.energy(state, 1, 1);
    expect(e1.total).toBeLessThan(e0.total);
  });

  it("position converts angle to cartesian", () => {
    const pos = PendulumSim.position({ angle: 0, angularVelocity: 0 }, 2);
    expect(pos.x).toBeCloseTo(0, 3);
    expect(pos.y).toBeCloseTo(-2, 3);
  });

  it("simulate returns correct number of states", () => {
    const states = PendulumSim.simulate({ angle: 0.3, angularVelocity: 0 }, 1, 0.01, 50);
    expect(states.length).toBe(51);
  });

  it("doublePendulumStep returns updated state", () => {
    const result = PendulumSim.doublePendulumStep(
      Math.PI / 4, Math.PI / 3, 0, 0,
      1, 1, 1, 1, 0.01,
    );
    expect(typeof result.a1).toBe("number");
    expect(typeof result.a2).toBe("number");
    expect(typeof result.w1).toBe("number");
    expect(typeof result.w2).toBe("number");
  });

  it("doublePendulum at rest stays at rest", () => {
    const result = PendulumSim.doublePendulumStep(0, 0, 0, 0, 1, 1, 1, 1, 0.01);
    expect(result.a1).toBeCloseTo(0, 3);
    expect(result.a2).toBeCloseTo(0, 3);
  });
});
