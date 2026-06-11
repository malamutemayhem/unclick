import { describe, it, expect } from "vitest";
import {
  conductivity, strength, weight, ampacity,
  cdCost, magnetic, forOverhead, construction,
  bestUse, conductorTypes,
} from "../conductor-type-calc.js";

describe("conductivity", () => {
  it("copper best conductivity", () => {
    expect(conductivity("copper_annealed_solid")).toBeGreaterThan(conductivity("aluminum_stranded_aac"));
  });
});

describe("strength", () => {
  it("htls strongest", () => {
    expect(strength("htls_high_temp_low_sag")).toBeGreaterThan(strength("aluminum_stranded_aac"));
  });
});

describe("weight", () => {
  it("aluminum lightest", () => {
    expect(weight("aluminum_stranded_aac")).toBeGreaterThan(weight("copper_annealed_solid"));
  });
});

describe("ampacity", () => {
  it("htls highest ampacity", () => {
    expect(ampacity("htls_high_temp_low_sag")).toBeGreaterThan(ampacity("aluminum_stranded_aac"));
  });
});

describe("cdCost", () => {
  it("htls most expensive", () => {
    expect(cdCost("htls_high_temp_low_sag")).toBeGreaterThan(cdCost("aluminum_stranded_aac"));
  });
});

describe("magnetic", () => {
  it("acsr is magnetic", () => {
    expect(magnetic("acsr_steel_reinforced")).toBe(true);
  });
  it("copper not magnetic", () => {
    expect(magnetic("copper_annealed_solid")).toBe(false);
  });
});

describe("forOverhead", () => {
  it("acsr for overhead", () => {
    expect(forOverhead("acsr_steel_reinforced")).toBe(true);
  });
  it("copper not for overhead", () => {
    expect(forOverhead("copper_annealed_solid")).toBe(false);
  });
});

describe("construction", () => {
  it("htls uses composite core", () => {
    expect(construction("htls_high_temp_low_sag")).toBe("composite_core_aluminum_zirconium");
  });
});

describe("bestUse", () => {
  it("copper for building wire", () => {
    expect(bestUse("copper_annealed_solid")).toBe("building_wire_motor_winding");
  });
});

describe("conductorTypes", () => {
  it("returns 5 types", () => {
    expect(conductorTypes()).toHaveLength(5);
  });
});
