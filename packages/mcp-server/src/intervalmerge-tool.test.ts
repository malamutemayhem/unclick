import { describe, it, expect } from "vitest";
import { intervalMerge } from "./intervalmerge-tool.js";

describe("intervalMerge", () => {
  it("merges overlapping intervals", async () => {
    const r = (await intervalMerge({
      intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    })) as any;
    expect(r.merged_intervals).toEqual([[1, 6], [8, 10], [15, 18]]);
    expect(r.merged_count).toBe(3);
  });

  it("merges all into one", async () => {
    const r = (await intervalMerge({
      intervals: [[1, 5], [2, 7], [3, 10]],
    })) as any;
    expect(r.merged_intervals).toEqual([[1, 10]]);
  });

  it("handles non-overlapping intervals", async () => {
    const r = (await intervalMerge({
      intervals: [[1, 2], [5, 6], [9, 10]],
    })) as any;
    expect(r.merged_count).toBe(3);
    expect(r.gaps.length).toBe(2);
  });

  it("handles single interval", async () => {
    const r = (await intervalMerge({ intervals: [[3, 7]] })) as any;
    expect(r.merged_intervals).toEqual([[3, 7]]);
    expect(r.total_coverage).toBe(4);
  });

  it("stamps meta", async () => {
    const r = (await intervalMerge({ intervals: [[0, 1]] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
