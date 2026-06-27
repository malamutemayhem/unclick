import { describe, it, expect } from "vitest";
import { Spectrogram } from "../spectrogram.js";

describe("Spectrogram", () => {
  const sineWave = Array.from({ length: 64 }, (_, i) =>
    Math.sin(2 * Math.PI * 8 * i / 64),
  );

  it("compute returns frames", () => {
    const frames = Spectrogram.compute(sineWave, 16, 8, 64);
    expect(frames.length).toBeGreaterThan(0);
    expect(frames[0].frequencies.length).toBeGreaterThan(0);
    expect(frames[0].magnitudes.length).toBe(frames[0].frequencies.length);
  });

  it("compute time increases across frames", () => {
    const frames = Spectrogram.compute(sineWave, 16, 8, 64);
    for (let i = 1; i < frames.length; i++) {
      expect(frames[i].time).toBeGreaterThan(frames[i - 1].time);
    }
  });

  it("hannWindow has zero at endpoints", () => {
    const windowed = Spectrogram.hannWindow([1, 1, 1, 1, 1]);
    expect(windowed[0]).toBe(0);
    expect(windowed[4]).toBe(0);
  });

  it("hannWindow peaks at center", () => {
    const windowed = Spectrogram.hannWindow([1, 1, 1, 1, 1]);
    expect(windowed[2]).toBe(1);
  });

  it("powerSpectralDensity returns correct length", () => {
    const psd = Spectrogram.powerSpectralDensity(sineWave, 16, 64);
    expect(psd.length).toBe(9);
  });

  it("powerSpectralDensity values are non-negative", () => {
    const psd = Spectrogram.powerSpectralDensity(sineWave, 16, 64);
    for (const v of psd) {
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });

  it("melSpectrogram returns mel bands", () => {
    const result = Spectrogram.melSpectrogram(sineWave, 16, 8, 64, 4);
    expect(result.times.length).toBeGreaterThan(0);
    expect(result.melBands.length).toBe(result.times.length);
    expect(result.melBands[0].length).toBe(4);
  });
});
