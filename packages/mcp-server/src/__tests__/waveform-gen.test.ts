import { describe, it, expect } from "vitest";
import { WaveformGenerator } from "../waveform-gen.js";

describe("WaveformGenerator", () => {
  it("generates sine wave", () => {
    const signal = WaveformGenerator.generate("sine", 440, 44100, 0.01);
    expect(signal.length).toBe(441);
    expect(signal[0]).toBeCloseTo(0, 5);
  });

  it("generates square wave with correct range", () => {
    const signal = WaveformGenerator.generate("square", 100, 1000, 0.01);
    for (const s of signal) {
      expect(Math.abs(s)).toBeCloseTo(1, 5);
    }
  });

  it("generates sawtooth wave", () => {
    const signal = WaveformGenerator.generate("sawtooth", 100, 1000, 0.01);
    expect(signal.length).toBe(10);
  });

  it("generates triangle wave", () => {
    const signal = WaveformGenerator.generate("triangle", 100, 1000, 0.01);
    expect(Math.max(...signal.map(Math.abs))).toBeLessThanOrEqual(1);
  });

  it("applies amplitude", () => {
    const signal = WaveformGenerator.generate("sine", 100, 1000, 0.01, 0.5);
    expect(Math.max(...signal.map(Math.abs))).toBeLessThanOrEqual(0.5 + 0.01);
  });

  it("mixes signals", () => {
    const a = [1, 1, 1];
    const b = [0.5, 0.5, 0.5];
    const mixed = WaveformGenerator.mix([a, b]);
    expect(mixed[0]).toBeCloseTo(0.75);
  });

  it("normalizes signal", () => {
    const signal = [0.5, -1, 0.3];
    const normalized = WaveformGenerator.normalize(signal);
    expect(Math.max(...normalized.map(Math.abs))).toBeCloseTo(1);
  });

  it("calculates RMS", () => {
    const signal = [1, -1, 1, -1];
    expect(WaveformGenerator.rms(signal)).toBeCloseTo(1);
  });

  it("calculates peak", () => {
    expect(WaveformGenerator.peak([0.3, -0.8, 0.5])).toBeCloseTo(0.8);
  });

  it("counts zero crossings", () => {
    expect(WaveformGenerator.zeroCrossings([1, -1, 1, -1])).toBe(3);
  });

  it("applies fade in", () => {
    const signal = [1, 1, 1, 1];
    const faded = WaveformGenerator.fadeIn(signal, 2);
    expect(faded[0]).toBe(0);
    expect(faded[1]).toBe(0.5);
    expect(faded[2]).toBe(1);
  });

  it("applies fade out", () => {
    const signal = [1, 1, 1, 1];
    const faded = WaveformGenerator.fadeOut(signal, 2);
    expect(faded[3]).toBe(0.5);
  });
});
