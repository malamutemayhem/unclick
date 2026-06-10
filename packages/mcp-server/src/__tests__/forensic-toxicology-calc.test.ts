import { describe, it, expect } from "vitest";
import {
  sensitivityLevel, specificityLevel, throughputSamplesPerDay,
  equipmentCost, operatorSkillRequired, confirmatory,
  screeningMethod, detectionTarget, courtAcceptance, forensicToxicologyMethods,
} from "../forensic-toxicology-calc.js";

describe("sensitivityLevel", () => {
  it("lc ms most sensitive", () => {
    expect(sensitivityLevel("lc_ms")).toBeGreaterThan(
      sensitivityLevel("immunoassay")
    );
  });
});

describe("specificityLevel", () => {
  it("gc ms highest specificity", () => {
    expect(specificityLevel("gc_ms")).toBeGreaterThan(
      specificityLevel("immunoassay")
    );
  });
});

describe("throughputSamplesPerDay", () => {
  it("immunoassay highest throughput", () => {
    expect(throughputSamplesPerDay("immunoassay")).toBeGreaterThan(
      throughputSamplesPerDay("lc_ms")
    );
  });
});

describe("equipmentCost", () => {
  it("lc ms most expensive", () => {
    expect(equipmentCost("lc_ms")).toBeGreaterThan(
      equipmentCost("spectrophotometry")
    );
  });
});

describe("operatorSkillRequired", () => {
  it("lc ms needs most skill", () => {
    expect(operatorSkillRequired("lc_ms")).toBeGreaterThan(
      operatorSkillRequired("immunoassay")
    );
  });
});

describe("confirmatory", () => {
  it("gc ms is confirmatory", () => {
    expect(confirmatory("gc_ms")).toBe(true);
  });
  it("immunoassay is not", () => {
    expect(confirmatory("immunoassay")).toBe(false);
  });
});

describe("screeningMethod", () => {
  it("immunoassay is screening", () => {
    expect(screeningMethod("immunoassay")).toBe(true);
  });
  it("gc ms is not", () => {
    expect(screeningMethod("gc_ms")).toBe(false);
  });
});

describe("detectionTarget", () => {
  it("gc ms targets volatile compounds", () => {
    expect(detectionTarget("gc_ms")).toBe("volatile_compounds");
  });
});

describe("courtAcceptance", () => {
  it("gc ms is gold standard", () => {
    expect(courtAcceptance("gc_ms")).toBe("gold_standard");
  });
});

describe("forensicToxicologyMethods", () => {
  it("returns 5 methods", () => {
    expect(forensicToxicologyMethods()).toHaveLength(5);
  });
});
