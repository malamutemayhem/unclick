import { describe, it, expect, vi } from "vitest";
import { invariant, precondition, postcondition, unreachable, todo, deprecated } from "../invariant.js";

describe("invariant", () => {
  it("passes on truthy", () => {
    expect(() => invariant(true)).not.toThrow();
    expect(() => invariant(1)).not.toThrow();
    expect(() => invariant("yes")).not.toThrow();
  });

  it("throws on falsy", () => {
    expect(() => invariant(false)).toThrow("Invariant violation");
    expect(() => invariant(0)).toThrow("Invariant violation");
    expect(() => invariant(null)).toThrow("Invariant violation");
  });

  it("throws with custom message", () => {
    expect(() => invariant(false, "custom")).toThrow("custom");
  });
});

describe("precondition", () => {
  it("passes on truthy", () => {
    expect(() => precondition(true)).not.toThrow();
  });

  it("throws on falsy", () => {
    expect(() => precondition(false)).toThrow("Precondition failed");
  });
});

describe("postcondition", () => {
  it("throws on falsy", () => {
    expect(() => postcondition(false)).toThrow("Postcondition failed");
  });
});

describe("unreachable", () => {
  it("always throws", () => {
    expect(() => unreachable()).toThrow("Unreachable");
  });
});

describe("todo", () => {
  it("throws not implemented", () => {
    expect(() => todo()).toThrow("Not yet implemented");
    expect(() => todo("feature X")).toThrow("feature X");
  });
});

describe("deprecated", () => {
  it("logs warning", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    deprecated("use newFn instead");
    expect(spy).toHaveBeenCalledWith("DEPRECATED: use newFn instead");
    spy.mockRestore();
  });
});
