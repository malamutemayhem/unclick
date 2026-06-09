import { describe, it, expect } from "vitest";
import { hungarianAssign } from "./hungarian-tool.js";

describe("hungarianAssign", () => {
  it("solves a 3x3 assignment", async () => {
    const r = await hungarianAssign({
      cost_matrix: [
        [9, 2, 7],
        [6, 4, 3],
        [5, 8, 1],
      ],
    }) as any;
    expect(r.size).toBe(3);
    expect(r.mode).toBe("minimize");
    expect(r.total_cost).toBe(9);
    expect(r.assignments).toHaveLength(3);
  });

  it("solves a 2x2 maximize", async () => {
    const r = await hungarianAssign({
      cost_matrix: [
        [10, 5],
        [3, 8],
      ],
      maximize: true,
    }) as any;
    expect(r.mode).toBe("maximize");
    expect(r.total_cost).toBe(18);
  });

  it("handles identity cost", async () => {
    const r = await hungarianAssign({
      cost_matrix: [
        [0, 100],
        [100, 0],
      ],
    }) as any;
    expect(r.total_cost).toBe(0);
  });

  it("rejects non-square", async () => {
    await expect(hungarianAssign({
      cost_matrix: [[1, 2, 3], [4, 5]],
    })).rejects.toThrow("square");
  });

  it("stamps meta", async () => {
    const r = await hungarianAssign({
      cost_matrix: [[1, 2], [3, 4]],
    }) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
