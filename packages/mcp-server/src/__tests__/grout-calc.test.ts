import { describe, it, expect } from "vitest";
import {
  mixRatioWaterToGrout, openTimeMinutes, cureTimeHours, coverageKgPerM2,
  chemicalResistance, stainResistance, flexibilityRating, sealerRequired,
  costPerKg, groutTypes,
} from "../grout-calc.js";

describe("mixRatioWaterToGrout", () => {
  it("epoxy needs no water", () => {
    expect(mixRatioWaterToGrout("epoxy")).toBe(0);
  });
  it("portland needs water", () => {
    expect(mixRatioWaterToGrout("portland")).toBeGreaterThan(0);
  });
});

describe("openTimeMinutes", () => {
  it("epoxy has longest open time", () => {
    expect(openTimeMinutes("epoxy")).toBeGreaterThan(openTimeMinutes("furan"));
  });
});

describe("cureTimeHours", () => {
  it("urethane cures fastest", () => {
    expect(cureTimeHours("urethane")).toBeLessThan(cureTimeHours("portland"));
  });
});

describe("coverageKgPerM2", () => {
  it("wider joints use more grout", () => {
    expect(coverageKgPerM2(6, 6, 30)).toBeGreaterThan(
      coverageKgPerM2(3, 6, 30)
    );
  });
  it("zero tile size returns 0", () => {
    expect(coverageKgPerM2(3, 6, 0)).toBe(0);
  });
});

describe("chemicalResistance", () => {
  it("epoxy has best chemical resistance", () => {
    expect(chemicalResistance("epoxy")).toBeGreaterThan(
      chemicalResistance("portland")
    );
  });
});

describe("stainResistance", () => {
  it("epoxy has best stain resistance", () => {
    expect(stainResistance("epoxy")).toBeGreaterThan(
      stainResistance("portland")
    );
  });
});

describe("flexibilityRating", () => {
  it("urethane is most flexible", () => {
    expect(flexibilityRating("urethane")).toBeGreaterThan(
      flexibilityRating("portland")
    );
  });
});

describe("sealerRequired", () => {
  it("portland needs sealer", () => {
    expect(sealerRequired("portland")).toBe(true);
  });
  it("epoxy does not need sealer", () => {
    expect(sealerRequired("epoxy")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("furan is most expensive", () => {
    expect(costPerKg("furan")).toBeGreaterThan(costPerKg("portland"));
  });
});

describe("groutTypes", () => {
  it("returns 5 types", () => {
    expect(groutTypes()).toHaveLength(5);
  });
});
