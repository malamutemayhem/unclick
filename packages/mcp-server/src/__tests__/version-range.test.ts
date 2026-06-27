import { describe, it, expect } from "vitest";
import { satisfies, maxSatisfying, minSatisfying, validRange } from "../version-range.js";

describe("satisfies", () => {
  it("exact match", () => {
    expect(satisfies("1.2.3", "1.2.3")).toBe(true);
    expect(satisfies("1.2.4", "1.2.3")).toBe(false);
  });

  it("caret range", () => {
    expect(satisfies("1.2.3", "^1.0.0")).toBe(true);
    expect(satisfies("1.9.0", "^1.0.0")).toBe(true);
    expect(satisfies("2.0.0", "^1.0.0")).toBe(false);
  });

  it("tilde range", () => {
    expect(satisfies("1.2.5", "~1.2.0")).toBe(true);
    expect(satisfies("1.3.0", "~1.2.0")).toBe(false);
  });

  it("greater than", () => {
    expect(satisfies("2.0.0", ">1.0.0")).toBe(true);
    expect(satisfies("1.0.0", ">1.0.0")).toBe(false);
  });

  it("less than", () => {
    expect(satisfies("0.9.0", "<1.0.0")).toBe(true);
    expect(satisfies("1.0.0", "<1.0.0")).toBe(false);
  });

  it("gte and lte", () => {
    expect(satisfies("1.0.0", ">=1.0.0")).toBe(true);
    expect(satisfies("1.0.0", "<=1.0.0")).toBe(true);
  });

  it("hyphen range", () => {
    expect(satisfies("1.5.0", "1.0.0 - 2.0.0")).toBe(true);
    expect(satisfies("3.0.0", "1.0.0 - 2.0.0")).toBe(false);
  });

  it("OR ranges", () => {
    expect(satisfies("1.0.0", "^1.0.0 || ^2.0.0")).toBe(true);
    expect(satisfies("2.5.0", "^1.0.0 || ^2.0.0")).toBe(true);
    expect(satisfies("3.0.0", "^1.0.0 || ^2.0.0")).toBe(false);
  });

  it("wildcard", () => {
    expect(satisfies("99.99.99", "*")).toBe(true);
  });

  it("AND ranges", () => {
    expect(satisfies("1.5.0", ">=1.0.0 <2.0.0")).toBe(true);
    expect(satisfies("2.0.0", ">=1.0.0 <2.0.0")).toBe(false);
  });
});

describe("maxSatisfying", () => {
  it("finds highest matching version", () => {
    const versions = ["1.0.0", "1.5.0", "2.0.0", "2.1.0"];
    expect(maxSatisfying(versions, "^1.0.0")).toBe("1.5.0");
  });

  it("returns null for no match", () => {
    expect(maxSatisfying(["1.0.0"], "^2.0.0")).toBeNull();
  });
});

describe("minSatisfying", () => {
  it("finds lowest matching version", () => {
    const versions = ["1.0.0", "1.5.0", "2.0.0"];
    expect(minSatisfying(versions, "^1.0.0")).toBe("1.0.0");
  });
});

describe("validRange", () => {
  it("validates good ranges", () => {
    expect(validRange("^1.0.0")).toBe(true);
    expect(validRange(">=1.0.0 <2.0.0")).toBe(true);
    expect(validRange("*")).toBe(true);
  });
});
