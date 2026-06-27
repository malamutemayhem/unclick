import { describe, it, expect } from "vitest";
import {
  power, efficiency, weight, maintenance,
  meCost, dualFuel, forMerchant, fuel,
  bestUse, marineEngineTypes,
} from "../marine-engine-calc.js";

describe("power", () => {
  it("slow speed two stroke highest power", () => {
    expect(power("slow_speed_two_stroke")).toBeGreaterThan(power("electric_battery_hybrid"));
  });
});

describe("efficiency", () => {
  it("slow speed two stroke most efficient", () => {
    expect(efficiency("slow_speed_two_stroke")).toBeGreaterThan(efficiency("gas_turbine_codog"));
  });
});

describe("weight", () => {
  it("gas turbine lightest weight", () => {
    expect(weight("gas_turbine_codog")).toBeGreaterThan(weight("slow_speed_two_stroke"));
  });
});

describe("maintenance", () => {
  it("electric battery lowest maintenance", () => {
    expect(maintenance("electric_battery_hybrid")).toBeGreaterThan(maintenance("gas_turbine_codog"));
  });
});

describe("meCost", () => {
  it("slow speed most expensive", () => {
    expect(meCost("slow_speed_two_stroke")).toBeGreaterThan(meCost("high_speed_diesel_planing"));
  });
});

describe("dualFuel", () => {
  it("slow speed is dual fuel", () => {
    expect(dualFuel("slow_speed_two_stroke")).toBe(true);
  });
  it("gas turbine not dual fuel", () => {
    expect(dualFuel("gas_turbine_codog")).toBe(false);
  });
});

describe("forMerchant", () => {
  it("slow speed for merchant", () => {
    expect(forMerchant("slow_speed_two_stroke")).toBe(true);
  });
  it("gas turbine not for merchant", () => {
    expect(forMerchant("gas_turbine_codog")).toBe(false);
  });
});

describe("fuel", () => {
  it("electric battery uses lithium shore charge", () => {
    expect(fuel("electric_battery_hybrid")).toBe("lithium_battery_shore_charge");
  });
});

describe("bestUse", () => {
  it("gas turbine best for naval frigate", () => {
    expect(bestUse("gas_turbine_codog")).toBe("naval_frigate_fast_attack_craft");
  });
});

describe("marineEngineTypes", () => {
  it("returns 5 types", () => {
    expect(marineEngineTypes()).toHaveLength(5);
  });
});
