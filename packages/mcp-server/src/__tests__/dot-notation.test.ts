import { describe, it, expect } from "vitest";
import { DotNotation } from "../dot-notation.js";

describe("DotNotation", () => {
  it("gets nested values", () => {
    const obj = { a: { b: { c: 42 } } };
    expect(DotNotation.get(obj, "a.b.c")).toBe(42);
  });

  it("returns undefined for missing paths", () => {
    expect(DotNotation.get({ a: 1 }, "b.c")).toBeUndefined();
  });

  it("sets nested values", () => {
    const obj: Record<string, unknown> = {};
    DotNotation.set(obj, "a.b.c", 42);
    expect((obj as any).a.b.c).toBe(42);
  });

  it("creates intermediate objects", () => {
    const obj: Record<string, unknown> = {};
    DotNotation.set(obj, "x.y.z", "hello");
    expect(DotNotation.get(obj, "x.y.z")).toBe("hello");
  });

  it("checks existence", () => {
    const obj = { a: { b: 1 } };
    expect(DotNotation.has(obj, "a.b")).toBe(true);
    expect(DotNotation.has(obj, "a.c")).toBe(false);
  });

  it("removes nested values", () => {
    const obj = { a: { b: 1, c: 2 } } as Record<string, unknown>;
    expect(DotNotation.remove(obj, "a.b")).toBe(true);
    expect(DotNotation.has(obj, "a.b")).toBe(false);
    expect(DotNotation.has(obj, "a.c")).toBe(true);
  });

  it("returns false when removing non-existent path", () => {
    expect(DotNotation.remove({ a: 1 }, "b.c")).toBe(false);
  });

  it("flattens objects", () => {
    const flat = DotNotation.flatten({ a: { b: 1, c: { d: 2 } } });
    expect(flat["a.b"]).toBe(1);
    expect(flat["a.c.d"]).toBe(2);
  });

  it("unflattens objects", () => {
    const obj = DotNotation.unflatten({ "a.b": 1, "a.c": 2 });
    expect(DotNotation.get(obj, "a.b")).toBe(1);
    expect(DotNotation.get(obj, "a.c")).toBe(2);
  });

  it("lists all keys", () => {
    const keys = DotNotation.keys({ a: { b: 1 }, c: 2 });
    expect(keys).toContain("a.b");
    expect(keys).toContain("c");
  });

  it("picks specific paths", () => {
    const obj = { a: { b: 1, c: 2 }, d: 3 };
    const picked = DotNotation.pick(obj, ["a.b", "d"]);
    expect(DotNotation.get(picked, "a.b")).toBe(1);
    expect(DotNotation.get(picked, "d")).toBe(3);
    expect(DotNotation.has(picked, "a.c")).toBe(false);
  });

  it("handles array index notation", () => {
    const obj = { items: [10, 20, 30] } as Record<string, unknown>;
    expect(DotNotation.get(obj, "items[1]")).toBe(20);
  });
});
