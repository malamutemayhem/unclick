import { describe, it, expect } from "vitest";
import { VertexCover } from "../vertex-cover.js";

describe("VertexCover", () => {
  it("greedy cover covers all edges", () => {
    const vc = new VertexCover([[0, 1], [1, 2], [2, 3]]);
    const cover = vc.greedyCover();
    expect(vc.isVertexCover(cover)).toBe(true);
  });

  it("approx2Cover covers all edges", () => {
    const vc = new VertexCover([[0, 1], [1, 2], [2, 3]]);
    const cover = vc.approx2Cover();
    expect(vc.isVertexCover(cover)).toBe(true);
  });

  it("isVertexCover rejects incomplete cover", () => {
    const vc = new VertexCover([[0, 1], [2, 3]]);
    expect(vc.isVertexCover(new Set([0]))).toBe(false);
  });

  it("lowerBound gives minimum matching size", () => {
    const vc = new VertexCover([[0, 1], [2, 3], [4, 5]]);
    expect(vc.lowerBound()).toBe(3);
  });

  it("star graph: center is optimal", () => {
    const vc = new VertexCover([[0, 1], [0, 2], [0, 3]]);
    const cover = vc.greedyCover();
    expect(cover.has(0)).toBe(true);
    expect(cover.size).toBe(1);
  });

  it("nodeCount and edgeCount", () => {
    const vc = new VertexCover([[0, 1], [1, 2]]);
    expect(vc.nodeCount()).toBe(3);
    expect(vc.edgeCount()).toBe(2);
  });

  it("complete graph K4", () => {
    const edges: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
    ];
    const vc = new VertexCover(edges);
    const cover = vc.greedyCover();
    expect(vc.isVertexCover(cover)).toBe(true);
    expect(cover.size).toBeLessThanOrEqual(4);
  });
});
