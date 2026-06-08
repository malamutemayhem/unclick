import { describe, it, expect } from "vitest";
import { SparseMap } from "../sparse-map.js";

describe("SparseMap", () => {
  it("set and get", () => {
    const m = new SparseMap<string>();
    m.set(5, "hello");
    expect(m.get(5)).toBe("hello");
  });

  it("has returns true for existing key", () => {
    const m = new SparseMap<number>();
    m.set(10, 42);
    expect(m.has(10)).toBe(true);
  });

  it("has returns false for missing key", () => {
    const m = new SparseMap<number>();
    expect(m.has(10)).toBe(false);
  });

  it("get returns undefined for missing key", () => {
    const m = new SparseMap<number>();
    expect(m.get(10)).toBeUndefined();
  });

  it("overwrite existing key", () => {
    const m = new SparseMap<number>();
    m.set(1, 10);
    m.set(1, 20);
    expect(m.get(1)).toBe(20);
    expect(m.size).toBe(1);
  });

  it("delete removes key", () => {
    const m = new SparseMap<number>();
    m.set(5, 42);
    expect(m.delete(5)).toBe(true);
    expect(m.has(5)).toBe(false);
    expect(m.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const m = new SparseMap<number>();
    expect(m.delete(5)).toBe(false);
  });

  it("delete preserves other entries", () => {
    const m = new SparseMap<number>();
    m.set(1, 10);
    m.set(2, 20);
    m.set(3, 30);
    m.delete(2);
    expect(m.get(1)).toBe(10);
    expect(m.get(3)).toBe(30);
    expect(m.size).toBe(2);
  });

  it("clear empties map", () => {
    const m = new SparseMap<number>();
    m.set(1, 10);
    m.set(2, 20);
    m.clear();
    expect(m.size).toBe(0);
    expect(m.has(1)).toBe(false);
  });

  it("keys returns all keys", () => {
    const m = new SparseMap<number>();
    m.set(3, 30);
    m.set(1, 10);
    expect(m.keys().sort()).toEqual([1, 3]);
  });

  it("values returns all values", () => {
    const m = new SparseMap<string>();
    m.set(0, "a");
    m.set(1, "b");
    expect(m.values().sort()).toEqual(["a", "b"]);
  });

  it("entries returns key-value pairs", () => {
    const m = new SparseMap<number>();
    m.set(5, 50);
    expect(m.entries()).toEqual([[5, 50]]);
  });

  it("forEach iterates entries", () => {
    const m = new SparseMap<number>();
    m.set(1, 10);
    m.set(2, 20);
    const collected: [number, number][] = [];
    m.forEach((v, k) => collected.push([k, v]));
    expect(collected).toHaveLength(2);
  });

  it("throws for out-of-range key", () => {
    const m = new SparseMap<number>(10);
    expect(() => m.set(100, 1)).toThrow("out of range");
  });
});
