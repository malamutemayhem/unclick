import { describe, it, expect } from "vitest";
import {
  drivingVoltage, currentOutput, anodeLife, maintenance,
  cpCost, passive, forMarine, anode,
  bestUse, cathodicProtectionTypes,
} from "../cathodic-protection-calc.js";

describe("drivingVoltage", () => {
  it("impressed current highest driving voltage", () => {
    expect(drivingVoltage("impressed_current_std")).toBeGreaterThan(drivingVoltage("galvanic_zinc_anode"));
  });
});

describe("currentOutput", () => {
  it("impressed current highest current output", () => {
    expect(currentOutput("impressed_current_std")).toBeGreaterThan(currentOutput("galvanic_zinc_anode"));
  });
});

describe("anodeLife", () => {
  it("impressed current longest anode life", () => {
    expect(anodeLife("impressed_current_std")).toBeGreaterThan(anodeLife("galvanic_magnesium"));
  });
});

describe("maintenance", () => {
  it("galvanic zinc lowest maintenance", () => {
    expect(maintenance("galvanic_zinc_anode")).toBeGreaterThan(maintenance("impressed_current_std"));
  });
});

describe("cpCost", () => {
  it("impressed current most expensive", () => {
    expect(cpCost("impressed_current_std")).toBeGreaterThan(cpCost("galvanic_zinc_anode"));
  });
});

describe("passive", () => {
  it("galvanic zinc is passive", () => {
    expect(passive("galvanic_zinc_anode")).toBe(true);
  });
  it("impressed current not passive", () => {
    expect(passive("impressed_current_std")).toBe(false);
  });
});

describe("forMarine", () => {
  it("galvanic aluminum for marine", () => {
    expect(forMarine("galvanic_aluminum")).toBe(true);
  });
  it("galvanic magnesium not for marine", () => {
    expect(forMarine("galvanic_magnesium")).toBe(false);
  });
});

describe("anode", () => {
  it("impressed current uses mixed metal oxide", () => {
    expect(anode("impressed_current_std")).toBe("mixed_metal_oxide_titanium_substrate_anode");
  });
});

describe("bestUse", () => {
  it("galvanic zinc for ship hull", () => {
    expect(bestUse("galvanic_zinc_anode")).toBe("ship_hull_seawater_piping_marine_structure");
  });
});

describe("cathodicProtectionTypes", () => {
  it("returns 5 types", () => {
    expect(cathodicProtectionTypes()).toHaveLength(5);
  });
});
