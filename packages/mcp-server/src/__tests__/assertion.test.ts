import { describe, it, expect } from "vitest";
import { assert, assertEqual, assertNotEqual, assertDefined, assertType, assertInRange, assertMatches, unreachable, AssertionError } from "../assertion.js";

describe("assert", () => {
  it("passes on truthy", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
  });

  it("throws on falsy", () => {
    expect(() => assert(false)).toThrow(AssertionError);
    expect(() => assert(0)).toThrow(AssertionError);
  });

  it("custom message", () => {
    expect(() => assert(false, "custom")).toThrow("custom");
  });
});

describe("assertEqual", () => {
  it("passes on equal", () => {
    expect(() => assertEqual(5, 5)).not.toThrow();
  });

  it("throws on not equal", () => {
    expect(() => assertEqual(5, 6)).toThrow(AssertionError);
  });
});

describe("assertNotEqual", () => {
  it("passes on different", () => {
    expect(() => assertNotEqual(5, 6)).not.toThrow();
  });

  it("throws on equal", () => {
    expect(() => assertNotEqual(5, 5)).toThrow(AssertionError);
  });
});

describe("assertDefined", () => {
  it("passes on defined", () => {
    expect(() => assertDefined(42)).not.toThrow();
  });

  it("throws on null", () => {
    expect(() => assertDefined(null)).toThrow(AssertionError);
  });

  it("throws on undefined", () => {
    expect(() => assertDefined(undefined)).toThrow(AssertionError);
  });
});

describe("assertType", () => {
  it("passes on correct type", () => {
    expect(() => assertType("hello", "string")).not.toThrow();
  });

  it("throws on wrong type", () => {
    expect(() => assertType(42, "string")).toThrow(AssertionError);
  });
});

describe("assertInRange", () => {
  it("passes in range", () => {
    expect(() => assertInRange(5, 1, 10)).not.toThrow();
  });

  it("throws out of range", () => {
    expect(() => assertInRange(15, 1, 10)).toThrow(AssertionError);
  });
});

describe("assertMatches", () => {
  it("passes on match", () => {
    expect(() => assertMatches("hello", /^hel/)).not.toThrow();
  });

  it("throws on no match", () => {
    expect(() => assertMatches("hello", /^xyz/)).toThrow(AssertionError);
  });
});

describe("unreachable", () => {
  it("always throws", () => {
    expect(() => unreachable()).toThrow(AssertionError);
  });
});
