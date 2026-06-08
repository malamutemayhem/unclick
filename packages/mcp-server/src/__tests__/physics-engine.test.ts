import { describe, it, expect } from "vitest";
import { PhysicsEngine } from "../physics-engine.js";

describe("PhysicsEngine", () => {
  const body = () => ({
    position: { x: 0, y: 10 },
    velocity: { x: 1, y: 0 },
    mass: 1,
    radius: 0.5,
  });

  it("step updates position", () => {
    const result = PhysicsEngine.step([body()], 0.1);
    expect(result[0].position.x).toBeGreaterThan(0);
  });

  it("step applies gravity", () => {
    const result = PhysicsEngine.step([body()], 0.1);
    expect(result[0].velocity.y).toBeLessThan(0);
  });

  it("applyForce changes velocity", () => {
    const b = body();
    const result = PhysicsEngine.applyForce(b, { x: 10, y: 0 }, 0.1);
    expect(result.velocity.x).toBeGreaterThan(b.velocity.x);
  });

  it("collides detects overlapping bodies", () => {
    const a = { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, mass: 1, radius: 1 };
    const b = { position: { x: 1, y: 0 }, velocity: { x: 0, y: 0 }, mass: 1, radius: 1 };
    expect(PhysicsEngine.collides(a, b)).toBe(true);
  });

  it("collides detects non-overlapping bodies", () => {
    const a = { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, mass: 1, radius: 0.5 };
    const b = { position: { x: 3, y: 0 }, velocity: { x: 0, y: 0 }, mass: 1, radius: 0.5 };
    expect(PhysicsEngine.collides(a, b)).toBe(false);
  });

  it("elasticCollision conserves momentum", () => {
    const a = { position: { x: 0, y: 0 }, velocity: { x: 5, y: 0 }, mass: 1, radius: 0.5 };
    const b = { position: { x: 1, y: 0 }, velocity: { x: -3, y: 0 }, mass: 1, radius: 0.5 };
    const mBefore = a.mass * a.velocity.x + b.mass * b.velocity.x;
    const result = PhysicsEngine.elasticCollision(a, b);
    const mAfter = result.a.mass * result.a.velocity.x + result.b.mass * result.b.velocity.x;
    expect(mAfter).toBeCloseTo(mBefore, 2);
  });

  it("kineticEnergy computes correctly", () => {
    const b = { position: { x: 0, y: 0 }, velocity: { x: 3, y: 4 }, mass: 2, radius: 1 };
    expect(PhysicsEngine.kineticEnergy(b)).toBe(25);
  });

  it("momentum computes correctly", () => {
    const b = { position: { x: 0, y: 0 }, velocity: { x: 3, y: 4 }, mass: 2, radius: 1 };
    const p = PhysicsEngine.momentum(b);
    expect(p.x).toBe(6);
    expect(p.y).toBe(8);
  });

  it("projectile computes trajectory", () => {
    const result = PhysicsEngine.projectile(10, 45);
    expect(result.maxHeight).toBeGreaterThan(0);
    expect(result.range).toBeGreaterThan(0);
    expect(result.flightTime).toBeGreaterThan(0);
  });

  it("projectile at 90 degrees goes straight up", () => {
    const result = PhysicsEngine.projectile(10, 90);
    expect(result.range).toBeCloseTo(0, 2);
  });
});
