import { describe, it, expect } from "vitest";
import { CentroidDecomposition } from "../centroid-decomp.js";

describe("CentroidDecomposition", () => {
  it("decomposes a simple path", () => {
    const edges: [number, number][] = [[1, 2], [2, 3], [3, 4], [4, 5]];
    const cd = new CentroidDecomposition(edges);
    expect(cd.root()).toBeGreaterThanOrEqual(1);
    expect(cd.nodeCount()).toBe(5);
  });

  it("parent of root is -1", () => {
    const edges: [number, number][] = [[1, 2], [2, 3]];
    const cd = new CentroidDecomposition(edges);
    expect(cd.parent(cd.root())).toBe(-1);
  });

  it("children of root cover all other nodes", () => {
    const edges: [number, number][] = [[1, 2], [1, 3], [1, 4]];
    const cd = new CentroidDecomposition(edges);
    const root = cd.root();
    const visited = new Set<number>();
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop()!;
      visited.add(node);
      for (const ch of cd.children(node)) stack.push(ch);
    }
    expect(visited.size).toBe(4);
  });

  it("depth of root is 0", () => {
    const edges: [number, number][] = [[1, 2], [2, 3]];
    const cd = new CentroidDecomposition(edges);
    expect(cd.depth(cd.root())).toBe(0);
  });

  it("depth increases away from centroid root", () => {
    const edges: [number, number][] = [[1, 2], [2, 3], [3, 4]];
    const cd = new CentroidDecomposition(edges);
    const root = cd.root();
    for (const ch of cd.children(root)) {
      expect(cd.depth(ch)).toBe(1);
    }
  });

  it("star graph has center as root", () => {
    const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4]];
    const cd = new CentroidDecomposition(edges);
    expect(cd.root()).toBe(0);
  });

  it("handles two-node tree", () => {
    const edges: [number, number][] = [[1, 2]];
    const cd = new CentroidDecomposition(edges);
    expect(cd.nodeCount()).toBe(2);
    expect(cd.root()).toBeGreaterThanOrEqual(1);
  });
});
