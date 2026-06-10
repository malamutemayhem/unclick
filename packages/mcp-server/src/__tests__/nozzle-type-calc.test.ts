import { describe, it, expect } from "vitest";
import {
  thermalConductivity, abrasionResistance, printPrecision, nozzleLifespan,
  nozzleCost, suitableForAbrasive, lightweight, composition,
  bestFilament, nozzleTypes,
} from "../nozzle-type-calc.js";

describe("thermalConductivity", () => {
  it("copper plated best conductivity", () => {
    expect(thermalConductivity("copper_plated")).toBeGreaterThan(thermalConductivity("titanium_alloy"));
  });
});

describe("abrasionResistance", () => {
  it("ruby tip best abrasion resistance", () => {
    expect(abrasionResistance("ruby_tip")).toBeGreaterThan(abrasionResistance("brass_standard"));
  });
});

describe("printPrecision", () => {
  it("ruby tip best precision", () => {
    expect(printPrecision("ruby_tip")).toBeGreaterThan(printPrecision("titanium_alloy"));
  });
});

describe("nozzleLifespan", () => {
  it("ruby tip longest lifespan", () => {
    expect(nozzleLifespan("ruby_tip")).toBeGreaterThan(nozzleLifespan("brass_standard"));
  });
});

describe("nozzleCost", () => {
  it("ruby tip most expensive", () => {
    expect(nozzleCost("ruby_tip")).toBeGreaterThan(nozzleCost("brass_standard"));
  });
});

describe("suitableForAbrasive", () => {
  it("hardened steel for abrasive", () => {
    expect(suitableForAbrasive("hardened_steel")).toBe(true);
  });
  it("brass standard not for abrasive", () => {
    expect(suitableForAbrasive("brass_standard")).toBe(false);
  });
});

describe("lightweight", () => {
  it("titanium alloy is lightweight", () => {
    expect(lightweight("titanium_alloy")).toBe(true);
  });
  it("hardened steel is not", () => {
    expect(lightweight("hardened_steel")).toBe(false);
  });
});

describe("composition", () => {
  it("ruby tip uses brass body synthetic ruby insert", () => {
    expect(composition("ruby_tip")).toBe("brass_body_synthetic_ruby_insert");
  });
});

describe("bestFilament", () => {
  it("hardened steel for carbon fiber glow metal", () => {
    expect(bestFilament("hardened_steel")).toBe("carbon_fiber_glow_metal");
  });
});

describe("nozzleTypes", () => {
  it("returns 5 types", () => {
    expect(nozzleTypes()).toHaveLength(5);
  });
});
