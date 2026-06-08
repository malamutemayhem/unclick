import { describe, it, expect } from "vitest";
import { safeJsonStringify, safeJsonParse } from "../safe-json.js";

describe("safeJsonStringify", () => {
  it("stringifies normal objects", () => {
    expect(safeJsonStringify({ a: 1 })).toBe('{"a":1}');
  });

  it("handles BigInt", () => {
    const result = safeJsonStringify({ id: BigInt(123) });
    expect(result).toContain("123");
  });

  it("handles functions", () => {
    const result = safeJsonStringify({ fn: () => {} });
    expect(result).toContain("[Function]");
  });

  it("handles Error objects", () => {
    const result = safeJsonStringify({ err: new Error("boom") });
    expect(result).toContain("boom");
    expect(result).toContain("name");
  });

  it("handles Uint8Array", () => {
    const result = safeJsonStringify({ data: new Uint8Array([1, 2, 3]) });
    expect(result).toContain("Uint8Array");
    expect(result).toContain("3 bytes");
  });

  it("handles Set", () => {
    const result = safeJsonStringify({ items: new Set([1, 2, 3]) });
    expect(result).toContain("[1,2,3]");
  });

  it("handles Map", () => {
    const result = safeJsonStringify({ m: new Map([["a", 1]]) });
    expect(result).toContain('"a"');
  });

  it("returns null for circular refs", () => {
    const obj: Record<string, unknown> = {};
    obj.self = obj;
    expect(safeJsonStringify(obj)).toBeNull();
  });
});

describe("safeJsonParse", () => {
  it("parses valid JSON", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 });
  });

  it("returns undefined for invalid JSON", () => {
    expect(safeJsonParse("not json")).toBeUndefined();
  });

  it("returns undefined for empty string", () => {
    expect(safeJsonParse("")).toBeUndefined();
  });
});
