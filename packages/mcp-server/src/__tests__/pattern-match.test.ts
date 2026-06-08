import { describe, it, expect } from "vitest";
import { match, is, isIn, isType, not, and, or, always } from "../pattern-match.js";

describe("match", () => {
  it("matches first pattern", () => {
    const result = match(5, [
      [is(1), () => "one"],
      [is(5), () => "five"],
    ]);
    expect(result).toBe("five");
  });

  it("uses fallback", () => {
    const result = match(99, [
      [is(1), () => "one"],
    ], () => "other");
    expect(result).toBe("other");
  });

  it("throws without fallback", () => {
    expect(() => match(99, [[is(1), () => "one"]])).toThrow("No matching");
  });
});

describe("is", () => {
  it("matches exact value", () => {
    expect(is(5)(5)).toBe(true);
    expect(is(5)(6)).toBe(false);
  });
});

describe("isIn", () => {
  it("matches any in set", () => {
    const pred = isIn(1, 2, 3);
    expect(pred(2)).toBe(true);
    expect(pred(4)).toBe(false);
  });
});

describe("isType", () => {
  it("matches typeof", () => {
    expect(isType("string")("hello")).toBe(true);
    expect(isType("number")("hello")).toBe(false);
  });
});

describe("not", () => {
  it("negates predicate", () => {
    expect(not(is(5))(5)).toBe(false);
    expect(not(is(5))(3)).toBe(true);
  });
});

describe("and", () => {
  it("all predicates must match", () => {
    const pred = and(isType("number") as (v: number) => boolean, (n: number) => n > 0);
    expect(pred(5)).toBe(true);
    expect(pred(-1)).toBe(false);
  });
});

describe("or", () => {
  it("any predicate matches", () => {
    const pred = or(is(1), is(2));
    expect(pred(1)).toBe(true);
    expect(pred(3)).toBe(false);
  });
});

describe("always", () => {
  it("always returns true", () => {
    expect(always()(42)).toBe(true);
  });
});
