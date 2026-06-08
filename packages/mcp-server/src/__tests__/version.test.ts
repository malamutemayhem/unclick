import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, bump, satisfies, sort } from "../version.js";

describe("version (semver)", () => {
  it("parse valid versions", () => {
    expect(parse("1.2.3")).toEqual({ major: 1, minor: 2, patch: 3, prerelease: undefined, build: undefined });
    expect(parse("v1.0.0-alpha")).toEqual({ major: 1, minor: 0, patch: 0, prerelease: "alpha", build: undefined });
    expect(parse("1.0.0+build.1")).toEqual({ major: 1, minor: 0, patch: 0, prerelease: undefined, build: "build.1" });
  });

  it("parse returns null for invalid", () => {
    expect(parse("not.a.version")).toBeNull();
    expect(parse("1.2")).toBeNull();
  });

  it("format roundtrips", () => {
    expect(format(parse("1.2.3")!)).toBe("1.2.3");
    expect(format(parse("1.0.0-beta")!)).toBe("1.0.0-beta");
  });

  it("compare orders correctly", () => {
    expect(compare(parse("1.0.0")!, parse("2.0.0")!)).toBeLessThan(0);
    expect(compare(parse("1.1.0")!, parse("1.0.0")!)).toBeGreaterThan(0);
    expect(compare(parse("1.0.0")!, parse("1.0.0")!)).toBe(0);
  });

  it("prerelease is less than release", () => {
    expect(lt(parse("1.0.0-alpha")!, parse("1.0.0")!)).toBe(true);
  });

  it("gt, lt, eq helpers", () => {
    expect(gt(parse("2.0.0")!, parse("1.0.0")!)).toBe(true);
    expect(lt(parse("1.0.0")!, parse("2.0.0")!)).toBe(true);
    expect(eq(parse("1.0.0")!, parse("1.0.0")!)).toBe(true);
  });

  it("bump increments correctly", () => {
    expect(bump(parse("1.2.3")!, "major")).toEqual({ major: 2, minor: 0, patch: 0 });
    expect(bump(parse("1.2.3")!, "minor")).toEqual({ major: 1, minor: 3, patch: 0 });
    expect(bump(parse("1.2.3")!, "patch")).toEqual({ major: 1, minor: 2, patch: 4 });
  });

  it("satisfies caret range", () => {
    expect(satisfies(parse("1.2.3")!, "^1.0.0")).toBe(true);
    expect(satisfies(parse("2.0.0")!, "^1.0.0")).toBe(false);
  });

  it("satisfies tilde range", () => {
    expect(satisfies(parse("1.2.5")!, "~1.2.0")).toBe(true);
    expect(satisfies(parse("1.3.0")!, "~1.2.0")).toBe(false);
  });

  it("satisfies wildcard", () => {
    expect(satisfies(parse("9.9.9")!, "*")).toBe(true);
  });

  it("sort orders versions", () => {
    const versions = [parse("2.0.0")!, parse("1.0.0")!, parse("1.5.0")!];
    const sorted = sort(versions);
    expect(format(sorted[0])).toBe("1.0.0");
    expect(format(sorted[2])).toBe("2.0.0");
  });
});
