import { describe, it, expect } from "vitest";
import { sparseTable } from "./sparsetable-tool.js";

describe("sparseTable", () => {
  it("answers range minimum queries", async () => {
    const r = (await sparseTable({
      array: [3, 1, 4, 1, 5, 9, 2, 6],
      queries: [[0, 3], [2, 5], [6, 7]],
      mode: "min",
    })) as any;
    expect(r.query_results[0].result).toBe(1);
    expect(r.query_results[1].result).toBe(1);
    expect(r.query_results[2].result).toBe(2);
  });

  it("answers range maximum queries", async () => {
    const r = (await sparseTable({
      array: [3, 1, 4, 1, 5],
      queries: [[0, 4], [1, 3]],
      mode: "max",
    })) as any;
    expect(r.query_results[0].result).toBe(5);
    expect(r.query_results[1].result).toBe(4);
  });

  it("handles single element query", async () => {
    const r = (await sparseTable({
      array: [7, 2, 9],
      queries: [[1, 1]],
    })) as any;
    expect(r.query_results[0].result).toBe(2);
  });

  it("builds without queries", async () => {
    const r = (await sparseTable({ array: [5, 3, 8] })) as any;
    expect(r.array_length).toBe(3);
    expect(r.query_results).toEqual([]);
  });

  it("stamps meta", async () => {
    const r = (await sparseTable({ array: [1, 2] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
