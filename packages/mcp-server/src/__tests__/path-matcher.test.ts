import { describe, it, expect } from "vitest";
import { match, matchAny, filter, extractGroups } from "../path-matcher.js";

describe("match", () => {
  it("matches exact strings", () => {
    expect(match("hello", "hello")).toBe(true);
    expect(match("hello", "world")).toBe(false);
  });

  it("* matches single segment", () => {
    expect(match("src/*.ts", "src/index.ts")).toBe(true);
    expect(match("src/*.ts", "src/utils/index.ts")).toBe(false);
  });

  it("** matches multiple segments", () => {
    expect(match("src/**/*.ts", "src/utils/index.ts")).toBe(true);
    expect(match("src/**/*.ts", "src/a/b/c/file.ts")).toBe(true);
  });

  it("? matches single character", () => {
    expect(match("file?.ts", "file1.ts")).toBe(true);
    expect(match("file?.ts", "file12.ts")).toBe(false);
  });

  it("escapes regex special chars", () => {
    expect(match("file.ts", "file.ts")).toBe(true);
    expect(match("file.ts", "filexts")).toBe(false);
  });
});

describe("matchAny", () => {
  it("matches if any pattern matches", () => {
    expect(matchAny(["*.ts", "*.js"], "index.ts")).toBe(true);
    expect(matchAny(["*.ts", "*.js"], "index.py")).toBe(false);
  });
});

describe("filter", () => {
  it("filters items by patterns", () => {
    const files = ["src/a.ts", "src/b.js", "test/c.ts"];
    const result = filter(["src/*.ts"], files, (f) => f);
    expect(result).toEqual(["src/a.ts"]);
  });
});

describe("extractGroups", () => {
  it("extracts wildcard matches", () => {
    const groups = extractGroups("src/*/index.ts", "src/utils/index.ts");
    expect(groups).toEqual(["utils"]);
  });

  it("returns null for no match", () => {
    expect(extractGroups("*.ts", "index.js")).toBeNull();
  });
});
