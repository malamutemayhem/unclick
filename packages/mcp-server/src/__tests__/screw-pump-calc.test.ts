import { describe, it, expect } from "vitest";
import {
  flow, pressure, viscosity, pulsation,
  spCost, selfPrime, forMultiphase, element,
  bestUse, screwPumpTypes,
} from "../screw-pump-calc.js";

describe("flow", () => {
  it("archimedean highest flow", () => {
    expect(flow("archimedean_open_trough")).toBeGreaterThan(flow("single_screw_progressing"));
  });
});

describe("pressure", () => {
  it("triple screw highest pressure", () => {
    expect(pressure("triple_screw_hydraulic")).toBeGreaterThan(pressure("archimedean_open_trough"));
  });
});

describe("viscosity", () => {
  it("single screw best viscosity", () => {
    expect(viscosity("single_screw_progressing")).toBeGreaterThan(viscosity("archimedean_open_trough"));
  });
});

describe("pulsation", () => {
  it("triple screw lowest pulsation", () => {
    expect(pulsation("triple_screw_hydraulic")).toBeGreaterThan(pulsation("archimedean_open_trough"));
  });
});

describe("spCost", () => {
  it("multiphase most expensive", () => {
    expect(spCost("twin_screw_multiphase")).toBeGreaterThan(spCost("single_screw_progressing"));
  });
});

describe("selfPrime", () => {
  it("single screw self primes", () => {
    expect(selfPrime("single_screw_progressing")).toBe(true);
  });
  it("archimedean no self prime", () => {
    expect(selfPrime("archimedean_open_trough")).toBe(false);
  });
});

describe("forMultiphase", () => {
  it("twin screw multiphase", () => {
    expect(forMultiphase("twin_screw_multiphase")).toBe(true);
  });
  it("single screw not multiphase", () => {
    expect(forMultiphase("single_screw_progressing")).toBe(false);
  });
});

describe("element", () => {
  it("archimedean uses open helix", () => {
    expect(element("archimedean_open_trough")).toBe("open_helix_inclined_trough");
  });
});

describe("bestUse", () => {
  it("triple screw for hydraulic oil", () => {
    expect(bestUse("triple_screw_hydraulic")).toBe("hydraulic_lube_oil_high_pressure");
  });
});

describe("screwPumpTypes", () => {
  it("returns 5 types", () => {
    expect(screwPumpTypes()).toHaveLength(5);
  });
});
