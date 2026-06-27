import { describe, it, expect } from "vitest";
import { NoiseGenerator } from "../noise-generator.js";

describe("NoiseGenerator", () => {
  it("white noise has correct length", () => {
    const noise = NoiseGenerator.white(100);
    expect(noise.length).toBe(100);
  });

  it("white noise is bounded by amplitude", () => {
    const noise = NoiseGenerator.white(1000, 2);
    for (const v of noise) {
      expect(v).toBeGreaterThanOrEqual(-2);
      expect(v).toBeLessThanOrEqual(2);
    }
  });

  it("gaussian noise has correct length", () => {
    const noise = NoiseGenerator.gaussian(100);
    expect(noise.length).toBe(100);
  });

  it("gaussian noise has approximately correct mean", () => {
    const noise = NoiseGenerator.gaussian(10000, 5, 1);
    const mean = noise.reduce((s, v) => s + v, 0) / noise.length;
    expect(mean).toBeCloseTo(5, 0);
  });

  it("pink noise has correct length", () => {
    const noise = NoiseGenerator.pink(100);
    expect(noise.length).toBe(100);
  });

  it("brown noise has correct length", () => {
    const noise = NoiseGenerator.brown(100);
    expect(noise.length).toBe(100);
    expect(noise[0]).toBe(0);
  });

  it("brown noise is a random walk", () => {
    const noise = NoiseGenerator.brown(100, 0.01);
    for (let i = 1; i < noise.length; i++) {
      expect(Math.abs(noise[i] - noise[i - 1])).toBeLessThanOrEqual(0.01 + 0.001);
    }
  });

  it("addNoise adds noise at specified SNR", () => {
    const signal = Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1));
    const noisy = NoiseGenerator.addNoise(signal, 20);
    expect(noisy.length).toBe(signal.length);
    const diff = signal.some((v, i) => v !== noisy[i]);
    expect(diff).toBe(true);
  });

  it("snr measures signal-to-noise ratio", () => {
    const signal = Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1));
    const snr = NoiseGenerator.snr(signal, signal);
    expect(snr).toBe(Infinity);
  });
});
