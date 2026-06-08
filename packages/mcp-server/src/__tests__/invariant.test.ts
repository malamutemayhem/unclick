import { describe, it, expect } from "vitest";
import { invariant, precondition, postcondition, assertDefined, check, InvariantError } from "../invariant.js";

describe("invariant", () => {
  it("passes on truthy", () => {
    expect(() => invariant(true, "ok")).not.toThrow();
    expect(() => invariant(1, "ok")).not.toThrow();
    expect(() => invariant("yes", "ok")).not.toThrow();
  });

  it("throws InvariantError on falsy", () => {
    expect(() => invariant(false, "bad")).toThrow(InvariantError);
    expect(() => invariant(null, "bad")).toThrow("bad");
    expect(() => invariant(0, "bad")).toThrow(InvariantError);
  });
});

describe("precondition", () => {
  it("throws with prefix", () => {
    expect(() => precondition(false, "x > 0")).toThrow("Precondition failed: x > 0");
  });
});

describe("postcondition", () => {
  it("throws with prefix", () => {
    expect(() => postcondition(false, "result valid")).toThrow("Postcondition failed: result valid");
  });
});

describe("assertDefined", () => {
  it("passes on defined values", () => {
    expect(() => assertDefined(42, "val")).not.toThrow();
    expect(() => assertDefined("", "val")).not.toThrow();
    expect(() => assertDefined(0, "val")).not.toThrow();
  });

  it("throws on null/undefined", () => {
    expect(() => assertDefined(null, "val")).toThrow("Expected val to be defined");
    expect(() => assertDefined(undefined, "val")).toThrow("Expected val to be defined");
  });
});

describe("check", () => {
  it("returns value if defined", () => {
    expect(check(42, "missing")).toBe(42);
    expect(check("hello", "missing")).toBe("hello");
  });

  it("throws on null/undefined", () => {
    expect(() => check(null, "missing")).toThrow("missing");
    expect(() => check(undefined, "missing")).toThrow("missing");
  });
});
