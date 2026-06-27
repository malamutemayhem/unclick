import { describe, it, expect } from "vitest";
import { parse, format, compare, gt, lt, eq, gte, lte, increment, isValid, sort } from "../version.js";

describe("version", () => {
  describe("parse", () => {
    it("parses basic version", () => {
      const v = parse("1.2.3");
      expect(v).toEqual({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] });
    });
    it("parses with v prefix", () => { expect(parse("v1.0.0")?.major).toBe(1); });
    it("parses prerelease", () => {
      expect(parse("1.0.0-beta.1")?.prerelease).toEqual(["beta", "1"]);
    });
    it("parses build", () => { expect(parse("1.0.0+build.1")?.build).toEqual(["build", "1"]); });
    it("returns null for invalid", () => { expect(parse("invalid")).toBeNull(); });
  });
  describe("format", () => {
    it("formats basic", () => { expect(format({ major: 1, minor: 2, patch: 3, prerelease: [], build: [] })).toBe("1.2.3"); });
    it("formats prerelease", () => {
      expect(format({ major: 1, minor: 0, patch: 0, prerelease: ["beta"], build: [] })).toBe("1.0.0-beta");
    });
  });
  describe("compare", () => {
    it("major diff", () => { expect(compare("2.0.0", "1.0.0")).toBeGreaterThan(0); });
    it("minor diff", () => { expect(compare("1.2.0", "1.1.0")).toBeGreaterThan(0); });
    it("patch diff", () => { expect(compare("1.0.2", "1.0.1")).toBeGreaterThan(0); });
    it("equal", () => { expect(compare("1.0.0", "1.0.0")).toBe(0); });
    it("prerelease < release", () => { expect(compare("1.0.0-alpha", "1.0.0")).toBeLessThan(0); });
  });
  describe("comparisons", () => {
    it("gt", () => { expect(gt("2.0.0", "1.0.0")).toBe(true); });
    it("lt", () => { expect(lt("1.0.0", "2.0.0")).toBe(true); });
    it("eq", () => { expect(eq("1.0.0", "1.0.0")).toBe(true); });
    it("gte", () => { expect(gte("1.0.0", "1.0.0")).toBe(true); });
    it("lte", () => { expect(lte("1.0.0", "1.0.0")).toBe(true); });
  });
  describe("increment", () => {
    it("bumps major", () => { expect(increment("1.2.3", "major")).toBe("2.0.0"); });
    it("bumps minor", () => { expect(increment("1.2.3", "minor")).toBe("1.3.0"); });
    it("bumps patch", () => { expect(increment("1.2.3", "patch")).toBe("1.2.4"); });
  });
  describe("isValid", () => {
    it("valid", () => { expect(isValid("1.0.0")).toBe(true); });
    it("invalid", () => { expect(isValid("nope")).toBe(false); });
  });
  describe("sort", () => {
    it("sorts versions", () => {
      expect(sort(["2.0.0", "1.0.0", "1.1.0"])).toEqual(["1.0.0", "1.1.0", "2.0.0"]);
    });
  });
});
