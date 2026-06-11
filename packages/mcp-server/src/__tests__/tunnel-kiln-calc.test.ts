import { describe, it, expect } from "vitest";
import {
  firingSpeed, temperatureUniformity, energyEfficiency, capacity,
  tkCost, continuous, forPorcelain, kilnConfig,
  bestUse, tunnelKilnTypes,
} from "../tunnel-kiln-calc.js";

describe("firingSpeed", () => {
  it("fast fire roller fastest firing speed", () => {
    expect(firingSpeed("fast_fire_roller")).toBeGreaterThan(firingSpeed("wood_fired_traditional"));
  });
});

describe("temperatureUniformity", () => {
  it("electric element best temperature uniformity", () => {
    expect(temperatureUniformity("electric_element")).toBeGreaterThan(temperatureUniformity("wood_fired_traditional"));
  });
});

describe("energyEfficiency", () => {
  it("hydrogen green best energy efficiency", () => {
    expect(energyEfficiency("hydrogen_green")).toBeGreaterThan(energyEfficiency("wood_fired_traditional"));
  });
});

describe("capacity", () => {
  it("gas fired continuous largest capacity", () => {
    expect(capacity("gas_fired_continuous")).toBeGreaterThan(capacity("wood_fired_traditional"));
  });
});

describe("tkCost", () => {
  it("fast fire roller most expensive", () => {
    expect(tkCost("fast_fire_roller")).toBeGreaterThan(tkCost("wood_fired_traditional"));
  });
});

describe("continuous", () => {
  it("gas fired continuous is continuous", () => {
    expect(continuous("gas_fired_continuous")).toBe(true);
  });
  it("wood fired traditional not continuous", () => {
    expect(continuous("wood_fired_traditional")).toBe(false);
  });
});

describe("forPorcelain", () => {
  it("electric element for porcelain", () => {
    expect(forPorcelain("electric_element")).toBe(true);
  });
  it("hydrogen green not for porcelain", () => {
    expect(forPorcelain("hydrogen_green")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("wood fired uses traditional ash glaze", () => {
    expect(kilnConfig("wood_fired_traditional")).toBe("wood_fired_chamber_traditional_ash_glaze_atmospheric_reduction");
  });
});

describe("bestUse", () => {
  it("fast fire roller for ceramic floor wall tile", () => {
    expect(bestUse("fast_fire_roller")).toBe("ceramic_floor_wall_tile_fast_fire_roller_hearth_high_volume");
  });
});

describe("tunnelKilnTypes", () => {
  it("returns 5 types", () => {
    expect(tunnelKilnTypes()).toHaveLength(5);
  });
});
