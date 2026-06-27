import { describe, it, expect } from "vitest";
import { SplayTree } from "../splay-tree.js";

describe("SplayTree", () => {
  it("sets and gets values", () => {
    const t = new SplayTree<number, string>();
    t.set(5, "five");
    t.set(3, "three");
    t.set(7, "seven");
    expect(t.get(5)).toBe("five");
    expect(t.get(3)).toBe("three");
    expect(t.get(7)).toBe("seven");
  });

  it("returns undefined for missing keys", () => {
    const t = new SplayTree<number, string>();
    expect(t.get(42)).toBeUndefined();
  });

  it("overwrites existing key", () => {
    const t = new SplayTree<number, string>();
    t.set(1, "a");
    t.set(1, "b");
    expect(t.get(1)).toBe("b");
    expect(t.size).toBe(1);
  });

  it("has checks existence", () => {
    const t = new SplayTree<number, number>();
    t.set(10, 100);
    expect(t.has(10)).toBe(true);
    expect(t.has(20)).toBe(false);
  });

  it("deletes key", () => {
    const t = new SplayTree<number, string>();
    t.set(1, "a");
    t.set(2, "b");
    t.set(3, "c");
    expect(t.delete(2)).toBe(true);
    expect(t.has(2)).toBe(false);
    expect(t.size).toBe(2);
  });

  it("delete returns false for missing", () => {
    const t = new SplayTree<number, number>();
    expect(t.delete(99)).toBe(false);
  });

  it("finds min and max", () => {
    const t = new SplayTree<number, string>();
    t.set(5, "five");
    t.set(1, "one");
    t.set(9, "nine");
    t.set(3, "three");
    expect(t.min()!.key).toBe(1);
    expect(t.max()!.key).toBe(9);
  });

  it("min/max on empty returns undefined", () => {
    const t = new SplayTree<number, number>();
    expect(t.min()).toBeUndefined();
    expect(t.max()).toBeUndefined();
  });

  it("keys returns sorted keys", () => {
    const t = new SplayTree<number, number>();
    t.set(3, 0);
    t.set(1, 0);
    t.set(2, 0);
    expect(t.keys()).toEqual([1, 2, 3]);
  });

  it("works with string keys", () => {
    const t = new SplayTree<string, number>();
    t.set("banana", 1);
    t.set("apple", 2);
    t.set("cherry", 3);
    expect(t.get("apple")).toBe(2);
    expect(t.keys()).toEqual(["apple", "banana", "cherry"]);
  });

  it("handles many operations", () => {
    const t = new SplayTree<number, number>();
    for (let i = 0; i < 50; i++) t.set(i, i * 10);
    expect(t.size).toBe(50);
    for (let i = 0; i < 50; i++) expect(t.get(i)).toBe(i * 10);
    for (let i = 0; i < 25; i++) t.delete(i);
    expect(t.size).toBe(25);
    expect(t.min()!.key).toBe(25);
  });
});
