import { describe, it, expect } from "vitest";
import {
  createState, step, run,
  position1, position2,
  kineticEnergy, potentialEnergy, totalEnergy,
  lyapunovDivergence,
} from "../pendulum-double.js";

describe("createState", () => {
  it("creates with initial angles", () => {
    const s = createState(Math.PI / 4, Math.PI / 3);
    expect(s.theta1).toBeCloseTo(Math.PI / 4);
    expect(s.theta2).toBeCloseTo(Math.PI / 3);
    expect(s.omega1).toBe(0);
    expect(s.omega2).toBe(0);
  });
});

describe("step", () => {
  it("advances time", () => {
    const s = createState(Math.PI / 4, Math.PI / 3);
    const next = step(s);
    expect(next.time).toBeGreaterThan(0);
  });

  it("changes angles under gravity", () => {
    const s = createState(Math.PI / 4, Math.PI / 3);
    const next = step(s, 0.01);
    expect(next.omega1).not.toBe(0);
    expect(next.omega2).not.toBe(0);
  });

  it("stays at rest when vertical", () => {
    const s = createState(0, 0);
    const next = step(s, 0.01);
    expect(next.theta1).toBeCloseTo(0, 5);
    expect(next.theta2).toBeCloseTo(0, 5);
  });
});

describe("run", () => {
  it("produces history", () => {
    const s = createState(Math.PI / 6, Math.PI / 4);
    const history = run(s, 100, 0.001);
    expect(history.length).toBe(101);
    expect(history[100].time).toBeCloseTo(0.1, 3);
  });
});

describe("position1 / position2", () => {
  it("first bob at bottom when theta1=0", () => {
    const s = createState(0, 0);
    const p = position1(s);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(1);
  });

  it("second bob below first when both theta=0", () => {
    const s = createState(0, 0);
    const p2 = position2(s);
    expect(p2.x).toBeCloseTo(0);
    expect(p2.y).toBeCloseTo(2);
  });

  it("positions shift with angle", () => {
    const s = createState(Math.PI / 2, 0);
    const p1 = position1(s);
    expect(p1.x).toBeCloseTo(1);
    expect(p1.y).toBeCloseTo(0, 5);
  });
});

describe("energy", () => {
  it("kinetic energy starts at 0 when at rest", () => {
    const s = createState(Math.PI / 4, Math.PI / 3);
    expect(kineticEnergy(s)).toBeCloseTo(0);
  });

  it("potential energy is negative when hanging down", () => {
    const s = createState(0, 0);
    expect(potentialEnergy(s)).toBeLessThan(0);
  });

  it("total energy is approximately conserved (RK4)", () => {
    const s = createState(Math.PI / 3, Math.PI / 4);
    const e0 = totalEnergy(s);
    const history = run(s, 1000, 0.001);
    const eFinal = totalEnergy(history[history.length - 1]);
    expect(Math.abs(eFinal - e0)).toBeLessThan(0.01);
  });
});

describe("lyapunovDivergence", () => {
  it("small perturbation leads to divergence in chaotic regime", () => {
    const div = lyapunovDivergence(Math.PI / 2, Math.PI / 2, 1e-6, 5000, 0.001);
    expect(div).toBeGreaterThan(0);
  });

  it("near-vertical is more stable", () => {
    const divSmall = lyapunovDivergence(0.01, 0.01, 1e-6, 1000, 0.001);
    const divLarge = lyapunovDivergence(Math.PI * 0.9, Math.PI * 0.8, 1e-6, 1000, 0.001);
    expect(divLarge).toBeGreaterThan(divSmall);
  });
});
