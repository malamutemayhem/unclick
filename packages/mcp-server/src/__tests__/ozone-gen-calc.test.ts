import { describe, it, expect } from "vitest";
import {
  output, efficiency, purity, maintenance,
  ogCost, oxygenFed, forDrinking, generation,
  bestUse, ozoneGenTypes,
} from "../ozone-gen-calc.js";

describe("output", () => {
  it("oxygen cd highest output", () => {
    expect(output("corona_discharge_oxygen")).toBeGreaterThan(output("uv_lamp_low_conc"));
  });
});

describe("efficiency", () => {
  it("oxygen cd most efficient", () => {
    expect(efficiency("corona_discharge_oxygen")).toBeGreaterThan(efficiency("uv_lamp_low_conc"));
  });
});

describe("purity", () => {
  it("electrolytic highest purity", () => {
    expect(purity("electrolytic_cell")).toBeGreaterThan(purity("corona_discharge_air"));
  });
});

describe("maintenance", () => {
  it("uv lamp lowest maintenance", () => {
    expect(maintenance("uv_lamp_low_conc")).toBeGreaterThan(maintenance("cold_plasma_advanced"));
  });
});

describe("ogCost", () => {
  it("cold plasma most expensive", () => {
    expect(ogCost("cold_plasma_advanced")).toBeGreaterThan(ogCost("uv_lamp_low_conc"));
  });
});

describe("oxygenFed", () => {
  it("oxygen cd is oxygen fed", () => {
    expect(oxygenFed("corona_discharge_oxygen")).toBe(true);
  });
  it("air cd not oxygen fed", () => {
    expect(oxygenFed("corona_discharge_air")).toBe(false);
  });
});

describe("forDrinking", () => {
  it("oxygen cd for drinking", () => {
    expect(forDrinking("corona_discharge_oxygen")).toBe(true);
  });
  it("cold plasma not drinking", () => {
    expect(forDrinking("cold_plasma_advanced")).toBe(false);
  });
});

describe("generation", () => {
  it("electrolytic uses pem electrolysis", () => {
    expect(generation("electrolytic_cell")).toBe("pem_electrolysis_water_dissolved");
  });
});

describe("bestUse", () => {
  it("uv lamp for small pool", () => {
    expect(bestUse("uv_lamp_low_conc")).toBe("small_pool_spa_odor_control");
  });
});

describe("ozoneGenTypes", () => {
  it("returns 5 types", () => {
    expect(ozoneGenTypes()).toHaveLength(5);
  });
});
