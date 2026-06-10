import { describe, it, expect } from "vitest";
import {
  soilDisturbance, erosionRisk, fuelUsage,
  soilHealthBenefit, weedSuppression, requiresSpecialEquipment,
  residueRetained, bestClimate, carbonImpact, tillageMethods,
} from "../tillage-method-calc.js";

describe("soilDisturbance", () => {
  it("conventional most disturbing", () => {
    expect(soilDisturbance("conventional")).toBeGreaterThan(
      soilDisturbance("no_till")
    );
  });
});

describe("erosionRisk", () => {
  it("conventional highest erosion risk", () => {
    expect(erosionRisk("conventional")).toBeGreaterThan(
      erosionRisk("no_till")
    );
  });
});

describe("fuelUsage", () => {
  it("conventional uses most fuel", () => {
    expect(fuelUsage("conventional")).toBeGreaterThan(
      fuelUsage("no_till")
    );
  });
});

describe("soilHealthBenefit", () => {
  it("no_till best for soil health", () => {
    expect(soilHealthBenefit("no_till")).toBeGreaterThan(
      soilHealthBenefit("conventional")
    );
  });
});

describe("weedSuppression", () => {
  it("conventional best weed suppression", () => {
    expect(weedSuppression("conventional")).toBeGreaterThan(
      weedSuppression("no_till")
    );
  });
});

describe("requiresSpecialEquipment", () => {
  it("no_till requires special equipment", () => {
    expect(requiresSpecialEquipment("no_till")).toBe(true);
  });
  it("conventional does not", () => {
    expect(requiresSpecialEquipment("conventional")).toBe(false);
  });
});

describe("residueRetained", () => {
  it("no_till retains residue", () => {
    expect(residueRetained("no_till")).toBe(true);
  });
  it("conventional does not", () => {
    expect(residueRetained("conventional")).toBe(false);
  });
});

describe("bestClimate", () => {
  it("no_till for humid subtropical", () => {
    expect(bestClimate("no_till")).toBe("humid_subtropical");
  });
});

describe("carbonImpact", () => {
  it("no_till sequesters carbon", () => {
    expect(carbonImpact("no_till")).toBe("strong_sequestration");
  });
});

describe("tillageMethods", () => {
  it("returns 5 methods", () => {
    expect(tillageMethods()).toHaveLength(5);
  });
});
