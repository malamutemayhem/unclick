import { describe, it, expect } from "vitest";
import {
  loadEase, developConsistency, chemistryVolume, formatRange,
  tankCost, lightTight, motorized, agitationMethod,
  bestFormat, developingTanks,
} from "../developing-tank-calc.js";

describe("loadEase", () => {
  it("daylight ap compact easiest to load", () => {
    expect(loadEase("daylight_ap_compact")).toBeGreaterThan(loadEase("stainless_steel_reel"));
  });
});

describe("developConsistency", () => {
  it("jobo rotary most consistent", () => {
    expect(developConsistency("jobo_rotary")).toBeGreaterThan(developConsistency("daylight_ap_compact"));
  });
});

describe("chemistryVolume", () => {
  it("mod54 sheet uses most chemistry", () => {
    expect(chemistryVolume("mod54_sheet")).toBeGreaterThan(chemistryVolume("daylight_ap_compact"));
  });
});

describe("formatRange", () => {
  it("mod54 sheet widest format range", () => {
    expect(formatRange("mod54_sheet")).toBeGreaterThan(formatRange("daylight_ap_compact"));
  });
});

describe("tankCost", () => {
  it("jobo rotary most expensive", () => {
    expect(tankCost("jobo_rotary")).toBeGreaterThan(tankCost("plastic_paterson"));
  });
});

describe("lightTight", () => {
  it("stainless steel reel is light tight", () => {
    expect(lightTight("stainless_steel_reel")).toBe(true);
  });
  it("daylight ap compact is also light tight", () => {
    expect(lightTight("daylight_ap_compact")).toBe(true);
  });
});

describe("motorized", () => {
  it("jobo rotary is motorized", () => {
    expect(motorized("jobo_rotary")).toBe(true);
  });
  it("plastic paterson is not", () => {
    expect(motorized("plastic_paterson")).toBe(false);
  });
});

describe("agitationMethod", () => {
  it("jobo rotary uses continuous rotation motor", () => {
    expect(agitationMethod("jobo_rotary")).toBe("continuous_rotation_motor");
  });
});

describe("bestFormat", () => {
  it("mod54 sheet for large format 4x5", () => {
    expect(bestFormat("mod54_sheet")).toBe("large_format_4x5");
  });
});

describe("developingTanks", () => {
  it("returns 5 types", () => {
    expect(developingTanks()).toHaveLength(5);
  });
});
