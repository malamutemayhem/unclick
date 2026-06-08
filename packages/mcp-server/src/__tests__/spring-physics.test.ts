import { describe, it, expect } from "vitest";
import {
  createSpring, stepSpring, isAtRest, createSpring2D, stepSpring2D,
  simulate, criticalDamping, naturalFrequency, dampingRatio,
} from "../spring-physics.js";

describe("createSpring / stepSpring", () => {
  it("creates spring at origin", () => {
    const s = createSpring({ stiffness: 100, damping: 10 }, 1);
    expect(s.position).toBe(0);
    expect(s.velocity).toBe(0);
    expect(s.target).toBe(1);
  });

  it("moves toward target", () => {
    const config = { stiffness: 100, damping: 10 };
    let s = createSpring(config, 1);
    for (let i = 0; i < 100; i++) s = stepSpring(s, config, 1 / 60);
    expect(s.position).toBeCloseTo(1, 1);
  });

  it("eventually comes to rest", () => {
    const config = { stiffness: 100, damping: 20 };
    let s = createSpring(config, 5);
    for (let i = 0; i < 1000; i++) s = stepSpring(s, config, 1 / 60);
    expect(isAtRest(s)).toBe(true);
  });
});

describe("spring2D", () => {
  it("moves in 2D toward target", () => {
    const config = { stiffness: 100, damping: 15 };
    let s = createSpring2D(10, 10);
    for (let i = 0; i < 500; i++) s = stepSpring2D(s, config, 1 / 60);
    expect(s.x).toBeCloseTo(10, 0);
    expect(s.y).toBeCloseTo(10, 0);
  });
});

describe("simulate", () => {
  it("returns trajectory", () => {
    const result = simulate({ stiffness: 100, damping: 10 }, 1, 1, 1 / 60);
    expect(result.length).toBeGreaterThan(50);
    expect(result[0].position).toBe(0);
  });
});

describe("utility functions", () => {
  it("calculates critical damping", () => {
    const cd = criticalDamping(100);
    expect(cd).toBeCloseTo(20);
  });

  it("calculates natural frequency", () => {
    const freq = naturalFrequency(100);
    expect(freq).toBe(10);
  });

  it("calculates damping ratio", () => {
    const ratio = dampingRatio({ stiffness: 100, damping: 20 });
    expect(ratio).toBeCloseTo(1);
  });

  it("underdamped has ratio < 1", () => {
    const ratio = dampingRatio({ stiffness: 100, damping: 5 });
    expect(ratio).toBeLessThan(1);
  });
});
