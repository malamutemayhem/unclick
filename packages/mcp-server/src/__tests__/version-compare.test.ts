import { describe, it, expect } from "vitest";
import { compare, gt, gte, lt, lte, eq, isValid, parse, sort, satisfiesRange } from "../version-compare.js";

describe("version-compare", () => {
  it("compare returns -1, 0, 1", () => {
    expect(compare("1.0.0", "2.0.0")).toBe(-1);
    expect(compare("2.0.0", "1.0.0")).toBe(1);
    expect(compare("1.0.0", "1.0.0")).toBe(0);
  });

  it("compares multi-segment versions", () => {
    expect(compare("1.2.3", "1.2.4")).toBe(-1);
    expect(compare("1.3.0", "1.2.9")).toBe(1);
    expect(compare("2.0", "1.9.9")).toBe(1);
  });

  it("gt/gte/lt/lte/eq helpers", () => {
    expect(gt("2.0", "1.0")).toBe(true);
    expect(gte("1.0", "1.0")).toBe(true);
    expect(lt("1.0", "2.0")).toBe(true);
    expect(lte("1.0", "1.0")).toBe(true);
    expect(eq("1.0.0", "1.0")).toBe(true);
  });

  it("isValid checks format", () => {
    expect(isValid("1.2.3")).toBe(true);
    expect(isValid("0.1")).toBe(true);
    expect(isValid("abc")).toBe(false);
    expect(isValid("1.2.3-beta")).toBe(false);
  });

  it("parse extracts major/minor/patch", () => {
    expect(parse("3.2.1")).toEqual({ major: 3, minor: 2, patch: 1 });
    expect(parse("1.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  });

  it("sort orders versions", () => {
    expect(sort(["2.0", "1.0", "1.5", "3.0"])).toEqual(["1.0", "1.5", "2.0", "3.0"]);
  });

  it("satisfiesRange checks bounds", () => {
    expect(satisfiesRange("1.5.0", "1.0.0", "2.0.0")).toBe(true);
    expect(satisfiesRange("0.9.0", "1.0.0", "2.0.0")).toBe(false);
    expect(satisfiesRange("2.1.0", "1.0.0", "2.0.0")).toBe(false);
  });
});
