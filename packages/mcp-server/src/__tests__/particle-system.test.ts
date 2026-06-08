import { describe, it, expect } from "vitest";
import { ParticleSystem } from "../particle-system.js";

describe("ParticleSystem", () => {
  it("emits particles", () => {
    const ps = new ParticleSystem({ x: 0, y: 0, speed: 50 });
    ps.emit(5);
    expect(ps.count()).toBe(5);
    expect(ps.getTotalEmitted()).toBe(5);
  });

  it("updates particle positions", () => {
    const ps = new ParticleSystem({ x: 0, y: 0, speed: 100, minLife: 5, maxLife: 5 });
    ps.emit(1);
    const before = ps.getParticles()[0];
    const bx = before.x;
    ps.update(0.1);
    const after = ps.getParticles()[0];
    expect(after.x !== bx || after.y !== 0).toBe(true);
  });

  it("removes dead particles", () => {
    const ps = new ParticleSystem({ minLife: 0.1, maxLife: 0.1 });
    ps.emit(3);
    expect(ps.count()).toBe(3);
    ps.update(0.2);
    expect(ps.count()).toBe(0);
  });

  it("applies gravity", () => {
    const ps = new ParticleSystem({ gravity: 100, speed: 0, minLife: 5, maxLife: 5 });
    ps.emit(1);
    ps.update(1);
    const p = ps.getParticles()[0];
    expect(p.vy).toBeGreaterThan(0);
  });

  it("tick emits and updates", () => {
    const ps = new ParticleSystem({ rate: 100, minLife: 5, maxLife: 5 });
    ps.tick(0.1);
    expect(ps.count()).toBeGreaterThan(0);
    expect(ps.getElapsed()).toBeCloseTo(0.1);
  });

  it("fades alpha as life decreases", () => {
    const ps = new ParticleSystem({ minLife: 1, maxLife: 1, speed: 0 });
    ps.emit(1);
    ps.update(0.5);
    const p = ps.getParticles()[0];
    expect(p.alpha).toBeCloseTo(0.5, 1);
  });

  it("clears all particles", () => {
    const ps = new ParticleSystem();
    ps.emit(10);
    ps.clear();
    expect(ps.count()).toBe(0);
  });

  it("sets position", () => {
    const ps = new ParticleSystem({ x: 0, y: 0 });
    ps.setPosition(100, 200);
    ps.emit(1);
    const p = ps.getParticles()[0];
    expect(p.x).toBe(100);
    expect(p.y).toBe(200);
  });

  it("computes bounds", () => {
    const ps = new ParticleSystem({ speed: 0, minLife: 5, maxLife: 5 });
    ps.emit(1);
    const b = ps.bounds();
    expect(b.minX).toBe(0);
    expect(b.maxX).toBe(0);
  });

  it("handles empty bounds", () => {
    const ps = new ParticleSystem();
    const b = ps.bounds();
    expect(b.minX).toBe(0);
  });
});
