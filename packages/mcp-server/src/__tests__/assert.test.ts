import { describe, it, expect } from "vitest";
import {
  assert, assertDefined, assertString, assertNumber,
  assertOneOf, assertRange, assertNonEmpty, assertMatch,
  AssertionError,
} from "../assert.js";

describe("assert", () => {
  it("passes for truthy", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
    expect(() => assert("hi")).not.toThrow();
  });

  it("throws for falsy", () => {
    expect(() => assert(false)).toThrow(AssertionError);
    expect(() => assert(null)).toThrow(AssertionError);
    expect(() => assert(0)).toThrow(AssertionError);
    expect(() => assert("")).toThrow(AssertionError);
  });

  it("uses custom message", () => {
    expect(() => assert(false, "oops")).toThrow("oops");
  });
});

describe("assertDefined", () => {
  it("passes for defined values", () => {
    expect(() => assertDefined(0)).not.toThrow();
    expect(() => assertDefined("")).not.toThrow();
    expect(() => assertDefined(false)).not.toThrow();
  });

  it("throws for null/undefined", () => {
    expect(() => assertDefined(null)).toThrow(AssertionError);
    expect(() => assertDefined(undefined)).toThrow(AssertionError);
  });
});

describe("assertString", () => {
  it("passes for strings", () => {
    expect(() => assertString("hello")).not.toThrow();
  });

  it("throws for non-strings", () => {
    expect(() => assertString(42)).toThrow(AssertionError);
  });
});

describe("assertNumber", () => {
  it("passes for numbers", () => {
    expect(() => assertNumber(42)).not.toThrow();
  });

  it("throws for NaN", () => {
    expect(() => assertNumber(NaN)).toThrow(AssertionError);
  });
});

describe("assertOneOf", () => {
  it("passes when value is in list", () => {
    expect(() => assertOneOf("a", ["a", "b", "c"])).not.toThrow();
  });

  it("throws when value is not in list", () => {
    expect(() => assertOneOf("z", ["a", "b"])).toThrow(AssertionError);
  });
});

describe("assertRange", () => {
  it("passes within range", () => {
    expect(() => assertRange(5, 1, 10)).not.toThrow();
  });

  it("throws outside range", () => {
    expect(() => assertRange(0, 1, 10)).toThrow(AssertionError);
    expect(() => assertRange(11, 1, 10)).toThrow(AssertionError);
  });
});

describe("assertNonEmpty", () => {
  it("passes for non-empty", () => {
    expect(() => assertNonEmpty("hi")).not.toThrow();
    expect(() => assertNonEmpty([1])).not.toThrow();
  });

  it("throws for empty", () => {
    expect(() => assertNonEmpty("")).toThrow(AssertionError);
    expect(() => assertNonEmpty([])).toThrow(AssertionError);
  });
});

describe("assertMatch", () => {
  it("passes for matching string", () => {
    expect(() => assertMatch("hello123", /^[a-z]+\d+$/)).not.toThrow();
  });

  it("throws for non-matching", () => {
    expect(() => assertMatch("HELLO", /^[a-z]+$/)).toThrow(AssertionError);
  });
});
