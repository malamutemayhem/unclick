import { describe, it, expect } from "vitest";
import { getPath, setPath, deletePath, hasPath, paths } from "../accessor.js";

describe("getPath", () => {
  it("gets nested values", () => {
    expect(getPath({ a: { b: { c: 42 } } }, "a.b.c")).toBe(42);
  });

  it("handles array indices", () => {
    expect(getPath({ a: [10, 20, 30] }, "a[1]")).toBe(20);
  });

  it("returns undefined for missing paths", () => {
    expect(getPath({ a: 1 }, "b.c")).toBeUndefined();
  });
});

describe("setPath", () => {
  it("sets nested values", () => {
    const obj: Record<string, unknown> = {};
    setPath(obj, "a.b.c", 42);
    expect(getPath(obj, "a.b.c")).toBe(42);
  });

  it("creates intermediate objects", () => {
    const obj: Record<string, unknown> = {};
    setPath(obj, "x.y", "hello");
    expect(obj).toEqual({ x: { y: "hello" } });
  });
});

describe("deletePath", () => {
  it("deletes nested values", () => {
    const obj = { a: { b: 1, c: 2 } } as Record<string, unknown>;
    expect(deletePath(obj, "a.b")).toBe(true);
    expect(getPath(obj, "a.b")).toBeUndefined();
  });

  it("returns false for missing path", () => {
    expect(deletePath({}, "a.b")).toBe(false);
  });
});

describe("hasPath", () => {
  it("checks existence", () => {
    expect(hasPath({ a: { b: null } }, "a.b")).toBe(true);
    expect(hasPath({ a: 1 }, "a.b")).toBe(false);
  });
});

describe("paths", () => {
  it("lists all paths", () => {
    const result = paths({ a: 1, b: { c: 2 } });
    expect(result).toContain("a");
    expect(result).toContain("b");
    expect(result).toContain("b.c");
  });
});
