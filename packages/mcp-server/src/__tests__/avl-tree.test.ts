import { describe, it, expect } from "vitest";
import { AVLTree } from "../avl-tree.js";

describe("avl-tree", () => {
  it("set and get", () => {
    const tree = new AVLTree<number, string>();
    tree.set(5, "five");
    tree.set(3, "three");
    tree.set(7, "seven");
    expect(tree.get(5)).toBe("five");
    expect(tree.get(3)).toBe("three");
    expect(tree.get(99)).toBeUndefined();
  });

  it("tracks size", () => {
    const tree = new AVLTree<number, number>();
    tree.set(1, 1);
    tree.set(2, 2);
    tree.set(3, 3);
    expect(tree.size).toBe(3);
  });

  it("overwrite existing key", () => {
    const tree = new AVLTree<string, number>();
    tree.set("a", 1);
    tree.set("a", 2);
    expect(tree.get("a")).toBe(2);
    expect(tree.size).toBe(1);
  });

  it("delete removes key", () => {
    const tree = new AVLTree<number, string>();
    tree.set(1, "a");
    tree.set(2, "b");
    expect(tree.delete(1)).toBe(true);
    expect(tree.has(1)).toBe(false);
    expect(tree.size).toBe(1);
  });

  it("delete returns false for missing key", () => {
    const tree = new AVLTree<number, number>();
    expect(tree.delete(99)).toBe(false);
  });

  it("keys returns sorted order", () => {
    const tree = new AVLTree<number, number>();
    [5, 3, 7, 1, 4, 6, 8].forEach((n) => tree.set(n, n));
    expect(tree.keys()).toEqual([1, 3, 4, 5, 6, 7, 8]);
  });

  it("min and max", () => {
    const tree = new AVLTree<number, number>();
    [10, 5, 20, 3, 15].forEach((n) => tree.set(n, n));
    expect(tree.min()).toBe(3);
    expect(tree.max()).toBe(20);
  });

  it("stays balanced with sequential inserts", () => {
    const tree = new AVLTree<number, number>();
    for (let i = 0; i < 100; i++) tree.set(i, i);
    expect(tree.keys()).toEqual(Array.from({ length: 100 }, (_, i) => i));
    expect(tree.size).toBe(100);
  });

  it("custom compare", () => {
    const tree = new AVLTree<string, number>((a, b) => b.localeCompare(a));
    tree.set("a", 1);
    tree.set("c", 3);
    tree.set("b", 2);
    expect(tree.keys()).toEqual(["c", "b", "a"]);
  });
});
