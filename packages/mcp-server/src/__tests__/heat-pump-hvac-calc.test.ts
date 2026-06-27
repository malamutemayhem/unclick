import { describe, it, expect } from "vitest";
import {
  heatingCop, coolingEer, coldClimatePerf, hotWaterCapable,
  hpCost, reversible, forColdClimate, refrigerant,
  bestUse, heatPumpHvacTypes,
} from "../heat-pump-hvac-calc.js";

describe("heatingCop", () => {
  it("water source geo highest heating cop", () => {
    expect(heatingCop("water_source_geo")).toBeGreaterThan(heatingCop("absorption_gas_fired"));
  });
});

describe("coolingEer", () => {
  it("water source geo highest cooling eer", () => {
    expect(coolingEer("water_source_geo")).toBeGreaterThan(coolingEer("absorption_gas_fired"));
  });
});

describe("coldClimatePerf", () => {
  it("water source geo best cold climate perf", () => {
    expect(coldClimatePerf("water_source_geo")).toBeGreaterThan(coldClimatePerf("air_source_split"));
  });
});

describe("hotWaterCapable", () => {
  it("co2 transcritical best hot water", () => {
    expect(hotWaterCapable("co2_transcritical")).toBeGreaterThan(hotWaterCapable("air_source_split"));
  });
});

describe("hpCost", () => {
  it("water source geo most expensive", () => {
    expect(hpCost("water_source_geo")).toBeGreaterThan(hpCost("air_source_split"));
  });
});

describe("reversible", () => {
  it("air source split is reversible", () => {
    expect(reversible("air_source_split")).toBe(true);
  });
  it("co2 transcritical not reversible", () => {
    expect(reversible("co2_transcritical")).toBe(false);
  });
});

describe("forColdClimate", () => {
  it("water source geo for cold climate", () => {
    expect(forColdClimate("water_source_geo")).toBe(true);
  });
  it("air source split not for cold climate", () => {
    expect(forColdClimate("air_source_split")).toBe(false);
  });
});

describe("refrigerant", () => {
  it("co2 transcritical uses r744", () => {
    expect(refrigerant("co2_transcritical")).toBe("r744_co2_transcritical_cycle_gas_cooler_high_press");
  });
});

describe("bestUse", () => {
  it("cascade for extreme cold region", () => {
    expect(bestUse("cascade_two_stage")).toBe("extreme_cold_region_commercial_high_temp_supply");
  });
});

describe("heatPumpHvacTypes", () => {
  it("returns 5 types", () => {
    expect(heatPumpHvacTypes()).toHaveLength(5);
  });
});
