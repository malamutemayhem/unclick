import { describe, it, expect } from "vitest";
import {
  ibuContribution, boilTimeMinutes, dryHopDays, storageLifeMonths,
  alphaAcidDecayPercent, hopStandMinutes, aromaOilMlPer100g,
  pelletEquivalentG, trubLossLiters, hopUses,
} from "../hop-calc.js";

describe("ibuContribution", () => {
  it("more hops = more ibu", () => {
    expect(ibuContribution(10, 50, 20, 60)).toBeGreaterThan(
      ibuContribution(10, 25, 20, 60)
    );
  });
  it("zero volume returns zero", () => {
    expect(ibuContribution(10, 50, 0, 60)).toBe(0);
  });
});

describe("boilTimeMinutes", () => {
  it("bittering boils longest", () => {
    expect(boilTimeMinutes("bittering")).toBeGreaterThan(boilTimeMinutes("aroma"));
  });
  it("dry hop has zero boil", () => {
    expect(boilTimeMinutes("dry_hop")).toBe(0);
  });
});

describe("dryHopDays", () => {
  it("heavy intensity = longest", () => {
    expect(dryHopDays("heavy")).toBeGreaterThan(dryHopDays("light"));
  });
});

describe("storageLifeMonths", () => {
  it("extract lasts longest", () => {
    expect(storageLifeMonths("extract")).toBeGreaterThan(storageLifeMonths("whole"));
  });
});

describe("alphaAcidDecayPercent", () => {
  it("longer storage = more decay", () => {
    expect(alphaAcidDecayPercent(12, 20)).toBeGreaterThan(alphaAcidDecayPercent(3, 20));
  });
});

describe("hopStandMinutes", () => {
  it("aroma has longest stand", () => {
    expect(hopStandMinutes("aroma")).toBeGreaterThan(hopStandMinutes("flavor"));
  });
});

describe("aromaOilMlPer100g", () => {
  it("american has most oil", () => {
    expect(aromaOilMlPer100g("american")).toBeGreaterThan(aromaOilMlPer100g("english"));
  });
});

describe("pelletEquivalentG", () => {
  it("pellets are 90% of whole", () => {
    expect(pelletEquivalentG(100)).toBe(90);
  });
});

describe("trubLossLiters", () => {
  it("more hops = more loss", () => {
    expect(trubLossLiters(200)).toBeGreaterThan(trubLossLiters(100));
  });
});

describe("hopUses", () => {
  it("returns 5 uses", () => {
    expect(hopUses()).toHaveLength(5);
  });
});
