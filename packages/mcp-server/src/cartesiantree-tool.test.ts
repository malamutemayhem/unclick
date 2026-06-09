import { describe, it, expect } from "vitest";
import { cartesianTree } from "./cartesiantree-tool.js";

describe("cartesianTree", () => {
  it("builds tree with minimum at root", async () => {
    const r = (await cartesianTree({ array: [3, 1, 2] })) as any;
    expect(r.root).toBe(1);
    expect(r.root_value).toBe(1);
  });

  it("preserves inorder as original indices", async () => {
    const r = (await cartesianTree({ array: [5, 3, 7, 1, 9] })) as any;
    expect(r.inorder_indices).toEqual([0, 1, 2, 3, 4]);
  });

  it("computes height", async () => {
    const r = (await cartesianTree({ array: [1, 2, 3] })) as any;
    expect(r.height).toBe(2);
    expect(r.root).toBe(0);
  });

  it("handles single element", async () => {
    const r = (await cartesianTree({ array: [42] })) as any;
    expect(r.root).toBe(0);
    expect(r.height).toBe(0);
    expect(r.left_child[0]).toBe(-1);
    expect(r.right_child[0]).toBe(-1);
  });

  it("stamps meta", async () => {
    const r = (await cartesianTree({ array: [1] })) as any;
    expect(r.unclick_meta.source).toBe("local-computation");
  });
});
