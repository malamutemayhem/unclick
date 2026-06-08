import { describe, it, expect } from "vitest";
import {
  dft, idft, magnitude, phase, convolve, crossCorrelate,
  movingAverage, generateSine, rms, zeroCrossings,
} from "../signal-processing.js";

describe("dft/idft", () => {
  it("roundtrips through DFT and IDFT", () => {
    const signal = [1, 2, 3, 4];
    const { real, imag } = dft(signal);
    const recovered = idft(real, imag);
    for (let i = 0; i < signal.length; i++) {
      expect(recovered[i]).toBeCloseTo(signal[i]);
    }
  });

  it("detects DC component", () => {
    const signal = [5, 5, 5, 5];
    const { real, imag } = dft(signal);
    expect(real[0]).toBeCloseTo(20);
    expect(imag[0]).toBeCloseTo(0);
  });
});

describe("magnitude", () => {
  it("computes magnitude spectrum", () => {
    const mag = magnitude([3, 0], [4, 0]);
    expect(mag[0]).toBeCloseTo(5);
    expect(mag[1]).toBe(0);
  });
});

describe("phase", () => {
  it("computes phase angles", () => {
    const p = phase([1, 0], [0, 1]);
    expect(p[0]).toBeCloseTo(0);
    expect(p[1]).toBeCloseTo(Math.PI / 2);
  });
});

describe("convolve", () => {
  it("convolves two signals", () => {
    const result = convolve([1, 2, 3], [1, 1]);
    expect(result).toEqual([1, 3, 5, 3]);
  });

  it("identity convolution", () => {
    const result = convolve([1, 2, 3], [1]);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("crossCorrelate", () => {
  it("correlates identical signals", () => {
    const result = crossCorrelate([1, 0, 1], [1, 0, 1]);
    const max = Math.max(...result);
    expect(max).toBe(2);
  });
});

describe("movingAverage", () => {
  it("smooths a signal", () => {
    const result = movingAverage([1, 2, 3, 4, 5], 3);
    expect(result[0]).toBeCloseTo(2);
    expect(result[1]).toBeCloseTo(3);
    expect(result[2]).toBeCloseTo(4);
  });
});

describe("generateSine", () => {
  it("generates correct number of samples", () => {
    const sine = generateSine(440, 44100, 0.01);
    expect(sine).toHaveLength(441);
  });

  it("starts at zero", () => {
    const sine = generateSine(100, 1000, 0.1);
    expect(sine[0]).toBeCloseTo(0);
  });
});

describe("rms", () => {
  it("computes RMS of constant signal", () => {
    expect(rms([3, 3, 3])).toBeCloseTo(3);
  });

  it("returns 0 for empty signal", () => {
    expect(rms([])).toBe(0);
  });
});

describe("zeroCrossings", () => {
  it("counts zero crossings", () => {
    expect(zeroCrossings([1, -1, 1, -1])).toBe(3);
  });

  it("returns 0 for constant signal", () => {
    expect(zeroCrossings([1, 1, 1])).toBe(0);
  });
});
