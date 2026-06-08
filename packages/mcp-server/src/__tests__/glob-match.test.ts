import { describe, it, expect } from "vitest";
import { globMatch, globFilter, regexFromGlob } from "../glob-match.js";

describe("globMatch", () => {
  it("matches exact string", () => {
    expect(globMatch("hello", "hello")).toBe(true);
    expect(globMatch("hello", "world")).toBe(false);
  });

  it("matches single wildcard", () => {
    expect(globMatch("*.ts", "file.ts")).toBe(true);
    expect(globMatch("*.ts", "file.js")).toBe(false);
    expect(globMatch("*.ts", "dir/file.ts")).toBe(false);
  });

  it("matches double wildcard", () => {
    expect(globMatch("**/*.ts", "src/file.ts")).toBe(true);
    expect(globMatch("**/*.ts", "src/deep/file.ts")).toBe(true);
    expect(globMatch("**/*.ts", "file.ts")).toBe(true);
  });

  it("matches question mark", () => {
    expect(globMatch("file?.ts", "file1.ts")).toBe(true);
    expect(globMatch("file?.ts", "file12.ts")).toBe(false);
  });

  it("matches bracket expressions", () => {
    expect(globMatch("file[123].ts", "file2.ts")).toBe(true);
    expect(globMatch("file[123].ts", "file4.ts")).toBe(false);
  });

  it("matches brace alternatives", () => {
    expect(globMatch("*.{ts,js}", "file.ts")).toBe(true);
    expect(globMatch("*.{ts,js}", "file.js")).toBe(true);
    expect(globMatch("*.{ts,js}", "file.py")).toBe(false);
  });

  it("negated bracket", () => {
    expect(globMatch("file[!0-9].ts", "filea.ts")).toBe(true);
    expect(globMatch("file[!0-9].ts", "file1.ts")).toBe(false);
  });
});

describe("globFilter", () => {
  it("filters matching items", () => {
    const files = ["a.ts", "b.js", "c.ts", "d.py"];
    expect(globFilter("*.ts", files)).toEqual(["a.ts", "c.ts"]);
  });
});

describe("regexFromGlob", () => {
  it("returns a RegExp", () => {
    expect(regexFromGlob("*.ts")).toBeInstanceOf(RegExp);
  });
});
