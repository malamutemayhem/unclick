import { describe, it, expect } from "vitest";
import {
  efficiency, emissions, reliability, fuelFlex,
  mtCost, chpCapable, forDistributed, cycle,
  bestUse, microTurbineTypes,
} from "../micro-turbine-calc.js";

describe("efficiency", () => {
  it("chp combined heat most efficient", () => {
    expect(efficiency("chp_combined_heat")).toBeGreaterThan(efficiency("oil_field_flare_gas"));
  });
});

describe("emissions", () => {
  it("natural gas recuperated low emissions", () => {
    expect(emissions("natural_gas_recuperated")).toBeGreaterThanOrEqual(emissions("biogas_landfill_fuel"));
  });
});

describe("reliability", () => {
  it("multi pack array most reliable", () => {
    expect(reliability("multi_pack_array")).toBeGreaterThan(reliability("biogas_landfill_fuel"));
  });
});

describe("fuelFlex", () => {
  it("biogas landfill fuel most fuel flexible", () => {
    expect(fuelFlex("biogas_landfill_fuel")).toBeGreaterThan(fuelFlex("natural_gas_recuperated"));
  });
});

describe("mtCost", () => {
  it("multi pack array most expensive", () => {
    expect(mtCost("multi_pack_array")).toBeGreaterThan(mtCost("oil_field_flare_gas"));
  });
});

describe("chpCapable", () => {
  it("chp combined heat is chp capable", () => {
    expect(chpCapable("chp_combined_heat")).toBe(true);
  });
  it("oil field flare gas not chp capable", () => {
    expect(chpCapable("oil_field_flare_gas")).toBe(false);
  });
});

describe("forDistributed", () => {
  it("all micro turbine types for distributed", () => {
    expect(forDistributed("natural_gas_recuperated")).toBe(true);
    expect(forDistributed("multi_pack_array")).toBe(true);
  });
});

describe("cycle", () => {
  it("gasification uses partial oxidation syngas", () => {
    expect(cycle("chp_combined_heat")).toBe("recuperated_cycle_exhaust_heat_recovery_hot_water");
  });
});

describe("bestUse", () => {
  it("oil field for flare elimination", () => {
    expect(bestUse("oil_field_flare_gas")).toBe("oil_field_associated_gas_flare_elimination_power");
  });
});

describe("microTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(microTurbineTypes()).toHaveLength(5);
  });
});
