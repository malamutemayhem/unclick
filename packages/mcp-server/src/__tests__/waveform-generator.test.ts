import { describe, it, expect } from "vitest";
import { WaveformGenerator } from "../waveform-generator.js";

describe("WaveformGenerator", () => {
  it("generates sine wave", () => {
    const wave = WaveformGenerator.sine(440, 44100, 0.01);
    expect(wave.length).toBe(441);
    expect(wave[0]).toBeCloseTo(0, 1);
    expect(Math.max(...wave)).toBeLessThanOrEqual(1);
    expect(Math.min(...wave)).toBeGreaterThanOrEqual(-1);
  });

  it("generates square wave", () => {
    const wave = WaveformGenerator.square(100, 1000, 0.01);
    expect(wave.length).toBe(10);
    for (const s of wave) {
      expect(Math.abs(s)).toBe(1);
    }
  });

  it("generates sawtooth wave", () => {
    const wave = WaveformGenerator.sawtooth(100, 1000, 0.01);
    expect(wave.length).toBe(10);
    expect(wave[0]).toBeCloseTo(-1, 1);
  });

  it("generates triangle wave", () => {
    const wave = WaveformGenerator.triangle(100, 1000, 0.01);
    expect(wave.length).toBe(10);
    expect(Math.max(...wave)).toBeLessThanOrEqual(1);
    expect(Math.min(...wave)).toBeGreaterThanOrEqual(-1);
  });

  it("generates noise", () => {
    const wave = WaveformGenerator.noise(1000, 0.01);
    expect(wave.length).toBe(10);
    const unique = new Set(wave);
    expect(unique.size).toBeGreaterThan(1);
  });

  it("generates pulse wave with duty cycle", () => {
    const wave = WaveformGenerator.pulse(100, 1000, 0.01, 0.25);
    expect(wave.length).toBe(10);
    const positives = wave.filter((s) => s > 0).length;
    const negatives = wave.filter((s) => s < 0).length;
    expect(positives).toBeLessThan(negatives);
  });

  it("mixes signals", () => {
    const a = [1, 1, 1, 1];
    const b = [-1, -1, -1, -1];
    const mixed = WaveformGenerator.mix([a, b]);
    mixed.forEach((s) => expect(s).toBeCloseTo(0));
  });

  it("mixes with custom weights", () => {
    const a = [1, 1];
    const b = [0, 0];
    const mixed = WaveformGenerator.mix([a, b], [0.8, 0.2]);
    expect(mixed[0]).toBeCloseTo(0.8);
  });

  it("amplifies with clipping", () => {
    const signal = [0.5, -0.5, 0.8];
    const amp = WaveformGenerator.amplify(signal, 2);
    expect(amp[0]).toBe(1);
    expect(amp[1]).toBe(-1);
    expect(amp[2]).toBe(1);
  });

  it("fades in", () => {
    const signal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const faded = WaveformGenerator.fadeIn(signal, 0.005, 1000);
    expect(faded[0]).toBeCloseTo(0);
    expect(faded[faded.length - 1]).toBe(1);
  });

  it("fades out", () => {
    const signal = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const faded = WaveformGenerator.fadeOut(signal, 0.005, 1000);
    expect(faded[0]).toBe(1);
    expect(faded[faded.length - 1]).toBeCloseTo(0, 0);
  });
});
