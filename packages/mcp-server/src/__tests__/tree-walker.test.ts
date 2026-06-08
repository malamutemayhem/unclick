import { describe, it, expect } from "vitest";
import { TreeWalker } from "../tree-walker.js";
import type { TreeNode } from "../tree-walker.js";

const tree: TreeNode<number> = {
  value: 1,
  children: [
    { value: 2, children: [{ value: 4, children: [] }, { value: 5, children: [] }] },
    { value: 3, children: [{ value: 6, children: [] }] },
  ],
};

describe("TreeWalker", () => {
  it("pre-order traversal", () => {
    const values: number[] = [];
    TreeWalker.walk(tree, "pre", (node) => values.push(node.value));
    expect(values).toEqual([1, 2, 4, 5, 3, 6]);
  });

  it("post-order traversal", () => {
    const values: number[] = [];
    TreeWalker.walk(tree, "post", (node) => values.push(node.value));
    expect(values).toEqual([4, 5, 2, 6, 3, 1]);
  });

  it("BFS traversal", () => {
    const values: number[] = [];
    TreeWalker.walk(tree, "bfs", (node) => values.push(node.value));
    expect(values).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("find locates node", () => {
    const found = TreeWalker.find(tree, (v) => v === 5);
    expect(found).not.toBeNull();
    expect(found!.value).toBe(5);
  });

  it("find returns null for missing", () => {
    expect(TreeWalker.find(tree, (v) => v === 99)).toBeNull();
  });

  it("map transforms values", () => {
    const doubled = TreeWalker.map(tree, (v) => v * 2);
    expect(doubled.value).toBe(2);
    expect(doubled.children[0].value).toBe(4);
  });

  it("reduce accumulates", () => {
    const sum = TreeWalker.reduce(tree, (acc, v) => acc + v, 0);
    expect(sum).toBe(21);
  });

  it("height computes correctly", () => {
    expect(TreeWalker.height(tree)).toBe(2);
  });

  it("size counts nodes", () => {
    expect(TreeWalker.size(tree)).toBe(6);
  });

  it("leaves returns leaf values", () => {
    expect(TreeWalker.leaves(tree).sort()).toEqual([4, 5, 6]);
  });

  it("path finds path to node", () => {
    const p = TreeWalker.path(tree, (v) => v === 5);
    expect(p).toEqual([1, 2, 5]);
  });
});
