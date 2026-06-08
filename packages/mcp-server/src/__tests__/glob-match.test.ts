import { describe, it, expect } from "vitest";
import { globMatch, isGlob, escapeGlob } from "../glob-match.js";

describe("globMatch", () => {
  it("matches exact path", () => {
    expect(globMatch("foo/bar", "foo/bar")).toBe(true);
  });

  it("does not match different path", () => {
    expect(globMatch("foo/bar", "foo/baz")).toBe(false);
  });

  it("matches * within segment", () => {
    expect(globMatch("foo/*.ts", "foo/bar.ts")).toBe(true);
    expect(globMatch("foo/*.ts", "foo/bar.js")).toBe(false);
  });

  it("* does not match across segments", () => {
    expect(globMatch("foo/*.ts", "foo/bar/baz.ts")).toBe(false);
  });

  it("** matches zero or more segments", () => {
    expect(globMatch("src/**/*.ts", "src/a.ts")).toBe(true);
    expect(globMatch("src/**/*.ts", "src/a/b.ts")).toBe(true);
    expect(globMatch("src/**/*.ts", "src/a/b/c.ts")).toBe(true);
  });

  it("** at end matches everything", () => {
    expect(globMatch("src/**", "src/a/b/c")).toBe(true);
  });

  it("? matches single character", () => {
    expect(globMatch("file?.txt", "file1.txt")).toBe(true);
    expect(globMatch("file?.txt", "file12.txt")).toBe(false);
  });

  it("[abc] matches character class", () => {
    expect(globMatch("[abc].txt", "a.txt")).toBe(true);
    expect(globMatch("[abc].txt", "d.txt")).toBe(false);
  });

  it("[a-z] matches character range", () => {
    expect(globMatch("[a-z].txt", "m.txt")).toBe(true);
    expect(globMatch("[a-z].txt", "5.txt")).toBe(false);
  });

  it("[!abc] negated character class", () => {
    expect(globMatch("[!abc].txt", "d.txt")).toBe(true);
    expect(globMatch("[!abc].txt", "a.txt")).toBe(false);
  });
});

describe("isGlob", () => {
  it("detects glob patterns", () => {
    expect(isGlob("*.ts")).toBe(true);
    expect(isGlob("file?.txt")).toBe(true);
    expect(isGlob("[abc]")).toBe(true);
  });

  it("rejects plain strings", () => {
    expect(isGlob("hello.txt")).toBe(false);
    expect(isGlob("path/to/file")).toBe(false);
  });
});

describe("escapeGlob", () => {
  it("escapes special characters", () => {
    expect(escapeGlob("file*.txt")).toBe("file\\*.txt");
    expect(escapeGlob("[test]")).toBe("\\[test\\]");
  });
});
