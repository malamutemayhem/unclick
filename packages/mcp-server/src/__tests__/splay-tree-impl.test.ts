import { describe, it, expect } from "vitest";
import { SplayTree } from "../splay-tree-impl.js";

describe("SplayTree", () => {
  it("insert and get", () => {
    const tree = new SplayTree<number, string>();
    tree.insert(5, "five");
    tree.insert(3, "three");
    tree.insert(7, "seven");
    expect(tree.get(5)).toBe("five");
    expect(tree.get(3)).toBe("three");
  });

  it("returns undefined for missing keys", () => {
    const tree = new SplayTree<number, string>();
    tree.insert(1, "one");
    expect(tree.get(99)).toBeUndefined();
  });

  it("updates value on duplicate", () => {
    const tree = new SplayTree<number, string>();
    tree.insert(1, "old");
    tree.insert(1, "new");
    expect(tree.get(1)).toBe("new");
    expect(tree.size).toBe(1);
  });

  it("delete removes key", () => {
    const tree = new SplayTree<number, string>();
    tree.insert(1, "a");
    tree.insert(2, "b");
    tree.insert(3, "c");
    expect(tree.delete(2)).toBe(true);
    expect(tree.has(2)).toBe(false);
    expect(tree.size).toBe(2);
  });

  it("delete returns false for missing", () => {
    const tree = new SplayTree<number, string>();
    expect(tree.delete(1)).toBe(false);
  });

  it("min and max", () => {
    const tree = new SplayTree<number, string>();
    tree.insert(5, "e");
    tree.insert(1, "a");
    tree.insert(9, "i");
    expect(tree.min()).toEqual([1, "a"]);
    expect(tree.max()).toEqual([9, "i"]);
  });

  it("inOrder returns sorted entries", () => {
    const tree = new SplayTree<number, number>();
    tree.insert(30, 3);
    tree.insert(10, 1);
    tree.insert(20, 2);
    const entries = tree.inOrder();
    expect(entries).toEqual([[10, 1], [20, 2], [30, 3]]);
  });

  it("empty tree operations", () => {
    const tree = new SplayTree<number, string>();
    expect(tree.get(1)).toBeUndefined();
    expect(tree.min()).toBeNull();
    expect(tree.max()).toBeNull();
    expect(tree.size).toBe(0);
  });
});
