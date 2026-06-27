import { describe, it, expect } from "vitest";
import {
  colorLovibond, diastatiPower, fermentability,
  flavorIntensity, maxGristPercent, isBaseMalt,
  needsMashing, typicalStyle, kilnTreatment, maltTypes,
} from "../malt-type-calc.js";

describe("colorLovibond", () => {
  it("roasted darkest color", () => {
    expect(colorLovibond("roasted")).toBeGreaterThan(
      colorLovibond("pale")
    );
  });
});

describe("diastatiPower", () => {
  it("pilsner highest diastatic power", () => {
    expect(diastatiPower("pilsner")).toBeGreaterThan(
      diastatiPower("crystal")
    );
  });
});

describe("fermentability", () => {
  it("pilsner most fermentable", () => {
    expect(fermentability("pilsner")).toBeGreaterThan(
      fermentability("roasted")
    );
  });
});

describe("flavorIntensity", () => {
  it("roasted most intense flavor", () => {
    expect(flavorIntensity("roasted")).toBeGreaterThan(
      flavorIntensity("pale")
    );
  });
});

describe("maxGristPercent", () => {
  it("pale can be 100% of grist", () => {
    expect(maxGristPercent("pale")).toBe(100);
  });
  it("roasted limited to 10%", () => {
    expect(maxGristPercent("roasted")).toBe(10);
  });
});

describe("isBaseMalt", () => {
  it("pale is base malt", () => {
    expect(isBaseMalt("pale")).toBe(true);
  });
  it("crystal is not", () => {
    expect(isBaseMalt("crystal")).toBe(false);
  });
});

describe("needsMashing", () => {
  it("pale needs mashing", () => {
    expect(needsMashing("pale")).toBe(true);
  });
  it("roasted does not", () => {
    expect(needsMashing("roasted")).toBe(false);
  });
});

describe("typicalStyle", () => {
  it("roasted for stout porter", () => {
    expect(typicalStyle("roasted")).toBe("stout_porter");
  });
});

describe("kilnTreatment", () => {
  it("crystal is stewed", () => {
    expect(kilnTreatment("crystal")).toBe("stewed_crystallized");
  });
});

describe("maltTypes", () => {
  it("returns 5 types", () => {
    expect(maltTypes()).toHaveLength(5);
  });
});
