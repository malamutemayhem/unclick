import { describe, it, expect } from "vitest";
import {
  sensitivityMg, maxCapacityKg, beamLengthCm, calibrationWeightsNeeded,
  portabilityRating, accuracyClass, materialPrimary, maintenanceFrequency,
  costEstimate, scaleTypes,
} from "../balance-scale-calc.js";

describe("sensitivityMg", () => {
  it("torsion is most sensitive", () => {
    expect(sensitivityMg("torsion")).toBeLessThan(
      sensitivityMg("equal_arm")
    );
  });
});

describe("maxCapacityKg", () => {
  it("steelyard has highest capacity", () => {
    expect(maxCapacityKg("steelyard")).toBeGreaterThan(
      maxCapacityKg("torsion")
    );
  });
});

describe("beamLengthCm", () => {
  it("steelyard has longest beam", () => {
    expect(beamLengthCm("steelyard")).toBeGreaterThan(
      beamLengthCm("equal_arm")
    );
  });
});

describe("calibrationWeightsNeeded", () => {
  it("equal arm needs calibration weights", () => {
    expect(calibrationWeightsNeeded("equal_arm")).toBe(true);
  });
  it("spring does not need calibration weights", () => {
    expect(calibrationWeightsNeeded("spring")).toBe(false);
  });
});

describe("portabilityRating", () => {
  it("spring is most portable", () => {
    expect(portabilityRating("spring")).toBeGreaterThan(
      portabilityRating("torsion")
    );
  });
});

describe("accuracyClass", () => {
  it("torsion is micro analytical", () => {
    expect(accuracyClass("torsion")).toBe("micro_analytical");
  });
});

describe("materialPrimary", () => {
  it("equal arm uses brass", () => {
    expect(materialPrimary("equal_arm")).toBe("brass");
  });
});

describe("maintenanceFrequency", () => {
  it("torsion needs weekly maintenance", () => {
    expect(maintenanceFrequency("torsion")).toBe("weekly");
  });
});

describe("costEstimate", () => {
  it("torsion is most expensive", () => {
    expect(costEstimate("torsion")).toBeGreaterThan(
      costEstimate("spring")
    );
  });
});

describe("scaleTypes", () => {
  it("returns 5 types", () => {
    expect(scaleTypes()).toHaveLength(5);
  });
});
