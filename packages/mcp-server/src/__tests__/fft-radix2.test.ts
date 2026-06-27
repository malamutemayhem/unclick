import { describe, it, expect } from "vitest";
import { FFTRadix2 } from "../fft-radix2.js";

describe("FFTRadix2", () => {
  it("fft and ifft are inverses", () => {
    const real = [1, 2, 3, 4];
    const imag = [0, 0, 0, 0];
    const { real: fReal, imag: fImag } = FFTRadix2.fft(real, imag);
    const { real: iReal } = FFTRadix2.ifft(fReal, fImag);
    for (let i = 0; i < 4; i++) {
      expect(iReal[i]).toBeCloseTo(real[i], 8);
    }
  });

  it("DC component is sum", () => {
    const real = [1, 2, 3, 4];
    const imag = [0, 0, 0, 0];
    const result = FFTRadix2.fft(real, imag);
    expect(result.real[0]).toBeCloseTo(10, 8);
  });

  it("pure sine wave has peak at frequency", () => {
    const n = 8;
    const real = Array.from({ length: n }, (_, i) => Math.sin(2 * Math.PI * i / n));
    const imag = new Array(n).fill(0);
    const result = FFTRadix2.fft(real, imag);
    const mag = FFTRadix2.magnitude(result.real, result.imag);
    expect(mag[1]).toBeGreaterThan(mag[0]);
    expect(mag[1]).toBeGreaterThan(mag[2]);
  });

  it("magnitude computes correctly", () => {
    expect(FFTRadix2.magnitude([3], [4])[0]).toBeCloseTo(5, 8);
  });

  it("powerSpectrum is magnitude squared", () => {
    expect(FFTRadix2.powerSpectrum([3], [4])[0]).toBeCloseTo(25, 8);
  });

  it("nextPowerOf2 rounds up", () => {
    expect(FFTRadix2.nextPowerOf2(5)).toBe(8);
    expect(FFTRadix2.nextPowerOf2(8)).toBe(8);
    expect(FFTRadix2.nextPowerOf2(1)).toBe(1);
  });

  it("single element fft", () => {
    const result = FFTRadix2.fft([5], [0]);
    expect(result.real[0]).toBe(5);
  });
});
