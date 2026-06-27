import { describe, it, expect } from "vitest";
import { SpringAnimation } from "../spring-animation.js";

describe("SpringAnimation", () => {
  const config = { stiffness: 200, damping: 20, mass: 1 };

  it("simulate returns states", () => {
    const states = SpringAnimation.simulate(config, 1, { position: 0, velocity: 0 }, 1);
    expect(states.length).toBeGreaterThan(1);
  });

  it("simulate approaches target", () => {
    const states = SpringAnimation.simulate(config, 5, { position: 0, velocity: 0 }, 3);
    const last = states[states.length - 1];
    expect(last.position).toBeCloseTo(5, 0);
  });

  it("isSettled detects settled state", () => {
    const states = SpringAnimation.simulate(config, 1, { position: 0, velocity: 0 }, 5);
    expect(SpringAnimation.isSettled(states, 1, 0.1)).toBe(true);
  });

  it("settleTime returns finite duration", () => {
    const time = SpringAnimation.settleTime(config, 1, 0.01, 5);
    expect(time).toBeGreaterThan(0);
    expect(time).toBeLessThan(5);
  });

  it("criticalDamping computes correctly", () => {
    const cd = SpringAnimation.criticalDamping(100, 1);
    expect(cd).toBe(20);
  });

  it("naturalFrequency computes correctly", () => {
    const freq = SpringAnimation.naturalFrequency(100, 1);
    expect(freq).toBe(10);
  });

  it("dampingRatio detects underdamped", () => {
    const ratio = SpringAnimation.dampingRatio({ stiffness: 100, damping: 10, mass: 1 });
    expect(ratio).toBeLessThan(1);
  });

  it("dampingRatio detects critically damped", () => {
    const ratio = SpringAnimation.dampingRatio({ stiffness: 100, damping: 20, mass: 1 });
    expect(ratio).toBe(1);
  });

  it("dampingRatio detects overdamped", () => {
    const ratio = SpringAnimation.dampingRatio({ stiffness: 100, damping: 30, mass: 1 });
    expect(ratio).toBeGreaterThan(1);
  });

  it("presets exist", () => {
    expect(SpringAnimation.presets.gentle.stiffness).toBeGreaterThan(0);
    expect(SpringAnimation.presets.wobbly.damping).toBeGreaterThan(0);
  });
});
