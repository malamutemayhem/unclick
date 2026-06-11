import { describe, it, expect } from "vitest";
import {
  oxygenTransfer, energyEff, mixing, maintenance,
  asCost, submerged, forDeepTank, element,
  bestUse, aeratorSystemTypes,
} from "../aerator-system-calc.js";

describe("oxygenTransfer", () => {
  it("fine bubble best oxygen transfer", () => {
    expect(oxygenTransfer("fine_bubble_diffuser")).toBeGreaterThan(oxygenTransfer("coarse_bubble_diffuser"));
  });
});

describe("energyEff", () => {
  it("fine bubble most energy efficient", () => {
    expect(energyEff("fine_bubble_diffuser")).toBeGreaterThan(energyEff("coarse_bubble_diffuser"));
  });
});

describe("mixing", () => {
  it("mechanical surface best mixing", () => {
    expect(mixing("mechanical_surface")).toBeGreaterThan(mixing("fine_bubble_diffuser"));
  });
});

describe("maintenance", () => {
  it("coarse bubble lowest maintenance", () => {
    expect(maintenance("coarse_bubble_diffuser")).toBeGreaterThan(maintenance("membrane_disc_tube"));
  });
});

describe("asCost", () => {
  it("membrane disc tube most expensive", () => {
    expect(asCost("membrane_disc_tube")).toBeGreaterThan(asCost("coarse_bubble_diffuser"));
  });
});

describe("submerged", () => {
  it("fine bubble is submerged", () => {
    expect(submerged("fine_bubble_diffuser")).toBe(true);
  });
  it("mechanical surface not submerged", () => {
    expect(submerged("mechanical_surface")).toBe(false);
  });
});

describe("forDeepTank", () => {
  it("fine bubble for deep tank", () => {
    expect(forDeepTank("fine_bubble_diffuser")).toBe(true);
  });
  it("coarse bubble not for deep tank", () => {
    expect(forDeepTank("coarse_bubble_diffuser")).toBe(false);
  });
});

describe("element", () => {
  it("jet aerator uses venturi mix", () => {
    expect(element("jet_aerator_nozzle")).toBe("liquid_jet_nozzle_entrained_air_venturi_mix");
  });
});

describe("bestUse", () => {
  it("mechanical surface for oxidation ditch", () => {
    expect(bestUse("mechanical_surface")).toBe("oxidation_ditch_lagoon_surface_splash_aerate");
  });
});

describe("aeratorSystemTypes", () => {
  it("returns 5 types", () => {
    expect(aeratorSystemTypes()).toHaveLength(5);
  });
});
