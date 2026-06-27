import { describe, it, expect } from "vitest";
import { matchGlob, matchAny, filterPaths, isGlob, globToRegex } from "../glob-matcher.js";

describe("glob-matcher", () => {
  it("matches exact strings", () => {
    expect(matchGlob("hello", "hello")).toBe(true);
    expect(matchGlob("hello", "world")).toBe(false);
  });

  it("* matches any non-slash chars", () => {
    expect(matchGlob("*.ts", "file.ts")).toBe(true);
    expect(matchGlob("*.ts", "file.js")).toBe(false);
    expect(matchGlob("*.ts", "dir/file.ts")).toBe(false);
  });

  it("** matches across directories", () => {
    expect(matchGlob("**/*.ts", "src/file.ts")).toBe(true);
    expect(matchGlob("**/*.ts", "src/deep/file.ts")).toBe(true);
    expect(matchGlob("**/*.ts", "file.ts")).toBe(true);
  });

  it("? matches single non-slash char", () => {
    expect(matchGlob("file?.ts", "file1.ts")).toBe(true);
    expect(matchGlob("file?.ts", "file.ts")).toBe(false);
  });

  it("[abc] character classes", () => {
    expect(matchGlob("[abc].ts", "a.ts")).toBe(true);
    expect(matchGlob("[abc].ts", "d.ts")).toBe(false);
  });

  it("{a,b} alternatives", () => {
    expect(matchGlob("*.{ts,js}", "file.ts")).toBe(true);
    expect(matchGlob("*.{ts,js}", "file.js")).toBe(true);
    expect(matchGlob("*.{ts,js}", "file.py")).toBe(false);
  });

  it("escapes regex special chars", () => {
    expect(matchGlob("file.ts", "file.ts")).toBe(true);
    expect(matchGlob("file.ts", "filexts")).toBe(false);
  });

  it("matchAny matches if any pattern matches", () => {
    expect(matchAny(["*.ts", "*.js"], "file.ts")).toBe(true);
    expect(matchAny(["*.ts", "*.js"], "file.py")).toBe(false);
  });

  it("filterPaths filters matching paths", () => {
    const paths = ["a.ts", "b.js", "c.py"];
    expect(filterPaths(["*.ts"], paths)).toEqual(["a.ts"]);
  });

  it("isGlob detects glob patterns", () => {
    expect(isGlob("*.ts")).toBe(true);
    expect(isGlob("file.ts")).toBe(false);
    expect(isGlob("{a,b}")).toBe(true);
  });
});
