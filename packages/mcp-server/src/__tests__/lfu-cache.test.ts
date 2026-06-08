import { describe, it, expect } from "vitest";
import { LFUCache } from "../lfu-cache.js";

describe("LFUCache", () => {
  it("rejects size < 1", () => {
    expect(() => new LFUCache(0)).toThrow();
  });

  it("set and get", () => {
    const c = new LFUCache<string, number>(3);
    c.set("a", 1);
    expect(c.get("a")).toBe(1);
  });

  it("returns undefined for missing key", () => {
    const c = new LFUCache<string, number>(3);
    expect(c.get("missing")).toBeUndefined();
  });

  it("evicts least frequently used", () => {
    const c = new LFUCache<string, number>(2);
    c.set("a", 1);
    c.set("b", 2);
    c.get("a");
    c.set("c", 3);
    expect(c.has("a")).toBe(true);
    expect(c.has("b")).toBe(false);
    expect(c.has("c")).toBe(true);
  });

  it("updates value in-place", () => {
    const c = new LFUCache<string, number>(3);
    c.set("a", 1);
    c.set("a", 2);
    expect(c.get("a")).toBe(2);
    expect(c.size).toBe(1);
  });

  it("delete removes entry", () => {
    const c = new LFUCache<string, number>(3);
    c.set("a", 1);
    expect(c.delete("a")).toBe(true);
    expect(c.has("a")).toBe(false);
    expect(c.delete("a")).toBe(false);
  });

  it("clear empties cache", () => {
    const c = new LFUCache<string, number>(3);
    c.set("a", 1);
    c.set("b", 2);
    c.clear();
    expect(c.size).toBe(0);
  });

  it("size tracks entries", () => {
    const c = new LFUCache<string, number>(3);
    expect(c.size).toBe(0);
    c.set("a", 1);
    expect(c.size).toBe(1);
  });

  it("keys returns all keys", () => {
    const c = new LFUCache<string, number>(3);
    c.set("a", 1);
    c.set("b", 2);
    expect(c.keys().sort()).toEqual(["a", "b"]);
  });

  it("respects capacity=1", () => {
    const c = new LFUCache<string, number>(1);
    c.set("a", 1);
    c.set("b", 2);
    expect(c.size).toBe(1);
    expect(c.has("b")).toBe(true);
    expect(c.has("a")).toBe(false);
  });
});
