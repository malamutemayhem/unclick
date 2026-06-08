import { describe, it, expect } from "vitest";
import { SemverCompare } from "../semver-compare.js";

describe("SemverCompare", () => {
  it("parse extracts components", () => {
    const v = SemverCompare.parse("1.2.3-alpha.1+build.42");
    expect(v).not.toBeNull();
    expect(v!.major).toBe(1);
    expect(v!.minor).toBe(2);
    expect(v!.patch).toBe(3);
    expect(v!.prerelease).toEqual(["alpha", "1"]);
    expect(v!.build).toEqual(["build", "42"]);
  });

  it("parse handles v prefix", () => {
    const v = SemverCompare.parse("v2.0.0");
    expect(v).not.toBeNull();
    expect(v!.major).toBe(2);
  });

  it("compare orders versions correctly", () => {
    expect(SemverCompare.compare("1.0.0", "2.0.0")).toBe(-1);
    expect(SemverCompare.compare("1.1.0", "1.0.0")).toBe(1);
    expect(SemverCompare.compare("1.0.0", "1.0.0")).toBe(0);
  });

  it("prerelease is lower than release", () => {
    expect(SemverCompare.compare("1.0.0-alpha", "1.0.0")).toBe(-1);
  });

  it("gt/lt/eq work", () => {
    expect(SemverCompare.gt("2.0.0", "1.0.0")).toBe(true);
    expect(SemverCompare.lt("1.0.0", "2.0.0")).toBe(true);
    expect(SemverCompare.eq("1.0.0", "1.0.0")).toBe(true);
  });

  it("sort orders versions", () => {
    const sorted = SemverCompare.sort(["3.0.0", "1.0.0", "2.0.0"]);
    expect(sorted).toEqual(["1.0.0", "2.0.0", "3.0.0"]);
  });

  it("max and min find extremes", () => {
    const versions = ["1.2.3", "2.0.0", "1.0.0"];
    expect(SemverCompare.max(versions)).toBe("2.0.0");
    expect(SemverCompare.min(versions)).toBe("1.0.0");
  });

  it("bump increments correctly", () => {
    expect(SemverCompare.bump("1.2.3", "major")).toBe("2.0.0");
    expect(SemverCompare.bump("1.2.3", "minor")).toBe("1.3.0");
    expect(SemverCompare.bump("1.2.3", "patch")).toBe("1.2.4");
  });

  it("satisfies checks caret range", () => {
    expect(SemverCompare.satisfies("1.2.3", "^1.0.0")).toBe(true);
    expect(SemverCompare.satisfies("2.0.0", "^1.0.0")).toBe(false);
  });

  it("satisfies checks tilde range", () => {
    expect(SemverCompare.satisfies("1.2.5", "~1.2.0")).toBe(true);
    expect(SemverCompare.satisfies("1.3.0", "~1.2.0")).toBe(false);
  });

  it("format produces string", () => {
    expect(SemverCompare.format({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] })).toBe("1.2.3");
  });
});
