import { describe, it, expect } from "vitest";
import { AudioProcessor } from "../audio-processor.js";

describe("AudioProcessor", () => {
  it("normalize scales to -1 to 1", () => {
    const result = AudioProcessor.normalize([0, 5, -5, 2]);
    expect(Math.max(...result)).toBe(1);
    expect(Math.min(...result)).toBe(-1);
  });

  it("normalize handles zero signal", () => {
    const result = AudioProcessor.normalize([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("rms computes root mean square", () => {
    expect(AudioProcessor.rms([1, -1, 1, -1])).toBe(1);
  });

  it("dbFromAmplitude converts correctly", () => {
    expect(AudioProcessor.dbFromAmplitude(1)).toBe(0);
    expect(AudioProcessor.dbFromAmplitude(0.5)).toBeCloseTo(-6.0206, 2);
  });

  it("amplitudeFromDb converts back", () => {
    expect(AudioProcessor.amplitudeFromDb(0)).toBe(1);
    expect(AudioProcessor.amplitudeFromDb(-6)).toBeCloseTo(0.5012, 2);
  });

  it("zeroCrossingRate counts crossings", () => {
    const signal = [1, -1, 1, -1, 1];
    expect(AudioProcessor.zeroCrossingRate(signal)).toBe(1);
  });

  it("energy sums squared values", () => {
    expect(AudioProcessor.energy([1, 2, 3])).toBe(14);
  });

  it("envelope tracks amplitude", () => {
    const signal = [0, 0, 5, 0, 0];
    const env = AudioProcessor.envelope(signal, 3);
    expect(env[2]).toBe(5);
    expect(env.length).toBe(signal.length);
  });

  it("fadeIn ramps up from zero", () => {
    const signal = [1, 1, 1, 1, 1];
    const faded = AudioProcessor.fadeIn(signal, 3);
    expect(faded[0]).toBe(0);
    expect(faded[4]).toBe(1);
  });

  it("fadeOut ramps down to zero", () => {
    const signal = [1, 1, 1, 1, 1];
    const faded = AudioProcessor.fadeOut(signal, 3);
    expect(faded[0]).toBe(1);
    expect(faded[4]).toBe(0);
  });

  it("mix combines signals", () => {
    const result = AudioProcessor.mix([[1, 0], [0, 1]], [0.5, 0.5]);
    expect(result[0]).toBe(0.5);
    expect(result[1]).toBe(0.5);
  });

  it("clip limits amplitude", () => {
    const result = AudioProcessor.clip([2, -2, 0.5], 1);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(-1);
    expect(result[2]).toBe(0.5);
  });

  it("autocorrelation peaks at zero lag", () => {
    const signal = [1, 0, -1, 0, 1];
    const ac = AudioProcessor.autocorrelation(signal);
    expect(ac[0]).toBeGreaterThanOrEqual(ac[1]);
  });
});
