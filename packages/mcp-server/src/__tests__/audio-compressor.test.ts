import { describe, it, expect } from "vitest";
import { AudioCompressor } from "../audio-compressor.js";

describe("AudioCompressor", () => {
  it("converts between dB and linear", () => {
    expect(AudioCompressor.linearToDb(1)).toBeCloseTo(0);
    expect(AudioCompressor.dbToLinear(0)).toBeCloseTo(1);
    expect(AudioCompressor.linearToDb(0.5)).toBeCloseTo(-6, 0);
    expect(AudioCompressor.dbToLinear(-6)).toBeCloseTo(0.5, 1);
  });

  it("processes signal without exceeding threshold", () => {
    const comp = new AudioCompressor({ threshold: 0, ratio: 4 });
    const signal = [0.1, 0.2, 0.1];
    const result = comp.process(signal, 44100);
    expect(result).toHaveLength(3);
    for (let i = 0; i < result.length; i++) {
      expect(Math.abs(result[i])).toBeLessThanOrEqual(Math.abs(signal[i]) + 0.01);
    }
  });

  it("reduces loud signals", () => {
    const comp = new AudioCompressor({ threshold: -20, ratio: 10, attack: 0.0001 });
    const loud = Array.from({ length: 100 }, () => 1);
    const result = comp.process(loud, 44100);
    const lastSample = Math.abs(result[result.length - 1]);
    expect(lastSample).toBeLessThan(1);
  });

  it("applies makeup gain", () => {
    const comp = new AudioCompressor({ threshold: -60, ratio: 1, makeupGain: 6 });
    const signal = [0.5];
    const result = comp.process(signal, 44100);
    expect(Math.abs(result[0])).toBeGreaterThan(0.5);
  });

  it("limits signal to ceiling", () => {
    const signal = [0.5, 1.5, -2, 0.3];
    const limited = AudioCompressor.limiter(signal, -6);
    for (const s of limited) {
      expect(Math.abs(s)).toBeLessThanOrEqual(AudioCompressor.dbToLinear(-6) + 0.001);
    }
  });

  it("gates quiet signals", () => {
    const quiet = new Array(100).fill(0.001);
    const signal = [1, ...quiet];
    const gated = AudioCompressor.gate(signal, -20, 1000, 0.01);
    expect(gated[0]).toBe(1);
    expect(gated[signal.length - 1]).toBe(0);
  });

  it("returns and updates settings", () => {
    const comp = new AudioCompressor();
    comp.setThreshold(-10);
    comp.setRatio(8);
    const s = comp.getSettings();
    expect(s.threshold).toBe(-10);
    expect(s.ratio).toBe(8);
  });

  it("resets envelope", () => {
    const comp = new AudioCompressor({ threshold: -20, ratio: 4 });
    comp.process([1, 1, 1], 44100);
    comp.reset();
    const result = comp.process([0.01], 44100);
    expect(result).toHaveLength(1);
  });
});
