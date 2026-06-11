import { describe, it, expect } from "vitest";
import {
  lubricity, fireResist, tempRange, sealCompat,
  hfCost, biodegradable, forMobile, base,
  bestUse, hydraulicFluidTypes,
} from "../hydraulic-fluid-calc.js";

describe("lubricity", () => {
  it("mineral oil best lubricity", () => {
    expect(lubricity("mineral_oil_hlp")).toBeGreaterThan(lubricity("water_glycol_hfc"));
  });
});

describe("fireResist", () => {
  it("water glycol best fire resist", () => {
    expect(fireResist("water_glycol_hfc")).toBeGreaterThan(fireResist("mineral_oil_hlp"));
  });
});

describe("tempRange", () => {
  it("phosphate ester widest temp range", () => {
    expect(tempRange("phosphate_ester_hfdr")).toBeGreaterThan(tempRange("water_glycol_hfc"));
  });
});

describe("sealCompat", () => {
  it("mineral oil best seal compat", () => {
    expect(sealCompat("mineral_oil_hlp")).toBeGreaterThan(sealCompat("phosphate_ester_hfdr"));
  });
});

describe("hfCost", () => {
  it("phosphate ester most expensive", () => {
    expect(hfCost("phosphate_ester_hfdr")).toBeGreaterThan(hfCost("mineral_oil_hlp"));
  });
});

describe("biodegradable", () => {
  it("biodegradable hetg is biodegradable", () => {
    expect(biodegradable("biodegradable_hetg")).toBe(true);
  });
  it("mineral oil not biodegradable", () => {
    expect(biodegradable("mineral_oil_hlp")).toBe(false);
  });
});

describe("forMobile", () => {
  it("mineral oil for mobile", () => {
    expect(forMobile("mineral_oil_hlp")).toBe(true);
  });
  it("water glycol not for mobile", () => {
    expect(forMobile("water_glycol_hfc")).toBe(false);
  });
});

describe("base", () => {
  it("water glycol uses ethylene glycol", () => {
    expect(base("water_glycol_hfc")).toBe("water_ethylene_glycol_thickener");
  });
});

describe("bestUse", () => {
  it("phosphate ester for turbine ehc aerospace", () => {
    expect(bestUse("phosphate_ester_hfdr")).toBe("turbine_ehc_aerospace_fire_critical");
  });
});

describe("hydraulicFluidTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicFluidTypes()).toHaveLength(5);
  });
});
