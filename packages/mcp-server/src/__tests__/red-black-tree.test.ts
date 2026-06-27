import { describe, it, expect } from "vitest";
import { RedBlackTree } from "../red-black-tree.js";

describe("RedBlackTree", () => {
  it("sets and gets values", () => {
    const t = new RedBlackTree<number, string>();
    t.set(5, "five");
    t.set(3, "three");
    t.set(7, "seven");
    expect(t.get(5)).toBe("five");
    expect(t.get(3)).toBe("three");
    expect(t.get(7)).toBe("seven");
  });

  it("returns undefined for missing", () => {
    const t = new RedBlackTree<number, number>();
    expect(t.get(42)).toBeUndefined();
  });

  it("overwrites existing key", () => {
    const t = new RedBlackTree<number, string>();
    t.set(1, "a");
    t.set(1, "b");
    expect(t.get(1)).toBe("b");
    expect(t.size).toBe(1);
  });

  it("has checks existence", () => {
    const t = new RedBlackTree<number, number>();
    t.set(10, 100);
    expect(t.has(10)).toBe(true);
    expect(t.has(20)).toBe(false);
  });

  it("finds min and max", () => {
    const t = new RedBlackTree<number, string>();
    t.set(5, "five");
    t.set(1, "one");
    t.set(9, "nine");
    t.set(3, "three");
    expect(t.min()!.key).toBe(1);
    expect(t.max()!.key).toBe(9);
  });

  it("min/max on empty", () => {
    const t = new RedBlackTree<number, number>();
    expect(t.min()).toBeUndefined();
    expect(t.max()).toBeUndefined();
  });

  it("keys are sorted", () => {
    const t = new RedBlackTree<number, number>();
    for (const k of [5, 3, 7, 1, 9, 2, 8]) t.set(k, k);
    expect(t.keys()).toEqual([1, 2, 3, 5, 7, 8, 9]);
  });

  it("values match insertion order by key", () => {
    const t = new RedBlackTree<number, string>();
    t.set(2, "b");
    t.set(1, "a");
    t.set(3, "c");
    expect(t.values()).toEqual(["a", "b", "c"]);
  });

  it("entries returns pairs", () => {
    const t = new RedBlackTree<number, number>();
    t.set(1, 10);
    t.set(2, 20);
    expect(t.entries()).toEqual([[1, 10], [2, 20]]);
  });

  it("range query", () => {
    const t = new RedBlackTree<number, number>();
    for (let i = 0; i < 10; i++) t.set(i, i * 10);
    const result = t.range(3, 6);
    expect(result).toEqual([[3, 30], [4, 40], [5, 50], [6, 60]]);
  });

  it("handles many insertions maintaining balance", () => {
    const t = new RedBlackTree<number, number>();
    for (let i = 0; i < 100; i++) t.set(i, i);
    expect(t.size).toBe(100);
    expect(t.keys()).toEqual(Array.from({ length: 100 }, (_, i) => i));
  });

  it("handles reverse insertions", () => {
    const t = new RedBlackTree<number, number>();
    for (let i = 99; i >= 0; i--) t.set(i, i);
    expect(t.size).toBe(100);
    expect(t.min()!.key).toBe(0);
    expect(t.max()!.key).toBe(99);
  });

  it("works with string keys", () => {
    const t = new RedBlackTree<string, number>();
    t.set("banana", 1);
    t.set("apple", 2);
    t.set("cherry", 3);
    expect(t.keys()).toEqual(["apple", "banana", "cherry"]);
  });
});
