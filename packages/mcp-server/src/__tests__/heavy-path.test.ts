import { describe, it, expect } from "vitest";
import { HeavyLightDecomposition } from "../heavy-path.js";

describe("HeavyLightDecomposition", () => {
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 5],
  ];

  it("lca of siblings is their parent", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.lca(3, 4)).toBe(1);
  });

  it("lca of node with itself is itself", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.lca(3, 3)).toBe(3);
  });

  it("lca across subtrees is root", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.lca(3, 5)).toBe(0);
  });

  it("depth is correct", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.getDepth(0)).toBe(0);
    expect(hld.getDepth(1)).toBe(1);
    expect(hld.getDepth(3)).toBe(2);
  });

  it("pathSegments returns valid ranges", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    const segs = hld.pathSegments(3, 5);
    expect(segs.length).toBeGreaterThan(0);
    for (const [lo, hi] of segs) {
      expect(lo).toBeLessThanOrEqual(hi);
    }
  });

  it("getParent returns parent node", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.getParent(1)).toBe(0);
    expect(hld.getParent(0)).toBe(-1);
  });

  it("positions are unique", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    const positions = new Set<number>();
    for (let i = 0; i < 6; i++) positions.add(hld.getPosition(i));
    expect(positions.size).toBe(6);
  });

  it("nodeCount returns total", () => {
    const hld = new HeavyLightDecomposition(6, edges, 0);
    expect(hld.nodeCount()).toBe(6);
  });
});
