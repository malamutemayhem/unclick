import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, bump, sort, isValid } from "../semver-lite.js";

describe("semver-lite", () => {
  it("parses version string", () => {
    const v = parse("1.2.3");
    expect(v).toEqual({ major: 1, minor: 2, patch: 3, prerelease: undefined });
  });

  it("parses with v prefix", () => {
    expect(parse("v1.0.0").major).toBe(1);
  });

  it("parses prerelease", () => {
    const v = parse("1.0.0-beta.1");
    expect(v.prerelease).toBe("beta.1");
  });

  it("formats back to string", () => {
    expect(format({ major: 1, minor: 2, patch: 3 })).toBe("1.2.3");
    expect(format({ major: 1, minor: 0, patch: 0, prerelease: "alpha" })).toBe("1.0.0-alpha");
  });

  it("compares versions", () => {
    expect(gt("2.0.0", "1.9.9")).toBe(true);
    expect(lt("1.0.0", "1.0.1")).toBe(true);
    expect(eq("1.2.3", "1.2.3")).toBe(true);
  });

  it("prerelease is less than release", () => {
    expect(lt("1.0.0-alpha", "1.0.0")).toBe(true);
  });

  it("bumps version", () => {
    expect(bump("1.2.3", "major")).toBe("2.0.0");
    expect(bump("1.2.3", "minor")).toBe("1.3.0");
    expect(bump("1.2.3", "patch")).toBe("1.2.4");
  });

  it("sorts versions", () => {
    expect(sort(["2.0.0", "1.0.0", "1.1.0"])).toEqual(["1.0.0", "1.1.0", "2.0.0"]);
  });

  it("isValid checks format", () => {
    expect(isValid("1.2.3")).toBe(true);
    expect(isValid("not-a-version")).toBe(false);
  });

  it("throws on invalid", () => {
    expect(() => parse("abc")).toThrow();
  });
});
