import { describe, it, expect } from "vitest";
import {
  depthEffectiveness, treatmentSpeed, strengthGain, environmentalImpact,
  projectCost, requiresSpecialistRig, suitableForClay, mechanism,
  bestSoilType, groundImprovements,
} from "../ground-improvement-calc.js";

describe("depthEffectiveness", () => {
  it("grouting deepest effectiveness", () => {
    expect(depthEffectiveness("grouting")).toBeGreaterThan(depthEffectiveness("preloading"));
  });
});

describe("treatmentSpeed", () => {
  it("dynamic compaction fastest treatment", () => {
    expect(treatmentSpeed("dynamic_compaction")).toBeGreaterThan(treatmentSpeed("preloading"));
  });
});

describe("strengthGain", () => {
  it("soil mixing highest strength gain", () => {
    expect(strengthGain("soil_mixing")).toBeGreaterThan(strengthGain("preloading"));
  });
});

describe("environmentalImpact", () => {
  it("dynamic compaction highest environmental impact", () => {
    expect(environmentalImpact("dynamic_compaction")).toBeGreaterThan(environmentalImpact("preloading"));
  });
});

describe("projectCost", () => {
  it("grouting most expensive", () => {
    expect(projectCost("grouting")).toBeGreaterThan(projectCost("preloading"));
  });
});

describe("requiresSpecialistRig", () => {
  it("grouting requires specialist rig", () => {
    expect(requiresSpecialistRig("grouting")).toBe(true);
  });
  it("preloading does not", () => {
    expect(requiresSpecialistRig("preloading")).toBe(false);
  });
});

describe("suitableForClay", () => {
  it("soil mixing suitable for clay", () => {
    expect(suitableForClay("soil_mixing")).toBe(true);
  });
  it("vibro compaction is not", () => {
    expect(suitableForClay("vibro_compaction")).toBe(false);
  });
});

describe("mechanism", () => {
  it("preloading uses surcharge fill consolidation", () => {
    expect(mechanism("preloading")).toBe("surcharge_fill_consolidation");
  });
});

describe("bestSoilType", () => {
  it("grouting for fractured rock void fill", () => {
    expect(bestSoilType("grouting")).toBe("fractured_rock_void_fill");
  });
});

describe("groundImprovements", () => {
  it("returns 5 methods", () => {
    expect(groundImprovements()).toHaveLength(5);
  });
});
