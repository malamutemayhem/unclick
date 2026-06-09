import { describe, it, expect } from "vitest";
import { longestIncreasingSubseq } from "./lis-tool.js";

describe("longestIncreasingSubseq", () => {
  it("finds LIS", async () => {
    const r = (await longestIncreasingSubseq({
      values: [10, 9, 2, 5, 3, 7, 101, 18],
    })) as any;
    expect(r.lis_length).toBe(4);
    expect(r.subsequence).toHaveLength(4);
    for (let i = 1; i < r.subsequence.length; i++) {
      expect(r.subsequence[i]).toBeGreaterThan(r.subsequence[i - 1]);
    }
  });

  it("handles already sorted", async () => {
    const r = (await longestIncreasingSubseq({
      values: [1, 2, 3, 4, 5],
    })) as any;
    expect(r.lis_length).toBe(5);
    expect(r.subsequence).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles decreasing sequence", async () => {
    const r = (await longestIncreasingSubseq({
      values: [5, 4, 3, 2, 1],
    })) as any;
    expect(r.lis_length).toBe(1);
  });

  it("handles single element", async () => {
    const r = (await longestIncreasingSubseq({ values: [42] })) as any;
    expect(r.lis_length).toBe(1);
    expect(r.subsequence).toEqual([42]);
  });

  it("rejects empty values", async () => {
    await expect(longestIncreasingSubseq({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await longestIncreasingSubseq({ values: [1, 2] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
