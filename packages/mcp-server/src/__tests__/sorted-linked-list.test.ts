import { describe, it, expect } from "vitest";
import { SortedLinkedList } from "../sorted-linked-list.js";

describe("SortedLinkedList", () => {
  it("inserts in sorted order", () => {
    const list = new SortedLinkedList<number>();
    list.insert(3);
    list.insert(1);
    list.insert(2);
    expect(list.toArray()).toEqual([1, 2, 3]);
  });

  it("tracks size", () => {
    const list = new SortedLinkedList<number>();
    expect(list.size).toBe(0);
    list.insert(1);
    list.insert(2);
    expect(list.size).toBe(2);
  });

  it("returns first element", () => {
    const list = new SortedLinkedList<number>();
    list.insert(5);
    list.insert(2);
    list.insert(8);
    expect(list.first()).toBe(2);
  });

  it("returns undefined for first on empty list", () => {
    const list = new SortedLinkedList<number>();
    expect(list.first()).toBeUndefined();
  });

  it("checks contains", () => {
    const list = new SortedLinkedList<number>();
    list.insert(1);
    list.insert(3);
    list.insert(5);
    expect(list.contains(3)).toBe(true);
    expect(list.contains(4)).toBe(false);
  });

  it("removes elements", () => {
    const list = new SortedLinkedList<number>();
    list.insert(1);
    list.insert(2);
    list.insert(3);
    expect(list.remove(2)).toBe(true);
    expect(list.toArray()).toEqual([1, 3]);
    expect(list.size).toBe(2);
  });

  it("removes head element", () => {
    const list = new SortedLinkedList<number>();
    list.insert(1);
    list.insert(2);
    expect(list.remove(1)).toBe(true);
    expect(list.toArray()).toEqual([2]);
  });

  it("returns false when removing non-existent value", () => {
    const list = new SortedLinkedList<number>();
    list.insert(1);
    expect(list.remove(99)).toBe(false);
  });

  it("returns false when removing from empty list", () => {
    const list = new SortedLinkedList<number>();
    expect(list.remove(1)).toBe(false);
  });

  it("clears the list", () => {
    const list = new SortedLinkedList<number>();
    list.insert(1);
    list.insert(2);
    list.clear();
    expect(list.size).toBe(0);
    expect(list.toArray()).toEqual([]);
  });

  it("supports iteration", () => {
    const list = new SortedLinkedList<number>();
    list.insert(3);
    list.insert(1);
    list.insert(2);
    expect([...list]).toEqual([1, 2, 3]);
  });

  it("handles duplicates", () => {
    const list = new SortedLinkedList<number>();
    list.insert(2);
    list.insert(2);
    list.insert(1);
    expect(list.toArray()).toEqual([1, 2, 2]);
    expect(list.size).toBe(3);
  });

  it("supports custom comparator", () => {
    const list = new SortedLinkedList<string>((a: string, b: string) => a.length - b.length);
    list.insert("ccc");
    list.insert("a");
    list.insert("bb");
    expect(list.toArray()).toEqual(["a", "bb", "ccc"]);
  });

  it("works with strings using default comparator", () => {
    const list = new SortedLinkedList<string>();
    list.insert("banana");
    list.insert("apple");
    list.insert("cherry");
    expect(list.toArray()).toEqual(["apple", "banana", "cherry"]);
  });
});
