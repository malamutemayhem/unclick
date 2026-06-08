import { describe, it, expect } from "vitest";
import { BiMap } from "../bimap.js";

describe("BiMap", () => {
  it("sets and gets by key", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    expect(m.get("a")).toBe(1);
  });

  it("reverse lookup by value", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    expect(m.getKey(1)).toBe("a");
  });

  it("tracks size", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.size).toBe(2);
  });

  it("overwrites existing key", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    m.set("a", 2);
    expect(m.get("a")).toBe(2);
    expect(m.getKey(1)).toBeUndefined();
    expect(m.getKey(2)).toBe("a");
  });

  it("overwrites existing value", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    m.set("b", 1);
    expect(m.get("b")).toBe(1);
    expect(m.get("a")).toBeUndefined();
    expect(m.getKey(1)).toBe("b");
  });

  it("hasKey and hasValue", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    expect(m.hasKey("a")).toBe(true);
    expect(m.hasKey("b")).toBe(false);
    expect(m.hasValue(1)).toBe(true);
    expect(m.hasValue(2)).toBe(false);
  });

  it("deleteKey removes both directions", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    expect(m.deleteKey("a")).toBe(true);
    expect(m.get("a")).toBeUndefined();
    expect(m.getKey(1)).toBeUndefined();
    expect(m.size).toBe(0);
  });

  it("deleteValue removes both directions", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    expect(m.deleteValue(1)).toBe(true);
    expect(m.get("a")).toBeUndefined();
    expect(m.getKey(1)).toBeUndefined();
  });

  it("returns false for non-existent deletes", () => {
    const m = new BiMap<string, number>();
    expect(m.deleteKey("x")).toBe(false);
    expect(m.deleteValue(99)).toBe(false);
  });

  it("keys and values", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    m.set("b", 2);
    expect(m.keys().sort()).toEqual(["a", "b"]);
    expect(m.values().sort()).toEqual([1, 2]);
  });

  it("clears all entries", () => {
    const m = new BiMap<string, number>();
    m.set("a", 1);
    m.clear();
    expect(m.size).toBe(0);
  });
});
