import { describe, it, expect } from "vitest";
import { LruMap } from "../lru-map.js";

describe("LruMap", () => {
  it("stores and retrieves values", () => {
    const map = new LruMap<string, number>(3);
    map.set("a", 1);
    expect(map.get("a")).toBe(1);
  });

  it("evicts least recently used when full", () => {
    const map = new LruMap<string, number>(2);
    map.set("a", 1);
    map.set("b", 2);
    map.set("c", 3);
    expect(map.has("a")).toBe(false);
    expect(map.has("b")).toBe(true);
    expect(map.has("c")).toBe(true);
  });

  it("get refreshes item to most recent", () => {
    const map = new LruMap<string, number>(2);
    map.set("a", 1);
    map.set("b", 2);
    map.get("a");
    map.set("c", 3);
    expect(map.has("a")).toBe(true);
    expect(map.has("b")).toBe(false);
  });

  it("returns undefined for missing key", () => {
    const map = new LruMap<string, number>(3);
    expect(map.get("nope")).toBeUndefined();
  });

  it("delete removes item", () => {
    const map = new LruMap<string, number>(3);
    map.set("a", 1);
    expect(map.delete("a")).toBe(true);
    expect(map.has("a")).toBe(false);
  });

  it("clear empties the map", () => {
    const map = new LruMap<string, number>(3);
    map.set("a", 1);
    map.set("b", 2);
    map.clear();
    expect(map.size).toBe(0);
  });

  it("tracks size", () => {
    const map = new LruMap<string, number>(5);
    map.set("a", 1);
    map.set("b", 2);
    expect(map.size).toBe(2);
  });

  it("keys/values/entries work", () => {
    const map = new LruMap<string, number>(3);
    map.set("a", 1);
    map.set("b", 2);
    expect(map.keys()).toEqual(["a", "b"]);
    expect(map.values()).toEqual([1, 2]);
    expect(map.entries()).toEqual([["a", 1], ["b", 2]]);
  });

  it("updating existing key refreshes position", () => {
    const map = new LruMap<string, number>(2);
    map.set("a", 1);
    map.set("b", 2);
    map.set("a", 10);
    map.set("c", 3);
    expect(map.has("b")).toBe(false);
    expect(map.get("a")).toBe(10);
  });
});
