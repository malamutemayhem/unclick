import { describe, it, expect } from "vitest";
import { get, set, has, remove, flatten } from "../json-pointer.js";

describe("get", () => {
  it("gets nested value", () => {
    expect(get({ a: { b: 42 } }, "/a/b")).toBe(42);
  });

  it("gets array element", () => {
    expect(get({ items: [10, 20, 30] }, "/items/1")).toBe(20);
  });

  it("returns root for empty pointer", () => {
    expect(get({ x: 1 }, "")).toEqual({ x: 1 });
  });

  it("returns undefined for missing path", () => {
    expect(get({ a: 1 }, "/b")).toBeUndefined();
  });

  it("handles tilde escaping", () => {
    expect(get({ "a/b": 1 }, "/a~1b")).toBe(1);
    expect(get({ "a~b": 2 }, "/a~0b")).toBe(2);
  });
});

describe("set", () => {
  it("sets nested value", () => {
    const result = set({ a: { b: 1 } }, "/a/b", 99);
    expect(get(result, "/a/b")).toBe(99);
  });

  it("sets array element", () => {
    const result = set({ items: [1, 2, 3] }, "/items/1", 99);
    expect(get(result, "/items/1")).toBe(99);
  });
});

describe("has", () => {
  it("returns true for existing path", () => {
    expect(has({ a: { b: 1 } }, "/a/b")).toBe(true);
  });

  it("returns false for missing path", () => {
    expect(has({ a: 1 }, "/b")).toBe(false);
  });

  it("returns true for root", () => {
    expect(has({}, "")).toBe(true);
  });
});

describe("remove", () => {
  it("removes key", () => {
    const result = remove({ a: 1, b: 2 }, "/a") as Record<string, number>;
    expect(result.a).toBeUndefined();
    expect(result.b).toBe(2);
  });
});

describe("flatten", () => {
  it("flattens nested object", () => {
    const result = flatten({ a: 1, b: { c: 2 } });
    expect(result["/a"]).toBe(1);
    expect(result["/b/c"]).toBe(2);
  });

  it("flattens arrays", () => {
    const result = flatten({ items: [1, 2] });
    expect(result["/items/0"]).toBe(1);
    expect(result["/items/1"]).toBe(2);
  });
});
