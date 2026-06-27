import { describe, it, expect } from "vitest";
import {
  mohsHardness, carvingSpeedRating, detailResolution, polishCapability,
  chiselTypeRecommended, dustHazard, weatherDurability, weightKgPerM3,
  costPerKg, stoneTypes,
} from "../stone-carving-calc.js";

describe("mohsHardness", () => {
  it("granite is hardest", () => {
    expect(mohsHardness("granite")).toBeGreaterThan(
      mohsHardness("soapstone")
    );
  });
});

describe("carvingSpeedRating", () => {
  it("soapstone carves fastest", () => {
    expect(carvingSpeedRating("soapstone")).toBeGreaterThan(
      carvingSpeedRating("granite")
    );
  });
});

describe("detailResolution", () => {
  it("marble gives best detail", () => {
    expect(detailResolution("marble")).toBeGreaterThan(
      detailResolution("sandstone")
    );
  });
});

describe("polishCapability", () => {
  it("marble can be polished", () => {
    expect(polishCapability("marble")).toBe(true);
  });
  it("sandstone cannot be polished", () => {
    expect(polishCapability("sandstone")).toBe(false);
  });
});

describe("chiselTypeRecommended", () => {
  it("granite uses carbide point", () => {
    expect(chiselTypeRecommended("granite")).toBe("carbide_point");
  });
});

describe("dustHazard", () => {
  it("sandstone is most dusty", () => {
    expect(dustHazard("sandstone")).toBeGreaterThan(
      dustHazard("soapstone")
    );
  });
});

describe("weatherDurability", () => {
  it("granite is most durable", () => {
    expect(weatherDurability("granite")).toBeGreaterThan(
      weatherDurability("soapstone")
    );
  });
});

describe("weightKgPerM3", () => {
  it("soapstone is heaviest", () => {
    expect(weightKgPerM3("soapstone")).toBeGreaterThanOrEqual(
      weightKgPerM3("marble")
    );
  });
});

describe("costPerKg", () => {
  it("marble is most expensive", () => {
    expect(costPerKg("marble")).toBeGreaterThan(costPerKg("limestone"));
  });
});

describe("stoneTypes", () => {
  it("returns 5 types", () => {
    expect(stoneTypes()).toHaveLength(5);
  });
});
