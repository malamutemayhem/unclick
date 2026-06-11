import { describe, it, expect } from "vitest";
import {
  meltRate, energyEfficiency, glassQuality, capacity,
  gfCost, continuous, forFlat, furnaceConfig,
  bestUse, glassFurnaceTypes,
} from "../glass-furnace-calc.js";

describe("meltRate", () => {
  it("cross fired regen fastest melt rate", () => {
    expect(meltRate("cross_fired_regen")).toBeGreaterThan(meltRate("pot_furnace"));
  });
});

describe("energyEfficiency", () => {
  it("oxy fuel best energy efficiency", () => {
    expect(energyEfficiency("oxy_fuel")).toBeGreaterThan(energyEfficiency("pot_furnace"));
  });
});

describe("glassQuality", () => {
  it("oxy fuel best glass quality", () => {
    expect(glassQuality("oxy_fuel")).toBeGreaterThan(glassQuality("pot_furnace"));
  });
});

describe("capacity", () => {
  it("cross fired regen largest capacity", () => {
    expect(capacity("cross_fired_regen")).toBeGreaterThan(capacity("pot_furnace"));
  });
});

describe("gfCost", () => {
  it("cross fired regen most expensive", () => {
    expect(gfCost("cross_fired_regen")).toBeGreaterThan(gfCost("pot_furnace"));
  });
});

describe("continuous", () => {
  it("end fired regen is continuous", () => {
    expect(continuous("end_fired_regen")).toBe(true);
  });
  it("pot furnace not continuous", () => {
    expect(continuous("pot_furnace")).toBe(false);
  });
});

describe("forFlat", () => {
  it("cross fired regen for flat glass", () => {
    expect(forFlat("cross_fired_regen")).toBe(true);
  });
  it("oxy fuel not for flat", () => {
    expect(forFlat("oxy_fuel")).toBe(false);
  });
});

describe("furnaceConfig", () => {
  it("pot furnace uses clay crucible small batch", () => {
    expect(furnaceConfig("pot_furnace")).toBe("pot_furnace_clay_crucible_small_batch_artisan_color_glass_melt");
  });
});

describe("bestUse", () => {
  it("electric cold top for borosilicate fiber", () => {
    expect(bestUse("electric_cold_top")).toBe("borosilicate_fiber_glass_electric_cold_top_electrode_melt_clean");
  });
});

describe("glassFurnaceTypes", () => {
  it("returns 5 types", () => {
    expect(glassFurnaceTypes()).toHaveLength(5);
  });
});
