import { describe, it, expect } from "vitest";
import {
  pressureRatio, efficiency, flowRate, surgMargin,
  csCost, multiStage, forAero, rotor,
  bestUse, compressorStageTypes,
} from "../compressor-stage-type-calc.js";

describe("pressureRatio", () => {
  it("supersonic highest pressure ratio", () => {
    expect(pressureRatio("supersonic_transonic_fan")).toBeGreaterThan(pressureRatio("axial_subsonic_blade"));
  });
});

describe("efficiency", () => {
  it("axial most efficient", () => {
    expect(efficiency("axial_subsonic_blade")).toBeGreaterThan(efficiency("centrifugal_radial_impeller"));
  });
});

describe("flowRate", () => {
  it("axial highest flow rate", () => {
    expect(flowRate("axial_subsonic_blade")).toBeGreaterThan(flowRate("centrifugal_radial_impeller"));
  });
});

describe("surgMargin", () => {
  it("centrifugal best surge margin", () => {
    expect(surgMargin("centrifugal_radial_impeller")).toBeGreaterThan(surgMargin("supersonic_transonic_fan"));
  });
});

describe("csCost", () => {
  it("supersonic most expensive", () => {
    expect(csCost("supersonic_transonic_fan")).toBeGreaterThan(csCost("centrifugal_radial_impeller"));
  });
});

describe("multiStage", () => {
  it("axial is multi stage", () => {
    expect(multiStage("axial_subsonic_blade")).toBe(true);
  });
  it("centrifugal not multi stage", () => {
    expect(multiStage("centrifugal_radial_impeller")).toBe(false);
  });
});

describe("forAero", () => {
  it("supersonic for aero", () => {
    expect(forAero("supersonic_transonic_fan")).toBe(true);
  });
  it("centrifugal not for aero", () => {
    expect(forAero("centrifugal_radial_impeller")).toBe(false);
  });
});

describe("rotor", () => {
  it("diagonal uses mixed flow impeller", () => {
    expect(rotor("diagonal_mixed_flow")).toBe("mixed_flow_impeller_45deg_exit");
  });
});

describe("bestUse", () => {
  it("centrifugal for small turboshaft", () => {
    expect(bestUse("centrifugal_radial_impeller")).toBe("small_turboshaft_turbocharger");
  });
});

describe("compressorStageTypes", () => {
  it("returns 5 types", () => {
    expect(compressorStageTypes()).toHaveLength(5);
  });
});
