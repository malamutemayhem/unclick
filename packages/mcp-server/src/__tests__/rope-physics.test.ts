import { describe, it, expect } from "vitest";
import { RopeSimulation } from "../rope-physics.js";

describe("RopeSimulation", () => {
  it("creates a rope with correct point count", () => {
    const rope = new RopeSimulation(1);
    rope.createRope(0, 0, 10, 0, 10);
    expect(rope.pointCount()).toBe(11);
  });

  it("locks first point by default", () => {
    const rope = new RopeSimulation(1);
    rope.createRope(0, 0, 5, 0, 5);
    expect(rope.getPoint(0)!.locked).toBe(true);
    expect(rope.getPoint(5)!.locked).toBe(false);
  });

  it("gravity pulls rope down", () => {
    const rope = new RopeSimulation(1, 9.81, 5);
    rope.createRope(0, 0, 5, 0, 5);
    const midBefore = rope.getPoint(3)!.y;
    for (let i = 0; i < 10; i++) rope.step(0.01);
    expect(rope.getPoint(3)!.y).toBeGreaterThan(midBefore);
  });

  it("computes total length", () => {
    const rope = new RopeSimulation(1);
    rope.createRope(0, 0, 10, 0, 10);
    expect(rope.totalLength()).toBeCloseTo(10, 0);
  });

  it("computes tension", () => {
    const rope = new RopeSimulation(1, 9.81, 3);
    rope.createRope(0, 0, 5, 0, 5, true, true);
    for (let i = 0; i < 20; i++) rope.step(0.01);
    expect(rope.maxTension()).toBeGreaterThanOrEqual(0);
  });

  it("moves a point", () => {
    const rope = new RopeSimulation(1);
    rope.addPoint(0, 0);
    rope.movePoint(0, 5, 5);
    expect(rope.getPoint(0)!.x).toBe(5);
    expect(rope.getPoint(0)!.y).toBe(5);
  });

  it("locks and unlocks points", () => {
    const rope = new RopeSimulation(1);
    rope.addPoint(0, 0);
    rope.lockPoint(0);
    expect(rope.getPoint(0)!.locked).toBe(true);
    rope.unlockPoint(0);
    expect(rope.getPoint(0)!.locked).toBe(false);
  });

  it("computes center of mass", () => {
    const rope = new RopeSimulation(1);
    rope.addPoint(0, 0);
    rope.addPoint(10, 0);
    const com = rope.centerOfMass();
    expect(com.x).toBeCloseTo(5, 5);
    expect(com.y).toBeCloseTo(0, 5);
  });

  it("adds individual points", () => {
    const rope = new RopeSimulation(1);
    const i = rope.addPoint(3, 4);
    expect(i).toBe(0);
    expect(rope.pointCount()).toBe(1);
  });
});
