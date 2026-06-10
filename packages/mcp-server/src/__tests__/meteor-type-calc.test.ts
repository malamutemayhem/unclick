import { describe, it, expect } from "vitest";
import {
  densityGCm3, abundancePercent, nickelContentPercent,
  fusionCrustRating, scientificValue, magneticResponse,
  containsChondrules, parentBody, collectorValuePerGram, meteorTypes,
} from "../meteor-type-calc.js";

describe("densityGCm3", () => {
  it("iron is densest", () => {
    expect(densityGCm3("iron")).toBeGreaterThan(
      densityGCm3("carbonaceous")
    );
  });
});

describe("abundancePercent", () => {
  it("stony is most abundant", () => {
    expect(abundancePercent("stony")).toBeGreaterThan(
      abundancePercent("iron")
    );
  });
});

describe("nickelContentPercent", () => {
  it("iron has most nickel", () => {
    expect(nickelContentPercent("iron")).toBeGreaterThan(
      nickelContentPercent("stony")
    );
  });
});

describe("fusionCrustRating", () => {
  it("carbonaceous has best fusion crust", () => {
    expect(fusionCrustRating("carbonaceous")).toBeGreaterThan(
      fusionCrustRating("iron")
    );
  });
});

describe("scientificValue", () => {
  it("carbonaceous has highest scientific value", () => {
    expect(scientificValue("carbonaceous")).toBeGreaterThan(
      scientificValue("iron")
    );
  });
});

describe("magneticResponse", () => {
  it("iron is magnetic", () => {
    expect(magneticResponse("iron")).toBe(true);
  });
  it("stony is not", () => {
    expect(magneticResponse("stony")).toBe(false);
  });
});

describe("containsChondrules", () => {
  it("stony contains chondrules", () => {
    expect(containsChondrules("stony")).toBe(true);
  });
  it("achondrite does not", () => {
    expect(containsChondrules("achondrite")).toBe(false);
  });
});

describe("parentBody", () => {
  it("iron comes from asteroid core", () => {
    expect(parentBody("iron")).toBe("asteroid_core");
  });
});

describe("collectorValuePerGram", () => {
  it("carbonaceous is most valuable", () => {
    expect(collectorValuePerGram("carbonaceous")).toBeGreaterThan(
      collectorValuePerGram("iron")
    );
  });
});

describe("meteorTypes", () => {
  it("returns 5 types", () => {
    expect(meteorTypes()).toHaveLength(5);
  });
});
