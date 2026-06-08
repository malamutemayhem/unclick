import { describe, it, expect } from "vitest";
import { matchPattern, wildcardMatch, escapeRegex, extractMatches } from "../fsm-regex.js";

describe("matchPattern (regex-style)", () => {
  it("exact match", () => {
    expect(matchPattern("abc", "abc")).toBe(true);
    expect(matchPattern("abc", "abd")).toBe(false);
  });

  it("dot matches any char", () => {
    expect(matchPattern("abc", "a.c")).toBe(true);
    expect(matchPattern("aXc", "a.c")).toBe(true);
  });

  it("star matches zero or more", () => {
    expect(matchPattern("aab", "a*b")).toBe(true);
    expect(matchPattern("b", "a*b")).toBe(true);
    expect(matchPattern("", "a*")).toBe(true);
  });

  it("dot-star matches anything", () => {
    expect(matchPattern("anything", ".*")).toBe(true);
    expect(matchPattern("", ".*")).toBe(true);
  });
});

describe("wildcardMatch", () => {
  it("star matches any sequence", () => {
    expect(wildcardMatch("hello world", "hello*")).toBe(true);
    expect(wildcardMatch("hello world", "*world")).toBe(true);
    expect(wildcardMatch("hello world", "h*d")).toBe(true);
  });

  it("question mark matches single char", () => {
    expect(wildcardMatch("cat", "c?t")).toBe(true);
    expect(wildcardMatch("cut", "c?t")).toBe(true);
    expect(wildcardMatch("ct", "c?t")).toBe(false);
  });

  it("combined", () => {
    expect(wildcardMatch("file.test.ts", "*.test.*")).toBe(true);
    expect(wildcardMatch("file.spec.ts", "*.test.*")).toBe(false);
  });
});

describe("escapeRegex", () => {
  it("escapes special chars", () => {
    expect(escapeRegex("hello.world")).toBe("hello\\.world");
    expect(escapeRegex("a+b*c")).toBe("a\\+b\\*c");
  });
});

describe("extractMatches", () => {
  it("extracts all matches", () => {
    expect(extractMatches("abc 123 def 456", /\d+/g)).toEqual(["123", "456"]);
  });
});
