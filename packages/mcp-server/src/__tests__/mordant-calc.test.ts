import { describe, it, expect } from "vitest";
import {
  mordantWeightG, soakTimeHours, temperatureCelsius, colorShiftEffect,
  toxicityRating, fiberCompatibility, bathReusable, waterLiters,
  costPerKg, mordantTypes,
} from "../mordant-calc.js";

describe("mordantWeightG", () => {
  it("alum needs most weight", () => {
    expect(mordantWeightG(1, "alum")).toBeGreaterThan(mordantWeightG(1, "iron"));
  });
});

describe("soakTimeHours", () => {
  it("alum soaks longest", () => {
    expect(soakTimeHours("alum")).toBeGreaterThan(soakTimeHours("iron"));
  });
});

describe("temperatureCelsius", () => {
  it("chrome needs highest temp", () => {
    expect(temperatureCelsius("chrome")).toBeGreaterThan(temperatureCelsius("iron"));
  });
});

describe("colorShiftEffect", () => {
  it("iron saddens colors", () => {
    expect(colorShiftEffect("iron")).toBe("saddens");
  });
});

describe("toxicityRating", () => {
  it("chrome is most toxic", () => {
    expect(toxicityRating("chrome")).toBeGreaterThan(toxicityRating("alum"));
  });
});

describe("fiberCompatibility", () => {
  it("alum works with most fibers", () => {
    expect(fiberCompatibility("alum").length).toBeGreaterThan(
      fiberCompatibility("tin").length
    );
  });
});

describe("bathReusable", () => {
  it("alum bath is reusable", () => {
    expect(bathReusable("alum")).toBe(true);
  });
  it("copper bath is not reusable", () => {
    expect(bathReusable("copper")).toBe(false);
  });
});

describe("waterLiters", () => {
  it("scales with fabric weight", () => {
    expect(waterLiters(2)).toBeGreaterThan(waterLiters(1));
  });
});

describe("costPerKg", () => {
  it("tin is most expensive", () => {
    expect(costPerKg("tin")).toBeGreaterThan(costPerKg("iron"));
  });
});

describe("mordantTypes", () => {
  it("returns 5 types", () => {
    expect(mordantTypes()).toHaveLength(5);
  });
});
