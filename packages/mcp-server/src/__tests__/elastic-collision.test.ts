import { describe, it, expect } from "vitest";
import { CollisionEngine, ParticleSimulator } from "../elastic-collision.js";

describe("CollisionEngine", () => {
  it("elastic 1D conserves momentum", () => {
    const m1 = 2, v1 = 3, m2 = 1, v2 = -1;
    const result = CollisionEngine.elastic1D(m1, v1, m2, v2);
    const pBefore = m1 * v1 + m2 * v2;
    const pAfter = m1 * result.v1 + m2 * result.v2;
    expect(pAfter).toBeCloseTo(pBefore, 5);
  });

  it("elastic 1D conserves kinetic energy", () => {
    const m1 = 2, v1 = 3, m2 = 1, v2 = -1;
    const result = CollisionEngine.elastic1D(m1, v1, m2, v2);
    const keBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    const keAfter = 0.5 * m1 * result.v1 ** 2 + 0.5 * m2 * result.v2 ** 2;
    expect(keAfter).toBeCloseTo(keBefore, 5);
  });

  it("inelastic 1D loses energy when restitution < 1", () => {
    const result = CollisionEngine.inelastic1D(1, 5, 1, -5, 0.5);
    const keBefore = 0.5 * 25 + 0.5 * 25;
    const keAfter = 0.5 * result.v1 ** 2 + 0.5 * result.v2 ** 2;
    expect(keAfter).toBeLessThan(keBefore);
  });

  it("perfectly inelastic 1D - objects stick together", () => {
    const vf = CollisionEngine.perfectlyInelastic1D(2, 3, 1, 0);
    expect(vf).toBeCloseTo(2, 5);
  });

  it("elastic 2D conserves momentum", () => {
    const a = { x: 0, y: 0, vx: 5, vy: 0, mass: 1, radius: 1 };
    const b = { x: 1.5, y: 0, vx: -3, vy: 0, mass: 1, radius: 1 };
    const result = CollisionEngine.elastic2D(a, b);
    const pxBefore = a.mass * a.vx + b.mass * b.vx;
    const pxAfter = a.mass * result.a.vx + b.mass * result.b.vx;
    expect(pxAfter).toBeCloseTo(pxBefore, 5);
  });

  it("detects collision between overlapping particles", () => {
    const a = { x: 0, y: 0, vx: 0, vy: 0, mass: 1, radius: 1 };
    const b = { x: 1.5, y: 0, vx: 0, vy: 0, mass: 1, radius: 1 };
    expect(CollisionEngine.detectCollision(a, b)).toBe(true);
  });

  it("no collision for far apart particles", () => {
    const a = { x: 0, y: 0, vx: 0, vy: 0, mass: 1, radius: 1 };
    const b = { x: 10, y: 0, vx: 0, vy: 0, mass: 1, radius: 1 };
    expect(CollisionEngine.detectCollision(a, b)).toBe(false);
  });

  it("computes kinetic energy", () => {
    expect(CollisionEngine.kineticEnergy(2, 3, 4)).toBeCloseTo(25, 5);
  });

  it("computes total momentum of particle set", () => {
    const particles = [
      { x: 0, y: 0, vx: 3, vy: 0, mass: 2, radius: 1 },
      { x: 5, y: 0, vx: -1, vy: 0, mass: 2, radius: 1 },
    ];
    const m = CollisionEngine.totalMomentum(particles);
    expect(m.px).toBeCloseTo(4, 5);
  });

  it("computes energy loss", () => {
    const loss = CollisionEngine.energyLoss(1, 5, 0, 1, 2, 2);
    expect(loss).toBeGreaterThan(0);
  });
});

describe("ParticleSimulator", () => {
  it("adds particles and steps", () => {
    const sim = new ParticleSimulator();
    sim.addParticle({ x: 0, y: 0, vx: 1, vy: 0, mass: 1, radius: 0.5 });
    expect(sim.particleCount()).toBe(1);
    sim.step(1);
    expect(sim.getParticle(0)!.x).toBeCloseTo(1, 1);
  });

  it("bounces off bounds", () => {
    const sim = new ParticleSimulator();
    sim.setBounds(10, 10);
    sim.addParticle({ x: 9, y: 5, vx: 5, vy: 0, mass: 1, radius: 0.5 });
    sim.step(1);
    const p = sim.getParticle(0)!;
    expect(p.vx).toBeLessThan(0);
  });

  it("handles particle-particle collisions", () => {
    const sim = new ParticleSimulator();
    sim.addParticle({ x: 0, y: 0, vx: 10, vy: 0, mass: 1, radius: 1 });
    sim.addParticle({ x: 1.5, y: 0, vx: -10, vy: 0, mass: 1, radius: 1 });
    const pBefore = sim.totalMomentum();
    sim.step(0.01);
    const pAfter = sim.totalMomentum();
    expect(pAfter.px).toBeCloseTo(pBefore.px, 1);
  });

  it("tracks total energy", () => {
    const sim = new ParticleSimulator();
    sim.addParticle({ x: 0, y: 0, vx: 5, vy: 0, mass: 2, radius: 1 });
    expect(sim.totalEnergy()).toBeCloseTo(25, 5);
  });
});
