import { describe, it, expect } from "vitest";
import { WavePropagation } from "../wave-propagation.js";

describe("WavePropagation", () => {
  it("constructor creates zero grid", () => {
    const wave = new WavePropagation(10, 10);
    expect(wave.totalEnergy()).toBe(0);
  });

  it("disturb adds amplitude", () => {
    const wave = new WavePropagation(10, 10);
    wave.disturb(5, 5, 1);
    expect(wave.getAmplitude(5, 5)).toBe(1);
  });

  it("step propagates wave", () => {
    const wave = new WavePropagation(10, 10, 1);
    wave.disturb(5, 5, 10);
    wave.step(0.5);
    wave.step(0.5);
    const neighbors =
      Math.abs(wave.getAmplitude(4, 5)) +
      Math.abs(wave.getAmplitude(6, 5)) +
      Math.abs(wave.getAmplitude(5, 4)) +
      Math.abs(wave.getAmplitude(5, 6));
    expect(neighbors).toBeGreaterThan(0);
  });

  it("totalEnergy increases with disturbance", () => {
    const wave = new WavePropagation(10, 10);
    wave.disturb(5, 5, 5);
    expect(wave.totalEnergy()).toBeGreaterThan(0);
  });

  it("maxAmplitude tracks peak", () => {
    const wave = new WavePropagation(10, 10);
    wave.disturb(3, 3, 7);
    wave.disturb(7, 7, -3);
    expect(wave.maxAmplitude()).toBe(7);
  });

  it("snapshot returns copy of current state", () => {
    const wave = new WavePropagation(5, 5);
    wave.disturb(2, 2, 1);
    const snap = wave.snapshot();
    expect(snap[2][2]).toBe(1);
    snap[2][2] = 99;
    expect(wave.getAmplitude(2, 2)).toBe(1);
  });

  it("damping reduces energy over time", () => {
    const wave = new WavePropagation(10, 10, 0.95);
    wave.disturb(5, 5, 10);
    const e0 = wave.totalEnergy();
    for (let i = 0; i < 20; i++) wave.step(0.5);
    expect(wave.totalEnergy()).toBeLessThan(e0);
  });

  it("addCircularWave creates disturbance", () => {
    const wave = new WavePropagation(20, 20);
    wave.addCircularWave(10, 10, 5, 2);
    expect(wave.totalEnergy()).toBeGreaterThan(0);
  });
});
