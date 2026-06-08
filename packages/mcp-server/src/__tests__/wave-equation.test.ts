import { describe, it, expect } from "vitest";
import { WaveEquation1D, HeatEquation1D } from "../wave-equation.js";

describe("WaveEquation1D", () => {
  it("initializes with zero values", () => {
    const wave = new WaveEquation1D(100, 1);
    expect(wave.gridSize()).toBe(100);
    expect(wave.getValue(50)).toBe(0);
  });

  it("sets gaussian pulse", () => {
    const wave = new WaveEquation1D(100, 1, 1);
    wave.setGaussianPulse(50, 5, 1);
    expect(wave.getValue(50)).toBeCloseTo(1, 1);
    expect(wave.getValue(0)).toBeCloseTo(0, 1);
  });

  it("propagates the wave", () => {
    const wave = new WaveEquation1D(100, 1, 1);
    wave.setGaussianPulse(50, 3, 1);
    const initial = wave.getValue(50);
    for (let i = 0; i < 20; i++) wave.step(0.1);
    expect(wave.getValue(50)).not.toBeCloseTo(initial, 1);
  });

  it("tracks time", () => {
    const wave = new WaveEquation1D(100, 1);
    wave.step(0.1);
    wave.step(0.2);
    expect(wave.getTime()).toBeCloseTo(0.3, 5);
  });

  it("returns all values", () => {
    const wave = new WaveEquation1D(50, 1);
    const vals = wave.getValues();
    expect(vals.length).toBe(50);
  });

  it("computes max amplitude", () => {
    const wave = new WaveEquation1D(100, 1, 1);
    wave.setGaussianPulse(50, 5, 2);
    expect(wave.maxAmplitude()).toBeCloseTo(2, 0);
  });

  it("fixed boundary conditions zero at edges", () => {
    const wave = new WaveEquation1D(100, 1, 1);
    wave.setGaussianPulse(50, 5, 1);
    wave.step(0.1);
    expect(wave.getValue(0)).toBe(0);
    expect(wave.getValue(99)).toBe(0);
  });
});

describe("HeatEquation1D", () => {
  it("initializes grid", () => {
    const heat = new HeatEquation1D(50, 0.1);
    expect(heat.gridSize()).toBe(50);
  });

  it("sets hot spot", () => {
    const heat = new HeatEquation1D(100, 0.1, 1);
    heat.setHotSpot(50, 5, 100);
    expect(heat.maxTemperature()).toBeCloseTo(100, 0);
  });

  it("diffuses heat over time", () => {
    const heat = new HeatEquation1D(100, 0.1, 1);
    heat.setHotSpot(50, 3, 100);
    const maxBefore = heat.maxTemperature();
    for (let i = 0; i < 50; i++) heat.step(0.1);
    expect(heat.maxTemperature()).toBeLessThan(maxBefore);
  });

  it("tracks average temperature", () => {
    const heat = new HeatEquation1D(100, 0.1, 1);
    heat.setHotSpot(50, 5, 100);
    expect(heat.averageTemperature()).toBeGreaterThan(0);
  });

  it("tracks time", () => {
    const heat = new HeatEquation1D(50, 0.1);
    heat.step(0.1);
    expect(heat.getTime()).toBeCloseTo(0.1, 5);
  });
});
