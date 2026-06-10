import { describe, it, expect } from "vitest";
import {
  moistureRetention, decompositionMonths, weedSuppression,
  soilEnrichment, applicationDepthCm, organic,
  yearRound, bestGardenType, costPerM3, mulchTypes,
} from "../mulch-type-calc.js";

describe("moistureRetention", () => {
  it("leaf mold retains most moisture", () => {
    expect(moistureRetention("leaf_mold")).toBeGreaterThan(
      moistureRetention("gravel")
    );
  });
});

describe("decompositionMonths", () => {
  it("gravel does not decompose", () => {
    expect(decompositionMonths("gravel")).toBeGreaterThan(
      decompositionMonths("straw")
    );
  });
});

describe("weedSuppression", () => {
  it("wood chip suppresses weeds well", () => {
    expect(weedSuppression("wood_chip")).toBeGreaterThan(
      weedSuppression("leaf_mold")
    );
  });
});

describe("soilEnrichment", () => {
  it("leaf mold enriches soil most", () => {
    expect(soilEnrichment("leaf_mold")).toBeGreaterThan(
      soilEnrichment("wood_chip")
    );
  });
});

describe("applicationDepthCm", () => {
  it("straw applied deepest", () => {
    expect(applicationDepthCm("straw")).toBeGreaterThan(
      applicationDepthCm("gravel")
    );
  });
});

describe("organic", () => {
  it("wood chip is organic", () => {
    expect(organic("wood_chip")).toBe(true);
  });
  it("gravel is not", () => {
    expect(organic("gravel")).toBe(false);
  });
});

describe("yearRound", () => {
  it("gravel is year round", () => {
    expect(yearRound("gravel")).toBe(true);
  });
  it("straw is not", () => {
    expect(yearRound("straw")).toBe(false);
  });
});

describe("bestGardenType", () => {
  it("straw best for vegetable garden", () => {
    expect(bestGardenType("straw")).toBe("vegetable_garden");
  });
});

describe("costPerM3", () => {
  it("gravel costs most", () => {
    expect(costPerM3("gravel")).toBeGreaterThan(
      costPerM3("living_mulch")
    );
  });
});

describe("mulchTypes", () => {
  it("returns 5 types", () => {
    expect(mulchTypes()).toHaveLength(5);
  });
});
