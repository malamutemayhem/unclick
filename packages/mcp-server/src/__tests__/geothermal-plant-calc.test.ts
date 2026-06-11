import { describe, it, expect } from "vitest";
import {
  efficiency, resourceTemp, capacity, envImpact,
  gpCost, directSteam, forElectricity, cycle,
  bestUse, geothermalPlantTypes,
} from "../geothermal-plant-calc.js";

describe("efficiency", () => {
  it("ground source heat most efficient", () => {
    expect(efficiency("ground_source_heat")).toBeGreaterThan(efficiency("enhanced_geothermal"));
  });
});

describe("resourceTemp", () => {
  it("dry steam highest resource temp", () => {
    expect(resourceTemp("dry_steam_direct")).toBeGreaterThan(resourceTemp("ground_source_heat"));
  });
});

describe("capacity", () => {
  it("dry steam highest capacity", () => {
    expect(capacity("dry_steam_direct")).toBeGreaterThan(capacity("ground_source_heat"));
  });
});

describe("envImpact", () => {
  it("binary cycle orc best environmental impact", () => {
    expect(envImpact("binary_cycle_orc")).toBeGreaterThan(envImpact("enhanced_geothermal"));
  });
});

describe("gpCost", () => {
  it("enhanced geothermal most expensive", () => {
    expect(gpCost("enhanced_geothermal")).toBeGreaterThan(gpCost("ground_source_heat"));
  });
});

describe("directSteam", () => {
  it("dry steam is direct steam", () => {
    expect(directSteam("dry_steam_direct")).toBe(true);
  });
  it("binary cycle not direct steam", () => {
    expect(directSteam("binary_cycle_orc")).toBe(false);
  });
});

describe("forElectricity", () => {
  it("flash steam for electricity", () => {
    expect(forElectricity("flash_steam_single")).toBe(true);
  });
  it("ground source heat not for electricity", () => {
    expect(forElectricity("ground_source_heat")).toBe(false);
  });
});

describe("cycle", () => {
  it("binary cycle uses organic rankine", () => {
    expect(cycle("binary_cycle_orc")).toBe("organic_rankine_cycle_secondary_working_fluid_closed");
  });
});

describe("bestUse", () => {
  it("ground source for building heating cooling", () => {
    expect(bestUse("ground_source_heat")).toBe("building_heating_cooling_shallow_ground_exchange");
  });
});

describe("geothermalPlantTypes", () => {
  it("returns 5 types", () => {
    expect(geothermalPlantTypes()).toHaveLength(5);
  });
});
