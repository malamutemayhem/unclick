import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, gte, lte, increment, valid } from "../semver.js";

describe("parse", () => {
  it("parses basic version", () => {
    const v = parse("1.2.3");
    expect(v).toEqual({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] });
  });

  it("parses with v prefix", () => {
    expect(parse("v1.0.0").major).toBe(1);
  });

  it("parses prerelease", () => {
    const v = parse("1.0.0-alpha.1");
    expect(v.prerelease).toEqual(["alpha", "1"]);
  });

  it("parses build metadata", () => {
    const v = parse("1.0.0+build.123");
    expect(v.build).toEqual(["build", "123"]);
  });

  it("parses full version", () => {
    const v = parse("2.1.0-beta.2+sha.abc");
    expect(v.major).toBe(2);
    expect(v.prerelease).toEqual(["beta", "2"]);
    expect(v.build).toEqual(["sha", "abc"]);
  });

  it("throws for invalid version", () => {
    expect(() => parse("not.a.version")).toThrow("Invalid semver");
    expect(() => parse("1.2")).toThrow("Invalid semver");
  });
});

describe("format", () => {
  it("formats basic version", () => {
    expect(format({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] })).toBe("1.2.3");
  });

  it("formats with prerelease", () => {
    expect(format({ major: 1, minor: 0, patch: 0, prerelease: ["rc", "1"], build: [] })).toBe("1.0.0-rc.1");
  });
});

describe("compare", () => {
  it("compares major versions", () => {
    expect(compare("2.0.0", "1.0.0")).toBeGreaterThan(0);
  });

  it("compares minor versions", () => {
    expect(compare("1.2.0", "1.1.0")).toBeGreaterThan(0);
  });

  it("compares patch versions", () => {
    expect(compare("1.0.2", "1.0.1")).toBeGreaterThan(0);
  });

  it("equal versions return 0", () => {
    expect(compare("1.2.3", "1.2.3")).toBe(0);
  });

  it("prerelease is lower than release", () => {
    expect(compare("1.0.0-alpha", "1.0.0")).toBeLessThan(0);
  });

  it("compares prerelease segments", () => {
    expect(compare("1.0.0-alpha.2", "1.0.0-alpha.1")).toBeGreaterThan(0);
  });
});

describe("comparison helpers", () => {
  it("gt", () => expect(gt("2.0.0", "1.0.0")).toBe(true));
  it("lt", () => expect(lt("1.0.0", "2.0.0")).toBe(true));
  it("eq", () => expect(eq("1.0.0", "1.0.0")).toBe(true));
  it("gte", () => {
    expect(gte("2.0.0", "1.0.0")).toBe(true);
    expect(gte("1.0.0", "1.0.0")).toBe(true);
  });
  it("lte", () => {
    expect(lte("1.0.0", "2.0.0")).toBe(true);
    expect(lte("1.0.0", "1.0.0")).toBe(true);
  });
});

describe("increment", () => {
  it("increments major", () => {
    expect(increment("1.2.3", "major")).toBe("2.0.0");
  });

  it("increments minor", () => {
    expect(increment("1.2.3", "minor")).toBe("1.3.0");
  });

  it("increments patch", () => {
    expect(increment("1.2.3", "patch")).toBe("1.2.4");
  });

  it("drops prerelease on increment", () => {
    expect(increment("1.0.0-alpha.1", "patch")).toBe("1.0.1");
  });
});

describe("valid", () => {
  it("returns true for valid versions", () => {
    expect(valid("1.0.0")).toBe(true);
    expect(valid("v2.1.0-beta.1")).toBe(true);
  });

  it("returns false for invalid versions", () => {
    expect(valid("nope")).toBe(false);
    expect(valid("1.2")).toBe(false);
  });
});
