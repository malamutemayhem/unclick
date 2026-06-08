import { describe, it, expect } from "vitest";
import { some, none, fromNullable } from "../option.js";

describe("option", () => {
  it("some wraps a value", () => {
    const opt = some(42);
    expect(opt.isSome()).toBe(true);
    expect(opt.isNone()).toBe(false);
    expect(opt.unwrap()).toBe(42);
  });

  it("none represents absence", () => {
    const opt = none();
    expect(opt.isSome()).toBe(false);
    expect(opt.isNone()).toBe(true);
    expect(() => opt.unwrap()).toThrow("None");
  });

  it("unwrapOr provides fallback", () => {
    expect(some(5).unwrapOr(0)).toBe(5);
    expect(none<number>().unwrapOr(0)).toBe(0);
  });

  it("map transforms some", () => {
    const result = some(3).map((n) => n * 2);
    expect(result.unwrap()).toBe(6);
  });

  it("map on none stays none", () => {
    const result = none<number>().map((n) => n * 2);
    expect(result.isNone()).toBe(true);
  });

  it("flatMap chains options", () => {
    const safeDivide = (a: number, b: number) =>
      b === 0 ? none<number>() : some(a / b);
    expect(some(10).flatMap((n) => safeDivide(n, 2)).unwrap()).toBe(5);
    expect(some(10).flatMap((n) => safeDivide(n, 0)).isNone()).toBe(true);
  });

  it("filter narrows some", () => {
    expect(some(5).filter((n) => n > 3).isSome()).toBe(true);
    expect(some(1).filter((n) => n > 3).isNone()).toBe(true);
  });

  it("match dispatches correctly", () => {
    expect(some(42).match({ some: (v) => `got ${v}`, none: () => "empty" })).toBe("got 42");
    expect(none().match({ some: () => "got", none: () => "empty" })).toBe("empty");
  });

  it("fromNullable converts nullable values", () => {
    expect(fromNullable(42).isSome()).toBe(true);
    expect(fromNullable(null).isNone()).toBe(true);
    expect(fromNullable(undefined).isNone()).toBe(true);
  });
});
