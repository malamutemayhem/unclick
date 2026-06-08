import { describe, it, expect } from "vitest";
import { LRUSet } from "../lru-set.js";

describe("lru-set", () => {
  it("add and has", () => {
    const s = new LRUSet<string>(5);
    s.add("a");
    expect(s.has("a")).toBe(true);
    expect(s.has("b")).toBe(false);
  });

  it("evicts oldest when full", () => {
    const s = new LRUSet<number>(3);
    s.add(1);
    s.add(2);
    s.add(3);
    s.add(4);
    expect(s.has(1)).toBe(false);
    expect(s.has(2)).toBe(true);
    expect(s.size).toBe(3);
  });

  it("has refreshes access order", () => {
    const s = new LRUSet<number>(3);
    s.add(1);
    s.add(2);
    s.add(3);
    s.has(1);
    s.add(4);
    expect(s.has(1)).toBe(true);
    expect(s.has(2)).toBe(false);
  });

  it("delete removes item", () => {
    const s = new LRUSet<string>(5);
    s.add("x");
    s.delete("x");
    expect(s.has("x")).toBe(false);
    expect(s.size).toBe(0);
  });

  it("values returns all items", () => {
    const s = new LRUSet<string>(5);
    s.add("a");
    s.add("b");
    expect(s.values()).toEqual(["a", "b"]);
  });

  it("oldest and newest", () => {
    const s = new LRUSet<number>(5);
    s.add(10);
    s.add(20);
    s.add(30);
    expect(s.oldest()).toBe(10);
    expect(s.newest()).toBe(30);
  });

  it("clear empties set", () => {
    const s = new LRUSet<number>(5);
    s.add(1);
    s.add(2);
    s.clear();
    expect(s.size).toBe(0);
  });

  it("iterable", () => {
    const s = new LRUSet<number>(5);
    s.add(1);
    s.add(2);
    const arr = [...s];
    expect(arr).toEqual([1, 2]);
  });
});
