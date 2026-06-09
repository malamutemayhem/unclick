import { describe, it, expect } from "vitest";
import { waveletTree } from "./wavelet-tool.js";

describe("waveletTree", () => {
  it("finds kth smallest in range", async () => {
    const r = (await waveletTree({
      array: [3, 1, 4, 1, 5, 9, 2, 6],
      queries: [{ type: "kth", l: 0, r: 5, k: 3 }],
    })) as any;
    expect(r.query_results[0].result).toBe(3);
  });

  it("finds 1st smallest (minimum) in range", async () => {
    const r = (await waveletTree({
      array: [5, 2, 8, 1, 9],
      queries: [{ type: "kth", l: 1, r: 4, k: 1 }],
    })) as any;
    expect(r.query_results[0].result).toBe(1);
  });

  it("handles full array query", async () => {
    const r = (await waveletTree({
      array: [10, 20, 30],
      queries: [{ type: "kth", l: 0, r: 3, k: 2 }],
    })) as any;
    expect(r.query_results[0].result).toBe(20);
  });

  it("builds without queries", async () => {
    const r = (await waveletTree({
      array: [7, 3, 5, 1],
    })) as any;
    expect(r.array_length).toBe(4);
    expect(r.alphabet_size).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await waveletTree({ array: [1, 2, 3] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
