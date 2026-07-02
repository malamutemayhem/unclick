import { describe, it, expect } from "vitest";
import { linearSolve } from "./linearsolve-tool.js";

describe("linearSolve", () => {
  it("solves 2x2 system", async () => {
    const r = await linearSolve({
      matrix: [
        [2, 1],
        [1, 3],
      ],
      vector: [5, 10],
    }) as any;
    expect(r.solution[0]).toBeCloseTo(1, 6);
    expect(r.solution[1]).toBeCloseTo(3, 6);
  });

  it("solves 3x3 system", async () => {
    const r = await linearSolve({
      matrix: [
        [1, 0, 0],
        [0, 2, 0],
        [0, 0, 3],
      ],
      vector: [5, 8, 9],
    }) as any;
    expect(r.solution).toEqual([5, 4, 3]);
    expect(r.system_size).toBe(3);
  });

  it("handles partial pivoting", async () => {
    const r = await linearSolve({
      matrix: [
        [0, 1],
        [1, 0],
      ],
      vector: [3, 7],
    }) as any;
    expect(r.solution[0]).toBeCloseTo(7, 6);
    expect(r.solution[1]).toBeCloseTo(3, 6);
  });

  it("rejects singular system", async () => {
    await expect(
      linearSolve({
        matrix: [
          [1, 2],
          [2, 4],
        ],
        vector: [3, 6],
      }),
    ).rejects.toThrow("singular");
  });

  it("rejects mismatched dimensions", async () => {
    await expect(
      linearSolve({
        matrix: [[1, 2], [3, 4]],
        vector: [1],
      }),
    ).rejects.toThrow("length");
  });

  it("stamps meta", async () => {
    const r = await linearSolve({
      matrix: [[2]],
      vector: [6],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
    expect(r.solution[0]).toBe(3);
  });
});
