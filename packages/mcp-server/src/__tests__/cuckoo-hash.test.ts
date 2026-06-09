import { describe, it, expect } from "vitest";
import { CuckooHashMap } from "../cuckoo-hash.js";

describe("CuckooHashMap", () => {
  it("sets and gets values", () => {
    const map = new CuckooHashMap<number>();
    map.set("a", 1);
    map.set("b", 2);
    expect(map.get("a")).toBe(1);
    expect(map.get("b")).toBe(2);
  });

  it("overwrites existing keys", () => {
    const map = new CuckooHashMap<number>();
    map.set("key", 10);
    map.set("key", 20);
    expect(map.get("key")).toBe(20);
    expect(map.size).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    const map = new CuckooHashMap<number>();
    expect(map.get("missing")).toBeUndefined();
  });

  it("has checks existence", () => {
    const map = new CuckooHashMap<string>();
    map.set("x", "val");
    expect(map.has("x")).toBe(true);
    expect(map.has("y")).toBe(false);
  });

  it("deletes entries", () => {
    const map = new CuckooHashMap<number>();
    map.set("a", 1);
    expect(map.delete("a")).toBe(true);
    expect(map.has("a")).toBe(false);
    expect(map.size).toBe(0);
  });

  it("delete returns false for missing key", () => {
    const map = new CuckooHashMap<number>();
    expect(map.delete("nope")).toBe(false);
  });

  it("handles many insertions with rehashing", () => {
    const map = new CuckooHashMap<number>(4);
    for (let i = 0; i < 50; i++) {
      map.set(`key${i}`, i);
    }
    expect(map.size).toBe(50);
    for (let i = 0; i < 50; i++) {
      expect(map.get(`key${i}`)).toBe(i);
    }
  });

  it("lists all keys", () => {
    const map = new CuckooHashMap<number>();
    map.set("a", 1);
    map.set("b", 2);
    map.set("c", 3);
    const keys = map.keys().sort();
    expect(keys).toEqual(["a", "b", "c"]);
  });

  it("clear empties the map", () => {
    const map = new CuckooHashMap<number>();
    map.set("a", 1);
    map.clear();
    expect(map.size).toBe(0);
    expect(map.has("a")).toBe(false);
  });

  it("loadFactor reflects usage", () => {
    const map = new CuckooHashMap<number>(16);
    expect(map.loadFactor).toBe(0);
    map.set("a", 1);
    expect(map.loadFactor).toBeGreaterThan(0);
  });
});
