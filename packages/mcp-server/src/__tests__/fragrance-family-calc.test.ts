import { describe, it, expect } from "vitest";
import {
  longevityHours, sillage, versatility, seasonality,
  complexityLevel, unisex, officeAppropriate, keyIngredient,
  bestSeason, fragranceFamilies,
} from "../fragrance-family-calc.js";

describe("longevityHours", () => {
  it("oriental lasts longest", () => {
    expect(longevityHours("oriental")).toBeGreaterThan(longevityHours("fresh"));
  });
});

describe("sillage", () => {
  it("oriental strongest sillage", () => {
    expect(sillage("oriental")).toBeGreaterThan(sillage("fresh"));
  });
});

describe("versatility", () => {
  it("fresh most versatile", () => {
    expect(versatility("fresh")).toBeGreaterThan(versatility("gourmand"));
  });
});

describe("seasonality", () => {
  it("fresh most seasonal flexibility", () => {
    expect(seasonality("fresh")).toBeGreaterThan(seasonality("gourmand"));
  });
});

describe("complexityLevel", () => {
  it("oriental most complex", () => {
    expect(complexityLevel("oriental")).toBeGreaterThan(complexityLevel("fresh"));
  });
});

describe("unisex", () => {
  it("woody is unisex", () => {
    expect(unisex("woody")).toBe(true);
  });
  it("floral is not", () => {
    expect(unisex("floral")).toBe(false);
  });
});

describe("officeAppropriate", () => {
  it("fresh is office appropriate", () => {
    expect(officeAppropriate("fresh")).toBe(true);
  });
  it("oriental is not", () => {
    expect(officeAppropriate("oriental")).toBe(false);
  });
});

describe("keyIngredient", () => {
  it("woody uses sandalwood cedar vetiver", () => {
    expect(keyIngredient("woody")).toBe("sandalwood_cedar_vetiver");
  });
});

describe("bestSeason", () => {
  it("oriental for fall winter", () => {
    expect(bestSeason("oriental")).toBe("fall_winter");
  });
});

describe("fragranceFamilies", () => {
  it("returns 5 families", () => {
    expect(fragranceFamilies()).toHaveLength(5);
  });
});
