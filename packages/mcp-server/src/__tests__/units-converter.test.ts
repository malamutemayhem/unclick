import { describe, it, expect } from "vitest";
import { convert, listCategories, listUnits, findCategory } from "../units-converter.js";

describe("convert", () => {
  it("converts meters to feet", () => {
    expect(convert(1, "meter", "foot")).toBeCloseTo(3.28084, 2);
  });

  it("converts kilometers to miles", () => {
    expect(convert(1, "kilometer", "mile")).toBeCloseTo(0.621371, 2);
  });

  it("converts kilograms to pounds", () => {
    expect(convert(1, "kilogram", "pound")).toBeCloseTo(2.20462, 2);
  });

  it("converts Celsius to Fahrenheit", () => {
    expect(convert(100, "celsius", "fahrenheit", "temperature")).toBeCloseTo(212, 0);
    expect(convert(0, "celsius", "fahrenheit", "temperature")).toBeCloseTo(32, 0);
  });

  it("converts Fahrenheit to Celsius", () => {
    expect(convert(32, "fahrenheit", "celsius", "temperature")).toBeCloseTo(0, 0);
  });

  it("converts Celsius to Kelvin", () => {
    expect(convert(0, "celsius", "kelvin", "temperature")).toBeCloseTo(273.15, 2);
  });

  it("converts liters to gallons", () => {
    expect(convert(1, "liter", "gallon_us")).toBeCloseTo(0.264172, 2);
  });

  it("converts speed units", () => {
    expect(convert(100, "kph", "mph")).toBeCloseTo(62.1371, 1);
  });

  it("converts time units", () => {
    expect(convert(1, "hour", "minute")).toBeCloseTo(60, 0);
    expect(convert(1, "day", "hour")).toBeCloseTo(24, 0);
  });

  it("throws for unknown units", () => {
    expect(() => convert(1, "foo", "bar")).toThrow();
  });

  it("throws for unknown category", () => {
    expect(() => convert(1, "meter", "foot", "unknown")).toThrow();
  });
});

describe("listCategories", () => {
  it("returns all categories", () => {
    const cats = listCategories();
    expect(cats).toContain("length");
    expect(cats).toContain("mass");
    expect(cats).toContain("temperature");
  });
});

describe("listUnits", () => {
  it("lists length units", () => {
    const units = listUnits("length");
    expect(units).toContain("meter");
    expect(units).toContain("mile");
  });

  it("returns empty for unknown category", () => {
    expect(listUnits("unknown")).toEqual([]);
  });
});

describe("findCategory", () => {
  it("finds category for known unit", () => {
    expect(findCategory("meter")).toBe("length");
    expect(findCategory("kilogram")).toBe("mass");
  });

  it("returns null for unknown unit", () => {
    expect(findCategory("foo")).toBeNull();
  });
});
