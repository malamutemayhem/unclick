import { describe, it, expect } from "vitest";
import {
  technicalDifficulty, recoveryTime, surgicalDuration, equipmentSpecialization,
  procedureCost, requiresSpecialist, outpatientPossible, primaryInstrument,
  commonProcedure, vetSurgeries,
} from "../vet-surgery-calc.js";

describe("technicalDifficulty", () => {
  it("neurosurgery most difficult", () => {
    expect(technicalDifficulty("neurosurgery")).toBeGreaterThan(technicalDifficulty("soft_tissue"));
  });
});

describe("recoveryTime", () => {
  it("neurosurgery longest recovery", () => {
    expect(recoveryTime("neurosurgery")).toBeGreaterThan(recoveryTime("dental_oral"));
  });
});

describe("surgicalDuration", () => {
  it("neurosurgery longest duration", () => {
    expect(surgicalDuration("neurosurgery")).toBeGreaterThan(surgicalDuration("soft_tissue"));
  });
});

describe("equipmentSpecialization", () => {
  it("neurosurgery most specialized equipment", () => {
    expect(equipmentSpecialization("neurosurgery")).toBeGreaterThan(equipmentSpecialization("soft_tissue"));
  });
});

describe("procedureCost", () => {
  it("neurosurgery most expensive", () => {
    expect(procedureCost("neurosurgery")).toBeGreaterThan(procedureCost("soft_tissue"));
  });
});

describe("requiresSpecialist", () => {
  it("orthopedic requires specialist", () => {
    expect(requiresSpecialist("orthopedic")).toBe(true);
  });
  it("soft tissue does not", () => {
    expect(requiresSpecialist("soft_tissue")).toBe(false);
  });
});

describe("outpatientPossible", () => {
  it("dental oral can be outpatient", () => {
    expect(outpatientPossible("dental_oral")).toBe(true);
  });
  it("neurosurgery cannot", () => {
    expect(outpatientPossible("neurosurgery")).toBe(false);
  });
});

describe("primaryInstrument", () => {
  it("orthopedic uses bone plate screw driver", () => {
    expect(primaryInstrument("orthopedic")).toBe("bone_plate_screw_driver");
  });
});

describe("commonProcedure", () => {
  it("soft tissue for spay neuter mass removal", () => {
    expect(commonProcedure("soft_tissue")).toBe("spay_neuter_mass_removal");
  });
});

describe("vetSurgeries", () => {
  it("returns 5 surgery types", () => {
    expect(vetSurgeries()).toHaveLength(5);
  });
});
