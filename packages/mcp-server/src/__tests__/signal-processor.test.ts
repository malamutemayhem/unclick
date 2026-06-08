import { describe, it, expect } from "vitest";
import { SignalProcessor } from "../signal-processor.js";

describe("SignalProcessor", () => {
  it("computes moving average", () => {
    const result = SignalProcessor.movingAverage([1, 2, 3, 4, 5], 3);
    expect(result[0]).toBe(1);
    expect(result[2]).toBe(2);
    expect(result[4]).toBe(4);
  });

  it("computes exponential moving average", () => {
    const result = SignalProcessor.exponentialMovingAverage([10, 20, 30], 0.5);
    expect(result[0]).toBe(10);
    expect(result[1]).toBe(15);
    expect(result[2]).toBeCloseTo(22.5);
  });

  it("normalizes data", () => {
    const result = SignalProcessor.normalize([0, 50, 100]);
    expect(result).toEqual([0, 0.5, 1]);
  });

  it("normalizes constant data", () => {
    const result = SignalProcessor.normalize([5, 5, 5]);
    expect(result).toEqual([0.5, 0.5, 0.5]);
  });

  it("detects peaks", () => {
    const peaks = SignalProcessor.peakDetection([0, 5, 0, 3, 0, 8, 0], 3);
    expect(peaks).toEqual([1, 3, 5]);
  });

  it("detects zero crossings", () => {
    const crossings = SignalProcessor.zeroCrossings([1, -1, 1, -1]);
    expect(crossings).toEqual([1, 2, 3]);
  });

  it("convolves two signals", () => {
    const result = SignalProcessor.convolve([1, 2, 3], [1, 1]);
    expect(result).toEqual([1, 3, 5, 3]);
  });

  it("computes cross correlation", () => {
    const result = SignalProcessor.crossCorrelation([1, 0, 0], [1, 0, 0]);
    expect(result[2]).toBe(1);
  });

  it("computes RMS", () => {
    expect(SignalProcessor.rms([3, 4])).toBeCloseTo(Math.sqrt(12.5), 5);
    expect(SignalProcessor.rms([])).toBe(0);
  });

  it("computes energy", () => {
    expect(SignalProcessor.energy([3, 4])).toBe(25);
  });

  it("computes autocorrelation", () => {
    const result = SignalProcessor.autocorrelation([1, 0, 1, 0], 2);
    expect(result[0]).toBe(2);
    expect(result[2]).toBe(1);
  });

  it("downsamples signal", () => {
    const result = SignalProcessor.downsample([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([1, 3, 5]);
  });

  it("upsamples signal", () => {
    const result = SignalProcessor.upsample([0, 10], 3);
    expect(result.length).toBe(4);
    expect(result[0]).toBe(0);
    expect(result[1]).toBeCloseTo(3.33, 1);
    expect(result[2]).toBeCloseTo(6.67, 1);
    expect(result[3]).toBe(10);
  });

  it("applies low and high pass filters", () => {
    const data = [0, 10, 0, 10, 0, 10];
    const low = SignalProcessor.lowPassFilter(data, 0.5);
    const high = SignalProcessor.highPassFilter(data, 0.5);
    for (let i = 0; i < data.length; i++) {
      expect(low[i] + high[i]).toBeCloseTo(data[i], 5);
    }
  });

  it("handles empty arrays", () => {
    expect(SignalProcessor.movingAverage([], 3)).toEqual([]);
    expect(SignalProcessor.normalize([])).toEqual([]);
    expect(SignalProcessor.exponentialMovingAverage([], 0.5)).toEqual([]);
  });
});
