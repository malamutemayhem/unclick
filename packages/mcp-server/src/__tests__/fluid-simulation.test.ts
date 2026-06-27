import { describe, it, expect } from "vitest";
import { FluidGrid } from "../fluid-simulation.js";

describe("FluidGrid", () => {
  it("initializes with zero density", () => {
    const fluid = new FluidGrid({ width: 10, height: 10 });
    expect(fluid.getDensity(5, 5)).toBe(0);
  });

  it("adds density", () => {
    const fluid = new FluidGrid({ width: 10, height: 10 });
    fluid.addDensity(5, 5, 100);
    expect(fluid.getDensity(5, 5)).toBe(100);
  });

  it("adds velocity", () => {
    const fluid = new FluidGrid({ width: 10, height: 10 });
    fluid.addVelocity(5, 5, 1.0, 0.5);
    const vel = fluid.getVelocity(5, 5);
    expect(vel.vx).toBe(1.0);
    expect(vel.vy).toBe(0.5);
  });

  it("steps simulation", () => {
    const fluid = new FluidGrid({ width: 10, height: 10 });
    fluid.addDensity(5, 5, 100);
    fluid.addVelocity(5, 5, 1.0, 0.0);
    fluid.step(0.1);
    const total = fluid.totalDensity();
    expect(total).toBeGreaterThan(0);
  });

  it("density spreads over time", () => {
    const fluid = new FluidGrid({ width: 10, height: 10, diffusion: 0.1 });
    fluid.addDensity(5, 5, 100);
    const initial = fluid.getDensity(5, 5);
    fluid.step(0.1);
    fluid.step(0.1);
    const neighbor = fluid.getDensity(6, 5);
    expect(neighbor).toBeGreaterThanOrEqual(0);
    expect(initial).toBe(100);
  });

  it("returns density grid", () => {
    const fluid = new FluidGrid({ width: 5, height: 5 });
    fluid.addDensity(2, 2, 50);
    const grid = fluid.getDensityGrid();
    expect(grid).toHaveLength(5);
    expect(grid[0]).toHaveLength(5);
    expect(grid[2][2]).toBe(50);
  });

  it("tracks total density", () => {
    const fluid = new FluidGrid({ width: 10, height: 10 });
    fluid.addDensity(3, 3, 30);
    fluid.addDensity(7, 7, 70);
    expect(fluid.totalDensity()).toBe(100);
  });
});
