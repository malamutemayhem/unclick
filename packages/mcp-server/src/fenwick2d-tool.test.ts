import { describe, it, expect } from "vitest";
import { fenwick2D } from "./fenwick2d-tool.js";

describe("fenwick2D", () => {
  it("handles a single point update and query", async () => {
    const r = (await fenwick2D({
      rows: 3,
      cols: 3,
      operations: [
        { type: "update", row: 1, col: 1, value: 5 },
        { type: "query", row: 1, col: 1, row2: 1, col2: 1 },
      ],
    })) as any;
    expect(r.results).toEqual([null, 5]);
    expect(r.operations_count).toBe(2);
  });

  it("computes rectangle sums correctly after multiple updates", async () => {
    const r = (await fenwick2D({
      rows: 3,
      cols: 3,
      operations: [
        { type: "update", row: 0, col: 0, value: 1 },
        { type: "update", row: 0, col: 2, value: 3 },
        { type: "update", row: 2, col: 2, value: 7 },
        { type: "query", row: 0, col: 0, row2: 2, col2: 2 },
      ],
    })) as any;
    // sum of all: 1 + 3 + 7 = 11
    expect(r.results[3]).toBe(11);
  });

  it("queries a prefix sum from (0,0) when row2/col2 are omitted", async () => {
    const r = (await fenwick2D({
      rows: 2,
      cols: 2,
      operations: [
        { type: "update", row: 0, col: 0, value: 10 },
        { type: "update", row: 0, col: 1, value: 20 },
        { type: "query", row: 0, col: 1 },
      ],
    })) as any;
    // single-point query at (0,1) returns just the value at that cell
    expect(r.results[2]).toBe(20);
  });

  it("rejects out-of-range row in update", async () => {
    await expect(
      fenwick2D({
        rows: 2,
        cols: 2,
        operations: [{ type: "update", row: 5, col: 0, value: 1 }],
      }),
    ).rejects.toThrow("out of range");
  });

  it("stamps meta with local-computation source", async () => {
    const r = (await fenwick2D({
      rows: 1,
      cols: 1,
      operations: [{ type: "update", row: 0, col: 0, value: 1 }],
    })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
