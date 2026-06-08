import { describe, it, expect } from "vitest";
import {
  parse, format, compare, gt, lt, eq, increment,
  satisfies, sort, maxVersion,
} from "../semantic-version.js";

describe("parse/format", () => {
  it("parses basic version", () => {
    const v = parse("1.2.3")!;
    expect(v.major).toBe(1);
    expect(v.minor).toBe(2);
    expect(v.patch).toBe(3);
  });

  it("parses with prerelease", () => {
    const v = parse("1.0.0-alpha.1")!;
    expect(v.prerelease).toEqual(["alpha", "1"]);
  });

  it("parses with build metadata", () => {
    const v = parse("1.0.0+build.123")!;
    expect(v.build).toEqual(["build", "123"]);
  });

  it("parses v prefix", () => {
    expect(parse("v2.0.0")).not.toBeNull();
  });

  it("returns null for invalid", () => {
    expect(parse("invalid")).toBeNull();
    expect(parse("1.2")).toBeNull();
  });

  it("formats version", () => {
    expect(format({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] })).toBe("1.2.3");
    expect(format({ major: 1, minor: 0, patch: 0, prerelease: ["beta", "1"], build: [] })).toBe("1.0.0-beta.1");
  });
});

describe("compare", () => {
  it("compares major versions", () => {
    expect(compare(parse("2.0.0")!, parse("1.0.0")!)).toBeGreaterThan(0);
  });

  it("compares minor versions", () => {
    expect(compare(parse("1.2.0")!, parse("1.1.0")!)).toBeGreaterThan(0);
  });

  it("compares patch versions", () => {
    expect(compare(parse("1.0.2")!, parse("1.0.1")!)).toBeGreaterThan(0);
  });

  it("prerelease is lower than release", () => {
    expect(lt(parse("1.0.0-alpha")!, parse("1.0.0")!)).toBe(true);
  });

  it("compares prerelease identifiers", () => {
    expect(lt(parse("1.0.0-alpha")!, parse("1.0.0-beta")!)).toBe(true);
  });

  it("equal versions", () => {
    expect(eq(parse("1.2.3")!, parse("1.2.3")!)).toBe(true);
  });
});

describe("increment", () => {
  it("increments major", () => {
    expect(format(increment(parse("1.2.3")!, "major"))).toBe("2.0.0");
  });

  it("increments minor", () => {
    expect(format(increment(parse("1.2.3")!, "minor"))).toBe("1.3.0");
  });

  it("increments patch", () => {
    expect(format(increment(parse("1.2.3")!, "patch"))).toBe("1.2.4");
  });

  it("increments prerelease", () => {
    const v = increment(parse("1.0.0-alpha.0")!, "prerelease");
    expect(format(v)).toBe("1.0.0-alpha.1");
  });
});

describe("satisfies", () => {
  it("caret range", () => {
    expect(satisfies(parse("1.2.3")!, "^1.0.0")).toBe(true);
    expect(satisfies(parse("2.0.0")!, "^1.0.0")).toBe(false);
  });

  it("tilde range", () => {
    expect(satisfies(parse("1.2.5")!, "~1.2.0")).toBe(true);
    expect(satisfies(parse("1.3.0")!, "~1.2.0")).toBe(false);
  });

  it("comparison operators", () => {
    expect(satisfies(parse("2.0.0")!, ">=1.0.0")).toBe(true);
    expect(satisfies(parse("0.9.0")!, ">1.0.0")).toBe(false);
  });

  it("wildcard", () => {
    expect(satisfies(parse("99.99.99")!, "*")).toBe(true);
  });

  it("exact match", () => {
    expect(satisfies(parse("1.0.0")!, "1.0.0")).toBe(true);
    expect(satisfies(parse("1.0.1")!, "1.0.0")).toBe(false);
  });
});

describe("sort/maxVersion", () => {
  it("sorts versions", () => {
    const versions = [parse("2.0.0")!, parse("1.0.0")!, parse("1.5.0")!];
    const sorted = sort(versions);
    expect(format(sorted[0])).toBe("1.0.0");
    expect(format(sorted[2])).toBe("2.0.0");
  });

  it("finds max version", () => {
    const versions = [parse("1.0.0")!, parse("3.0.0")!, parse("2.0.0")!];
    expect(format(maxVersion(versions)!)).toBe("3.0.0");
  });

  it("returns null for empty array", () => {
    expect(maxVersion([])).toBeNull();
  });
});
