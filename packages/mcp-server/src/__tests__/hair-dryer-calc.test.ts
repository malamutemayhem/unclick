import { describe, it, expect } from "vitest";
import {
  dryingSpeed, frizzReduction, heatDistribution, hairProtection,
  unitCost, suitableForFineHair, professionalGrade, heatingElement,
  bestHairType, hairDryers,
} from "../hair-dryer-calc.js";

describe("dryingSpeed", () => {
  it("titanium fastest drying", () => {
    expect(dryingSpeed("titanium")).toBeGreaterThan(dryingSpeed("infrared"));
  });
});

describe("frizzReduction", () => {
  it("ionic best frizz reduction", () => {
    expect(frizzReduction("ionic")).toBeGreaterThan(frizzReduction("titanium"));
  });
});

describe("heatDistribution", () => {
  it("ceramic best heat distribution", () => {
    expect(heatDistribution("ceramic")).toBeGreaterThan(heatDistribution("titanium"));
  });
});

describe("hairProtection", () => {
  it("infrared best protection", () => {
    expect(hairProtection("infrared")).toBeGreaterThan(hairProtection("titanium"));
  });
});

describe("unitCost", () => {
  it("infrared most expensive", () => {
    expect(unitCost("infrared")).toBeGreaterThan(unitCost("ionic"));
  });
});

describe("suitableForFineHair", () => {
  it("ionic suitable for fine hair", () => {
    expect(suitableForFineHair("ionic")).toBe(true);
  });
  it("titanium not suitable", () => {
    expect(suitableForFineHair("titanium")).toBe(false);
  });
});

describe("professionalGrade", () => {
  it("tourmaline is professional", () => {
    expect(professionalGrade("tourmaline")).toBe(true);
  });
  it("infrared is not", () => {
    expect(professionalGrade("infrared")).toBe(false);
  });
});

describe("heatingElement", () => {
  it("ceramic uses ceramic coated heating element", () => {
    expect(heatingElement("ceramic")).toBe("ceramic_coated_heating_element");
  });
});

describe("bestHairType", () => {
  it("infrared for fine thin delicate", () => {
    expect(bestHairType("infrared")).toBe("fine_thin_delicate");
  });
});

describe("hairDryers", () => {
  it("returns 5 types", () => {
    expect(hairDryers()).toHaveLength(5);
  });
});
