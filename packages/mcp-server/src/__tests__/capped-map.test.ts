import { describe, it, expect } from "vitest";
import { CappedMap } from "../capped-map.js";

describe("capped-map", () => {
  it("stores and retrieves values", () => {
    const m = new CappedMap<string, number>(10);
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
  });

  it("evicts oldest when full", () => {
    const m = new CappedMap<string, number>(2);
    m.set("a", 1);
    m.set("b", 2);
    m.set("c", 3);
    expect(m.has("a")).toBe(false);
    expect(m.get("b")).toBe(2);
    expect(m.get("c")).toBe(3);
  });

  it("get refreshes entry (LRU behavior)", () => {
    const m = new CappedMap<string, number>(2);
    m.set("a", 1);
    m.set("b", 2);
    m.get("a");
    m.set("c", 3);
    expect(m.has("a")).toBe(true);
    expect(m.has("b")).toBe(false);
  });

  it("set updates existing value without eviction", () => {
    const m = new CappedMap<string, number>(2);
    m.set("a", 1);
    m.set("b", 2);
    m.set("a", 10);
    expect(m.get("a")).toBe(10);
    expect(m.size).toBe(2);
  });

  it("delete removes entry", () => {
    const m = new CappedMap<string, number>(5);
    m.set("a", 1);
    expect(m.delete("a")).toBe(true);
    expect(m.has("a")).toBe(false);
    expect(m.delete("z")).toBe(false);
  });

  it("oldest and newest return extremes", () => {
    const m = new CappedMap<string, number>(5);
    m.set("a", 1);
    m.set("b", 2);
    expect(m.oldest()).toEqual(["a", 1]);
    expect(m.newest()).toEqual(["b", 2]);
  });

  it("clear empties the map", () => {
    const m = new CappedMap<string, number>(5);
    m.set("a", 1);
    m.clear();
    expect(m.size).toBe(0);
  });

  it("throws if maxSize < 1", () => {
    expect(() => new CappedMap(0)).toThrow();
  });
});
