import { describe, it, expect } from "vitest";
import { assert, assertEqual, assertNotEqual, assertDefined, assertType, assertInstanceOf, assertArrayLength, assertInRange, assertMatches, AssertionError } from "../assertion.js";

describe("assertion", () => {
  it("assert passes on truthy", () => { expect(() => assert(true)).not.toThrow(); });
  it("assert throws on falsy", () => { expect(() => assert(false)).toThrow(AssertionError); });
  it("assert custom message", () => { expect(() => assert(false, "nope")).toThrow("nope"); });
  it("assertEqual passes on equal", () => { expect(() => assertEqual(1, 1)).not.toThrow(); });
  it("assertEqual throws on unequal", () => { expect(() => assertEqual(1, 2)).toThrow(AssertionError); });
  it("assertNotEqual passes", () => { expect(() => assertNotEqual(1, 2)).not.toThrow(); });
  it("assertNotEqual throws on equal", () => { expect(() => assertNotEqual(1, 1)).toThrow(AssertionError); });
  it("assertDefined passes", () => { expect(() => assertDefined("x")).not.toThrow(); });
  it("assertDefined throws on null", () => { expect(() => assertDefined(null)).toThrow(AssertionError); });
  it("assertDefined throws on undefined", () => { expect(() => assertDefined(undefined)).toThrow(AssertionError); });
  it("assertType passes", () => { expect(() => assertType("hi", "string")).not.toThrow(); });
  it("assertType throws", () => { expect(() => assertType(42, "string")).toThrow(AssertionError); });
  it("assertInstanceOf passes", () => { expect(() => assertInstanceOf(new Error(), Error)).not.toThrow(); });
  it("assertInstanceOf throws", () => { expect(() => assertInstanceOf("x", Error)).toThrow(AssertionError); });
  it("assertArrayLength passes", () => { expect(() => assertArrayLength([1, 2], 2)).not.toThrow(); });
  it("assertArrayLength throws", () => { expect(() => assertArrayLength([1], 2)).toThrow(AssertionError); });
  it("assertInRange passes", () => { expect(() => assertInRange(5, 0, 10)).not.toThrow(); });
  it("assertInRange throws", () => { expect(() => assertInRange(15, 0, 10)).toThrow(AssertionError); });
  it("assertMatches passes", () => { expect(() => assertMatches("hello", /^h/)).not.toThrow(); });
  it("assertMatches throws", () => { expect(() => assertMatches("hello", /^x/)).toThrow(AssertionError); });
});
