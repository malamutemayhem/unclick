import { describe, it, expect } from "vitest";
import { rbTreeSim } from "./rbtree-tool.js";

describe("rbTreeSim", () => {
  it("inserts keys and returns sorted inorder", async () => {
    const r = (await rbTreeSim({ keys: [5, 3, 8, 1, 4] })) as any;
    expect(r.inorder).toEqual([1, 3, 4, 5, 8]);
    expect(r.node_count).toBe(5);
  });

  it("root is always black", async () => {
    const r = (await rbTreeSim({ keys: [10, 20, 30, 40, 50] })) as any;
    expect(r.root_color).toBe("black");
    expect(r.is_valid_rb).toBe(true);
  });

  it("maintains balanced height", async () => {
    const r = (await rbTreeSim({ keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })) as any;
    expect(r.tree_height).toBeLessThanOrEqual(7);
    expect(r.black_height).toBeGreaterThan(0);
  });

  it("deduplicates keys", async () => {
    const r = (await rbTreeSim({ keys: [5, 5, 3, 3, 3] })) as any;
    expect(r.inorder).toEqual([3, 5]);
    expect(r.node_count).toBe(2);
  });

  it("stamps meta", async () => {
    const r = (await rbTreeSim({ keys: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
