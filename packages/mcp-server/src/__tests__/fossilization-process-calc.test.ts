import { describe, it, expect } from "vitest";
import {
  detailPreservation, timeRequired, softTissueChance, commonOccurrence,
  dnaRecoveryPotential, preserves3dStructure, requiresSpecialConditions,
  typicalOrganism, mineralInvolved, fossilizationProcesses,
} from "../fossilization-process-calc.js";

describe("detailPreservation", () => {
  it("amber best detail", () => {
    expect(detailPreservation("amber")).toBeGreaterThan(detailPreservation("mold_cast"));
  });
});

describe("timeRequired", () => {
  it("permineralization takes longest", () => {
    expect(timeRequired("permineralization")).toBeGreaterThan(timeRequired("freeze_drying"));
  });
});

describe("softTissueChance", () => {
  it("amber best soft tissue", () => {
    expect(softTissueChance("amber")).toBeGreaterThan(softTissueChance("mold_cast"));
  });
});

describe("commonOccurrence", () => {
  it("permineralization most common", () => {
    expect(commonOccurrence("permineralization")).toBeGreaterThan(commonOccurrence("freeze_drying"));
  });
});

describe("dnaRecoveryPotential", () => {
  it("freeze drying best dna recovery", () => {
    expect(dnaRecoveryPotential("freeze_drying")).toBeGreaterThan(dnaRecoveryPotential("permineralization"));
  });
});

describe("preserves3dStructure", () => {
  it("amber preserves 3d", () => {
    expect(preserves3dStructure("amber")).toBe(true);
  });
  it("carbonization does not", () => {
    expect(preserves3dStructure("carbonization")).toBe(false);
  });
});

describe("requiresSpecialConditions", () => {
  it("amber requires special conditions", () => {
    expect(requiresSpecialConditions("amber")).toBe(true);
  });
  it("permineralization does not", () => {
    expect(requiresSpecialConditions("permineralization")).toBe(false);
  });
});

describe("typicalOrganism", () => {
  it("amber for insect arachnid plant", () => {
    expect(typicalOrganism("amber")).toBe("insect_arachnid_plant");
  });
});

describe("mineralInvolved", () => {
  it("amber is fossilized tree resin", () => {
    expect(mineralInvolved("amber")).toBe("fossilized_tree_resin");
  });
});

describe("fossilizationProcesses", () => {
  it("returns 5 processes", () => {
    expect(fossilizationProcesses()).toHaveLength(5);
  });
});
