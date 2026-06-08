import { describe, it, expect } from "vitest";
import { isString, isNumber, isBoolean, isNull, isUndefined, isNullish, isDefined, isArray, isObject, isFunction, isDate, isRegExp, isError, isInteger, isPositive, isNegative, isNonEmptyString, isNonEmptyArray } from "../type-guards.js";

describe("type-guards", () => {
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
    expect(isBoolean(1)).toBe(false);
  });

  it("isNull", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });

  it("isUndefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });

  it("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
  });

  it("isDefined", () => {
    expect(isDefined(42)).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction("fn")).toBe(false);
  });

  it("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp("abc")).toBe(false);
  });

  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError("error")).toBe(false);
  });

  it("isInteger", () => {
    expect(isInteger(5)).toBe(true);
    expect(isInteger(5.5)).toBe(false);
  });

  it("isPositive / isNegative", () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(-5)).toBe(false);
    expect(isNegative(-5)).toBe(true);
  });

  it("isNonEmptyString", () => {
    expect(isNonEmptyString("hello")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
  });

  it("isNonEmptyArray", () => {
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
  });
});
