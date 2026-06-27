import { describe, it, expect } from "vitest";
import { generateWave, mixSignals, applyEnvelope, normalize, rms, lowPassFilter, highPassFilter, delay } from "../audio-synth.js";

describe("generateWave", () => {
  it("sine wave has correct sample count", () => {
    const samples = generateWave("sine", 440, 44100, 0.1);
    expect(samples.length).toBe(4410);
  });

  it("sine wave values between -1 and 1", () => {
    const samples = generateWave("sine", 440, 44100, 0.01);
    for (let i = 0; i < samples.length; i++) {
      expect(samples[i]).toBeGreaterThanOrEqual(-1);
      expect(samples[i]).toBeLessThanOrEqual(1);
    }
  });

  it("square wave has values at -1 and 1", () => {
    const samples = generateWave("square", 100, 1000, 0.01);
    for (let i = 0; i < samples.length; i++) {
      expect(Math.abs(samples[i])).toBeCloseTo(1, 5);
    }
  });

  it("triangle wave peaks at 1", () => {
    const samples = generateWave("triangle", 100, 10000, 0.01);
    let max = 0;
    for (let i = 0; i < samples.length; i++) {
      if (Math.abs(samples[i]) > max) max = Math.abs(samples[i]);
    }
    expect(max).toBeCloseTo(1, 1);
  });

  it("sawtooth wave ranges from -1 to 1", () => {
    const samples = generateWave("sawtooth", 100, 10000, 0.02);
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < samples.length; i++) {
      if (samples[i] < min) min = samples[i];
      if (samples[i] > max) max = samples[i];
    }
    expect(max).toBeGreaterThan(0.9);
    expect(min).toBeLessThan(-0.9);
  });
});

describe("mixSignals", () => {
  it("mixes two signals", () => {
    const a = new Float64Array([1, 0, -1]);
    const b = new Float64Array([0, 1, 1]);
    const mixed = mixSignals([a, b]);
    expect(mixed[0]).toBe(1);
    expect(mixed[1]).toBe(1);
    expect(mixed[2]).toBe(0);
  });

  it("applies gains", () => {
    const a = new Float64Array([1, 1]);
    const mixed = mixSignals([a], [0.5]);
    expect(mixed[0]).toBeCloseTo(0.5);
  });
});

describe("applyEnvelope", () => {
  it("starts at zero and builds up", () => {
    const signal = new Float64Array(1000).fill(1);
    const env = applyEnvelope(signal, 0.1, 0.1, 0.5, 0.1, 1000);
    expect(env[0]).toBeCloseTo(0, 2);
    expect(env[50]).toBeGreaterThan(0);
  });
});

describe("normalize", () => {
  it("normalizes peak to 1", () => {
    const signal = new Float64Array([0.5, -0.25, 0.1]);
    const norm = normalize(signal);
    expect(norm[0]).toBeCloseTo(1);
    expect(norm[1]).toBeCloseTo(-0.5);
  });
});

describe("rms", () => {
  it("computes rms of constant signal", () => {
    const signal = new Float64Array([3, 3, 3]);
    expect(rms(signal)).toBeCloseTo(3);
  });

  it("returns 0 for empty signal", () => {
    expect(rms(new Float64Array(0))).toBe(0);
  });
});

describe("lowPassFilter", () => {
  it("attenuates high frequencies", () => {
    const high = generateWave("sine", 5000, 44100, 0.01);
    const filtered = lowPassFilter(high, 500, 44100);
    expect(rms(filtered)).toBeLessThan(rms(high));
  });
});

describe("delay", () => {
  it("adds delayed signal", () => {
    const signal = new Float64Array(20).fill(0);
    signal[0] = 1;
    const delayed = delay(signal, 5, 0.5, 1);
    expect(delayed[5]).toBeGreaterThan(0);
  });
});
