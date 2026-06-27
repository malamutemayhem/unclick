import { describe, it, expect } from "vitest";
import {
  clampForce, cycleTime, partComplexity, materialWaste,
  cmCost___, heated, forThermoset, press,
  bestUse, compressionMoldTypes,
} from "../compression-mold-calc.js";

describe("clampForce", () => {
  it("isostatic press highest clamp force", () => {
    expect(clampForce("isostatic_press")).toBeGreaterThan(clampForce("vacuum_compression"));
  });
});

describe("cycleTime", () => {
  it("transfer mold fastest cycle", () => {
    expect(cycleTime("transfer_mold")).toBeGreaterThan(cycleTime("isostatic_press"));
  });
});

describe("partComplexity", () => {
  it("transfer mold highest part complexity", () => {
    expect(partComplexity("transfer_mold")).toBeGreaterThan(partComplexity("hydraulic_upstroke"));
  });
});

describe("materialWaste", () => {
  it("isostatic press lowest material waste", () => {
    expect(materialWaste("isostatic_press")).toBeGreaterThan(materialWaste("hydraulic_upstroke"));
  });
});

describe("cmCost___", () => {
  it("isostatic press most expensive", () => {
    expect(cmCost___("isostatic_press")).toBeGreaterThan(cmCost___("hydraulic_upstroke"));
  });
});

describe("heated", () => {
  it("hydraulic upstroke is heated", () => {
    expect(heated("hydraulic_upstroke")).toBe(true);
  });
  it("isostatic press not heated", () => {
    expect(heated("isostatic_press")).toBe(false);
  });
});

describe("forThermoset", () => {
  it("transfer mold for thermoset", () => {
    expect(forThermoset("transfer_mold")).toBe(true);
  });
  it("isostatic press not for thermoset", () => {
    expect(forThermoset("isostatic_press")).toBe(false);
  });
});

describe("press", () => {
  it("vacuum compression uses vacuum chamber", () => {
    expect(press("vacuum_compression")).toBe("vacuum_chamber_air_removal_void_free_laminate_composite");
  });
});

describe("bestUse", () => {
  it("transfer mold for electronic encapsulation", () => {
    expect(bestUse("transfer_mold")).toBe("electronic_encapsulation_insert_mold_complex_thermoset");
  });
});

describe("compressionMoldTypes", () => {
  it("returns 5 types", () => {
    expect(compressionMoldTypes()).toHaveLength(5);
  });
});
