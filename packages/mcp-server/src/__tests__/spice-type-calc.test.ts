import { describe, it, expect } from "vitest";
import {
  scovilleHeat, colorIntensity, aromaStrength,
  versatility, shelfLifeMonths, wholeForm,
  usedInDesserts, originRegion, pricePerKg, spiceTypes,
} from "../spice-type-calc.js";

describe("scovilleHeat", () => {
  it("black pepper is hottest", () => {
    expect(scovilleHeat("black_pepper")).toBeGreaterThan(
      scovilleHeat("turmeric")
    );
  });
});

describe("colorIntensity", () => {
  it("turmeric has highest color intensity", () => {
    expect(colorIntensity("turmeric")).toBeGreaterThan(
      colorIntensity("black_pepper")
    );
  });
});

describe("aromaStrength", () => {
  it("cinnamon has strongest aroma", () => {
    expect(aromaStrength("cinnamon")).toBeGreaterThan(
      aromaStrength("turmeric")
    );
  });
});

describe("versatility", () => {
  it("black pepper is most versatile", () => {
    expect(versatility("black_pepper")).toBeGreaterThan(
      versatility("saffron")
    );
  });
});

describe("shelfLifeMonths", () => {
  it("cinnamon lasts longest", () => {
    expect(shelfLifeMonths("cinnamon")).toBeGreaterThanOrEqual(
      shelfLifeMonths("saffron")
    );
  });
});

describe("wholeForm", () => {
  it("all spices come in whole form", () => {
    expect(wholeForm("cumin")).toBe(true);
    expect(wholeForm("saffron")).toBe(true);
  });
});

describe("usedInDesserts", () => {
  it("cinnamon is used in desserts", () => {
    expect(usedInDesserts("cinnamon")).toBe(true);
  });
  it("cumin is not", () => {
    expect(usedInDesserts("cumin")).toBe(false);
  });
});

describe("originRegion", () => {
  it("saffron from iran", () => {
    expect(originRegion("saffron")).toBe("iran");
  });
});

describe("pricePerKg", () => {
  it("saffron is most expensive", () => {
    expect(pricePerKg("saffron")).toBeGreaterThan(
      pricePerKg("black_pepper")
    );
  });
});

describe("spiceTypes", () => {
  it("returns 5 types", () => {
    expect(spiceTypes()).toHaveLength(5);
  });
});
