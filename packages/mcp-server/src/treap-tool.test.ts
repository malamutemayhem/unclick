import { describe, it, expect } from "vitest";
import { treapSim } from "./treap-tool.js";

describe("treapSim", () => {
  it("sorts values via inorder traversal", async () => {
    const r = (await treapSim({ values: [5, 3, 8, 1, 4] })) as any;
    expect(r.sorted).toEqual([1, 3, 4, 5, 8]);
    expect(r.element_count).toBe(5);
  });

  it("reports tree height", async () => {
    const r = (await treapSim({ values: [1, 2, 3, 4, 5, 6, 7, 8] })) as any;
    expect(r.tree_height).toBeGreaterThanOrEqual(1);
    expect(r.tree_height).toBeLessThanOrEqual(8);
  });

  it("searches for values", async () => {
    const r = (await treapSim({
      values: [10, 20, 30, 40, 50],
      search: [30, 35],
    })) as any;
    expect(r.search_results[0].found).toBe(true);
    expect(r.search_results[1].found).toBe(false);
  });

  it("rejects empty values", async () => {
    await expect(treapSim({ values: [] })).rejects.toThrow("non-empty");
  });

  it("stamps meta", async () => {
    const r = (await treapSim({ values: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
