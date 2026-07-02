import { describe, it, expect } from "vitest";
import { chineseRemainderTheorem } from "./crt-tool.js";

describe("chineseRemainderTheorem", () => {
  it("solves classic CRT example", async () => {
    const r = (await chineseRemainderTheorem({
      remainders: [2, 3, 2],
      moduli: [3, 5, 7],
    })) as any;
    expect(r.has_solution).toBe(true);
    expect(r.solution).toBe(23);
    expect(r.combined_modulus).toBe(105);
  });

  it("solves two congruences", async () => {
    const r = (await chineseRemainderTheorem({
      remainders: [1, 4],
      moduli: [3, 5],
    })) as any;
    expect(r.has_solution).toBe(true);
    expect(r.solution % 3).toBe(1);
    expect(r.solution % 5).toBe(4);
  });

  it("detects no solution for incompatible congruences", async () => {
    const r = (await chineseRemainderTheorem({
      remainders: [1, 2],
      moduli: [4, 6],
    })) as any;
    expect(r.has_solution).toBe(false);
  });

  it("handles single congruence", async () => {
    const r = (await chineseRemainderTheorem({
      remainders: [3],
      moduli: [7],
    })) as any;
    expect(r.has_solution).toBe(true);
    expect(r.solution).toBe(3);
  });

  it("stamps meta", async () => {
    const r = (await chineseRemainderTheorem({
      remainders: [0],
      moduli: [1],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
