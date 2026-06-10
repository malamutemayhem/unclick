import { describe, it, expect } from "vitest";
import {
  baleWeightKg, moistureTargetPercent, curingDays, yieldKgPerHectare,
  proteinPercent, stackHeightBales, storageM2PerTonne, combustionRiskTemp,
  costPerTonne, hayTypes,
} from "../haystack-calc.js";

describe("baleWeightKg", () => {
  it("large square is heaviest", () => {
    expect(baleWeightKg("large_square")).toBeGreaterThan(baleWeightKg("round"));
  });
});

describe("moistureTargetPercent", () => {
  it("alfalfa needs lowest moisture", () => {
    expect(moistureTargetPercent("alfalfa")).toBeLessThan(
      moistureTargetPercent("ryegrass")
    );
  });
});

describe("curingDays", () => {
  it("clover takes longest to cure", () => {
    expect(curingDays("clover")).toBeGreaterThan(curingDays("alfalfa"));
  });
});

describe("yieldKgPerHectare", () => {
  it("alfalfa yields most", () => {
    expect(yieldKgPerHectare("alfalfa")).toBeGreaterThan(yieldKgPerHectare("timothy"));
  });
});

describe("proteinPercent", () => {
  it("alfalfa has most protein", () => {
    expect(proteinPercent("alfalfa")).toBeGreaterThan(proteinPercent("timothy"));
  });
});

describe("stackHeightBales", () => {
  it("small square stacks highest", () => {
    expect(stackHeightBales("small_square")).toBeGreaterThan(stackHeightBales("round"));
  });
});

describe("storageM2PerTonne", () => {
  it("round bales need most space", () => {
    expect(storageM2PerTonne("round")).toBeGreaterThan(storageM2PerTonne("large_square"));
  });
});

describe("combustionRiskTemp", () => {
  it("returns 70 degrees", () => {
    expect(combustionRiskTemp()).toBe(70);
  });
});

describe("costPerTonne", () => {
  it("alfalfa is most expensive", () => {
    expect(costPerTonne("alfalfa")).toBeGreaterThan(costPerTonne("meadow_mix"));
  });
});

describe("hayTypes", () => {
  it("returns 5 types", () => {
    expect(hayTypes()).toHaveLength(5);
  });
});
