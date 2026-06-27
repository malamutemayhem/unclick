import { describe, it, expect } from "vitest";
import { RegexCapture, match, matchAll, testPattern } from "../regex-capture.js";

describe("RegexCapture", () => {
  it("matches literal strings", () => {
    const result = match("hello", "say hello world");
    expect(result).not.toBeNull();
    expect(result!.value).toBe("hello");
    expect(result!.start).toBe(4);
  });

  it("matches dot wildcard", () => {
    const result = match("h.llo", "hello");
    expect(result).not.toBeNull();
    expect(result!.value).toBe("hello");
  });

  it("matches character classes", () => {
    expect(testPattern("[abc]", "b")).toBe(true);
    expect(testPattern("[abc]", "d")).toBe(false);
  });

  it("matches character ranges", () => {
    expect(testPattern("[a-z]", "m")).toBe(true);
    expect(testPattern("[a-z]", "M")).toBe(false);
  });

  it("matches negated character classes", () => {
    expect(testPattern("[^0-9]", "a")).toBe(true);
    expect(testPattern("[^0-9]", "5")).toBe(false);
  });

  it("matches star quantifier", () => {
    const result = match("ab*c", "ac");
    expect(result).not.toBeNull();
    const result2 = match("ab*c", "abbbbc");
    expect(result2).not.toBeNull();
    expect(result2!.value).toBe("abbbbc");
  });

  it("matches plus quantifier", () => {
    expect(testPattern("ab+c", "ac")).toBe(false);
    expect(testPattern("ab+c", "abc")).toBe(true);
    expect(testPattern("ab+c", "abbc")).toBe(true);
  });

  it("matches optional quantifier", () => {
    expect(testPattern("colou?r", "color")).toBe(true);
    expect(testPattern("colou?r", "colour")).toBe(true);
  });

  it("captures groups", () => {
    const result = match("(\\w+)@(\\w+)", "user@host");
    expect(result).not.toBeNull();
    expect(result!.groups).toHaveLength(2);
    expect(result!.groups[0].value).toBe("user");
    expect(result!.groups[1].value).toBe("host");
  });

  it("matches anchors", () => {
    expect(testPattern("^hello", "hello world")).toBe(true);
    expect(testPattern("^hello", "say hello")).toBe(false);
    expect(testPattern("world$", "hello world")).toBe(true);
    expect(testPattern("world$", "world hello")).toBe(false);
  });

  it("shorthand \\d matches digits", () => {
    expect(testPattern("\\d+", "abc123")).toBe(true);
    const result = match("\\d+", "abc123def");
    expect(result!.value).toBe("123");
  });

  it("shorthand \\w matches word chars", () => {
    const result = match("\\w+", "hello world");
    expect(result!.value).toBe("hello");
  });

  it("shorthand \\s matches whitespace", () => {
    expect(testPattern("\\s", " ")).toBe(true);
    expect(testPattern("\\s", "a")).toBe(false);
  });

  it("matchAll finds all occurrences", () => {
    const results = matchAll("\\d+", "a1b22c333");
    expect(results).toHaveLength(3);
    expect(results[0].value).toBe("1");
    expect(results[1].value).toBe("22");
    expect(results[2].value).toBe("333");
  });

  it("test returns boolean", () => {
    expect(testPattern("abc", "xabcx")).toBe(true);
    expect(testPattern("xyz", "abc")).toBe(false);
  });

  it("handles escaped special chars", () => {
    expect(testPattern("\\.", "a.b")).toBe(true);
    expect(testPattern("\\(", "(")).toBe(true);
  });
});
