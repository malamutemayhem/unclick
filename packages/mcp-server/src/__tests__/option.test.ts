import { describe, it, expect } from "vitest";
import { Option } from "../option.js";

describe("Option", () => {
  it("some holds a value", () => {
    const opt = Option.some(42);
    expect(opt.isSome()).toBe(true);
    expect(opt.isNone()).toBe(false);
    expect(opt.unwrap()).toBe(42);
  });

  it("none has no value", () => {
    const opt = Option.none<number>();
    expect(opt.isSome()).toBe(false);
    expect(opt.isNone()).toBe(true);
    expect(() => opt.unwrap()).toThrow("None");
  });

  it("unwrapOr provides default", () => {
    expect(Option.none<number>().unwrapOr(0)).toBe(0);
    expect(Option.some(5).unwrapOr(0)).toBe(5);
  });

  it("from handles null/undefined", () => {
    expect(Option.from(null).isNone()).toBe(true);
    expect(Option.from(undefined).isNone()).toBe(true);
    expect(Option.from(42).isSome()).toBe(true);
  });

  it("map transforms value", () => {
    expect(Option.some(5).map((x) => x * 2).unwrap()).toBe(10);
    expect(Option.none<number>().map((x) => x * 2).isNone()).toBe(true);
  });

  it("flatMap chains", () => {
    const safeDivide = (a: number, b: number) =>
      b === 0 ? Option.none<number>() : Option.some(a / b);
    expect(Option.some(10).flatMap((v) => safeDivide(v, 2)).unwrap()).toBe(5);
    expect(Option.some(10).flatMap((v) => safeDivide(v, 0)).isNone()).toBe(true);
  });

  it("filter keeps matching values", () => {
    expect(Option.some(5).filter((x) => x > 3).isSome()).toBe(true);
    expect(Option.some(1).filter((x) => x > 3).isNone()).toBe(true);
  });

  it("match pattern matches", () => {
    expect(Option.some(5).match({ some: (v) => v * 2, none: () => 0 })).toBe(10);
    expect(Option.none<number>().match({ some: (v) => v * 2, none: () => 0 })).toBe(0);
  });

  it("toArray", () => {
    expect(Option.some(1).toArray()).toEqual([1]);
    expect(Option.none().toArray()).toEqual([]);
  });
});
