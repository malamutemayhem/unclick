import { describe, it, expect } from "vitest";
import { invariant, precondition, postcondition, unreachable, assertNonNull, assertDefined, check } from "../invariant.js";

describe("invariant", () => {
  it("passes for truthy", () => {
    expect(() => invariant(true)).not.toThrow();
    expect(() => invariant(1)).not.toThrow();
  });
  it("throws for falsy", () => {
    expect(() => invariant(false)).toThrow("Invariant");
    expect(() => invariant(null, "custom")).toThrow("custom");
  });
});

describe("precondition", () => {
  it("passes for truthy", () => {
    expect(() => precondition(true)).not.toThrow();
  });
  it("throws for falsy", () => {
    expect(() => precondition(false)).toThrow("Precondition");
  });
});

describe("postcondition", () => {
  it("throws for falsy", () => {
    expect(() => postcondition(false)).toThrow("Postcondition");
  });
});

describe("unreachable", () => {
  it("always throws", () => {
    expect(() => unreachable()).toThrow("Unreachable");
  });
});

describe("assertNonNull", () => {
  it("returns value for non-null", () => {
    expect(assertNonNull(42)).toBe(42);
    expect(assertNonNull("")).toBe("");
    expect(assertNonNull(0)).toBe(0);
  });
  it("throws for null", () => {
    expect(() => assertNonNull(null)).toThrow("non-null");
  });
  it("throws for undefined", () => {
    expect(() => assertNonNull(undefined)).toThrow("non-null");
  });
});

describe("assertDefined", () => {
  it("returns value for defined", () => {
    expect(assertDefined(null)).toBeNull();
    expect(assertDefined(0)).toBe(0);
  });
  it("throws for undefined", () => {
    expect(() => assertDefined(undefined)).toThrow("defined");
  });
});

describe("check", () => {
  it("returns value for non-null", () => {
    expect(check(42)).toBe(42);
  });
  it("throws for null", () => {
    expect(() => check(null)).toThrow();
  });
});
