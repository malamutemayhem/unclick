import { describe, it, expect } from "vitest";
import { BPlusTree } from "../btree-plus.js";

describe("BPlusTree", () => {
  it("insert and search", () => {
    const tree = new BPlusTree<number, string>(4);
    tree.insert(5, "five");
    tree.insert(3, "three");
    tree.insert(7, "seven");
    expect(tree.search(5)).toBe("five");
    expect(tree.search(3)).toBe("three");
    expect(tree.search(7)).toBe("seven");
  });

  it("search returns null for missing key", () => {
    const tree = new BPlusTree<number, string>(4);
    tree.insert(1, "one");
    expect(tree.search(99)).toBeNull();
  });

  it("insert updates existing key", () => {
    const tree = new BPlusTree<number, string>(4);
    tree.insert(1, "one");
    tree.insert(1, "ONE");
    expect(tree.search(1)).toBe("ONE");
    expect(tree.size).toBe(1);
  });

  it("size tracks insertions", () => {
    const tree = new BPlusTree<number, string>(4);
    expect(tree.size).toBe(0);
    tree.insert(1, "a");
    tree.insert(2, "b");
    tree.insert(3, "c");
    expect(tree.size).toBe(3);
  });

  it("range query", () => {
    const tree = new BPlusTree<number, string>(4);
    for (let i = 0; i < 20; i++) tree.insert(i, `v${i}`);
    const result = tree.range(5, 10);
    expect(result).toHaveLength(6);
    expect(result[0].key).toBe(5);
    expect(result[5].key).toBe(10);
  });

  it("min and max", () => {
    const tree = new BPlusTree<number, string>(4);
    tree.insert(10, "ten");
    tree.insert(3, "three");
    tree.insert(20, "twenty");
    expect(tree.min()!.key).toBe(3);
    expect(tree.max()!.key).toBe(20);
  });

  it("min and max on empty", () => {
    const tree = new BPlusTree<number, string>(4);
    expect(tree.min()).toBeNull();
    expect(tree.max()).toBeNull();
  });

  it("all returns sorted entries", () => {
    const tree = new BPlusTree<number, string>(4);
    tree.insert(5, "five");
    tree.insert(1, "one");
    tree.insert(9, "nine");
    tree.insert(3, "three");
    const all = tree.all();
    expect(all.map(e => e.key)).toEqual([1, 3, 5, 9]);
  });

  it("handles many insertions with splits", () => {
    const tree = new BPlusTree<number, number>(3);
    for (let i = 0; i < 100; i++) tree.insert(i, i * 10);
    expect(tree.size).toBe(100);
    expect(tree.height).toBeGreaterThan(1);
    for (let i = 0; i < 100; i++) {
      expect(tree.search(i)).toBe(i * 10);
    }
  });

  it("string keys work", () => {
    const tree = new BPlusTree<string, number>(4);
    tree.insert("banana", 1);
    tree.insert("apple", 2);
    tree.insert("cherry", 3);
    expect(tree.search("apple")).toBe(2);
    expect(tree.all().map(e => e.key)).toEqual(["apple", "banana", "cherry"]);
  });

  it("range on empty tree", () => {
    const tree = new BPlusTree<number, string>(4);
    expect(tree.range(1, 10)).toEqual([]);
  });
});
