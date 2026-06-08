import { describe, it, expect } from "vitest";
import { createNode, addChild, findBFS, findDFS, mapTree, filterTree, depth, size, leaves, flatten, path, reduce } from "../tree.js";

describe("tree", () => {
  function buildTree() {
    const root = createNode(1);
    const a = createNode(2);
    const b = createNode(3);
    const c = createNode(4);
    addChild(root, a);
    addChild(root, b);
    addChild(a, c);
    return root;
  }

  it("createNode builds leaf", () => {
    const n = createNode("x");
    expect(n.data).toBe("x");
    expect(n.children).toEqual([]);
  });

  it("addChild appends", () => {
    const p = createNode(1);
    addChild(p, createNode(2));
    expect(p.children.length).toBe(1);
  });

  it("findBFS finds node", () => {
    const r = buildTree();
    const found = findBFS(r, (d) => d === 4);
    expect(found?.data).toBe(4);
  });

  it("findBFS returns null when not found", () => {
    expect(findBFS(createNode(1), (d) => d === 99)).toBeNull();
  });

  it("findDFS finds node", () => {
    const r = buildTree();
    const found = findDFS(r, (d) => d === 3);
    expect(found?.data).toBe(3);
  });

  it("findDFS returns null when not found", () => {
    expect(findDFS(createNode(1), (d) => d === 99)).toBeNull();
  });

  it("mapTree transforms data", () => {
    const r = buildTree();
    const mapped = mapTree(r, (d) => d * 10);
    expect(mapped.data).toBe(10);
    expect(mapped.children[0].data).toBe(20);
  });

  it("filterTree removes non-matching", () => {
    const r = buildTree();
    const filtered = filterTree(r, (d) => d < 4);
    expect(filtered).not.toBeNull();
    expect(size(filtered!)).toBe(3);
  });

  it("filterTree returns null if root fails", () => {
    const r = createNode(5);
    expect(filterTree(r, (d) => d < 3)).toBeNull();
  });

  it("depth computes correctly", () => {
    const r = buildTree();
    expect(depth(r)).toBe(3);
  });

  it("depth of leaf is 1", () => {
    expect(depth(createNode(1))).toBe(1);
  });

  it("size counts all nodes", () => {
    expect(size(buildTree())).toBe(4);
  });

  it("leaves returns leaf data", () => {
    const r = buildTree();
    expect(leaves(r).sort()).toEqual([3, 4]);
  });

  it("flatten returns all data pre-order", () => {
    const r = buildTree();
    expect(flatten(r)).toEqual([1, 2, 4, 3]);
  });

  it("path finds route to target", () => {
    const r = buildTree();
    expect(path(r, (d) => d === 4)).toEqual([1, 2, 4]);
  });

  it("path returns null if not found", () => {
    expect(path(createNode(1), (d) => d === 99)).toBeNull();
  });

  it("reduce accumulates", () => {
    const r = buildTree();
    const sum = reduce(r, (acc, d) => acc + d, 0);
    expect(sum).toBe(10);
  });
});
