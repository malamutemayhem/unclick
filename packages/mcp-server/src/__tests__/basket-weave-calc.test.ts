import { describe, it, expect } from "vitest";
import {
  stakeLengthCm, weaverLengthCm, soakTimeMinutes, stakeSpacingMm,
  weavingTimeHours, durabilityYears, weightEmptyG, flexibilityRating,
  costPerKg, basketMaterials,
} from "../basket-weave-calc.js";

describe("stakeLengthCm", () => {
  it("taller basket = longer stakes", () => {
    expect(stakeLengthCm(30)).toBeGreaterThan(stakeLengthCm(15));
  });
});

describe("weaverLengthCm", () => {
  it("more rows = longer weavers", () => {
    expect(weaverLengthCm(60, 20)).toBeGreaterThan(weaverLengthCm(60, 10));
  });
});

describe("soakTimeMinutes", () => {
  it("bamboo needs longest soak", () => {
    expect(soakTimeMinutes("bamboo")).toBeGreaterThan(soakTimeMinutes("sweetgrass"));
  });
});

describe("stakeSpacingMm", () => {
  it("bamboo has widest spacing", () => {
    expect(stakeSpacingMm("bamboo")).toBeGreaterThan(stakeSpacingMm("sweetgrass"));
  });
});

describe("weavingTimeHours", () => {
  it("sweetgrass takes longest", () => {
    expect(weavingTimeHours("sweetgrass", 10)).toBeGreaterThan(
      weavingTimeHours("rattan", 10)
    );
  });
});

describe("durabilityYears", () => {
  it("bamboo lasts longest", () => {
    expect(durabilityYears("bamboo")).toBeGreaterThan(durabilityYears("sweetgrass"));
  });
});

describe("weightEmptyG", () => {
  it("bamboo is heaviest", () => {
    expect(weightEmptyG(10, "bamboo")).toBeGreaterThan(weightEmptyG(10, "sweetgrass"));
  });
});

describe("flexibilityRating", () => {
  it("willow is most flexible", () => {
    expect(flexibilityRating("willow")).toBeGreaterThan(flexibilityRating("bamboo"));
  });
});

describe("costPerKg", () => {
  it("sweetgrass is most expensive", () => {
    expect(costPerKg("sweetgrass")).toBeGreaterThan(costPerKg("bamboo"));
  });
});

describe("basketMaterials", () => {
  it("returns 5 materials", () => {
    expect(basketMaterials()).toHaveLength(5);
  });
});
