import { describe, it, expect } from "vitest";
import { TypedMap } from "../typed-map.js";

describe("TypedMap", () => {
  it("set and get", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2);
    expect(m.get("a")).toBe(1);
    expect(m.get("b")).toBe(2);
  });

  it("getOrDefault", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1);
    expect(m.getOrDefault("a", 0)).toBe(1);
    expect(m.getOrDefault("missing", 42)).toBe(42);
  });

  it("validates on set", () => {
    const m = new TypedMap<string, number>((_, v) => v > 0);
    expect(() => m.set("a", -1)).toThrow("Validation failed");
    m.set("a", 5);
    expect(m.get("a")).toBe(5);
  });

  it("has and delete", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1);
    expect(m.has("a")).toBe(true);
    m.delete("a");
    expect(m.has("a")).toBe(false);
  });

  it("toObject and fromObject", () => {
    const obj = { x: 1, y: 2 };
    const m = TypedMap.fromObject(obj);
    expect(m.toObject()).toEqual(obj);
  });

  it("map transforms values", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2);
    const doubled = m.map((v: number) => v * 2);
    expect(doubled.get("a")).toBe(2);
    expect(doubled.get("b")).toBe(4);
  });

  it("filter keeps matching", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2).set("c", 3);
    const evens = m.filter((v: number) => v % 2 === 0);
    expect(evens.size).toBe(1);
    expect(evens.get("b")).toBe(2);
  });

  it("size and clear", () => {
    const m = new TypedMap<string, number>();
    m.set("a", 1).set("b", 2);
    expect(m.size).toBe(2);
    m.clear();
    expect(m.size).toBe(0);
  });
});
