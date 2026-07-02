import { describe, it, expect } from "vitest";
import { haarWavelet } from "./waveletfn-tool.js";

describe("haarWavelet", () => {
  it("forward transform produces correct number of coefficients", async () => {
    const r = (await haarWavelet({ values: [1, 2, 3, 4] })) as any;
    expect(r.direction).toBe("forward");
    expect(r.coefficients).toHaveLength(4);
  });

  it("inverse reconstructs the original signal", async () => {
    const original = [1, 2, 3, 4];
    const fwd = (await haarWavelet({ values: original })) as any;
    const inv = (await haarWavelet({ values: fwd.coefficients, inverse: true })) as any;
    expect(inv.direction).toBe("inverse");
    for (let i = 0; i < original.length; i++) {
      expect(inv.reconstructed[i]).toBeCloseTo(original[i], 5);
    }
  });

  it("rejects non-power-of-2 length", async () => {
    await expect(haarWavelet({ values: [1, 2, 3] })).rejects.toThrow("power of 2");
  });

  it("rejects empty array", async () => {
    await expect(haarWavelet({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await haarWavelet({ values: [1, 0, 1, 0] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
