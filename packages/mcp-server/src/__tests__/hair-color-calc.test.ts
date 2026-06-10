import { describe, it, expect } from "vitest";
import {
  colorLongevity, graysCoverage, hairDamage, colorVibrancy,
  productCost, requiresDeveloper, canLighten, chemicalProcess,
  bestUse, hairColors,
} from "../hair-color-calc.js";

describe("colorLongevity", () => {
  it("permanent longest lasting", () => {
    expect(colorLongevity("permanent")).toBeGreaterThan(colorLongevity("semi_permanent"));
  });
});

describe("graysCoverage", () => {
  it("permanent best gray coverage", () => {
    expect(graysCoverage("permanent")).toBeGreaterThan(graysCoverage("temporary"));
  });
});

describe("hairDamage", () => {
  it("bleach most damaging", () => {
    expect(hairDamage("bleach_lightener")).toBeGreaterThan(hairDamage("temporary"));
  });
});

describe("colorVibrancy", () => {
  it("permanent most vibrant", () => {
    expect(colorVibrancy("permanent")).toBeGreaterThan(colorVibrancy("temporary"));
  });
});

describe("productCost", () => {
  it("bleach most expensive", () => {
    expect(productCost("bleach_lightener")).toBeGreaterThan(productCost("temporary"));
  });
});

describe("requiresDeveloper", () => {
  it("permanent requires developer", () => {
    expect(requiresDeveloper("permanent")).toBe(true);
  });
  it("temporary does not", () => {
    expect(requiresDeveloper("temporary")).toBe(false);
  });
});

describe("canLighten", () => {
  it("bleach can lighten", () => {
    expect(canLighten("bleach_lightener")).toBe(true);
  });
  it("semi permanent cannot", () => {
    expect(canLighten("semi_permanent")).toBe(false);
  });
});

describe("chemicalProcess", () => {
  it("permanent uses oxidation cortex penetration", () => {
    expect(chemicalProcess("permanent")).toBe("oxidation_cortex_penetration");
  });
});

describe("bestUse", () => {
  it("temporary for event costume wash out", () => {
    expect(bestUse("temporary")).toBe("event_costume_wash_out");
  });
});

describe("hairColors", () => {
  it("returns 5 types", () => {
    expect(hairColors()).toHaveLength(5);
  });
});
