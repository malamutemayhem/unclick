import { describe, it, expect } from "vitest";
import { FFT } from "../fft.js";

describe("FFT", () => {
  it("transform of constant signal has DC component only", () => {
    const { real, imag } = FFT.transform([1, 1, 1, 1]);
    expect(real[0]).toBe(4);
    expect(imag[0]).toBe(0);
    for (let i = 1; i < 4; i++) {
      expect(Math.abs(real[i])).toBeLessThan(0.001);
      expect(Math.abs(imag[i])).toBeLessThan(0.001);
    }
  });

  it("inverse recovers original signal", () => {
    const signal = [1, 2, 3, 4];
    const { real, imag } = FFT.transform(signal);
    const recovered = FFT.inverse(real, imag);
    for (let i = 0; i < signal.length; i++) {
      expect(recovered[i]).toBeCloseTo(signal[i], 2);
    }
  });

  it("magnitudeSpectrum has correct length", () => {
    const mag = FFT.magnitudeSpectrum([1, 0, -1, 0]);
    expect(mag.length).toBe(4);
  });

  it("powerSpectrum has correct length", () => {
    const pow = FFT.powerSpectrum([1, 2, 3, 4]);
    expect(pow.length).toBe(4);
  });

  it("frequencyBins returns half spectrum", () => {
    const bins = FFT.frequencyBins([1, 0, -1, 0], 100);
    expect(bins.length).toBe(3);
    expect(bins[0].frequency).toBe(0);
  });

  it("dominantFrequency detects sine wave", () => {
    const sampleRate = 64;
    const freq = 8;
    const signal = Array.from({ length: sampleRate }, (_, i) =>
      Math.sin(2 * Math.PI * freq * i / sampleRate),
    );
    const dominant = FFT.dominantFrequency(signal, sampleRate);
    expect(dominant).toBe(8);
  });

  it("spectralCentroid returns a valid frequency", () => {
    const signal = [1, 0, -1, 0, 1, 0, -1, 0];
    const centroid = FFT.spectralCentroid(signal, 8);
    expect(centroid).toBeGreaterThanOrEqual(0);
    expect(centroid).toBeLessThanOrEqual(4);
  });

  it("transform of alternating signal peaks at Nyquist", () => {
    const { real } = FFT.transform([1, -1, 1, -1]);
    expect(Math.abs(real[2])).toBe(4);
  });
});
