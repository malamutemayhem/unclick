import { describe, it, expect } from "vitest";
import { RigidBody2D, PhysicsWorld } from "../rigid-body.js";

describe("RigidBody2D", () => {
  it("initializes at position with zero velocity", () => {
    const body = new RigidBody2D(10, 20);
    expect(body.position).toEqual({ x: 10, y: 20 });
    expect(body.velocity).toEqual({ x: 0, y: 0 });
    expect(body.mass).toBe(1);
  });

  it("applies force and accelerates", () => {
    const body = new RigidBody2D(0, 0, { mass: 2 });
    body.applyForce({ x: 10, y: 0 });
    body.step(1);
    expect(body.velocity.x).toBeCloseTo(5, 0);
  });

  it("applies impulse immediately", () => {
    const body = new RigidBody2D(0, 0, { mass: 4 });
    body.applyImpulse({ x: 8, y: 0 });
    expect(body.velocity.x).toBeCloseTo(2, 5);
  });

  it("moves position over time", () => {
    const body = new RigidBody2D(0, 0);
    body.applyImpulse({ x: 10, y: 0 });
    body.step(0.5);
    expect(body.position.x).toBeGreaterThan(0);
  });

  it("computes kinetic energy", () => {
    const body = new RigidBody2D(0, 0, { mass: 2 });
    body.applyImpulse({ x: 6, y: 8 });
    expect(body.kineticEnergy()).toBeCloseTo(25, 5);
  });

  it("computes momentum", () => {
    const body = new RigidBody2D(0, 0, { mass: 3 });
    body.applyImpulse({ x: 6, y: 0 });
    const m = body.momentum();
    expect(m.x).toBeCloseTo(6, 5);
  });

  it("static body does not move", () => {
    const body = new RigidBody2D(5, 5, { mass: 0 });
    expect(body.isStatic()).toBe(true);
    body.applyForce({ x: 100, y: 100 });
    body.step(1);
    expect(body.position).toEqual({ x: 5, y: 5 });
  });

  it("applies torque and rotates", () => {
    const body = new RigidBody2D(0, 0);
    body.applyTorque(10);
    body.step(0.1);
    expect(body.angularVelocity).not.toBe(0);
    expect(body.angle).not.toBe(0);
  });

  it("applies linear damping", () => {
    const body = new RigidBody2D(0, 0, { linearDamping: 0.5 });
    body.applyImpulse({ x: 10, y: 0 });
    body.step(0.01);
    expect(body.velocity.x).toBeLessThan(10);
  });
});

describe("PhysicsWorld", () => {
  it("adds and removes bodies", () => {
    const world = new PhysicsWorld();
    const body = new RigidBody2D(0, 0);
    world.addBody(body);
    expect(world.bodyCount()).toBe(1);
    world.removeBody(body);
    expect(world.bodyCount()).toBe(0);
  });

  it("applies gravity to bodies", () => {
    const world = new PhysicsWorld({ x: 0, y: -10 });
    const body = new RigidBody2D(0, 100);
    world.addBody(body);
    world.step(1);
    expect(body.velocity.y).toBeLessThan(0);
    expect(body.position.y).toBeLessThan(100);
  });

  it("computes total energy and momentum", () => {
    const world = new PhysicsWorld({ x: 0, y: 0 });
    const b1 = new RigidBody2D(0, 0, { mass: 1 });
    b1.applyImpulse({ x: 5, y: 0 });
    const b2 = new RigidBody2D(10, 0, { mass: 1 });
    b2.applyImpulse({ x: -5, y: 0 });
    world.addBody(b1);
    world.addBody(b2);
    expect(world.totalEnergy()).toBeGreaterThan(0);
    const m = world.totalMomentum();
    expect(m.x).toBeCloseTo(0, 5);
  });

  it("returns bodies list", () => {
    const world = new PhysicsWorld();
    world.addBody(new RigidBody2D(0, 0));
    world.addBody(new RigidBody2D(1, 1));
    expect(world.getBodies().length).toBe(2);
  });
});
