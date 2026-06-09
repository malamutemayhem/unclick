import { describe, it, expect } from "vitest";
import { matrixRank } from "./matrank-tool.js";

describe("matrixRank", () => {
  it("computes rank of a full-rank 3x3 identity matrix", async () => {
    const r = (await matrixRank({
      matrix: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    })) as any;
    expect(r.rank).toBe(3);
    expect(r.is_full_rank).toBe(true);
    expect(r.nullity).toBe(0);
  });

  it("detects rank deficiency in a matrix with dependent rows", async () => {
    const r = (await matrixRank({
      matrix: [
        [1, 2, 3],
        [2, 4, 6],
        [0, 1, 1],
      ],
    })) as any;
    expect(r.rank).toBe(2);
    expect(r.is_full_rank).toBe(false);
    expect(r.nullity).toBe(1);
  });

  it("handles a non-square matrix (2x3)", async () => {
    const r = (await matrixRank({
      matrix: [
        [1, 0, 2],
        [0, 1, 3],
      ],
    })) as any;
    expect(r.rows).toBe(2);
    expect(r.cols).toBe(3);
    expect(r.rank).toBe(2);
    expect(r.nullity).toBe(1);
  });

  it("returns rank 0 for a zero matrix", async () => {
    const r = (await matrixRank({
      matrix: [
        [0, 0],
        [0, 0],
      ],
    })) as any;
    expect(r.rank).toBe(0);
    expect(r.nullity).toBe(2);
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await matrixRank({
      matrix: [[5]],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
