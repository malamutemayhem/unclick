import { describe, it, expect } from "vitest";
import { globMatch, globFilter } from "../glob-match.js";

describe("globMatch", () => {
  it("exact match", () => {
    expect(globMatch("foo.ts", "foo.ts")).toBe(true);
    expect(globMatch("foo.ts", "bar.ts")).toBe(false);
  });

  it("* matches within segment", () => {
    expect(globMatch("*.ts", "foo.ts")).toBe(true);
    expect(globMatch("*.ts", "bar.ts")).toBe(true);
    expect(globMatch("*.ts", "foo.js")).toBe(false);
  });

  it("* does not cross /", () => {
    expect(globMatch("*.ts", "src/foo.ts")).toBe(false);
  });

  it("** matches across directories", () => {
    expect(globMatch("**/*.ts", "src/foo.ts")).toBe(true);
    expect(globMatch("**/*.ts", "a/b/c.ts")).toBe(true);
    expect(globMatch("src/**/*.ts", "src/a/b.ts")).toBe(true);
  });

  it("? matches single char", () => {
    expect(globMatch("fo?.ts", "foo.ts")).toBe(true);
    expect(globMatch("fo?.ts", "fob.ts")).toBe(true);
    expect(globMatch("fo?.ts", "fooo.ts")).toBe(false);
  });

  it("[abc] character class", () => {
    expect(globMatch("[abc].ts", "a.ts")).toBe(true);
    expect(globMatch("[abc].ts", "d.ts")).toBe(false);
  });

  it("[a-z] character range", () => {
    expect(globMatch("[a-z].ts", "m.ts")).toBe(true);
    expect(globMatch("[a-z].ts", "5.ts")).toBe(false);
  });

  it("[!a-z] negated range", () => {
    expect(globMatch("[!a-z].ts", "5.ts")).toBe(true);
    expect(globMatch("[!a-z].ts", "m.ts")).toBe(false);
  });

  it("trailing * matches rest", () => {
    expect(globMatch("src/*", "src/file")).toBe(true);
  });
});

describe("globFilter", () => {
  it("filters array", () => {
    const items = ["foo.ts", "bar.js", "baz.ts", "src/q.ts"];
    expect(globFilter("*.ts", items)).toEqual(["foo.ts", "baz.ts"]);
  });

  it("** filter", () => {
    const items = ["src/a.ts", "src/b/c.ts", "lib/d.ts"];
    expect(globFilter("src/**/*.ts", items)).toEqual(["src/a.ts", "src/b/c.ts"]);
  });
});
