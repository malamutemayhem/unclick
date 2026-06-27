import { describe, it, expect } from "vitest";
import {
  moundHeightM, waterRetentionRating, nitrogenRobYears, soilCapM3,
  settlementPercent, productiveYears, heatGenerationRating,
  compostLayerCm, costPerMeter, woodDecayStages,
} from "../hugelkultur-calc.js";

describe("moundHeightM", () => {
  it("more wood makes taller mound", () => {
    expect(moundHeightM(3)).toBeGreaterThan(moundHeightM(1));
  });
});

describe("waterRetentionRating", () => {
  it("punky wood retains most water", () => {
    expect(waterRetentionRating("punky")).toBeGreaterThan(
      waterRetentionRating("fresh")
    );
  });
});

describe("nitrogenRobYears", () => {
  it("fresh wood robs nitrogen longest", () => {
    expect(nitrogenRobYears("fresh")).toBeGreaterThan(
      nitrogenRobYears("punky")
    );
  });
  it("punky wood does not rob nitrogen", () => {
    expect(nitrogenRobYears("punky")).toBe(0);
  });
});

describe("soilCapM3", () => {
  it("longer mound holds more soil", () => {
    expect(soilCapM3(1, 5)).toBeGreaterThan(soilCapM3(1, 2));
  });
});

describe("settlementPercent", () => {
  it("fresh wood settles most", () => {
    expect(settlementPercent("fresh")).toBeGreaterThan(
      settlementPercent("charcoal")
    );
  });
});

describe("productiveYears", () => {
  it("charcoal lasts longest", () => {
    expect(productiveYears("charcoal")).toBeGreaterThan(
      productiveYears("punky")
    );
  });
});

describe("heatGenerationRating", () => {
  it("two year wood generates most heat", () => {
    expect(heatGenerationRating("two_year")).toBeGreaterThan(
      heatGenerationRating("charcoal")
    );
  });
});

describe("compostLayerCm", () => {
  it("returns 5", () => {
    expect(compostLayerCm()).toBe(5);
  });
});

describe("costPerMeter", () => {
  it("fresh wood costs most", () => {
    expect(costPerMeter("fresh")).toBeGreaterThan(
      costPerMeter("punky")
    );
  });
});

describe("woodDecayStages", () => {
  it("returns 5 stages", () => {
    expect(woodDecayStages()).toHaveLength(5);
  });
});
