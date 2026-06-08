import { describe, it, expect } from "vitest";
import {
  asString, requireString, asStringOrDefault,
  asNumber, asInteger, asPositiveInteger, asNumberOrDefault, clampNumber,
  asBoolean, asBooleanOrDefault,
  asStringArray, isRecord, asRecord,
  asEnum, asEnumOrDefault,
  asPagination,
} from "../arg-coerce.js";

describe("asString", () => {
  it("passes through strings", () => expect(asString("hello")).toBe("hello"));
  it("trims whitespace", () => expect(asString("  hi  ")).toBe("hi"));
  it("returns undefined for empty string", () => expect(asString("")).toBeUndefined());
  it("returns undefined for 'null' string", () => expect(asString("null")).toBeUndefined());
  it("returns undefined for 'undefined' string", () => expect(asString("undefined")).toBeUndefined());
  it("converts numbers to string", () => expect(asString(42)).toBe("42"));
  it("converts booleans to string", () => expect(asString(true)).toBe("true"));
  it("returns undefined for null", () => expect(asString(null)).toBeUndefined());
  it("returns undefined for objects", () => expect(asString({})).toBeUndefined());
});

describe("requireString", () => {
  it("returns valid strings", () => expect(requireString("test", "name")).toBe("test"));
  it("throws for undefined", () => expect(() => requireString(undefined, "name")).toThrow("name"));
  it("throws for empty string", () => expect(() => requireString("", "name")).toThrow("name"));
});

describe("asStringOrDefault", () => {
  it("returns value if valid", () => expect(asStringOrDefault("test", "default")).toBe("test"));
  it("returns fallback if empty", () => expect(asStringOrDefault("", "default")).toBe("default"));
});

describe("asNumber", () => {
  it("passes through finite numbers", () => expect(asNumber(42)).toBe(42));
  it("parses numeric strings", () => expect(asNumber("3.14")).toBe(3.14));
  it("returns undefined for NaN", () => expect(asNumber(NaN)).toBeUndefined());
  it("returns undefined for Infinity", () => expect(asNumber(Infinity)).toBeUndefined());
  it("returns undefined for empty string", () => expect(asNumber("")).toBeUndefined());
  it("returns undefined for non-numeric string", () => expect(asNumber("abc")).toBeUndefined());
  it("returns undefined for null", () => expect(asNumber(null)).toBeUndefined());
  it("handles negative numbers", () => expect(asNumber("-5")).toBe(-5));
});

describe("asInteger", () => {
  it("passes through integers", () => expect(asInteger(5)).toBe(5));
  it("rounds floats", () => expect(asInteger(5.7)).toBe(6));
  it("parses string integers", () => expect(asInteger("10")).toBe(10));
});

describe("asPositiveInteger", () => {
  it("accepts positive integers", () => expect(asPositiveInteger(5)).toBe(5));
  it("rejects zero", () => expect(asPositiveInteger(0)).toBeUndefined());
  it("rejects negatives", () => expect(asPositiveInteger(-3)).toBeUndefined());
});

describe("clampNumber", () => {
  it("clamps to range", () => expect(clampNumber(150, 1, 100, 20)).toBe(100));
  it("uses fallback for bad input", () => expect(clampNumber("abc", 1, 100, 20)).toBe(20));
  it("passes through values in range", () => expect(clampNumber(50, 1, 100, 20)).toBe(50));
});

describe("asBoolean", () => {
  it("passes through booleans", () => expect(asBoolean(true)).toBe(true));
  it("parses 'true'", () => expect(asBoolean("true")).toBe(true));
  it("parses 'false'", () => expect(asBoolean("false")).toBe(false));
  it("parses 'yes'", () => expect(asBoolean("yes")).toBe(true));
  it("parses 'no'", () => expect(asBoolean("no")).toBe(false));
  it("parses 'on'", () => expect(asBoolean("on")).toBe(true));
  it("parses 'off'", () => expect(asBoolean("off")).toBe(false));
  it("parses '1'", () => expect(asBoolean("1")).toBe(true));
  it("parses '0'", () => expect(asBoolean("0")).toBe(false));
  it("treats numbers as truthy/falsy", () => {
    expect(asBoolean(1)).toBe(true);
    expect(asBoolean(0)).toBe(false);
  });
  it("returns undefined for random string", () => expect(asBoolean("maybe")).toBeUndefined());
});

describe("asStringArray", () => {
  it("filters arrays to valid strings", () => {
    expect(asStringArray(["a", "", null, "b"])).toEqual(["a", "b"]);
  });
  it("splits comma-separated strings", () => {
    expect(asStringArray("a, b, c")).toEqual(["a", "b", "c"]);
  });
  it("returns empty array for non-array/string", () => {
    expect(asStringArray(42)).toEqual([]);
  });
});

describe("isRecord / asRecord", () => {
  it("identifies objects", () => expect(isRecord({ a: 1 })).toBe(true));
  it("rejects arrays", () => expect(isRecord([1])).toBe(false));
  it("rejects null", () => expect(isRecord(null)).toBe(false));
  it("asRecord returns empty for non-objects", () => expect(asRecord("test")).toEqual({}));
});

describe("asEnum", () => {
  const modes = ["list", "create", "delete"] as const;
  it("matches valid values", () => expect(asEnum("list", modes)).toBe("list"));
  it("is case-insensitive", () => expect(asEnum("LIST", modes)).toBe("list"));
  it("returns undefined for invalid", () => expect(asEnum("update", modes)).toBeUndefined());
});

describe("asEnumOrDefault", () => {
  const modes = ["list", "create"] as const;
  it("returns match", () => expect(asEnumOrDefault("create", modes, "list")).toBe("create"));
  it("returns default", () => expect(asEnumOrDefault("bad", modes, "list")).toBe("list"));
});

describe("asPagination", () => {
  it("uses defaults", () => {
    const p = asPagination({});
    expect(p.limit).toBe(20);
    expect(p.offset).toBeUndefined();
    expect(p.cursor).toBeUndefined();
  });

  it("clamps limit", () => {
    expect(asPagination({ limit: 999 }).limit).toBe(100);
    expect(asPagination({ limit: 0 }).limit).toBe(1);
  });

  it("reads cursor from starting_after", () => {
    expect(asPagination({ starting_after: "abc" }).cursor).toBe("abc");
  });

  it("reads cursor from page_token", () => {
    expect(asPagination({ page_token: "xyz" }).cursor).toBe("xyz");
  });
});
