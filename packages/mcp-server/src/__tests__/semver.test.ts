import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, increment, satisfies, sort } from "../semver.js";

describe("parse", () => {
  it("parses basic version", () => {
    const v = parse("1.2.3");
    expect(v).toEqual({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] });
  });

  it("parses prerelease", () => {
    const v = parse("1.0.0-alpha.1");
    expect(v.prerelease).toEqual(["alpha", "1"]);
  });

  it("parses build metadata", () => {
    const v = parse("1.0.0+build.123");
    expect(v.build).toEqual(["build", "123"]);
  });

  it("parses v prefix", () => {
    expect(parse("v2.0.0").major).toBe(2);
  });

  it("throws for invalid", () => {
    expect(() => parse("not.valid")).toThrow();
  });
});

describe("format", () => {
  it("formats basic", () => {
    expect(format(parse("1.2.3"))).toBe("1.2.3");
  });

  it("formats prerelease", () => {
    expect(format(parse("1.0.0-beta.2"))).toBe("1.0.0-beta.2");
  });
});

describe("compare", () => {
  it("compares major", () => { expect(compare("2.0.0", "1.0.0")).toBeGreaterThan(0); });
  it("compares minor", () => { expect(compare("1.2.0", "1.1.0")).toBeGreaterThan(0); });
  it("compares patch", () => { expect(compare("1.0.2", "1.0.1")).toBeGreaterThan(0); });
  it("prerelease < release", () => { expect(compare("1.0.0-alpha", "1.0.0")).toBeLessThan(0); });
  it("equal versions", () => { expect(compare("1.0.0", "1.0.0")).toBe(0); });
});

describe("gt/lt/eq", () => {
  it("gt", () => { expect(gt("2.0.0", "1.0.0")).toBe(true); });
  it("lt", () => { expect(lt("1.0.0", "2.0.0")).toBe(true); });
  it("eq", () => { expect(eq("1.0.0", "1.0.0")).toBe(true); });
});

describe("increment", () => {
  it("bumps major", () => { expect(format(increment("1.2.3", "major"))).toBe("2.0.0"); });
  it("bumps minor", () => { expect(format(increment("1.2.3", "minor"))).toBe("1.3.0"); });
  it("bumps patch", () => { expect(format(increment("1.2.3", "patch"))).toBe("1.2.4"); });
});

describe("satisfies", () => {
  it("caret range", () => {
    expect(satisfies("1.2.3", "^1.0.0")).toBe(true);
    expect(satisfies("2.0.0", "^1.0.0")).toBe(false);
  });
  it("tilde range", () => {
    expect(satisfies("1.2.5", "~1.2.0")).toBe(true);
    expect(satisfies("1.3.0", "~1.2.0")).toBe(false);
  });
  it("gte", () => { expect(satisfies("2.0.0", ">=1.5.0")).toBe(true); });
});

describe("sort", () => {
  it("sorts versions", () => {
    expect(sort(["2.0.0", "1.0.0", "1.5.0"])).toEqual(["1.0.0", "1.5.0", "2.0.0"]);
  });
});
