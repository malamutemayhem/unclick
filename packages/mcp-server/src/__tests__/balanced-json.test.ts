import { describe, it, expect } from "vitest";
import { extractFirstJson, extractAllJson, parseFirstJson } from "../balanced-json.js";

describe("extractFirstJson", () => {
  it("extracts a simple object", () => {
    const result = extractFirstJson('here is {"a":1} done');
    expect(result).toEqual({ json: '{"a":1}', startIndex: 8, endIndex: 15 });
  });

  it("extracts a simple array", () => {
    const result = extractFirstJson("prefix [1,2,3] suffix");
    expect(result).toEqual({ json: "[1,2,3]", startIndex: 7, endIndex: 14 });
  });

  it("handles nested braces", () => {
    const result = extractFirstJson('{"a":{"b":2}}');
    expect(result).toEqual({ json: '{"a":{"b":2}}', startIndex: 0, endIndex: 13 });
  });

  it("ignores braces inside strings", () => {
    const result = extractFirstJson('{"msg":"hello { world }"}');
    expect(result!.json).toBe('{"msg":"hello { world }"}');
  });

  it("handles escaped quotes in strings", () => {
    const result = extractFirstJson('{"key":"val\\"ue"}');
    expect(result!.json).toBe('{"key":"val\\"ue"}');
  });

  it("returns null for unbalanced input", () => {
    expect(extractFirstJson('{"a":1')).toBeNull();
  });

  it("returns null for no JSON", () => {
    expect(extractFirstJson("just plain text")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(extractFirstJson("")).toBeNull();
  });
});

describe("extractAllJson", () => {
  it("extracts multiple objects", () => {
    const result = extractAllJson('first {"a":1} then {"b":2} end');
    expect(result).toHaveLength(2);
    expect(result[0].json).toBe('{"a":1}');
    expect(result[1].json).toBe('{"b":2}');
  });

  it("extracts mixed objects and arrays", () => {
    const result = extractAllJson('obj {"x":1} arr [2,3]');
    expect(result).toHaveLength(2);
    expect(result[0].json).toBe('{"x":1}');
    expect(result[1].json).toBe("[2,3]");
  });

  it("skips unbalanced fragments", () => {
    const result = extractAllJson('bad {"a": then {"b":2}');
    expect(result).toHaveLength(1);
    expect(result[0].json).toBe('{"b":2}');
  });

  it("returns empty array for no JSON", () => {
    expect(extractAllJson("nothing here")).toEqual([]);
  });
});

describe("parseFirstJson", () => {
  it("parses a valid object", () => {
    expect(parseFirstJson('text {"num":42} more')).toEqual({ num: 42 });
  });

  it("parses a valid array", () => {
    expect(parseFirstJson("before [1,2] after")).toEqual([1, 2]);
  });

  it("returns undefined for no JSON", () => {
    expect(parseFirstJson("no json here")).toBeUndefined();
  });

  it("returns undefined for invalid JSON content", () => {
    expect(parseFirstJson("{not valid json}")).toBeUndefined();
  });
});
