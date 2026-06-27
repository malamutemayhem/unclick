import { describe, it, expect } from "vitest";
import {
  cop, capacity, heatSourceFlex, maintenance,
  acCost, directFired, forWasteHeat, absorbent,
  bestUse, absorptionChillerTypes,
} from "../absorption-chiller-calc.js";

describe("cop", () => {
  it("triple effect highest cop", () => {
    expect(cop("triple_effect_high_eff")).toBeGreaterThan(cop("single_effect_steam"));
  });
});

describe("capacity", () => {
  it("triple effect highest capacity", () => {
    expect(capacity("triple_effect_high_eff")).toBeGreaterThan(capacity("solar_thermal_libr"));
  });
});

describe("heatSourceFlex", () => {
  it("single effect most flexible heat source", () => {
    expect(heatSourceFlex("single_effect_steam")).toBeGreaterThan(heatSourceFlex("solar_thermal_libr"));
  });
});

describe("maintenance", () => {
  it("solar thermal easiest maintenance", () => {
    expect(maintenance("solar_thermal_libr")).toBeGreaterThan(maintenance("triple_effect_high_eff"));
  });
});

describe("acCost", () => {
  it("triple effect most expensive", () => {
    expect(acCost("triple_effect_high_eff")).toBeGreaterThan(acCost("single_effect_steam"));
  });
});

describe("directFired", () => {
  it("double effect is direct fired", () => {
    expect(directFired("double_effect_direct")).toBe(true);
  });
  it("single effect not direct fired", () => {
    expect(directFired("single_effect_steam")).toBe(false);
  });
});

describe("forWasteHeat", () => {
  it("single effect for waste heat", () => {
    expect(forWasteHeat("single_effect_steam")).toBe(true);
  });
  it("double effect not for waste heat", () => {
    expect(forWasteHeat("double_effect_direct")).toBe(false);
  });
});

describe("absorbent", () => {
  it("exhaust fired uses exhaust gas direct", () => {
    expect(absorbent("exhaust_fired_cogen")).toBe("lithium_bromide_exhaust_gas_direct");
  });
});

describe("bestUse", () => {
  it("solar thermal for off grid cooling", () => {
    expect(bestUse("solar_thermal_libr")).toBe("solar_driven_remote_off_grid_cooling");
  });
});

describe("absorptionChillerTypes", () => {
  it("returns 5 types", () => {
    expect(absorptionChillerTypes()).toHaveLength(5);
  });
});
