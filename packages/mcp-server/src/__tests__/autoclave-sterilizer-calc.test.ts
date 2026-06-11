import { describe, it, expect } from "vitest";
import {
  cycleSpeed, penetration, materialCompat, validation,
  asCost, steam, forHeatSensitive, method,
  bestUse, autoclaveSterilizerTypes,
} from "../autoclave-sterilizer-calc.js";

describe("cycleSpeed", () => {
  it("hydrogen peroxide plasma fastest cycle", () => {
    expect(cycleSpeed("hydrogen_peroxide_plasma")).toBeGreaterThan(cycleSpeed("ethylene_oxide"));
  });
});

describe("penetration", () => {
  it("pre vacuum best penetration", () => {
    expect(penetration("pre_vacuum")).toBeGreaterThan(penetration("gravity_displacement"));
  });
});

describe("materialCompat", () => {
  it("ethylene oxide best material compatibility", () => {
    expect(materialCompat("ethylene_oxide")).toBeGreaterThan(materialCompat("gravity_displacement"));
  });
});

describe("validation", () => {
  it("pre vacuum best validation", () => {
    expect(validation("pre_vacuum")).toBeGreaterThan(validation("gravity_displacement"));
  });
});

describe("asCost", () => {
  it("hydrogen peroxide plasma most expensive", () => {
    expect(asCost("hydrogen_peroxide_plasma")).toBeGreaterThan(asCost("gravity_displacement"));
  });
});

describe("steam", () => {
  it("pre vacuum uses steam", () => {
    expect(steam("pre_vacuum")).toBe(true);
  });
  it("ethylene oxide not steam", () => {
    expect(steam("ethylene_oxide")).toBe(false);
  });
});

describe("forHeatSensitive", () => {
  it("ethylene oxide for heat sensitive", () => {
    expect(forHeatSensitive("ethylene_oxide")).toBe(true);
  });
  it("gravity displacement not for heat sensitive", () => {
    expect(forHeatSensitive("gravity_displacement")).toBe(false);
  });
});

describe("method", () => {
  it("hydrogen peroxide plasma uses vapor plasma", () => {
    expect(method("hydrogen_peroxide_plasma")).toBe("hydrogen_peroxide_vapor_plasma_phase_low_temp_no_residue");
  });
});

describe("bestUse", () => {
  it("gravity displacement for lab glassware", () => {
    expect(bestUse("gravity_displacement")).toBe("laboratory_glassware_media_waste_decontamination_basic");
  });
});

describe("autoclaveSterilizerTypes", () => {
  it("returns 5 types", () => {
    expect(autoclaveSterilizerTypes()).toHaveLength(5);
  });
});
