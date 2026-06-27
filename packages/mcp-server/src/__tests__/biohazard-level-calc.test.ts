import { describe, it, expect } from "vitest";
import {
  containmentRigor, facilityBuildCost, ppeRequirement, regulatoryOverhead,
  trainingHours, requiresNegativePressure, requiresPositivePressureSuit, wasteDecontamination,
  typicalPathogen, biohazardLevels,
} from "../biohazard-level-calc.js";

describe("containmentRigor", () => {
  it("bsl 4 most rigorous", () => {
    expect(containmentRigor("bsl_4")).toBeGreaterThan(containmentRigor("bsl_1"));
  });
});

describe("facilityBuildCost", () => {
  it("bsl 4 most expensive", () => {
    expect(facilityBuildCost("bsl_4")).toBeGreaterThan(facilityBuildCost("bsl_1"));
  });
});

describe("ppeRequirement", () => {
  it("bsl 4 highest ppe requirement", () => {
    expect(ppeRequirement("bsl_4")).toBeGreaterThan(ppeRequirement("bsl_2"));
  });
});

describe("regulatoryOverhead", () => {
  it("bsl 4 most regulation", () => {
    expect(regulatoryOverhead("bsl_4")).toBeGreaterThan(regulatoryOverhead("bsl_1"));
  });
});

describe("trainingHours", () => {
  it("bsl 4 most training", () => {
    expect(trainingHours("bsl_4")).toBeGreaterThan(trainingHours("bsl_1"));
  });
});

describe("requiresNegativePressure", () => {
  it("bsl 3 requires negative pressure", () => {
    expect(requiresNegativePressure("bsl_3")).toBe(true);
  });
  it("bsl 2 does not", () => {
    expect(requiresNegativePressure("bsl_2")).toBe(false);
  });
});

describe("requiresPositivePressureSuit", () => {
  it("bsl 4 requires pressure suit", () => {
    expect(requiresPositivePressureSuit("bsl_4")).toBe(true);
  });
  it("bsl 3 does not", () => {
    expect(requiresPositivePressureSuit("bsl_3")).toBe(false);
  });
});

describe("wasteDecontamination", () => {
  it("bsl 4 uses chemical shower full decon", () => {
    expect(wasteDecontamination("bsl_4")).toBe("chemical_shower_full_decon");
  });
});

describe("typicalPathogen", () => {
  it("bsl 4 handles ebola marburg smallpox", () => {
    expect(typicalPathogen("bsl_4")).toBe("ebola_marburg_smallpox");
  });
});

describe("biohazardLevels", () => {
  it("returns 5 levels", () => {
    expect(biohazardLevels()).toHaveLength(5);
  });
});
