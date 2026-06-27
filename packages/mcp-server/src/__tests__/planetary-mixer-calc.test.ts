import { describe, it, expect } from "vitest";
import {
  mixIntensity, viscosityRange, scraping, cleanability,
  plCost, multiShaft, forHighVisc, blade,
  bestUse, planetaryMixerTypes,
} from "../planetary-mixer-calc.js";

describe("mixIntensity", () => {
  it("tri shaft highest mix intensity", () => {
    expect(mixIntensity("tri_shaft_disperse")).toBeGreaterThan(mixIntensity("single_planetary_standard"));
  });
});

describe("viscosityRange", () => {
  it("double planetary widest viscosity range", () => {
    expect(viscosityRange("double_planetary_viscous")).toBeGreaterThan(viscosityRange("single_planetary_standard"));
  });
});

describe("scraping", () => {
  it("double planetary best scraping", () => {
    expect(scraping("double_planetary_viscous")).toBeGreaterThan(scraping("single_planetary_standard"));
  });
});

describe("cleanability", () => {
  it("single planetary easiest to clean", () => {
    expect(cleanability("single_planetary_standard")).toBeGreaterThan(cleanability("tri_shaft_disperse"));
  });
});

describe("plCost", () => {
  it("tri shaft most expensive", () => {
    expect(plCost("tri_shaft_disperse")).toBeGreaterThan(plCost("single_planetary_standard"));
  });
});

describe("multiShaft", () => {
  it("double planetary is multi shaft", () => {
    expect(multiShaft("double_planetary_viscous")).toBe(true);
  });
  it("single planetary not multi shaft", () => {
    expect(multiShaft("single_planetary_standard")).toBe(false);
  });
});

describe("forHighVisc", () => {
  it("double planetary for high viscosity", () => {
    expect(forHighVisc("double_planetary_viscous")).toBe(true);
  });
  it("single planetary not for high viscosity", () => {
    expect(forHighVisc("single_planetary_standard")).toBe(false);
  });
});

describe("blade", () => {
  it("vacuum planetary uses vacuum chamber degas", () => {
    expect(blade("vacuum_planetary_degas")).toBe("planetary_blade_vacuum_chamber_degas");
  });
});

describe("bestUse", () => {
  it("tri shaft for ink coating pigment", () => {
    expect(bestUse("tri_shaft_disperse")).toBe("ink_coating_pigment_disperse_deagglom");
  });
});

describe("planetaryMixerTypes", () => {
  it("returns 5 types", () => {
    expect(planetaryMixerTypes()).toHaveLength(5);
  });
});
