import { describe, it, expect } from "vitest";
import { matrixExponentiation } from "./matexp-tool.js";

describe("matrixExponentiation", () => {
  it("computes identity for power 0", async () => {
    const r = (await matrixExponentiation({
      matrix: [[2, 1], [1, 1]],
      power: 0,
    })) as any;
    expect(r.result).toEqual([[1, 0], [0, 1]]);
  });

  it("returns original matrix for power 1", async () => {
    const r = (await matrixExponentiation({
      matrix: [[2, 1], [1, 1]],
      power: 1,
    })) as any;
    expect(r.result).toEqual([[2, 1], [1, 1]]);
  });

  it("computes Fibonacci via matrix power", async () => {
    const r = (await matrixExponentiation({
      matrix: [[1, 1], [1, 0]],
      power: 10,
    })) as any;
    expect(r.result[0][0]).toBe(89);
    expect(r.result[0][1]).toBe(55);
  });

  it("supports modular exponentiation", async () => {
    const r = (await matrixExponentiation({
      matrix: [[1, 1], [1, 0]],
      power: 100,
      mod: 1000000007,
    })) as any;
    expect(r.result[0][0]).toBe(782204094);
    expect(r.modulus).toBe(1000000007);
  });

  it("stamps meta", async () => {
    const r = (await matrixExponentiation({
      matrix: [[1, 0], [0, 1]],
      power: 2,
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
