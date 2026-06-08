import { describe, it, expect } from "vitest";
import { assert, assertEqual, assertNotEqual, assertDefined, assertType, assertArrayLength, assertInRange, assertMatch, AssertionError } from "../assert.js";

describe("assert", () => {
  it("passes for truthy", () => {
    assert(true);
    assert(1);
    assert("hello");
  });

  it("throws for falsy", () => {
    expect(() => assert(false)).toThrow(AssertionError);
    expect(() => assert(null)).toThrow(AssertionError);
    expect(() => assert(0)).toThrow(AssertionError);
  });

  it("uses custom message", () => {
    expect(() => assert(false, "custom")).toThrow("custom");
  });
});

describe("assertEqual", () => {
  it("passes for equal", () => {
    assertEqual(1, 1);
    assertEqual("a", "a");
  });

  it("throws for not equal", () => {
    expect(() => assertEqual(1, 2)).toThrow(AssertionError);
  });
});

describe("assertNotEqual", () => {
  it("passes for different", () => {
    assertNotEqual(1, 2);
  });

  it("throws for equal", () => {
    expect(() => assertNotEqual(1, 1)).toThrow(AssertionError);
  });
});

describe("assertDefined", () => {
  it("passes for defined", () => {
    assertDefined(0);
    assertDefined("");
    assertDefined(false);
  });

  it("throws for null/undefined", () => {
    expect(() => assertDefined(null)).toThrow(AssertionError);
    expect(() => assertDefined(undefined)).toThrow(AssertionError);
  });
});

describe("assertType", () => {
  it("passes for correct type", () => {
    assertType("hello", "string");
    assertType(42, "number");
  });

  it("throws for wrong type", () => {
    expect(() => assertType("hello", "number")).toThrow(AssertionError);
  });
});

describe("assertArrayLength", () => {
  it("passes for correct length", () => {
    assertArrayLength([1, 2, 3], 3);
  });

  it("throws for wrong length", () => {
    expect(() => assertArrayLength([1], 2)).toThrow(AssertionError);
  });
});

describe("assertInRange", () => {
  it("passes in range", () => {
    assertInRange(5, 0, 10);
  });

  it("throws out of range", () => {
    expect(() => assertInRange(15, 0, 10)).toThrow(AssertionError);
  });
});

describe("assertMatch", () => {
  it("passes for matching pattern", () => {
    assertMatch("hello", /^hel/);
  });

  it("throws for non-matching", () => {
    expect(() => assertMatch("hello", /^world/)).toThrow(AssertionError);
  });
});
