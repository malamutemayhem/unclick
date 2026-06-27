import { describe, it, expect } from "vitest";
import {
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isDate, isRegExp, isError,
  isPromise, hasProperty, isNonEmpty, assertNever
} from "../type-guards.js";

describe("type-guards", () => {
  it("isString", () => {
    expect(isString("hi")).toBe(true);
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

  it("isNull and isUndefined", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });

  it("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
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
    expect(isRegExp("/abc/")).toBe(false);
  });

  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError("error")).toBe(false);
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise(42)).toBe(false);
  });

  it("hasProperty", () => {
    expect(hasProperty({ name: "hi" }, "name")).toBe(true);
    expect(hasProperty({}, "name")).toBe(false);
  });

  it("isNonEmpty", () => {
    expect(isNonEmpty([1])).toBe(true);
    expect(isNonEmpty([])).toBe(false);
  });

  it("assertNever throws", () => {
    expect(() => assertNever("oops" as never)).toThrow();
  });
});
