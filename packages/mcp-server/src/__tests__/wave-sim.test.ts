import { describe, it, expect } from "vitest";
import {
  createWave, disturb, gaussianPulse, step, stepN,
  getAmplitude, getEnergy, getMaxAmplitude, toAscii,
  standingWave, superpose,
} from "../wave-sim.js";

describe("createWave", () => {
  it("creates flat wave", () => {
    const w = createWave(100);
    expect(w.width).toBe(100);
    expect(getEnergy(w)).toBe(0);
  });
});

describe("disturb", () => {
  it("sets amplitude at position", () => {
    const w = createWave(50);
    disturb(w, 25, 5);
    expect(getAmplitude(w, 25)).toBe(5);
  });

  it("ignores out of bounds", () => {
    const w = createWave(10);
    disturb(w, -1, 5);
    expect(getEnergy(w)).toBe(0);
  });
});

describe("gaussianPulse", () => {
  it("creates bell-shaped pulse", () => {
    const w = createWave(100);
    gaussianPulse(w, 50, 10, 5);
    expect(getAmplitude(w, 50)).toBeCloseTo(10);
    expect(getAmplitude(w, 0)).toBeCloseTo(0, 0);
  });
});

describe("step", () => {
  it("propagates disturbance", () => {
    const w = createWave(50, 1, 0.5);
    disturb(w, 25, 10);
    step(w);
    expect(getAmplitude(w, 25)).not.toBe(10);
    expect(getEnergy(w)).toBeGreaterThan(0);
  });
});

describe("stepN", () => {
  it("runs multiple steps", () => {
    const w = createWave(100, 0.95, 0.3);
    gaussianPulse(w, 50, 5, 5);
    stepN(w, 50);
    expect(getEnergy(w)).toBeGreaterThan(0);
    expect(getMaxAmplitude(w)).toBeLessThan(10);
  });
});

describe("getMaxAmplitude", () => {
  it("finds peak", () => {
    const w = createWave(50);
    disturb(w, 10, 7);
    disturb(w, 20, -3);
    expect(getMaxAmplitude(w)).toBe(7);
  });
});

describe("toAscii", () => {
  it("renders wave", () => {
    const w = createWave(20);
    disturb(w, 10, 5);
    const ascii = toAscii(w, 5);
    expect(ascii.split("\n").length).toBe(5);
  });
});

describe("standingWave", () => {
  it("creates standing wave pattern", () => {
    const w = createWave(101);
    standingWave(w, 1, 5);
    expect(getAmplitude(w, 0)).toBeCloseTo(0);
    expect(Math.abs(getAmplitude(w, 50))).toBeGreaterThan(4);
  });
});

describe("superpose", () => {
  it("adds two waves", () => {
    const a = createWave(50);
    const b = createWave(50);
    disturb(a, 10, 3);
    disturb(b, 10, 4);
    const combined = superpose(a, b);
    expect(getAmplitude(combined, 10)).toBeCloseTo(7);
  });
});
