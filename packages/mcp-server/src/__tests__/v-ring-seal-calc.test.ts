import { describe, it, expect } from "vitest";
import {
  dustExclusion, speedLimit, installEase, maintenance,
  vrCost, axialSeal, forContamination, profile,
  bestUse, vRingSealTypes,
} from "../v-ring-seal-calc.js";

describe("dustExclusion", () => {
  it("hat type best dust exclusion", () => {
    expect(dustExclusion("hat_type_flinger")).toBeGreaterThan(dustExclusion("v_packing_chevron"));
  });
});

describe("speedLimit", () => {
  it("hat type highest speed", () => {
    expect(speedLimit("hat_type_flinger")).toBeGreaterThan(speedLimit("v_packing_chevron"));
  });
});

describe("installEase", () => {
  it("v ring standard easiest install", () => {
    expect(installEase("v_ring_axial_standard")).toBeGreaterThanOrEqual(installEase("v_ring_split_large"));
  });
});

describe("maintenance", () => {
  it("v ring split lowest maintenance", () => {
    expect(maintenance("v_ring_split_large")).toBeGreaterThan(maintenance("v_packing_chevron"));
  });
});

describe("vrCost", () => {
  it("spring energized most expensive", () => {
    expect(vrCost("spring_energized_u")).toBeGreaterThan(vrCost("v_ring_axial_standard"));
  });
});

describe("axialSeal", () => {
  it("v ring axial is axial seal", () => {
    expect(axialSeal("v_ring_axial_standard")).toBe(true);
  });
  it("v packing chevron not axial seal", () => {
    expect(axialSeal("v_packing_chevron")).toBe(false);
  });
});

describe("forContamination", () => {
  it("hat type for contamination protection", () => {
    expect(forContamination("hat_type_flinger")).toBe(true);
  });
  it("v packing not for contamination", () => {
    expect(forContamination("v_packing_chevron")).toBe(false);
  });
});

describe("profile", () => {
  it("spring energized uses u cup profile", () => {
    expect(profile("spring_energized_u")).toBe("u_cup_profile_spring_energized_ptfe_jacket");
  });
});

describe("bestUse", () => {
  it("v ring axial for bearing protection", () => {
    expect(bestUse("v_ring_axial_standard")).toBe("bearing_protection_conveyor_electric_motor");
  });
});

describe("vRingSealTypes", () => {
  it("returns 5 types", () => {
    expect(vRingSealTypes()).toHaveLength(5);
  });
});
