import { describe, it, expect } from "vitest";
import { SemVerRange } from "../semver-range.js";

describe("SemVerRange", () => {
  it("parses semver strings", () => {
    const v = SemVerRange.parse("1.2.3");
    expect(v.major).toBe(1);
    expect(v.minor).toBe(2);
    expect(v.patch).toBe(3);
  });

  it("parses prerelease and build", () => {
    const v = SemVerRange.parse("1.0.0-alpha.1+build.42");
    expect(v.prerelease).toBe("alpha.1");
    expect(v.build).toBe("build.42");
  });

  it("strips v prefix", () => {
    const v = SemVerRange.parse("v2.0.0");
    expect(v.major).toBe(2);
  });

  it("throws on invalid semver", () => {
    expect(() => SemVerRange.parse("abc")).toThrow();
  });

  it("formats semver", () => {
    expect(SemVerRange.format({ major: 1, minor: 2, patch: 3, prerelease: "", build: "" })).toBe("1.2.3");
    expect(SemVerRange.format({ major: 1, minor: 0, patch: 0, prerelease: "beta", build: "" })).toBe("1.0.0-beta");
  });

  it("compares versions", () => {
    expect(SemVerRange.compare("1.0.0", "2.0.0")).toBeLessThan(0);
    expect(SemVerRange.compare("1.1.0", "1.0.0")).toBeGreaterThan(0);
    expect(SemVerRange.compare("1.0.0", "1.0.0")).toBe(0);
  });

  it("satisfies caret range", () => {
    expect(SemVerRange.satisfies("1.2.3", "^1.0.0")).toBe(true);
    expect(SemVerRange.satisfies("2.0.0", "^1.0.0")).toBe(false);
    expect(SemVerRange.satisfies("1.0.0", "^1.2.0")).toBe(false);
  });

  it("satisfies tilde range", () => {
    expect(SemVerRange.satisfies("1.2.5", "~1.2.0")).toBe(true);
    expect(SemVerRange.satisfies("1.3.0", "~1.2.0")).toBe(false);
  });

  it("satisfies comparison operators", () => {
    expect(SemVerRange.satisfies("2.0.0", ">1.0.0")).toBe(true);
    expect(SemVerRange.satisfies("1.0.0", ">=1.0.0")).toBe(true);
    expect(SemVerRange.satisfies("0.9.0", "<1.0.0")).toBe(true);
  });

  it("increments versions", () => {
    expect(SemVerRange.increment("1.2.3", "major")).toBe("2.0.0");
    expect(SemVerRange.increment("1.2.3", "minor")).toBe("1.3.0");
    expect(SemVerRange.increment("1.2.3", "patch")).toBe("1.2.4");
  });

  it("sorts versions", () => {
    expect(SemVerRange.sort(["2.0.0", "1.0.0", "1.5.0"])).toEqual(["1.0.0", "1.5.0", "2.0.0"]);
  });

  it("finds max satisfying", () => {
    expect(SemVerRange.maxSatisfying(["1.0.0", "1.5.0", "2.0.0"], "^1.0.0")).toBe("1.5.0");
    expect(SemVerRange.maxSatisfying(["3.0.0"], "^1.0.0")).toBeNull();
  });

  it("checks stability", () => {
    expect(SemVerRange.isStable("1.0.0")).toBe(true);
    expect(SemVerRange.isStable("0.1.0")).toBe(false);
    expect(SemVerRange.isStable("1.0.0-beta")).toBe(false);
  });

  it("diffs versions", () => {
    expect(SemVerRange.diff("1.0.0", "2.0.0")).toBe("major");
    expect(SemVerRange.diff("1.0.0", "1.1.0")).toBe("minor");
    expect(SemVerRange.diff("1.0.0", "1.0.1")).toBe("patch");
    expect(SemVerRange.diff("1.0.0", "1.0.0")).toBe("none");
  });
});
