import { describe, it, expect } from "vitest";
import { FrequencyAnalyzer } from "../frequency-analyzer.js";

describe("FrequencyAnalyzer", () => {
  it("computes DFT of simple signal", () => {
    const signal = [1, 0, -1, 0]; // simple periodic
    const spectrum = FrequencyAnalyzer.dft(signal);
    expect(spectrum.length).toBe(4);
    expect(spectrum[0].magnitude).toBeCloseTo(0, 5);
    expect(spectrum[1].magnitude).toBeCloseTo(2, 5);
  });

  it("inverse DFT reconstructs signal", () => {
    const signal = [1, 2, 3, 4];
    const spectrum = FrequencyAnalyzer.dft(signal);
    const reconstructed = FrequencyAnalyzer.inverseDft(spectrum);
    for (let i = 0; i < signal.length; i++) {
      expect(reconstructed[i]).toBeCloseTo(signal[i], 5);
    }
  });

  it("computes magnitude spectrum", () => {
    const signal = [1, 0, 0, 0];
    const mag = FrequencyAnalyzer.magnitudeSpectrum(signal);
    expect(mag.length).toBe(4);
    expect(mag[0]).toBeCloseTo(1, 5);
  });

  it("computes power spectrum", () => {
    const signal = [1, 0, 0, 0];
    const power = FrequencyAnalyzer.powerSpectrum(signal);
    expect(power.length).toBe(4);
  });

  it("finds dominant frequency", () => {
    const sampleRate = 100;
    const freq = 10;
    const signal: number[] = [];
    for (let i = 0; i < 100; i++) {
      signal.push(Math.sin(2 * Math.PI * freq * i / sampleRate));
    }
    const dominant = FrequencyAnalyzer.dominantFrequency(signal, sampleRate);
    expect(dominant).toBeCloseTo(freq, 0);
  });

  it("computes spectral centroid", () => {
    const sampleRate = 100;
    const signal: number[] = [];
    for (let i = 0; i < 100; i++) {
      signal.push(Math.sin(2 * Math.PI * 10 * i / sampleRate));
    }
    const centroid = FrequencyAnalyzer.spectralCentroid(signal, sampleRate);
    expect(centroid).toBeGreaterThan(0);
  });

  it("computes bandwidth", () => {
    const sampleRate = 100;
    const signal: number[] = [];
    for (let i = 0; i < 100; i++) {
      signal.push(Math.sin(2 * Math.PI * 10 * i / sampleRate));
    }
    const bw = FrequencyAnalyzer.bandwidth(signal, sampleRate);
    expect(bw).toBeGreaterThanOrEqual(0);
  });

  it("converts note to frequency", () => {
    expect(FrequencyAnalyzer.noteToFrequency(69)).toBeCloseTo(440, 1);
    expect(FrequencyAnalyzer.noteToFrequency(60)).toBeCloseTo(261.63, 0);
  });

  it("converts frequency to note", () => {
    expect(FrequencyAnalyzer.frequencyToNote(440)).toBe(69);
    expect(FrequencyAnalyzer.frequencyToNote(261.63)).toBe(60);
  });
});
