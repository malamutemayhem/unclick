import { describe, it, expect } from "vitest";
import { getPath, getPathOr, setPath, hasPath, deletePath } from "../safe-access.js";

describe("getPath", () => {
  it("gets top-level value", () => {
    expect(getPath({ a: 1 }, "a")).toBe(1);
  });

  it("gets nested value", () => {
    expect(getPath({ a: { b: { c: 3 } } }, "a.b.c")).toBe(3);
  });

  it("returns undefined for missing path", () => {
    expect(getPath({ a: 1 }, "b")).toBeUndefined();
  });

  it("returns undefined for null intermediate", () => {
    expect(getPath({ a: null }, "a.b")).toBeUndefined();
  });

  it("returns undefined for non-object input", () => {
    expect(getPath(42, "a")).toBeUndefined();
  });
});

describe("getPathOr", () => {
  it("returns value when found", () => {
    expect(getPathOr({ a: 1 }, "a", 99)).toBe(1);
  });

  it("returns fallback when missing", () => {
    expect(getPathOr({}, "a.b", "default")).toBe("default");
  });
});

describe("setPath", () => {
  it("sets top-level value", () => {
    const obj: Record<string, unknown> = {};
    setPath(obj, "a", 1);
    expect(obj.a).toBe(1);
  });

  it("sets nested value creating intermediates", () => {
    const obj: Record<string, unknown> = {};
    setPath(obj, "a.b.c", 42);
    expect(getPath(obj, "a.b.c")).toBe(42);
  });

  it("overwrites existing value", () => {
    const obj: Record<string, unknown> = { a: { b: 1 } };
    setPath(obj, "a.b", 2);
    expect(getPath(obj, "a.b")).toBe(2);
  });
});

describe("hasPath", () => {
  it("returns true for existing path", () => {
    expect(hasPath({ a: { b: 1 } }, "a.b")).toBe(true);
  });

  it("returns false for missing path", () => {
    expect(hasPath({ a: 1 }, "b")).toBe(false);
  });

  it("returns true even for null/undefined values", () => {
    expect(hasPath({ a: null }, "a")).toBe(true);
  });
});

describe("deletePath", () => {
  it("deletes top-level key", () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    expect(deletePath(obj, "a")).toBe(true);
    expect("a" in obj).toBe(false);
  });

  it("deletes nested key", () => {
    const obj: Record<string, unknown> = { a: { b: 1, c: 2 } };
    expect(deletePath(obj, "a.b")).toBe(true);
    expect(hasPath(obj, "a.b")).toBe(false);
    expect(hasPath(obj, "a.c")).toBe(true);
  });

  it("returns false for missing path", () => {
    expect(deletePath({}, "nope")).toBe(false);
  });
});
