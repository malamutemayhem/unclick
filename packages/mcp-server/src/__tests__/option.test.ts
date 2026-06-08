import { describe, it, expect } from "vitest";
import { some, none, fromNullable, tryCatch } from "../option.js";

describe("Option", () => {
  it("Some holds a value", () => {
    const s = some(42);
    expect(s.isSome()).toBe(true);
    expect(s.isNone()).toBe(false);
    expect(s.unwrap()).toBe(42);
  });

  it("None has no value", () => {
    const n = none();
    expect(n.isSome()).toBe(false);
    expect(n.isNone()).toBe(true);
    expect(() => n.unwrap()).toThrow("Cannot unwrap None");
  });

  it("map transforms Some", () => {
    const result = some(5).map((x) => x * 2);
    expect(result.unwrap()).toBe(10);
  });

  it("map on None stays None", () => {
    const result = none().map((x) => x);
    expect(result.isNone()).toBe(true);
  });

  it("flatMap chains", () => {
    const result = some(5).flatMap((x) => x > 0 ? some(x * 2) : none());
    expect(result.unwrap()).toBe(10);
  });

  it("getOrElse returns value for Some", () => {
    expect(some(42).getOrElse(0)).toBe(42);
  });

  it("getOrElse returns default for None", () => {
    expect(none().getOrElse(99)).toBe(99);
  });

  it("orElse returns Some for Some", () => {
    const result = some(1).orElse(() => some(2));
    expect(result.unwrap()).toBe(1);
  });

  it("orElse returns alternative for None", () => {
    const result = none().orElse(() => some(2));
    expect(result.unwrap()).toBe(2);
  });

  it("match dispatches correctly", () => {
    expect(some(5).match({ some: (v) => v + 1, none: () => 0 })).toBe(6);
    expect(none().match({ some: (v) => v, none: () => 0 })).toBe(0);
  });

  it("filter keeps or removes", () => {
    expect(some(5).filter((x) => x > 3).isSome()).toBe(true);
    expect(some(1).filter((x) => x > 3).isNone()).toBe(true);
  });

  it("fromNullable", () => {
    expect(fromNullable(42).isSome()).toBe(true);
    expect(fromNullable(null).isNone()).toBe(true);
    expect(fromNullable(undefined).isNone()).toBe(true);
  });

  it("tryCatch wraps success", () => {
    expect(tryCatch(() => 42).unwrap()).toBe(42);
  });

  it("tryCatch wraps failure", () => {
    expect(tryCatch(() => { throw new Error(); }).isNone()).toBe(true);
  });
});
