import { describe, it, expect } from "vitest";
import {
  strength, precision, heatInput, versatility,
  swCost, noMelt, forDissimilar, mechanism,
  bestUse, solidStateWeldTypes,
} from "../solid-state-weld-calc.js";

describe("strength", () => {
  it("diffusion bond strongest", () => {
    expect(strength("diffusion_bond_aero")).toBeGreaterThan(strength("cold_pressure_wire"));
  });
});

describe("precision", () => {
  it("diffusion bond most precise", () => {
    expect(precision("diffusion_bond_aero")).toBeGreaterThan(precision("explosion_clad_plate"));
  });
});

describe("heatInput", () => {
  it("cold pressure lowest heat", () => {
    expect(heatInput("cold_pressure_wire")).toBeLessThan(heatInput("diffusion_bond_aero"));
  });
});

describe("versatility", () => {
  it("friction stir most versatile", () => {
    expect(versatility("friction_stir_plate")).toBeGreaterThan(versatility("cold_pressure_wire"));
  });
});

describe("swCost", () => {
  it("diffusion bond most expensive", () => {
    expect(swCost("diffusion_bond_aero")).toBeGreaterThan(swCost("cold_pressure_wire"));
  });
});

describe("noMelt", () => {
  it("all solid state are no melt", () => {
    expect(noMelt("friction_stir_plate")).toBe(true);
    expect(noMelt("cold_pressure_wire")).toBe(true);
  });
});

describe("forDissimilar", () => {
  it("explosion clad for dissimilar", () => {
    expect(forDissimilar("explosion_clad_plate")).toBe(true);
  });
  it("cold pressure not for dissimilar", () => {
    expect(forDissimilar("cold_pressure_wire")).toBe(false);
  });
});

describe("mechanism", () => {
  it("friction stir uses rotating pin", () => {
    expect(mechanism("friction_stir_plate")).toBe("rotating_pin_shoulder_plasticize");
  });
});

describe("bestUse", () => {
  it("ultrasonic for battery tab", () => {
    expect(bestUse("ultrasonic_thin_sheet")).toBe("battery_tab_wire_harness_foil");
  });
});

describe("solidStateWeldTypes", () => {
  it("returns 5 types", () => {
    expect(solidStateWeldTypes()).toHaveLength(5);
  });
});
