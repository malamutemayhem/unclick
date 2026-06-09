import { describe, it, expect } from "vitest";
import { chineseRemainder } from "./chineseremainder-tool.js";

describe("chineseRemainder", () => {
  it("solves classic CRT problem", async () => {
    const r = (await chineseRemainder({ remainders: [2, 3, 2], moduli: [3, 5, 7] })) as any;
    expect(r.solvable).toBe(true);
    expect(r.solution).toBe(23);
    expect(r.combined_modulus).toBe(105);
  });

  it("handles two congruences", async () => {
    const r = (await chineseRemainder({ remainders: [1, 2], moduli: [3, 5] })) as any;
    expect(r.solvable).toBe(true);
    expect(r.solution % 3).toBe(1);
    expect(r.solution % 5).toBe(2);
  });

  it("detects incompatible system", async () => {
    const r = (await chineseRemainder({ remainders: [1, 2], moduli: [4, 6] })) as any;
    expect(r.solvable).toBe(false);
  });

  it("handles single congruence", async () => {
    const r = (await chineseRemainder({ remainders: [3], moduli: [7] })) as any;
    expect(r.solvable).toBe(true);
    expect(r.solution).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await chineseRemainder({ remainders: [0], moduli: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
