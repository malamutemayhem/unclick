import { describe, it, expect } from "vitest";
import { avlTree } from "./avltree-tool.js";

describe("avlTree", () => {
  it("inserts keys and returns sorted inorder", async () => {
    const r = (await avlTree({ keys: [5, 3, 8, 1, 4] })) as any;
    expect(r.inorder).toEqual([1, 3, 4, 5, 8]);
    expect(r.node_count).toBe(5);
  });

  it("maintains balanced height", async () => {
    const r = (await avlTree({ keys: [1, 2, 3, 4, 5, 6, 7] })) as any;
    expect(r.tree_height).toBeLessThanOrEqual(4);
    expect(r.node_count).toBe(7);
  });

  it("deduplicates keys", async () => {
    const r = (await avlTree({ keys: [5, 5, 5, 3, 3] })) as any;
    expect(r.inorder).toEqual([3, 5]);
    expect(r.node_count).toBe(2);
  });

  it("supports search_keys", async () => {
    const r = (await avlTree({ keys: [10, 20, 30], search_keys: [20, 25] })) as any;
    expect(r.search_results["20"]).toBe(true);
    expect(r.search_results["25"]).toBe(false);
  });

  it("stamps meta", async () => {
    const r = (await avlTree({ keys: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
