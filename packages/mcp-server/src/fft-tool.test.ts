import { describe, it, expect } from "vitest";
import { fftTransform } from "./fft-tool.js";

describe("fftTransform", () => {
  it("transforms a simple signal", async () => {
    const r = await fftTransform({ signal: [1, 0, 1, 0] }) as any;
    expect(r.padded_length).toBe(4);
    expect(r.real[0]).toBeCloseTo(2, 5);
    expect(r.magnitudes[0]).toBeCloseTo(2, 5);
  });

  it("transforms constant signal", async () => {
    const r = await fftTransform({ signal: [3, 3, 3, 3] }) as any;
    expect(r.real[0]).toBeCloseTo(12, 5);
    expect(r.magnitudes[1]).toBeCloseTo(0, 5);
  });

  it("handles inverse transform of real-only input", async () => {
    const r = await fftTransform({ signal: [1, 0, 1, 0], inverse: true }) as any;
    expect(r.inverse).toBe(true);
    expect(r.padded_length).toBe(4);
  });

  it("zero-pads to power of 2", async () => {
    const r = await fftTransform({ signal: [1, 2, 3] }) as any;
    expect(r.input_length).toBe(3);
    expect(r.padded_length).toBe(4);
  });

  it("rejects empty signal", async () => {
    await expect(fftTransform({ signal: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await fftTransform({ signal: [1, 0] }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
