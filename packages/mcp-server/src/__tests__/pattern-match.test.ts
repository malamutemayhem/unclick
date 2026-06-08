import { describe, it, expect } from "vitest";
import { Matcher, match, isString, isNumber, isArray, isNullish } from "../pattern-match.js";

describe("Matcher", () => {
  it("matches first pattern", () => {
    const m = new Matcher<number, string>()
      .when((v) => v > 10, () => "big")
      .when((v) => v > 0, () => "small")
      .otherwise(() => "zero or negative");

    expect(m.execute(15)).toBe("big");
    expect(m.execute(5)).toBe("small");
    expect(m.execute(-1)).toBe("zero or negative");
  });

  it("whenEqual matches exact value", () => {
    const m = new Matcher<string, number>()
      .whenEqual("a", () => 1)
      .whenEqual("b", () => 2)
      .otherwise(() => 0);

    expect(m.execute("a")).toBe(1);
    expect(m.execute("b")).toBe(2);
    expect(m.execute("c")).toBe(0);
  });

  it("whenIn matches from list", () => {
    const m = new Matcher<string, boolean>()
      .whenIn(["yes", "y", "true"], () => true)
      .otherwise(() => false);

    expect(m.execute("yes")).toBe(true);
    expect(m.execute("no")).toBe(false);
  });

  it("throws without match or fallback", () => {
    const m = new Matcher<number, string>()
      .when((v) => v > 100, () => "big");
    expect(() => m.execute(1)).toThrow("No matching pattern");
  });
});

describe("match builder", () => {
  it("matches with equals", () => {
    const result = match(42)
      .equals(1, "one")
      .equals(42, "answer")
      .otherwise("unknown");
    expect(result).toBe("answer");
  });

  it("matches with predicate", () => {
    const result = match(15)
      .with((v) => v > 10, "big")
      .otherwise("small");
    expect(result).toBe("big");
  });

  it("otherwise returns default", () => {
    const result = match("x")
      .equals("a", 1)
      .otherwise(0);
    expect(result).toBe(0);
  });

  it("exhaustive throws on no match", () => {
    expect(() => match(5).equals(1, "one").exhaustive()).toThrow("Non-exhaustive");
  });
});

describe("type guards", () => {
  it("isString", () => {
    expect(isString("hi")).toBe(true);
    expect(isString(42)).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber("42")).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([1, 2])).toBe(true);
    expect(isArray("abc")).toBe(false);
  });

  it("isNullish", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
  });
});
