import { describe, it, expect } from "vitest";
import { compile, test as reTest, findFirst, findAll } from "../regex-engine.js";

describe("compile / test", () => {
  it("matches literal string", () => {
    expect(reTest("abc", "abc")).toBe(true);
    expect(reTest("abc", "abd")).toBe(false);
  });

  it("matches with star", () => {
    expect(reTest("ab*c", "ac")).toBe(true);
    expect(reTest("ab*c", "abc")).toBe(true);
    expect(reTest("ab*c", "abbc")).toBe(true);
  });

  it("matches with plus", () => {
    expect(reTest("ab+c", "ac")).toBe(false);
    expect(reTest("ab+c", "abc")).toBe(true);
    expect(reTest("ab+c", "abbc")).toBe(true);
  });

  it("matches with question", () => {
    expect(reTest("ab?c", "ac")).toBe(true);
    expect(reTest("ab?c", "abc")).toBe(true);
    expect(reTest("ab?c", "abbc")).toBe(false);
  });

  it("matches with dot", () => {
    expect(reTest("a.c", "abc")).toBe(true);
    expect(reTest("a.c", "axc")).toBe(true);
    expect(reTest("a.c", "ac")).toBe(false);
  });

  it("matches with alternation", () => {
    expect(reTest("cat|dog", "cat")).toBe(true);
    expect(reTest("cat|dog", "dog")).toBe(true);
    expect(reTest("cat|dog", "cow")).toBe(false);
  });

  it("matches with parentheses", () => {
    expect(reTest("(ab)+", "abab")).toBe(true);
    expect(reTest("(ab)+", "ab")).toBe(true);
    expect(reTest("(ab)+", "a")).toBe(false);
  });

  it("matches escaped characters", () => {
    expect(reTest("a\\.b", "a.b")).toBe(true);
    expect(reTest("a\\.b", "axb")).toBe(false);
  });

  it("compiles returns reusable function", () => {
    const matcher = compile("a+");
    expect(matcher("a")).toBe(true);
    expect(matcher("aaa")).toBe(true);
    expect(matcher("")).toBe(false);
  });
});

describe("findFirst", () => {
  it("finds first match in string", () => {
    const result = findFirst("ab", "xxabxx");
    expect(result).not.toBeNull();
    expect(result!.match).toBe("ab");
    expect(result!.index).toBe(2);
  });

  it("returns null for no match", () => {
    expect(findFirst("xyz", "abc")).toBeNull();
  });
});

describe("findAll", () => {
  it("finds all non-overlapping matches", () => {
    const results = findAll("ab", "ababab");
    expect(results).toHaveLength(3);
  });
});
