import { describe, it, expect } from "vitest";
import { globMatch, isGlob, matchMany } from "../glob-match.js";

describe("glob-match", () => {
  it("matches exact string", () => {
    expect(globMatch("hello", "hello")).toBe(true);
    expect(globMatch("hello", "world")).toBe(false);
  });

  it("* matches any non-slash chars", () => {
    expect(globMatch("*.ts", "file.ts")).toBe(true);
    expect(globMatch("*.ts", "file.js")).toBe(false);
    expect(globMatch("*.ts", "dir/file.ts")).toBe(false);
  });

  it("** matches across directories", () => {
    expect(globMatch("src/**/*.ts", "src/a/b.ts")).toBe(true);
    expect(globMatch("src/**/*.ts", "src/b.ts")).toBe(true);
    expect(globMatch("**/*.ts", "a/b/c.ts")).toBe(true);
  });

  it("? matches single non-slash char", () => {
    expect(globMatch("file?.ts", "file1.ts")).toBe(true);
    expect(globMatch("file?.ts", "file12.ts")).toBe(false);
  });

  it("escapes regex special chars", () => {
    expect(globMatch("file.ts", "file.ts")).toBe(true);
    expect(globMatch("file.ts", "filexts")).toBe(false);
  });

  it("isGlob detects patterns", () => {
    expect(isGlob("*.ts")).toBe(true);
    expect(isGlob("file.ts")).toBe(false);
    expect(isGlob("src/**")).toBe(true);
  });

  it("matchMany matches against multiple patterns", () => {
    expect(matchMany(["*.ts", "*.js"], "file.ts")).toBe(true);
    expect(matchMany(["*.ts", "*.js"], "file.css")).toBe(false);
  });
});
