import { describe, it, expect } from "vitest";
import { computeDominators } from "../dominator-tree.js";

function makeCFG(edges: [number, number][], nodes: number[]) {
  const succs = new Map<number, number[]>();
  const preds = new Map<number, number[]>();
  for (const n of nodes) {
    succs.set(n, []);
    preds.set(n, []);
  }
  for (const [a, b] of edges) {
    succs.get(a)!.push(b);
    preds.get(b)!.push(a);
  }
  return {
    successors: (id: number) => succs.get(id) ?? [],
    predecessors: (id: number) => preds.get(id) ?? [],
  };
}

describe("computeDominators", () => {
  it("linear chain", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [1, 2], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.idom.get(1)).toBe(0);
    expect(dom.idom.get(2)).toBe(1);
    expect(dom.idom.get(3)).toBe(2);
  });

  it("diamond shape", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [0, 2], [1, 3], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.idom.get(1)).toBe(0);
    expect(dom.idom.get(2)).toBe(0);
    expect(dom.idom.get(3)).toBe(0);
  });

  it("dominates check", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [1, 2], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.dominates(0, 3)).toBe(true);
    expect(dom.dominates(1, 3)).toBe(true);
    expect(dom.dominates(3, 1)).toBe(false);
  });

  it("children populated", () => {
    const nodes = [0, 1, 2];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [0, 2]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    const children = dom.children.get(0)!;
    expect(children).toContain(1);
    expect(children).toContain(2);
  });

  it("dominance frontier", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [0, 2], [1, 3], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.frontier(1)).toContain(3);
    expect(dom.frontier(2)).toContain(3);
  });

  it("all frontiers", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [0, 2], [1, 3], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    const all = dom.allFrontiers();
    expect(all.size).toBe(4);
  });

  it("depth calculation", () => {
    const nodes = [0, 1, 2, 3];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [1, 2], [2, 3]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.depth(0)).toBe(0);
    expect(dom.depth(1)).toBe(1);
    expect(dom.depth(3)).toBe(3);
  });

  it("lowest common ancestor", () => {
    const nodes = [0, 1, 2, 3, 4];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [0, 2], [1, 3], [1, 4]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.lca(3, 4)).toBe(1);
    expect(dom.lca(3, 2)).toBe(0);
  });

  it("loop structure", () => {
    const nodes = [0, 1, 2];
    const { successors, predecessors } = makeCFG(
      [[0, 1], [1, 2], [2, 1]],
      nodes
    );
    const dom = computeDominators(0, successors, predecessors, nodes);
    expect(dom.idom.get(1)).toBe(0);
    expect(dom.idom.get(2)).toBe(1);
    expect(dom.dominates(1, 2)).toBe(true);
  });
});
