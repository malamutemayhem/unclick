import { describe, it, expect } from "vitest";
import {
  isString, isNumber, isBoolean, isNull, isUndefined, isNil,
  isObject, isArray, isFunction, isError, isPromise, isNonEmpty,
  hasProperty, assertNever,
} from "../type-guards.js";

describe("type guards", () => {
  it("isString", () => {
    expect(isString("hi")).toBe(true);
    expect(isString(42)).toBe(false);
  });

  it("isNumber excludes NaN", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("42")).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });

  it("isNull", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });

  it("isUndefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });

  it("isNil", () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
  });

  it("isObject excludes arrays and null", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("isFunction", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction("fn")).toBe(false);
  });

  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError({ message: "not an error" })).toBe(false);
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise(42)).toBe(false);
  });

  it("isNonEmpty", () => {
    expect(isNonEmpty("hi")).toBe(true);
    expect(isNonEmpty("")).toBe(false);
    expect(isNonEmpty([1])).toBe(true);
    expect(isNonEmpty([])).toBe(false);
    expect(isNonEmpty(null)).toBe(false);
    expect(isNonEmpty(undefined)).toBe(false);
  });

  it("hasProperty", () => {
    expect(hasProperty({ name: "test" }, "name")).toBe(true);
    expect(hasProperty({}, "name")).toBe(false);
    expect(hasProperty(null, "name")).toBe(false);
  });

  it("assertNever throws", () => {
    expect(() => assertNever("oops" as never)).toThrow();
  });
});
