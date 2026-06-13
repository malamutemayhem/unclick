import { describe, it, expect } from "vitest";
import { gaussianElimination } from "./gausselim-tool.js";

describe("gaussianElimination", () => {
  it("solves a 2x2 system", async () => {
    const r = (await gaussianElimination({
      matrix: [
        [2, 1, 5],
        [1, 3, 7],
      ],
    })) as any;
    expect(r.solution_type).toBe("unique");
    expect(r.solution[0]).toBeCloseTo(1.6, 5);
    expect(r.solution[1]).toBeCloseTo(1.8, 5);
    expect(r.rank).toBe(2);
  });

  it("detects inconsistent system", async () => {
    const r = (await gaussianElimination({
      matrix: [
        [1, 1, 2],
        [1, 1, 3],
      ],
    })) as any;
    expect(r.solution_type).toBe("inconsistent");
    expect(r.solution).toBeNull();
  });

  it("detects infinite solutions", async () => {
    const r = (await gaussianElimination({
      matrix: [
        [1, 2, 3],
        [2, 4, 6],
      ],
    })) as any;
    expect(r.solution_type).toBe("infinite");
    expect(r.rank).toBe(1);
  });

  it("solves 3x3 identity-like system", async () => {
    const r = (await gaussianElimination({
      matrix: [
        [1, 0, 0, 1],
        [0, 1, 0, 2],
        [0, 0, 1, 3],
      ],
    })) as any;
    expect(r.solution_type).toBe("unique");
    expect(r.solution).toEqual([1, 2, 3]);
  });

  it("stamps meta", async () => {
    const r = (await gaussianElimination({
      matrix: [[1, 2]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
