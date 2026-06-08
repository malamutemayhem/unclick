import { describe, it, expect } from "vitest";
import { isString, isNumber, isBoolean, isArray, isObject, isNullish, isNonNullish, hasProperty, hasProperties, assertType, narrowType } from "../type-guard.js";

describe("type guards", () => {
  it("isString", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(42)).toBe(false);
  });
  it("isNumber", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("42")).toBe(false);
  });
  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });
  it("isArray", () => {
    expect(isArray([1, 2])).toBe(true);
    expect(isArray("abc")).toBe(false);
  });
  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
  });
  it("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
  });
  it("isNonNullish", () => {
    expect(isNonNullish(0)).toBe(true);
    expect(isNonNullish(null)).toBe(false);
  });
});

describe("hasProperty / hasProperties", () => {
  it("checks single property", () => {
    expect(hasProperty({ a: 1 }, "a")).toBe(true);
    expect(hasProperty({ a: 1 }, "b")).toBe(false);
  });
  it("checks multiple properties", () => {
    expect(hasProperties({ a: 1, b: 2 }, "a", "b")).toBe(true);
    expect(hasProperties({ a: 1 }, "a", "b")).toBe(false);
  });
});

describe("assertType", () => {
  it("passes for correct type", () => {
    expect(() => assertType("hello", isString)).not.toThrow();
  });
  it("throws for wrong type", () => {
    expect(() => assertType(42, isString, "Expected string")).toThrow("Expected string");
  });
});

describe("narrowType", () => {
  it("returns value on match", () => {
    expect(narrowType("hello", isString)).toBe("hello");
  });
  it("returns undefined on mismatch", () => {
    expect(narrowType(42, isString)).toBeUndefined();
  });
});
