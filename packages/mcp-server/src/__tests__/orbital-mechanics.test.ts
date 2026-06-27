import { describe, it, expect } from "vitest";
import { OrbitalSimulator } from "../orbital-mechanics.js";

describe("OrbitalSimulator", () => {
  it("adds bodies", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("Sun", 0, 0, 0, 0, 1e6);
    sim.addBody("Planet", 100, 0, 0, 100, 1);
    expect(sim.bodyCount()).toBe(2);
  });

  it("tracks time", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("A", 0, 0, 0, 0, 1);
    sim.step(0.5);
    sim.step(0.5);
    expect(sim.getTime()).toBeCloseTo(1, 5);
  });

  it("bodies attract each other", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("A", 0, 0, 0, 0, 1000);
    sim.addBody("B", 10, 0, 0, 0, 1);
    const initialDist = sim.distanceBetween(0, 1);
    for (let i = 0; i < 100; i++) sim.step(0.01);
    expect(sim.distanceBetween(0, 1)).toBeLessThan(initialDist);
  });

  it("conserves momentum in isolated system", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("A", 0, 0, 1, 0, 10);
    sim.addBody("B", 5, 0, -1, 0, 10);
    const p0 = sim.totalMomentum();
    for (let i = 0; i < 50; i++) sim.step(0.01);
    const p1 = sim.totalMomentum();
    expect(p1.x).toBeCloseTo(p0.x, 3);
    expect(p1.y).toBeCloseTo(p0.y, 3);
  });

  it("computes center of mass", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("A", 0, 0, 0, 0, 10);
    sim.addBody("B", 10, 0, 0, 0, 10);
    const com = sim.centerOfMass();
    expect(com.x).toBeCloseTo(5, 5);
  });

  it("computes total energy", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("A", 0, 0, 0, 0, 100);
    sim.addBody("B", 10, 0, 0, 3, 1);
    expect(sim.totalEnergy()).not.toBe(0);
  });

  it("gets body by index", () => {
    const sim = new OrbitalSimulator(1);
    sim.addBody("Star", 5, 10, 0, 0, 999);
    const body = sim.getBody(0);
    expect(body?.name).toBe("Star");
    expect(body?.mass).toBe(999);
  });
});

describe("OrbitalSimulator static methods", () => {
  it("computes circular orbit speed", () => {
    const v = OrbitalSimulator.circularOrbitSpeed(1, 1000, 10);
    expect(v).toBeCloseTo(10, 0);
  });

  it("escape speed is sqrt(2) times circular speed", () => {
    const vc = OrbitalSimulator.circularOrbitSpeed(1, 1000, 10);
    const ve = OrbitalSimulator.escapeSpeed(1, 1000, 10);
    expect(ve / vc).toBeCloseTo(Math.SQRT2, 5);
  });

  it("computes orbital period", () => {
    const T = OrbitalSimulator.orbitalPeriod(1, 1000, 10);
    expect(T).toBeGreaterThan(0);
  });

  it("computes orbital elements for circular orbit", () => {
    const G = 1;
    const M = 1000;
    const r = 10;
    const v = OrbitalSimulator.circularOrbitSpeed(G, M, r);
    const elements = OrbitalSimulator.orbitalElements(G, M, r, 0, 0, v);
    expect(elements.eccentricity).toBeCloseTo(0, 1);
    expect(elements.semiMajorAxis).toBeCloseTo(r, 0);
  });
});
