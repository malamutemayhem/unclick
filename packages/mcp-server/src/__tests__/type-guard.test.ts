import { describe, it, expect } from "vitest";
import {
  isString, isNumber, isBoolean, isNull, isUndefined, isNullish,
  isObject, isArray, isFunction, isDate, isRegExp, isError, isPromise,
  isMap, isSet, isSymbol, isNonEmpty, isPrimitive, hasProperty, hasProperties
} from "../type-guard.js";

describe("type-guard", () => {
  it("isString", () => {
    expect(isString("hello")).toBe(true);
    expect(isString(42)).toBe(false);
  });

  it("isNumber rejects NaN", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber("42")).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });

  it("isNull/isUndefined/isNullish", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
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

  it("isDate rejects invalid dates", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
  });

  it("isRegExp", () => {
    expect(isRegExp(/test/)).toBe(true);
  });

  it("isError", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError({ message: "x" })).toBe(false);
  });

  it("isPromise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(true);
    expect(isPromise(42)).toBe(false);
  });

  it("isMap/isSet", () => {
    expect(isMap(new Map())).toBe(true);
    expect(isSet(new Set())).toBe(true);
  });

  it("isSymbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
  });

  it("isNonEmpty", () => {
    expect(isNonEmpty([1])).toBe(true);
    expect(isNonEmpty([])).toBe(false);
    expect(isNonEmpty("hi")).toBe(true);
    expect(isNonEmpty("")).toBe(false);
  });

  it("isPrimitive", () => {
    expect(isPrimitive("a")).toBe(true);
    expect(isPrimitive(42)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive({})).toBe(false);
  });

  it("hasProperty", () => {
    expect(hasProperty({ name: "x" }, "name")).toBe(true);
    expect(hasProperty({}, "name")).toBe(false);
  });

  it("hasProperties", () => {
    expect(hasProperties({ a: 1, b: 2 }, ["a", "b"])).toBe(true);
    expect(hasProperties({ a: 1 }, ["a", "b"])).toBe(false);
  });
});
