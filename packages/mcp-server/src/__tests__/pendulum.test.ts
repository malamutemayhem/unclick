import { describe, it, expect } from "vitest";
import { SimplePendulum, DoublePendulum } from "../pendulum.js";

describe("SimplePendulum", () => {
  it("starts at rest", () => {
    const p = new SimplePendulum(1);
    expect(p.angle).toBe(0);
    expect(p.angularVelocity).toBe(0);
  });

  it("oscillates when displaced", () => {
    const p = new SimplePendulum(1, 9.81, 0);
    p.setAngle(0.3);
    const initial = p.angle;
    for (let i = 0; i < 50; i++) p.step(0.01);
    expect(p.angle).not.toBeCloseTo(initial, 1);
  });

  it("computes period", () => {
    const p = new SimplePendulum(1, 9.81);
    expect(p.period()).toBeCloseTo(2 * Math.PI * Math.sqrt(1 / 9.81), 3);
  });

  it("computes position", () => {
    const p = new SimplePendulum(2);
    p.setAngle(Math.PI / 2);
    const pos = p.position();
    expect(pos.x).toBeCloseTo(2, 5);
    expect(pos.y).toBeCloseTo(0, 5);
  });

  it("energy is conserved without damping", () => {
    const p = new SimplePendulum(1, 9.81, 0);
    p.setAngle(0.3);
    const e0 = p.energy();
    for (let i = 0; i < 100; i++) p.step(0.001);
    expect(p.energy()).toBeCloseTo(e0, 1);
  });

  it("energy decreases with damping", () => {
    const p = new SimplePendulum(1, 9.81, 0.5);
    p.setAngle(0.5);
    const e0 = p.energy();
    for (let i = 0; i < 200; i++) p.step(0.01);
    expect(p.energy()).toBeLessThan(e0);
  });

  it("responds to kick", () => {
    const p = new SimplePendulum(1);
    p.kick(2);
    expect(p.angularVelocity).toBe(2);
  });

  it("tracks time", () => {
    const p = new SimplePendulum(1);
    p.step(0.1);
    p.step(0.2);
    expect(p.getTime()).toBeCloseTo(0.3, 5);
  });
});

describe("DoublePendulum", () => {
  it("initializes at rest", () => {
    const dp = new DoublePendulum(1, 1);
    expect(dp.angle1).toBe(0);
    expect(dp.angle2).toBe(0);
  });

  it("evolves when displaced", () => {
    const dp = new DoublePendulum(1, 1);
    dp.setAngles(Math.PI / 4, Math.PI / 3);
    const a1 = dp.angle1;
    for (let i = 0; i < 500; i++) dp.step(0.01);
    expect(Math.abs(dp.angle1 - a1)).toBeGreaterThan(0.01);
  });

  it("computes positions of both masses", () => {
    const dp = new DoublePendulum(1, 1);
    dp.setAngles(0, 0);
    const pos = dp.positions();
    expect(pos.p1.x).toBeCloseTo(0, 5);
    expect(pos.p1.y).toBeCloseTo(-1, 5);
    expect(pos.p2.x).toBeCloseTo(0, 5);
    expect(pos.p2.y).toBeCloseTo(-2, 5);
  });

  it("tracks time", () => {
    const dp = new DoublePendulum(1, 1);
    dp.step(0.01);
    dp.step(0.02);
    expect(dp.getTime()).toBeCloseTo(0.03, 5);
  });

  it("computes energy", () => {
    const dp = new DoublePendulum(1, 1);
    dp.setAngles(0.5, 0.3);
    expect(dp.energy()).not.toBe(0);
  });
});
