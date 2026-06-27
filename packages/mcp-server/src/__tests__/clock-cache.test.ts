import { describe, it, expect } from "vitest";
import { ClockCache } from "../clock-cache.js";

describe("ClockCache", () => {
  it("stores and retrieves values", () => {
    const c = new ClockCache<string, number>(3);
    c.put("a", 1);
    c.put("b", 2);
    expect(c.get("a")).toBe(1);
    expect(c.get("b")).toBe(2);
  });

  it("evicts unreferenced entries", () => {
    const c = new ClockCache<string, number>(3);
    c.put("a", 1);
    c.put("b", 2);
    c.put("c", 3);
    c.get("b");
    c.get("c");
    c.put("d", 4);
    expect(c.has("a")).toBe(false);
    expect(c.has("b")).toBe(true);
    expect(c.has("d")).toBe(true);
  });

  it("updates existing key", () => {
    const c = new ClockCache<string, number>(2);
    c.put("a", 1);
    c.put("a", 10);
    expect(c.get("a")).toBe(10);
    expect(c.size()).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    const c = new ClockCache<string, number>(2);
    expect(c.get("x")).toBeUndefined();
  });

  it("size tracks count", () => {
    const c = new ClockCache<number, number>(5);
    c.put(1, 1);
    c.put(2, 2);
    expect(c.size()).toBe(2);
  });

  it("clear resets cache", () => {
    const c = new ClockCache<string, number>(3);
    c.put("a", 1);
    c.put("b", 2);
    c.clear();
    expect(c.size()).toBe(0);
    expect(c.has("a")).toBe(false);
  });

  it("keys returns all stored keys", () => {
    const c = new ClockCache<string, number>(3);
    c.put("x", 1);
    c.put("y", 2);
    expect(c.keys().sort()).toEqual(["x", "y"]);
  });
});
