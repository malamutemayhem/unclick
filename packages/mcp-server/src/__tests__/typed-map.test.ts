import { describe, it, expect } from "vitest";
import { TypedMap, BiMap } from "../typed-map.js";

describe("TypedMap", () => {
  it("set and get", () => {
    const m = new TypedMap<"a" | "b", number>();
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBeUndefined();
  });

  it("getOrDefault", () => {
    const m = new TypedMap<string, number>();
    expect(m.getOrDefault("x", 42)).toBe(42);
    m.set("x", 10);
    expect(m.getOrDefault("x", 42)).toBe(10);
  });

  it("has, delete, size", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1);
    expect(m.has("a")).toBe(true);
    expect(m.size).toBe(1);
    m.delete("a");
    expect(m.has("a")).toBe(false);
  });

  it("keys, values, entries", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2);
    expect(m.keys().sort()).toEqual(["a", "b"]);
    expect(m.values().sort()).toEqual([1, 2]);
    expect(m.entries()).toHaveLength(2);
  });

  it("toObject and fromObject", () => {
    const m = TypedMap.fromObject({ x: 1, y: 2 });
    expect(m.get("x")).toBe(1);
    expect(m.toObject()).toEqual({ x: 1, y: 2 });
  });

  it("map transforms values", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2);
    const doubled = m.map((v) => v * 2);
    expect(doubled.get("a")).toBe(2);
    expect(doubled.get("b")).toBe(4);
  });

  it("filter keeps matching entries", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2).set("c", 3);
    const evens = m.filter((v) => v % 2 === 0);
    expect(evens.size).toBe(1);
    expect(evens.get("b")).toBe(2);
  });

  it("clear empties map", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1);
    m.clear();
    expect(m.size).toBe(0);
  });
});

describe("BiMap", () => {
  it("forward and reverse lookup", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.get("a")).toBe(1);
    expect(bm.getByValue(1)).toBe("a");
  });

  it("has and hasValue", () => {
    const bm = new BiMap<string, number>();
    bm.set("x", 42);
    expect(bm.has("x")).toBe(true);
    expect(bm.hasValue(42)).toBe(true);
  });

  it("overwrite updates both directions", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("a", 2);
    expect(bm.get("a")).toBe(2);
    expect(bm.getByValue(1)).toBeUndefined();
    expect(bm.getByValue(2)).toBe("a");
  });

  it("delete removes both directions", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.delete("a");
    expect(bm.has("a")).toBe(false);
    expect(bm.hasValue(1)).toBe(false);
  });

  it("size and clear", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1).set("b", 2);
    expect(bm.size).toBe(2);
    bm.clear();
    expect(bm.size).toBe(0);
  });
});
