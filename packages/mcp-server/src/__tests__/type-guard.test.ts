import { describe, it, expect } from "vitest";
import {
  isString, isNumber, isBoolean, isNull, isUndefined, isNil,
  isArray, isObject, isFunction, isDate, isRegExp, isPromise,
  assertDefined, assertType
} from "../type-guard.js";

describe("type-guard", () => {
  it("isString", () => {
    expect(isString("hi")).toBe(true);
    expect(isString(5)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("5")).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });

  it("isNull and isUndefined", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });

  it("isNil", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([1, 2])).toBe(true);
    expect(isArray("string")).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([1])).toBe(false);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction("fn")).toBe(false);
  });

  it("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate("2024-01-01")).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp("abc")).toBe(false);
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise(42)).toBe(false);
  });

  it("assertDefined returns value", () => {
    expect(assertDefined("hello")).toBe("hello");
    expect(assertDefined(0)).toBe(0);
  });

  it("assertDefined throws for null/undefined", () => {
    expect(() => assertDefined(null)).toThrow();
    expect(() => assertDefined(undefined)).toThrow();
    expect(() => assertDefined(null, "custom msg")).toThrow("custom msg");
  });

  it("assertType returns typed value", () => {
    const val = assertType("hi", isString);
    expect(val).toBe("hi");
  });

  it("assertType throws on mismatch", () => {
    expect(() => assertType(42, isString)).toThrow("Type assertion failed");
    expect(() => assertType(42, isString, "not a string")).toThrow("not a string");
  });
});
