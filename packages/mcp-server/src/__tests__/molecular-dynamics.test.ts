import { describe, it, expect } from "vitest";
import { MolecularDynamics } from "../molecular-dynamics.js";

describe("MolecularDynamics", () => {
  it("lennardJones has minimum near sigma", () => {
    const rMin = Math.pow(2, 1 / 6);
    const v = MolecularDynamics.lennardJones(rMin);
    expect(v).toBeCloseTo(-1, 3);
  });

  it("lennardJones is repulsive at close range", () => {
    expect(MolecularDynamics.lennardJones(0.5)).toBeGreaterThan(0);
  });

  it("ljForce is zero at equilibrium", () => {
    const rMin = Math.pow(2, 1 / 6);
    const f = MolecularDynamics.ljForce(rMin);
    expect(Math.abs(f)).toBeLessThan(0.01);
  });

  it("step moves particles", () => {
    const particles = [
      { x: 0, y: 0, vx: 1, vy: 0, mass: 1 },
      { x: 5, y: 0, vx: -1, vy: 0, mass: 1 },
    ];
    const result = MolecularDynamics.step(particles, 0.01);
    expect(result[0].x).not.toBe(0);
    expect(result[1].x).not.toBe(5);
  });

  it("kineticEnergy computes correctly", () => {
    const particles = [
      { x: 0, y: 0, vx: 3, vy: 4, mass: 1 },
    ];
    expect(MolecularDynamics.kineticEnergy(particles)).toBeCloseTo(12.5, 2);
  });

  it("temperature is proportional to kinetic energy", () => {
    const particles = [
      { x: 0, y: 0, vx: 1, vy: 0, mass: 1 },
      { x: 5, y: 0, vx: -1, vy: 0, mass: 1 },
    ];
    const temp = MolecularDynamics.temperature(particles);
    expect(temp).toBeGreaterThan(0);
  });

  it("potentialEnergy computes for pair", () => {
    const particles = [
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 1.5, y: 0, vx: 0, vy: 0, mass: 1 },
    ];
    const pe = MolecularDynamics.potentialEnergy(particles);
    expect(typeof pe).toBe("number");
  });

  it("radialDistribution returns bins", () => {
    const particles = [
      { x: 0, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 1, y: 0, vx: 0, vy: 0, mass: 1 },
      { x: 0, y: 2, vx: 0, vy: 0, mass: 1 },
    ];
    const rdf = MolecularDynamics.radialDistribution(particles, 0.5, 3);
    expect(rdf.length).toBeGreaterThan(0);
    expect(rdf[0]).toHaveProperty("r");
    expect(rdf[0]).toHaveProperty("g");
  });
});
