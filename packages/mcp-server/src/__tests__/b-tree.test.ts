import { describe, it, expect } from "vitest";
import { BTree } from "../b-tree.js";

describe("BTree", () => {
  it("inserts and retrieves values", () => {
    const tree = new BTree<number, string>(2);
    tree.insert(10, "ten");
    tree.insert(20, "twenty");
    tree.insert(5, "five");
    expect(tree.get(10)).toBe("ten");
    expect(tree.get(20)).toBe("twenty");
    expect(tree.get(5)).toBe("five");
  });

  it("returns undefined for missing keys", () => {
    const tree = new BTree<number, string>(2);
    tree.insert(1, "one");
    expect(tree.get(99)).toBeUndefined();
  });

  it("tracks size", () => {
    const tree = new BTree<number, string>(2);
    expect(tree.size).toBe(0);
    tree.insert(1, "a");
    tree.insert(2, "b");
    expect(tree.size).toBe(2);
  });

  it("updates existing key", () => {
    const tree = new BTree<number, string>(2);
    tree.insert(1, "old");
    tree.insert(1, "new");
    expect(tree.get(1)).toBe("new");
    expect(tree.size).toBe(1);
  });

  it("has() checks membership", () => {
    const tree = new BTree<number, string>(2);
    tree.insert(5, "five");
    expect(tree.has(5)).toBe(true);
    expect(tree.has(6)).toBe(false);
  });

  it("inOrder returns sorted pairs", () => {
    const tree = new BTree<number, string>(2);
    tree.insert(30, "c");
    tree.insert(10, "a");
    tree.insert(20, "b");
    const pairs = tree.inOrder();
    expect(pairs.map(([k]) => k)).toEqual([10, 20, 30]);
  });

  it("handles many insertions with splits", () => {
    const tree = new BTree<number, number>(2);
    for (let i = 0; i < 50; i++) tree.insert(i, i * 10);
    expect(tree.size).toBe(50);
    for (let i = 0; i < 50; i++) expect(tree.get(i)).toBe(i * 10);
  });

  it("min/max return extremes", () => {
    const tree = new BTree<number, string>(3);
    tree.insert(50, "a");
    tree.insert(10, "b");
    tree.insert(90, "c");
    expect(tree.min()).toEqual([10, "b"]);
    expect(tree.max()).toEqual([90, "c"]);
  });

  it("height grows with insertions", () => {
    const tree = new BTree<number, number>(2);
    expect(tree.height()).toBe(0);
    for (let i = 0; i < 20; i++) tree.insert(i, i);
    expect(tree.height()).toBeGreaterThan(0);
  });

  it("min/max return undefined for empty tree", () => {
    const tree = new BTree<number, string>(2);
    expect(tree.min()).toBeUndefined();
    expect(tree.max()).toBeUndefined();
  });
});
