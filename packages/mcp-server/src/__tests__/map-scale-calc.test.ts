import { describe, it, expect } from "vitest";
import {
  detailLevel, coverageArea, featureGeneralization,
  accuracyMeters, productionCost, showsBuildings,
  showsCountries, typicalRatio, primaryApplication, mapScales,
} from "../map-scale-calc.js";

describe("detailLevel", () => {
  it("large most detail", () => {
    expect(detailLevel("large")).toBeGreaterThan(
      detailLevel("global")
    );
  });
});

describe("coverageArea", () => {
  it("global widest coverage", () => {
    expect(coverageArea("global")).toBeGreaterThan(
      coverageArea("large")
    );
  });
});

describe("featureGeneralization", () => {
  it("global most generalized", () => {
    expect(featureGeneralization("global")).toBeGreaterThan(
      featureGeneralization("large")
    );
  });
});

describe("accuracyMeters", () => {
  it("large most accurate", () => {
    expect(accuracyMeters("large")).toBeLessThan(
      accuracyMeters("global")
    );
  });
});

describe("productionCost", () => {
  it("large most expensive", () => {
    expect(productionCost("large")).toBeGreaterThan(
      productionCost("global")
    );
  });
});

describe("showsBuildings", () => {
  it("large shows buildings", () => {
    expect(showsBuildings("large")).toBe(true);
  });
  it("global does not", () => {
    expect(showsBuildings("global")).toBe(false);
  });
});

describe("showsCountries", () => {
  it("global shows countries", () => {
    expect(showsCountries("global")).toBe(true);
  });
  it("large does not", () => {
    expect(showsCountries("large")).toBe(false);
  });
});

describe("typicalRatio", () => {
  it("large is 1 to 1000", () => {
    expect(typicalRatio("large")).toBe("1_to_1000");
  });
});

describe("primaryApplication", () => {
  it("medium for topographic hiking", () => {
    expect(primaryApplication("medium")).toBe("topographic_hiking");
  });
});

describe("mapScales", () => {
  it("returns 5 scales", () => {
    expect(mapScales()).toHaveLength(5);
  });
});
