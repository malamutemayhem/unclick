import { describe, it, expect } from "vitest";
import {
  fineness, capacity, energy, maintenance,
  pvCost, noHeat, forUltraFine, reduction,
  bestUse, pulverizerTypes,
} from "../pulverizer-calc.js";

describe("fineness", () => {
  it("jet mill finest", () => {
    expect(fineness("jet_mill_fluid_energy")).toBeGreaterThan(fineness("hammer_mill_impact"));
  });
});

describe("capacity", () => {
  it("roller mill highest capacity", () => {
    expect(capacity("roller_mill_compression")).toBeGreaterThan(capacity("jet_mill_fluid_energy"));
  });
});

describe("energy", () => {
  it("roller mill most energy efficient", () => {
    expect(energy("roller_mill_compression")).toBeGreaterThan(energy("jet_mill_fluid_energy"));
  });
});

describe("maintenance", () => {
  it("jet mill lowest maintenance", () => {
    expect(maintenance("jet_mill_fluid_energy")).toBeGreaterThan(maintenance("hammer_mill_impact"));
  });
});

describe("pvCost", () => {
  it("jet mill most expensive", () => {
    expect(pvCost("jet_mill_fluid_energy")).toBeGreaterThan(pvCost("hammer_mill_impact"));
  });
});

describe("noHeat", () => {
  it("jet mill generates no heat", () => {
    expect(noHeat("jet_mill_fluid_energy")).toBe(true);
  });
  it("ball mill generates heat", () => {
    expect(noHeat("ball_mill_tumbling")).toBe(false);
  });
});

describe("forUltraFine", () => {
  it("jet mill for ultra fine", () => {
    expect(forUltraFine("jet_mill_fluid_energy")).toBe(true);
  });
  it("hammer mill not ultra fine", () => {
    expect(forUltraFine("hammer_mill_impact")).toBe(false);
  });
});

describe("reduction", () => {
  it("pin mill uses rotating disc", () => {
    expect(reduction("pin_mill_attrition")).toBe("rotating_pin_disc_impact_shear");
  });
});

describe("bestUse", () => {
  it("roller mill for coal", () => {
    expect(bestUse("roller_mill_compression")).toBe("coal_pulverizing_power_plant");
  });
});

describe("pulverizerTypes", () => {
  it("returns 5 types", () => {
    expect(pulverizerTypes()).toHaveLength(5);
  });
});
