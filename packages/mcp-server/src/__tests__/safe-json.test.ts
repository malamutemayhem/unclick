import { describe, it, expect } from "vitest";
import { safeParse, safeStringify, stringifySafe, jsonLines, parseJsonLines, isValidJson } from "../safe-json.js";

describe("safeParse", () => {
  it("parses valid JSON", () => {
    expect(safeParse('{"a":1}')).toEqual({ a: 1 });
  });

  it("returns fallback for invalid JSON", () => {
    expect(safeParse("not json", null)).toBe(null);
  });

  it("returns undefined without fallback", () => {
    expect(safeParse("bad")).toBeUndefined();
  });
});

describe("safeStringify", () => {
  it("stringifies valid objects", () => {
    expect(safeStringify({ a: 1 })).toBe('{"a":1}');
  });
});

describe("stringifySafe", () => {
  it("handles circular references", () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;
    const result = stringifySafe(obj);
    expect(result).toContain("[Circular]");
  });

  it("handles special types", () => {
    const result = stringifySafe({ d: new Date("2024-01-01T00:00:00Z"), r: /test/gi });
    expect(result).toContain("2024-01-01");
    expect(result).toContain("/test/gi");
  });
});

describe("jsonLines", () => {
  it("creates JSONL", () => {
    expect(jsonLines([{ a: 1 }, { b: 2 }])).toBe('{"a":1}\n{"b":2}');
  });

  it("parseJsonLines roundtrips", () => {
    const data = [{ x: 1 }, { y: 2 }];
    expect(parseJsonLines(jsonLines(data))).toEqual(data);
  });
});

describe("isValidJson", () => {
  it("validates JSON", () => {
    expect(isValidJson('{"a":1}')).toBe(true);
    expect(isValidJson("not json")).toBe(false);
  });
});
