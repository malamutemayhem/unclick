import { describe, it, expect } from "vitest";
import {
  weldStrength, speed, consistency, materialRange,
  rwCost, automated, forSheetMetal, electrode,
  bestUse, resistanceSpotWeldTypes,
} from "../resistance-spot-weld-calc.js";

describe("weldStrength", () => {
  it("robotic spot highest weld strength", () => {
    expect(weldStrength("robotic_spot")).toBeGreaterThan(weldStrength("portable_gun"));
  });
});

describe("speed", () => {
  it("robotic spot fastest", () => {
    expect(speed("robotic_spot")).toBeGreaterThan(speed("portable_gun"));
  });
});

describe("consistency", () => {
  it("robotic spot most consistent", () => {
    expect(consistency("robotic_spot")).toBeGreaterThan(consistency("portable_gun"));
  });
});

describe("materialRange", () => {
  it("robotic spot widest material range", () => {
    expect(materialRange("robotic_spot")).toBeGreaterThan(materialRange("seam_weld"));
  });
});

describe("rwCost", () => {
  it("robotic spot most expensive", () => {
    expect(rwCost("robotic_spot")).toBeGreaterThan(rwCost("portable_gun"));
  });
});

describe("automated", () => {
  it("robotic spot is automated", () => {
    expect(automated("robotic_spot")).toBe(true);
  });
  it("portable gun not automated", () => {
    expect(automated("portable_gun")).toBe(false);
  });
});

describe("forSheetMetal", () => {
  it("all types for sheet metal", () => {
    expect(forSheetMetal("pedestal_press")).toBe(true);
    expect(forSheetMetal("seam_weld")).toBe(true);
  });
});

describe("electrode", () => {
  it("seam weld uses rotating wheel electrode", () => {
    expect(electrode("seam_weld")).toBe("rotating_wheel_electrode_continuous_overlapping_spot_seam");
  });
});

describe("bestUse", () => {
  it("seam weld for fuel tank hermetic seal", () => {
    expect(bestUse("seam_weld")).toBe("fuel_tank_can_drum_radiator_hermetic_leak_tight_seam_weld");
  });
});

describe("resistanceSpotWeldTypes", () => {
  it("returns 5 types", () => {
    expect(resistanceSpotWeldTypes()).toHaveLength(5);
  });
});
