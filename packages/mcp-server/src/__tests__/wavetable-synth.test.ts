import { describe, it, expect } from "vitest";
import { Wavetable, WavetableOscillator, mixWavetables } from "../wavetable-synth.js";

describe("Wavetable", () => {
  it("creates sine wave", () => {
    const wt = Wavetable.sine(1024);
    expect(wt.size).toBe(1024);
    expect(Math.abs(wt.sample(0))).toBeLessThan(0.01);
    expect(Math.abs(wt.sample(0.25) - 1)).toBeLessThan(0.01);
    expect(Math.abs(wt.sample(0.75) + 1)).toBeLessThan(0.01);
  });

  it("creates square wave", () => {
    const wt = Wavetable.square(1024);
    expect(wt.sample(0.1)).toBeCloseTo(1);
    expect(wt.sample(0.6)).toBeCloseTo(-1);
  });

  it("creates triangle wave", () => {
    const wt = Wavetable.triangle(1024);
    expect(wt.sample(0)).toBeCloseTo(-1, 1);
    expect(wt.sample(0.25)).toBeCloseTo(0, 1);
    expect(wt.sample(0.5)).toBeCloseTo(1, 1);
  });

  it("creates sawtooth wave", () => {
    const wt = Wavetable.sawtooth(1024);
    expect(wt.sample(0)).toBeCloseTo(-1, 1);
    expect(wt.sample(0.5)).toBeCloseTo(0, 1);
  });

  it("fromHarmonics creates custom wave", () => {
    const wt = Wavetable.fromHarmonics([1, 0.5, 0.25]);
    expect(wt.size).toBe(2048);
    expect(wt.samples.some((s) => s !== 0)).toBe(true);
  });

  it("interpolates between samples", () => {
    const wt = Wavetable.sine(64);
    const s1 = wt.sample(0.123);
    const s2 = wt.sample(0.124);
    expect(Math.abs(s1 - s2)).toBeLessThan(0.1);
  });

  it("wraps phase correctly", () => {
    const wt = Wavetable.sine(1024);
    expect(Math.abs(wt.sample(0) - wt.sample(1))).toBeLessThan(0.01);
    expect(Math.abs(wt.sample(0.25) - wt.sample(1.25))).toBeLessThan(0.01);
  });

  it("normalize scales to [-1, 1]", () => {
    const wt = Wavetable.fromHarmonics([1, 1, 1]);
    wt.normalize();
    let max = 0;
    for (let i = 0; i < wt.size; i++) {
      if (Math.abs(wt.samples[i]) > max) max = Math.abs(wt.samples[i]);
    }
    expect(max).toBeCloseTo(1);
  });
});

describe("WavetableOscillator", () => {
  it("generates samples", () => {
    const osc = new WavetableOscillator(Wavetable.sine(), 440, 44100);
    const samples = osc.generate(100);
    expect(samples).toHaveLength(100);
  });

  it("tick advances phase", () => {
    const osc = new WavetableOscillator(Wavetable.sine(), 440, 44100);
    osc.tick();
    expect(osc.getPhase()).toBeGreaterThan(0);
  });

  it("setAmplitude scales output", () => {
    const osc = new WavetableOscillator(Wavetable.sine(), 440, 44100);
    osc.setAmplitude(0.5);
    const samples = osc.generate(1000);
    for (const s of samples) {
      expect(Math.abs(s)).toBeLessThanOrEqual(0.51);
    }
  });

  it("reset clears phase", () => {
    const osc = new WavetableOscillator(Wavetable.sine(), 440, 44100);
    osc.generate(100);
    osc.reset();
    expect(osc.getPhase()).toBe(0);
  });
});

describe("mixWavetables", () => {
  it("mix 0 returns first table", () => {
    const a = Wavetable.sine(64);
    const b = Wavetable.square(64);
    const mixed = mixWavetables(a, b, 0);
    expect(Math.abs(mixed.sample(0.25) - a.sample(0.25))).toBeLessThan(0.1);
  });

  it("mix 1 returns second table", () => {
    const a = Wavetable.sine(64);
    const b = Wavetable.square(64);
    const mixed = mixWavetables(a, b, 1);
    expect(Math.abs(mixed.sample(0.25) - b.sample(0.25))).toBeLessThan(0.1);
  });
});
