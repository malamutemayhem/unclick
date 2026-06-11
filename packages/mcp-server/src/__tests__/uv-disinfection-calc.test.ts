import { describe, it, expect } from "vitest";
import {
  germicidalEff, energyEff, lampLife, uvtTolerance,
  uvCost, closedVessel, forDrinking, lamp,
  bestUse, uvDisinfectionTypes,
} from "../uv-disinfection-calc.js";

describe("germicidalEff", () => {
  it("medium pressure best germicidal efficacy", () => {
    expect(germicidalEff("medium_pressure_poly")).toBeGreaterThan(germicidalEff("uv_led_compact"));
  });
});

describe("energyEff", () => {
  it("low pressure amalgam most energy efficient", () => {
    expect(energyEff("low_pressure_amalgam")).toBeGreaterThan(energyEff("medium_pressure_poly"));
  });
});

describe("lampLife", () => {
  it("uv led longest lamp life", () => {
    expect(lampLife("uv_led_compact")).toBeGreaterThan(lampLife("medium_pressure_poly"));
  });
});

describe("uvtTolerance", () => {
  it("medium pressure best uvt tolerance", () => {
    expect(uvtTolerance("medium_pressure_poly")).toBeGreaterThan(uvtTolerance("uv_led_compact"));
  });
});

describe("uvCost", () => {
  it("uv led most expensive", () => {
    expect(uvCost("uv_led_compact")).toBeGreaterThan(uvCost("low_pressure_mono"));
  });
});

describe("closedVessel", () => {
  it("low pressure mono is closed vessel", () => {
    expect(closedVessel("low_pressure_mono")).toBe(true);
  });
  it("open channel not closed vessel", () => {
    expect(closedVessel("open_channel_gravity")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("low pressure amalgam for drinking", () => {
    expect(forDrinking("low_pressure_amalgam")).toBe(true);
  });
  it("medium pressure not for drinking", () => {
    expect(forDrinking("medium_pressure_poly")).toBe(false);
  });
});

describe("lamp", () => {
  it("uv led uses solid state module", () => {
    expect(lamp("uv_led_compact")).toBe("uvc_led_265nm_solid_state_compact_module");
  });
});

describe("bestUse", () => {
  it("open channel for wastewater effluent", () => {
    expect(bestUse("open_channel_gravity")).toBe("wastewater_effluent_open_channel_large_flow");
  });
});

describe("uvDisinfectionTypes", () => {
  it("returns 5 types", () => {
    expect(uvDisinfectionTypes()).toHaveLength(5);
  });
});
