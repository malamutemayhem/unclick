import { describe, it, expect } from "vitest";
import { safeParse, safeStringify, parseWithDates, deepFreeze, stripUndefined } from "../safe-json.js";

describe("safeParse", () => {
  it("parses valid JSON", () => {
    expect(safeParse('{"a":1}')).toEqual({ a: 1 });
  });

  it("returns fallback on invalid JSON", () => {
    expect(safeParse("bad", null)).toBeNull();
    expect(safeParse("bad")).toBeUndefined();
  });
});

describe("safeStringify", () => {
  it("stringifies objects", () => {
    expect(safeStringify({ a: 1 })).toBe('{"a":1}');
  });

  it("handles BigInt", () => {
    const result = safeStringify({ n: BigInt(123) });
    expect(result).toBe('{"n":"123"}');
  });

  it("returns undefined on circular", () => {
    const obj: Record<string, unknown> = {};
    obj.self = obj;
    expect(safeStringify(obj)).toBeUndefined();
  });
});

describe("parseWithDates", () => {
  it("converts ISO date strings to Date objects", () => {
    const result = parseWithDates('{"d":"2025-01-15T12:00:00.000Z"}') as { d: Date };
    expect(result.d).toBeInstanceOf(Date);
    expect(result.d.getFullYear()).toBe(2025);
  });

  it("leaves non-date strings alone", () => {
    const result = parseWithDates('{"s":"hello"}') as { s: string };
    expect(typeof result.s).toBe("string");
  });
});

describe("deepFreeze", () => {
  it("freezes nested objects", () => {
    const obj = deepFreeze({ a: { b: 1 } });
    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.a)).toBe(true);
  });
});

describe("stripUndefined", () => {
  it("removes undefined values", () => {
    expect(stripUndefined({ a: 1, b: undefined, c: "hi" })).toEqual({ a: 1, c: "hi" });
  });

  it("works recursively", () => {
    expect(stripUndefined({ a: { b: undefined, c: 1 } })).toEqual({ a: { c: 1 } });
  });
});
