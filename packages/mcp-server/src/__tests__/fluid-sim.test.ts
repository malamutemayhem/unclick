import { describe, it, expect } from "vitest";
import { FluidSim } from "../fluid-sim.js";

describe("FluidSim", () => {
  it("initializes with zero density", () => {
    const sim = new FluidSim(8, 8);
    expect(sim.totalDensity()).toBe(0);
  });

  it("addDensity increases total", () => {
    const sim = new FluidSim(8, 8);
    sim.addDensity(3, 3, 100);
    expect(sim.totalDensity()).toBe(100);
    expect(sim.getDensity(3, 3)).toBe(100);
  });

  it("addDensity ignores out of bounds", () => {
    const sim = new FluidSim(8, 8);
    sim.addDensity(-1, 0, 50);
    sim.addDensity(0, 100, 50);
    expect(sim.totalDensity()).toBe(0);
  });

  it("addVelocity sets velocity", () => {
    const sim = new FluidSim(8, 8);
    sim.addVelocity(4, 4, 1.5, -0.5);
    const vel = sim.getVelocity(4, 4);
    expect(vel.vx).toBe(1.5);
    expect(vel.vy).toBe(-0.5);
  });

  it("addVelocity ignores out of bounds", () => {
    const sim = new FluidSim(8, 8);
    sim.addVelocity(100, 100, 1, 1);
    expect(sim.getVelocity(0, 0)).toEqual({ vx: 0, vy: 0 });
  });

  it("step increments count", () => {
    const sim = new FluidSim(8, 8);
    expect(sim.steps).toBe(0);
    sim.step();
    expect(sim.steps).toBe(1);
    sim.step();
    expect(sim.steps).toBe(2);
  });

  it("step spreads density", () => {
    const sim = new FluidSim(16, 16, 0.01, 0.01, 0.1);
    sim.addDensity(8, 8, 1000);
    const before = sim.getDensity(8, 8);
    for (let i = 0; i < 10; i++) sim.step();
    const after = sim.getDensity(8, 8);
    expect(after).toBeLessThan(before);
  });

  it("getDensityGrid returns copy", () => {
    const sim = new FluidSim(4, 4);
    sim.addDensity(1, 1, 50);
    const grid = sim.getDensityGrid();
    expect(grid[1 * 4 + 1]).toBe(50);
    grid[1 * 4 + 1] = 999;
    expect(sim.getDensity(1, 1)).toBe(50);
  });

  it("gridWidth and gridHeight", () => {
    const sim = new FluidSim(10, 20);
    expect(sim.gridWidth).toBe(10);
    expect(sim.gridHeight).toBe(20);
  });

  it("reset clears everything", () => {
    const sim = new FluidSim(8, 8);
    sim.addDensity(3, 3, 100);
    sim.addVelocity(3, 3, 1, 1);
    sim.step();
    sim.reset();
    expect(sim.totalDensity()).toBe(0);
    expect(sim.steps).toBe(0);
    expect(sim.getVelocity(3, 3)).toEqual({ vx: 0, vy: 0 });
  });

  it("multiple density sources", () => {
    const sim = new FluidSim(8, 8);
    sim.addDensity(2, 2, 50);
    sim.addDensity(5, 5, 75);
    expect(sim.totalDensity()).toBe(125);
  });
});
