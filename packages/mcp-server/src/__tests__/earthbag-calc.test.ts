import { describe, it, expect } from "vitest";
import {
  bagWidthCm, bagsPerCourse, barbedWireStrandsPerCourse, tamperWeightKg,
  fillWeightKgPerBag, uvResistanceMonths, tensileStrength, biodegradable,
  costPerBag, bagMaterials,
} from "../earthbag-calc.js";

describe("bagWidthCm", () => {
  it("wider wall = wider bag", () => {
    expect(bagWidthCm(40)).toBeGreaterThan(bagWidthCm(30));
  });
});

describe("bagsPerCourse", () => {
  it("longer perimeter = more bags", () => {
    expect(bagsPerCourse(20, 50)).toBeGreaterThan(bagsPerCourse(10, 50));
  });
  it("zero bag length returns 0", () => {
    expect(bagsPerCourse(10, 0)).toBe(0);
  });
});

describe("barbedWireStrandsPerCourse", () => {
  it("returns 2", () => {
    expect(barbedWireStrandsPerCourse()).toBe(2);
  });
});

describe("tamperWeightKg", () => {
  it("returns 8", () => {
    expect(tamperWeightKg()).toBe(8);
  });
});

describe("fillWeightKgPerBag", () => {
  it("longer bag = heavier fill", () => {
    expect(fillWeightKgPerBag(60)).toBeGreaterThan(fillWeightKgPerBag(40));
  });
});

describe("uvResistanceMonths", () => {
  it("geotextile has best UV resistance", () => {
    expect(uvResistanceMonths("geotextile")).toBeGreaterThan(
      uvResistanceMonths("cotton")
    );
  });
});

describe("tensileStrength", () => {
  it("polypropylene is strongest", () => {
    expect(tensileStrength("polypropylene")).toBeGreaterThan(
      tensileStrength("cotton")
    );
  });
});

describe("biodegradable", () => {
  it("burlap is biodegradable", () => {
    expect(biodegradable("burlap")).toBe(true);
  });
  it("polypropylene is not biodegradable", () => {
    expect(biodegradable("polypropylene")).toBe(false);
  });
});

describe("costPerBag", () => {
  it("geotextile is most expensive", () => {
    expect(costPerBag("geotextile")).toBeGreaterThan(
      costPerBag("polypropylene")
    );
  });
});

describe("bagMaterials", () => {
  it("returns 5 materials", () => {
    expect(bagMaterials()).toHaveLength(5);
  });
});
