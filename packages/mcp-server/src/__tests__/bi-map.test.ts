import { describe, it, expect } from "vitest";
import { BiMap } from "../bi-map.js";

describe("BiMap", () => {
  it("set and get by key", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.get("a")).toBe(1);
  });

  it("getKey reverse lookup", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.getKey(1)).toBe("a");
  });

  it("has and hasValue", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.has("a")).toBe(true);
    expect(bm.has("b")).toBe(false);
    expect(bm.hasValue(1)).toBe(true);
    expect(bm.hasValue(2)).toBe(false);
  });

  it("overwrites key preserving bijection", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("a", 2);
    expect(bm.get("a")).toBe(2);
    expect(bm.hasValue(1)).toBe(false);
    expect(bm.getKey(2)).toBe("a");
  });

  it("overwrites value preserving bijection", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 1);
    expect(bm.get("b")).toBe(1);
    expect(bm.has("a")).toBe(false);
    expect(bm.getKey(1)).toBe("b");
  });

  it("delete by key", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.delete("a")).toBe(true);
    expect(bm.has("a")).toBe(false);
    expect(bm.hasValue(1)).toBe(false);
    expect(bm.delete("a")).toBe(false);
  });

  it("deleteValue", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    expect(bm.deleteValue(1)).toBe(true);
    expect(bm.has("a")).toBe(false);
    expect(bm.deleteValue(1)).toBe(false);
  });

  it("clear", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    bm.clear();
    expect(bm.size).toBe(0);
  });

  it("size", () => {
    const bm = new BiMap<string, number>();
    expect(bm.size).toBe(0);
    bm.set("a", 1);
    bm.set("b", 2);
    expect(bm.size).toBe(2);
  });

  it("keys and values iterators", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    expect([...bm.keys()].sort()).toEqual(["a", "b"]);
    expect([...bm.values()].sort()).toEqual([1, 2]);
  });

  it("entries iterator", () => {
    const bm = new BiMap<string, number>();
    bm.set("x", 10);
    const entries = [...bm.entries()];
    expect(entries).toEqual([["x", 10]]);
  });

  it("inverse returns swapped BiMap", () => {
    const bm = new BiMap<string, number>();
    bm.set("a", 1);
    bm.set("b", 2);
    const inv = bm.inverse();
    expect(inv.get(1)).toBe("a");
    expect(inv.get(2)).toBe("b");
    expect(inv.getKey("a")).toBe(1);
  });

  it("from creates from entries", () => {
    const bm = BiMap.from([["a", 1], ["b", 2]] as [string, number][]);
    expect(bm.get("a")).toBe(1);
    expect(bm.getKey(2)).toBe("b");
    expect(bm.size).toBe(2);
  });
});
