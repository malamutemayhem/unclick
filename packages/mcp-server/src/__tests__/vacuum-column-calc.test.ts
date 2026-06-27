import { describe, it, expect } from "vitest";
import {
  separation, pressureDrop, thermalDamage, capacity,
  vcCost, deepVacuum, forThermLabile, internals,
  bestUse, vacuumColumnTypes,
} from "../vacuum-column-calc.js";

describe("separation", () => {
  it("spinning band best separation", () => {
    expect(separation("spinning_band_lab")).toBeGreaterThan(separation("short_path_vacuum"));
  });
});

describe("pressureDrop", () => {
  it("short path lowest pressure drop", () => {
    expect(pressureDrop("short_path_vacuum")).toBeGreaterThanOrEqual(pressureDrop("structured_pack_low_dp"));
  });
});

describe("thermalDamage", () => {
  it("short path least thermal damage", () => {
    expect(thermalDamage("short_path_vacuum")).toBeGreaterThan(thermalDamage("packed_vacuum_standard"));
  });
});

describe("capacity", () => {
  it("structured pack highest capacity", () => {
    expect(capacity("structured_pack_low_dp")).toBeGreaterThan(capacity("spinning_band_lab"));
  });
});

describe("vcCost", () => {
  it("short path most expensive", () => {
    expect(vcCost("short_path_vacuum")).toBeGreaterThan(vcCost("packed_vacuum_standard"));
  });
});

describe("deepVacuum", () => {
  it("short path supports deep vacuum", () => {
    expect(deepVacuum("short_path_vacuum")).toBe(true);
  });
  it("packed vacuum not deep vacuum", () => {
    expect(deepVacuum("packed_vacuum_standard")).toBe(false);
  });
});

describe("forThermLabile", () => {
  it("falling film for therm labile", () => {
    expect(forThermLabile("falling_film_vacuum")).toBe(true);
  });
  it("spinning band not for therm labile", () => {
    expect(forThermLabile("spinning_band_lab")).toBe(false);
  });
});

describe("internals", () => {
  it("spinning band uses helix", () => {
    expect(internals("spinning_band_lab")).toBe("spinning_band_helix_high_efficiency_lab_scale");
  });
});

describe("bestUse", () => {
  it("short path for vitamin molecular distill", () => {
    expect(bestUse("short_path_vacuum")).toBe("vitamin_e_omega_3_cbd_molecular_vacuum_distill");
  });
});

describe("vacuumColumnTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumColumnTypes()).toHaveLength(5);
  });
});
