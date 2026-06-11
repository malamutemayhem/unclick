import { describe, it, expect } from "vitest";
import {
  accuracy, depth, response, maintenance,
  smCost, continuous, forIrrigation, principle,
  bestUse, soilMoistureTypes,
} from "../soil-moisture-calc.js";

describe("accuracy", () => {
  it("neutron scatter most accurate", () => {
    expect(accuracy("neutron_scatter_depth")).toBeGreaterThan(accuracy("gypsum_block_resistance"));
  });
});

describe("depth", () => {
  it("neutron scatter deepest", () => {
    expect(depth("neutron_scatter_depth")).toBeGreaterThan(depth("tensiometer_suction_cup"));
  });
});

describe("response", () => {
  it("tdr fastest response", () => {
    expect(response("tdr_time_domain_reflect")).toBeGreaterThan(response("gypsum_block_resistance"));
  });
});

describe("maintenance", () => {
  it("fdr lowest maintenance", () => {
    expect(maintenance("fdr_capacitance_probe")).toBeGreaterThan(maintenance("gypsum_block_resistance"));
  });
});

describe("smCost", () => {
  it("neutron scatter most expensive", () => {
    expect(smCost("neutron_scatter_depth")).toBeGreaterThan(smCost("gypsum_block_resistance"));
  });
});

describe("continuous", () => {
  it("tdr is continuous", () => {
    expect(continuous("tdr_time_domain_reflect")).toBe(true);
  });
  it("neutron scatter not continuous", () => {
    expect(continuous("neutron_scatter_depth")).toBe(false);
  });
});

describe("forIrrigation", () => {
  it("fdr for irrigation", () => {
    expect(forIrrigation("fdr_capacitance_probe")).toBe(true);
  });
  it("neutron scatter not for irrigation", () => {
    expect(forIrrigation("neutron_scatter_depth")).toBe(false);
  });
});

describe("principle", () => {
  it("tensiometer uses water tension ceramic cup", () => {
    expect(principle("tensiometer_suction_cup")).toBe("water_tension_ceramic_cup");
  });
});

describe("bestUse", () => {
  it("gypsum block best for low cost farm", () => {
    expect(bestUse("gypsum_block_resistance")).toBe("low_cost_farm_tension_monitor");
  });
});

describe("soilMoistureTypes", () => {
  it("returns 5 types", () => {
    expect(soilMoistureTypes()).toHaveLength(5);
  });
});
