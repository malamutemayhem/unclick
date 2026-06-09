import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, increment, satisfies, sort } from "../semver-parser.js";

describe("parse", () => {
  it("parses basic version", () => {
    const v = parse("1.2.3");
    expect(v).not.toBeNull();
    expect(v!.major).toBe(1);
    expect(v!.minor).toBe(2);
    expect(v!.patch).toBe(3);
  });

  it("parses version with v prefix", () => {
    const v = parse("v1.0.0");
    expect(v!.major).toBe(1);
  });

  it("parses prerelease", () => {
    const v = parse("1.0.0-alpha.1");
    expect(v!.prerelease).toEqual(["alpha", "1"]);
  });

  it("parses build metadata", () => {
    const v = parse("1.0.0+build.123");
    expect(v!.build).toEqual(["build", "123"]);
  });

  it("returns null for invalid", () => {
    expect(parse("not-a-version")).toBeNull();
    expect(parse("1.2")).toBeNull();
  });
});

describe("format", () => {
  it("formats basic version", () => {
    expect(format({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] })).toBe("1.2.3");
  });

  it("formats with prerelease", () => {
    expect(format({ major: 1, minor: 0, patch: 0, prerelease: ["beta", "2"], build: [] })).toBe("1.0.0-beta.2");
  });
});

describe("compare", () => {
  it("compares major versions", () => {
    expect(compare(parse("2.0.0")!, parse("1.0.0")!)).toBeGreaterThan(0);
  });

  it("compares minor versions", () => {
    expect(compare(parse("1.2.0")!, parse("1.1.0")!)).toBeGreaterThan(0);
  });

  it("prerelease is lower than release", () => {
    expect(compare(parse("1.0.0-alpha")!, parse("1.0.0")!)).toBeLessThan(0);
  });

  it("equal versions return 0", () => {
    expect(compare(parse("1.2.3")!, parse("1.2.3")!)).toBe(0);
  });
});

describe("comparison helpers", () => {
  it("gt/lt/eq work correctly", () => {
    expect(gt(parse("2.0.0")!, parse("1.0.0")!)).toBe(true);
    expect(lt(parse("1.0.0")!, parse("2.0.0")!)).toBe(true);
    expect(eq(parse("1.0.0")!, parse("1.0.0")!)).toBe(true);
  });
});

describe("increment", () => {
  it("increments major", () => {
    const v = increment(parse("1.2.3")!, "major");
    expect(format(v)).toBe("2.0.0");
  });

  it("increments minor", () => {
    const v = increment(parse("1.2.3")!, "minor");
    expect(format(v)).toBe("1.3.0");
  });

  it("increments patch", () => {
    const v = increment(parse("1.2.3")!, "patch");
    expect(format(v)).toBe("1.2.4");
  });
});

describe("satisfies", () => {
  it("caret range allows minor/patch bumps", () => {
    expect(satisfies(parse("1.2.3")!, "^1.0.0")).toBe(true);
    expect(satisfies(parse("2.0.0")!, "^1.0.0")).toBe(false);
  });

  it("tilde range allows patch bumps", () => {
    expect(satisfies(parse("1.2.5")!, "~1.2.0")).toBe(true);
    expect(satisfies(parse("1.3.0")!, "~1.2.0")).toBe(false);
  });

  it("comparison operators", () => {
    expect(satisfies(parse("2.0.0")!, ">=1.0.0")).toBe(true);
    expect(satisfies(parse("0.9.0")!, ">1.0.0")).toBe(false);
  });
});

describe("sort", () => {
  it("sorts versions in ascending order", () => {
    const versions = [parse("2.0.0")!, parse("1.0.0")!, parse("1.5.0")!];
    const sorted = sort(versions);
    expect(format(sorted[0])).toBe("1.0.0");
    expect(format(sorted[2])).toBe("2.0.0");
  });
});
