import { describe, it, expect } from "vitest";
import { Matcher, when } from "../pattern-match.js";

describe("pattern-match", () => {
  it("matches first matching arm", () => {
    const result = new Matcher<number, string>()
      .when((n) => n > 100, () => "big")
      .when((n) => n > 10, () => "medium")
      .when((n) => n > 0, () => "small")
      .run(50);
    expect(result).toBe("medium");
  });

  it("uses fallback when nothing matches", () => {
    const result = new Matcher<number, string>()
      .when((n) => n > 100, () => "big")
      .otherwise(() => "other")
      .run(5);
    expect(result).toBe("other");
  });

  it("throws when no match and no fallback", () => {
    const m = new Matcher<number, string>()
      .when((n) => n > 100, () => "big");
    expect(() => m.run(5)).toThrow("No matching pattern");
  });

  it("passes value to handler", () => {
    const result = new Matcher<number, number>()
      .when((n) => n > 0, (n) => n * 2)
      .run(5);
    expect(result).toBe(10);
  });

  it("when helper matches partial objects", () => {
    type Item = { type: string; value: number };
    const pred = when<Item>({ type: "add" });
    expect(pred({ type: "add", value: 5 })).toBe(true);
    expect(pred({ type: "sub", value: 5 })).toBe(false);
  });

  it("works with string patterns", () => {
    const classify = new Matcher<string, string>()
      .when((s) => s.startsWith("http"), () => "url")
      .when((s) => s.includes("@"), () => "email")
      .otherwise(() => "text");
    expect(classify.run("http://example.com")).toBe("url");
    expect(classify.run("user@test.com")).toBe("email");
    expect(classify.run("hello")).toBe("text");
  });
});
