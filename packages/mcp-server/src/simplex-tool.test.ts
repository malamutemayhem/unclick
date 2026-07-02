import { describe, it, expect } from "vitest";
import { simplexSolve } from "./simplex-tool.js";

describe("simplexSolve", () => {
  it("solves a basic 2-variable LP", async () => {
    const r = await simplexSolve({
      objective: [5, 4],
      constraints: [
        { coeffs: [6, 4], bound: 24 },
        { coeffs: [1, 2], bound: 6 },
      ],
    }) as any;
    expect(r.status).toBe("optimal");
    expect(r.optimal_value).toBeCloseTo(21, 4);
    expect(r.solution).toHaveLength(2);
  });

  it("solves single variable", async () => {
    const r = await simplexSolve({
      objective: [3],
      constraints: [{ coeffs: [1], bound: 10 }],
    }) as any;
    expect(r.status).toBe("optimal");
    expect(r.optimal_value).toBeCloseTo(30, 4);
    expect(r.solution[0]).toBeCloseTo(10, 4);
  });

  it("solves with tight constraints", async () => {
    const r = await simplexSolve({
      objective: [1, 1],
      constraints: [
        { coeffs: [1, 0], bound: 5 },
        { coeffs: [0, 1], bound: 5 },
      ],
    }) as any;
    expect(r.status).toBe("optimal");
    expect(r.optimal_value).toBeCloseTo(10, 4);
  });

  it("rejects empty objective", async () => {
    await expect(simplexSolve({ objective: [], constraints: [{ coeffs: [], bound: 0 }] }))
      .rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = await simplexSolve({
      objective: [1],
      constraints: [{ coeffs: [1], bound: 5 }],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
