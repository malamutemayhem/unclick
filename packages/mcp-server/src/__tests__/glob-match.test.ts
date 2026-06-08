import { describe, it, expect } from "vitest";
import { globMatch, globFilter, isGlob } from "../glob-match.js";

describe("glob-match", () => {
  it("matches exact strings", () => {
    expect(globMatch("hello", "hello")).toBe(true);
    expect(globMatch("hello", "world")).toBe(false);
  });

  it("* matches any characters in a segment", () => {
    expect(globMatch("*.ts", "file.ts")).toBe(true);
    expect(globMatch("*.ts", "file.js")).toBe(false);
    expect(globMatch("src/*", "src/file")).toBe(true);
  });

  it("? matches single character", () => {
    expect(globMatch("f?o", "foo")).toBe(true);
    expect(globMatch("f?o", "fo")).toBe(false);
  });

  it("** matches any path depth", () => {
    expect(globMatch("src/**/*.ts", "src/a/b/c.ts")).toBe(true);
    expect(globMatch("src/**/*.ts", "src/file.ts")).toBe(true);
    expect(globMatch("**/*.js", "a/b/c.js")).toBe(true);
  });

  it("[abc] matches character class", () => {
    expect(globMatch("[abc]", "a")).toBe(true);
    expect(globMatch("[abc]", "d")).toBe(false);
  });

  it("[!abc] negates character class", () => {
    expect(globMatch("[!abc]", "d")).toBe(true);
    expect(globMatch("[!abc]", "a")).toBe(false);
  });

  it("globFilter returns matching inputs", () => {
    const files = ["a.ts", "b.js", "c.ts", "d.txt"];
    expect(globFilter("*.ts", files)).toEqual(["a.ts", "c.ts"]);
  });

  it("isGlob detects glob patterns", () => {
    expect(isGlob("*.ts")).toBe(true);
    expect(isGlob("hello")).toBe(false);
    expect(isGlob("file?.txt")).toBe(true);
  });
});
