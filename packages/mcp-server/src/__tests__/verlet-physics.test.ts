import { describe, it, expect } from "vitest";
import {
  createSystem, addParticle, addConstraint, step,
  createRope, createCloth, particleDistance,
} from "../verlet-physics.js";

describe("VerletSystem", () => {
  it("creates system with gravity", () => {
    const sys = createSystem({ x: 0, y: 10 });
    expect(sys.particles).toHaveLength(0);
    expect(sys.gravity.y).toBe(10);
  });

  it("adds particles", () => {
    const sys = createSystem();
    const idx = addParticle(sys, 5, 5);
    expect(idx).toBe(0);
    expect(sys.particles).toHaveLength(1);
  });

  it("particle falls under gravity", () => {
    const sys = createSystem({ x: 0, y: 10 });
    addParticle(sys, 0, 0);
    const initialY = sys.particles[0].y;
    step(sys, 1 / 60);
    step(sys, 1 / 60);
    expect(sys.particles[0].y).toBeGreaterThan(initialY);
  });

  it("pinned particle stays in place", () => {
    const sys = createSystem({ x: 0, y: 10 });
    addParticle(sys, 5, 5, 1, true);
    step(sys, 1 / 60);
    expect(sys.particles[0].x).toBe(5);
    expect(sys.particles[0].y).toBe(5);
  });

  it("constraint maintains distance", () => {
    const sys = createSystem({ x: 0, y: 0 });
    addParticle(sys, 0, 0, 1, true);
    addParticle(sys, 10, 0);
    addConstraint(sys, 0, 1, 1, 10);
    step(sys, 1 / 60, 10);
    const dist = particleDistance(sys, 0, 1);
    expect(dist).toBeCloseTo(10, 0);
  });
});

describe("createRope", () => {
  it("creates connected segments", () => {
    const sys = createSystem();
    const indices = createRope(sys, 0, 0, 5, 2);
    expect(indices).toHaveLength(6);
    expect(sys.constraints).toHaveLength(5);
  });

  it("pins start point", () => {
    const sys = createSystem();
    createRope(sys, 0, 0, 3, 1, true);
    expect(sys.particles[0].pinned).toBe(true);
    expect(sys.particles[1].pinned).toBe(false);
  });
});

describe("createCloth", () => {
  it("creates grid of particles", () => {
    const sys = createSystem();
    const grid = createCloth(sys, 0, 0, 3, 3, 1);
    expect(grid).toHaveLength(3);
    expect(grid[0]).toHaveLength(3);
    expect(sys.particles).toHaveLength(9);
  });

  it("pins top row", () => {
    const sys = createSystem();
    createCloth(sys, 0, 0, 3, 3, 1, true);
    expect(sys.particles[0].pinned).toBe(true);
    expect(sys.particles[3].pinned).toBe(false);
  });
});

describe("particleDistance", () => {
  it("calculates distance between particles", () => {
    const sys = createSystem();
    addParticle(sys, 0, 0);
    addParticle(sys, 3, 4);
    expect(particleDistance(sys, 0, 1)).toBe(5);
  });
});
