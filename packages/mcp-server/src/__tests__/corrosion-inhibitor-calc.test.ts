import { describe, it, expect } from "vitest";
import {
  effectiveness, dosageRange, compatibility, envFriendly,
  ciCost, continuous, forClosedLoop, chemistry,
  bestUse, corrosionInhibitorTypes,
} from "../corrosion-inhibitor-calc.js";

describe("effectiveness", () => {
  it("oxygen scavenger most effective", () => {
    expect(effectiveness("oxygen_scavenger")).toBeGreaterThan(effectiveness("vapor_phase_vci"));
  });
});

describe("dosageRange", () => {
  it("scale inhibitor widest dosage range", () => {
    expect(dosageRange("scale_inhibitor_poly")).toBeGreaterThan(dosageRange("vapor_phase_vci"));
  });
});

describe("compatibility", () => {
  it("oxygen scavenger best compatibility", () => {
    expect(compatibility("oxygen_scavenger")).toBeGreaterThan(compatibility("filming_amine_oil"));
  });
});

describe("envFriendly", () => {
  it("vapor phase vci most eco friendly", () => {
    expect(envFriendly("vapor_phase_vci")).toBeGreaterThan(envFriendly("filming_amine_oil"));
  });
});

describe("ciCost", () => {
  it("filming amine most expensive", () => {
    expect(ciCost("filming_amine_oil")).toBeGreaterThan(ciCost("oxygen_scavenger"));
  });
});

describe("continuous", () => {
  it("filming amine is continuous", () => {
    expect(continuous("filming_amine_oil")).toBe(true);
  });
  it("vapor phase vci not continuous", () => {
    expect(continuous("vapor_phase_vci")).toBe(false);
  });
});

describe("forClosedLoop", () => {
  it("oxygen scavenger for closed loop", () => {
    expect(forClosedLoop("oxygen_scavenger")).toBe(true);
  });
  it("filming amine not for closed loop", () => {
    expect(forClosedLoop("filming_amine_oil")).toBe(false);
  });
});

describe("chemistry", () => {
  it("scale inhibitor uses phosphonate polymer", () => {
    expect(chemistry("scale_inhibitor_poly")).toBe("phosphonate_polymer_threshold_crystal_modify");
  });
});

describe("bestUse", () => {
  it("vapor phase vci for equipment storage", () => {
    expect(bestUse("vapor_phase_vci")).toBe("equipment_storage_shipping_mothball_layup");
  });
});

describe("corrosionInhibitorTypes", () => {
  it("returns 5 types", () => {
    expect(corrosionInhibitorTypes()).toHaveLength(5);
  });
});
