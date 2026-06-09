import { describe, it, expect } from "vitest";
import { skipListSim } from "./skiplist-tool.js";

describe("skipListSim", () => {
  it("sorts values", async () => {
    const r = (await skipListSim({ values: [5, 3, 8, 1, 4] })) as any;
    expect(r.sorted).toEqual([1, 3, 4, 5, 8]);
    expect(r.element_count).toBe(5);
  });

  it("searches for values", async () => {
    const r = (await skipListSim({
      values: [10, 20, 30],
      search: [20, 25],
    })) as any;
    expect(r.search_results[0].found).toBe(true);
    expect(r.search_results[1].found).toBe(false);
  });

  it("reports level count", async () => {
    const r = (await skipListSim({ values: [1, 2, 3, 4, 5, 6, 7, 8] })) as any;
    expect(r.levels).toBeGreaterThanOrEqual(1);
  });

  it("rejects empty values", async () => {
    await expect(skipListSim({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await skipListSim({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
