import { describe, it, expect } from "vitest";
import {
  compactStringify, prettyStringify, sortedStringify,
  stableHash, jsonSize, isJsonString, stripNulls,
} from "../compact-json.js";

describe("compactStringify", () => {
  it("produces compact output", () => {
    expect(compactStringify({ a: 1 })).toBe('{"a":1}');
  });
});

describe("prettyStringify", () => {
  it("produces indented output", () => {
    const result = prettyStringify({ a: 1 });
    expect(result).toContain("\n");
  });
});

describe("sortedStringify", () => {
  it("sorts keys alphabetically", () => {
    expect(sortedStringify({ b: 2, a: 1 })).toBe('{"a":1,"b":2}');
  });

  it("sorts nested keys", () => {
    expect(sortedStringify({ z: { b: 2, a: 1 } })).toBe('{"z":{"a":1,"b":2}}');
  });
});

describe("stableHash", () => {
  it("produces same hash regardless of key order", () => {
    expect(stableHash({ a: 1, b: 2 })).toBe(stableHash({ b: 2, a: 1 }));
  });

  it("produces different hashes for different values", () => {
    expect(stableHash({ a: 1 })).not.toBe(stableHash({ a: 2 }));
  });
});

describe("jsonSize", () => {
  it("returns byte size of JSON", () => {
    expect(jsonSize({ a: 1 })).toBe(7);
  });
});

describe("isJsonString", () => {
  it("detects valid JSON", () => {
    expect(isJsonString('{"a":1}')).toBe(true);
    expect(isJsonString("42")).toBe(true);
    expect(isJsonString('"hello"')).toBe(true);
  });

  it("rejects invalid JSON", () => {
    expect(isJsonString("not json")).toBe(false);
    expect(isJsonString("{broken")).toBe(false);
  });
});

describe("stripNulls", () => {
  it("removes null and undefined values", () => {
    expect(stripNulls({ a: 1, b: null, c: undefined, d: "hi" })).toEqual({ a: 1, d: "hi" });
  });

  it("strips nested nulls", () => {
    expect(stripNulls({ a: { b: null, c: 1 } })).toEqual({ a: { c: 1 } });
  });

  it("handles arrays", () => {
    expect(stripNulls([{ a: null, b: 1 }])).toEqual([{ b: 1 }]);
  });
});
