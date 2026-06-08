import { describe, it, expect } from "vitest";
import { safeParse, safeStringify, deepFreeze, flattenObject, unflattenObject } from "../safe-json.js";

describe("safeParse", () => {
  it("parses valid JSON", () => {
    expect(safeParse('{"a":1}')).toEqual({ a: 1 });
  });

  it("returns undefined for invalid JSON", () => {
    expect(safeParse("not json")).toBeUndefined();
  });

  it("returns fallback for invalid JSON", () => {
    expect(safeParse("bad", { default: true })).toEqual({ default: true });
  });

  it("parses arrays", () => {
    expect(safeParse("[1,2,3]")).toEqual([1, 2, 3]);
  });

  it("parses primitives", () => {
    expect(safeParse("42")).toBe(42);
    expect(safeParse('"hello"')).toBe("hello");
    expect(safeParse("true")).toBe(true);
    expect(safeParse("null")).toBeNull();
  });
});

describe("safeStringify", () => {
  it("stringifies objects", () => {
    expect(safeStringify({ a: 1 })).toBe('{"a":1}');
  });

  it("handles bigint values", () => {
    const result = safeStringify({ n: BigInt(123) });
    expect(result).toBe('{"n":"123"}');
  });

  it("supports indentation", () => {
    const result = safeStringify({ a: 1 }, 2);
    expect(result).toContain("\n");
  });

  it("returns undefined for circular refs", () => {
    const obj: any = {};
    obj.self = obj;
    expect(safeStringify(obj)).toBeUndefined();
  });
});

describe("deepFreeze", () => {
  it("freezes an object", () => {
    const obj = deepFreeze({ a: 1 });
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it("freezes nested objects", () => {
    const obj = deepFreeze({ a: { b: 2 } });
    expect(Object.isFrozen((obj as any).a)).toBe(true);
  });

  it("returns primitives unchanged", () => {
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze("hi")).toBe("hi");
    expect(deepFreeze(null)).toBeNull();
  });
});

describe("flattenObject", () => {
  it("flattens nested object", () => {
    expect(flattenObject({ a: { b: { c: 1 } } })).toEqual({ "a.b.c": 1 });
  });

  it("handles flat objects", () => {
    expect(flattenObject({ x: 1, y: 2 })).toEqual({ x: 1, y: 2 });
  });

  it("preserves arrays", () => {
    const result = flattenObject({ items: [1, 2] });
    expect(result).toEqual({ items: [1, 2] });
  });

  it("handles empty object", () => {
    expect(flattenObject({})).toEqual({});
  });

  it("handles mixed nesting", () => {
    const result = flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } });
    expect(result).toEqual({ a: 1, "b.c": 2, "b.d.e": 3 });
  });
});

describe("unflattenObject", () => {
  it("unflattens dotted keys", () => {
    expect(unflattenObject({ "a.b.c": 1 })).toEqual({ a: { b: { c: 1 } } });
  });

  it("handles flat keys", () => {
    expect(unflattenObject({ x: 1 })).toEqual({ x: 1 });
  });

  it("merges sibling keys", () => {
    expect(unflattenObject({ "a.b": 1, "a.c": 2 })).toEqual({ a: { b: 1, c: 2 } });
  });

  it("roundtrips with flattenObject", () => {
    const original = { a: { b: 1, c: { d: 2 } }, e: 3 };
    expect(unflattenObject(flattenObject(original))).toEqual(original);
  });
});
