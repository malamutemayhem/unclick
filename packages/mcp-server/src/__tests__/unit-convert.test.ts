import { describe, it, expect } from "vitest";
import { convert, listUnits, listCategories } from "../unit-convert.js";

describe("convert", () => {
  it("converts length", () => {
    expect(convert(1, "km", "m")).toBe(1000);
    expect(convert(1, "mi", "km")).toBeCloseTo(1.60934, 3);
  });

  it("converts weight", () => {
    expect(convert(1, "kg", "lb")).toBeCloseTo(2.20462, 3);
    expect(convert(16, "oz", "lb")).toBe(1);
  });

  it("converts temperature", () => {
    expect(convert(0, "c", "f")).toBe(32);
    expect(convert(100, "c", "f")).toBe(212);
    expect(convert(32, "f", "c")).toBe(0);
    expect(convert(0, "c", "k")).toBe(273.15);
  });

  it("throws for unknown conversion", () => {
    expect(() => convert(1, "kg", "km")).toThrow();
  });

  it("identity conversion", () => {
    expect(convert(5, "m", "m")).toBe(5);
    expect(convert(100, "c", "c")).toBe(100);
  });
});

describe("listUnits", () => {
  it("returns units for category", () => {
    expect(listUnits("length")).toContain("m");
    expect(listUnits("temperature")).toContain("c");
  });
});

describe("listCategories", () => {
  it("returns all categories", () => {
    const cats = listCategories();
    expect(cats).toContain("length");
    expect(cats).toContain("weight");
    expect(cats).toContain("temperature");
  });
});
