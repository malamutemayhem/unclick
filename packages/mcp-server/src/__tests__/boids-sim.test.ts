import { describe, it, expect } from "vitest";
import { BoidsSimulation, boidsDist } from "../boids-sim.js";

describe("BoidsSimulation", () => {
  it("adds boids", () => {
    const sim = new BoidsSimulation(100, 100);
    sim.addBoid(50, 50);
    sim.addBoid(60, 60, 1, 0);
    expect(sim.count).toBe(2);
  });

  it("step updates positions", () => {
    const sim = new BoidsSimulation(200, 200);
    const b = sim.addBoid(50, 50, 2, 0);
    sim.step(1);
    expect(b.position.x).not.toBe(50);
  });

  it("boids stay within bounds via wrapping", () => {
    const sim = new BoidsSimulation(100, 100);
    sim.addBoid(99, 99, 5, 5);
    sim.step(1);
    const b = sim.boids[0];
    expect(b.position.x).toBeLessThan(100);
    expect(b.position.y).toBeLessThan(100);
  });

  it("separation pushes close boids apart", () => {
    const sim = new BoidsSimulation(200, 200, { separationWeight: 5, alignmentWeight: 0, cohesionWeight: 0 });
    sim.addBoid(50, 50, 0, 0);
    sim.addBoid(52, 50, 0, 0);
    sim.step(1);
    const d0 = Math.abs(sim.boids[0].position.x - sim.boids[1].position.x);
    expect(d0).toBeGreaterThan(2);
  });

  it("cohesion pulls distant boids together", () => {
    const sim = new BoidsSimulation(200, 200, { separationWeight: 0, alignmentWeight: 0, cohesionWeight: 5, neighborRadius: 100 });
    sim.addBoid(20, 50, 0, 0);
    sim.addBoid(80, 50, 0, 0);
    const initDist = Math.abs(sim.boids[0].position.x - sim.boids[1].position.x);
    for (let i = 0; i < 10; i++) sim.step(1);
    const finalDist = Math.abs(sim.boids[0].position.x - sim.boids[1].position.x);
    expect(finalDist).toBeLessThan(initDist);
  });

  it("averageSpeed returns mean speed", () => {
    const sim = new BoidsSimulation(100, 100);
    sim.addBoid(10, 10, 3, 4);
    expect(sim.averageSpeed()).toBeCloseTo(5, 1);
  });

  it("centerOfMass computes correctly", () => {
    const sim = new BoidsSimulation(100, 100);
    sim.addBoid(0, 0);
    sim.addBoid(10, 10);
    const com = sim.centerOfMass();
    expect(com.x).toBe(5);
    expect(com.y).toBe(5);
  });

  it("empty simulation handles gracefully", () => {
    const sim = new BoidsSimulation(100, 100);
    expect(sim.averageSpeed()).toBe(0);
    expect(sim.centerOfMass().x).toBe(0);
    sim.step(1);
    expect(sim.count).toBe(0);
  });

  it("speed is bounded by maxSpeed", () => {
    const sim = new BoidsSimulation(200, 200, { maxSpeed: 3 });
    sim.addBoid(50, 50, 10, 10);
    for (let i = 0; i < 20; i++) sim.step(1);
    for (const b of sim.boids) {
      const spd = Math.sqrt(b.velocity.x ** 2 + b.velocity.y ** 2);
      expect(spd).toBeLessThanOrEqual(3.01);
    }
  });
});
