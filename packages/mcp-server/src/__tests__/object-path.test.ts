import { describe, it, expect } from "vitest";
import { get, set, has, del, flatten, unflatten } from "../object-path.js";

describe("object-path", () => {
  it("get nested value", () => {
    expect(get({ a: { b: { c: 42 } } }, "a.b.c")).toBe(42);
  });

  it("get with default", () => {
    expect(get({ a: 1 }, "b.c", "default")).toBe("default");
  });

  it("get with array index", () => {
    expect(get({ a: [10, 20, 30] }, "a[1]")).toBe(20);
  });

  it("set nested value", () => {
    const obj: Record<string, unknown> = {};
    set(obj, "a.b.c", 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it("set creates arrays for numeric keys", () => {
    const obj: Record<string, unknown> = {};
    set(obj, "a.0", "first");
    expect(Array.isArray((obj as Record<string, unknown>).a)).toBe(true);
  });

  it("has checks existence", () => {
    expect(has({ a: { b: 1 } }, "a.b")).toBe(true);
    expect(has({ a: { b: 1 } }, "a.c")).toBe(false);
  });

  it("del removes property", () => {
    const obj = { a: { b: 1, c: 2 } };
    expect(del(obj, "a.b")).toBe(true);
    expect(obj).toEqual({ a: { c: 2 } });
  });

  it("del returns false for missing", () => {
    expect(del({ a: 1 }, "b.c")).toBe(false);
  });

  it("flatten nested object", () => {
    expect(flatten({ a: { b: 1 }, c: 2 })).toEqual({ "a.b": 1, c: 2 });
  });

  it("unflatten dot-path keys", () => {
    expect(unflatten({ "a.b": 1, c: 2 })).toEqual({ a: { b: 1 }, c: 2 });
  });
});
