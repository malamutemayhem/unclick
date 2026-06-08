import { describe, it, expect } from "vitest";
import { safeParse, safeStringify, deepClone, isValidJson, getPath, setPath } from "../safe-json.js";

describe("safeParse", () => {
  it("parses valid JSON", () => {
    expect(safeParse('{"a":1}')).toEqual({ a: 1 });
  });
  it("returns undefined for invalid", () => {
    expect(safeParse("not json")).toBeUndefined();
  });
  it("returns fallback for invalid", () => {
    expect(safeParse("bad", { x: 1 })).toEqual({ x: 1 });
  });
});

describe("safeStringify", () => {
  it("stringifies objects", () => {
    expect(safeStringify({ a: 1 })).toBe('{"a":1}');
  });
  it("handles circular refs", () => {
    const obj: Record<string, unknown> = {};
    obj.self = obj;
    expect(safeStringify(obj)).toBeUndefined();
  });
});

describe("deepClone", () => {
  it("creates independent copy", () => {
    const orig = { a: { b: 1 } };
    const clone = deepClone(orig);
    clone.a.b = 99;
    expect(orig.a.b).toBe(1);
  });
});

describe("isValidJson", () => {
  it("true for valid", () => {
    expect(isValidJson('{"x":1}')).toBe(true);
  });
  it("false for invalid", () => {
    expect(isValidJson("{bad}")).toBe(false);
  });
});

describe("getPath", () => {
  it("resolves dotted path", () => {
    expect(getPath({ a: { b: { c: 42 } } }, "a.b.c")).toBe(42);
  });
  it("returns undefined for missing", () => {
    expect(getPath({ a: 1 }, "b.c")).toBeUndefined();
  });
});

describe("setPath", () => {
  it("sets nested value", () => {
    const obj: Record<string, unknown> = {};
    setPath(obj, "a.b.c", 42);
    expect(getPath(obj, "a.b.c")).toBe(42);
  });
  it("overwrites existing", () => {
    const obj: Record<string, unknown> = { a: { b: 1 } };
    setPath(obj, "a.b", 99);
    expect(getPath(obj, "a.b")).toBe(99);
  });
});
