import { describe, it, expect } from "vitest";
import {
  cutSizeToleranceMm, leadCameWidthMm, solderJointCount, cameWeightKgPerM,
  cementingTimeHours, lightTransmissionPercent, thermalExpansionCoeff,
  annealingTempCelsius, costPerM2, glassTypes,
} from "../stained-glass-calc.js";

describe("cutSizeToleranceMm", () => {
  it("dalle has largest tolerance", () => {
    expect(cutSizeToleranceMm("dalle")).toBeGreaterThan(
      cutSizeToleranceMm("cathedral")
    );
  });
});

describe("leadCameWidthMm", () => {
  it("many pieces use narrow came", () => {
    expect(leadCameWidthMm(150)).toBe(4);
  });
  it("few pieces use wide came", () => {
    expect(leadCameWidthMm(50)).toBe(6);
  });
  it("zero pieces returns 0", () => {
    expect(leadCameWidthMm(0)).toBe(0);
  });
});

describe("solderJointCount", () => {
  it("proportional to piece count", () => {
    expect(solderJointCount(100)).toBeGreaterThan(solderJointCount(50));
  });
});

describe("cameWeightKgPerM", () => {
  it("wider came is heavier", () => {
    expect(cameWeightKgPerM(6)).toBeGreaterThan(cameWeightKgPerM(4));
  });
});

describe("cementingTimeHours", () => {
  it("larger panel takes longer", () => {
    expect(cementingTimeHours(2)).toBeGreaterThan(cementingTimeHours(1));
  });
});

describe("lightTransmissionPercent", () => {
  it("cathedral transmits most light", () => {
    expect(lightTransmissionPercent("cathedral")).toBeGreaterThan(
      lightTransmissionPercent("opalescent")
    );
  });
});

describe("thermalExpansionCoeff", () => {
  it("dalle has lowest expansion", () => {
    expect(thermalExpansionCoeff("dalle")).toBeLessThan(
      thermalExpansionCoeff("antique")
    );
  });
});

describe("annealingTempCelsius", () => {
  it("dalle anneals hottest", () => {
    expect(annealingTempCelsius("dalle")).toBeGreaterThan(
      annealingTempCelsius("cathedral")
    );
  });
});

describe("costPerM2", () => {
  it("antique is most expensive", () => {
    expect(costPerM2("antique")).toBeGreaterThan(costPerM2("cathedral"));
  });
});

describe("glassTypes", () => {
  it("returns 5 types", () => {
    expect(glassTypes()).toHaveLength(5);
  });
});
