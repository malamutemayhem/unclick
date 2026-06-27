import { describe, it, expect } from "vitest";
import {
  efficiency, recoveryRate, firstHourDelivery, spaceSaving,
  whCost, tankless, forHighDemand, heating,
  bestUse, waterHeaterCommercialTypes,
} from "../water-heater-commercial-calc.js";

describe("efficiency", () => {
  it("condensing high eff most efficient", () => {
    expect(efficiency("condensing_high_eff")).toBeGreaterThan(efficiency("storage_tank_gas"));
  });
});

describe("recoveryRate", () => {
  it("tankless instantaneous highest recovery rate", () => {
    expect(recoveryRate("tankless_instantaneous")).toBeGreaterThan(recoveryRate("heat_pump_hybrid"));
  });
});

describe("firstHourDelivery", () => {
  it("indirect boiler fired best first hour", () => {
    expect(firstHourDelivery("indirect_boiler_fired")).toBeGreaterThan(firstHourDelivery("heat_pump_hybrid"));
  });
});

describe("spaceSaving", () => {
  it("tankless most space saving", () => {
    expect(spaceSaving("tankless_instantaneous")).toBeGreaterThan(spaceSaving("storage_tank_gas"));
  });
});

describe("whCost", () => {
  it("condensing most expensive", () => {
    expect(whCost("condensing_high_eff")).toBeGreaterThan(whCost("storage_tank_gas"));
  });
});

describe("tankless", () => {
  it("tankless instantaneous is tankless", () => {
    expect(tankless("tankless_instantaneous")).toBe(true);
  });
  it("storage tank gas not tankless", () => {
    expect(tankless("storage_tank_gas")).toBe(false);
  });
});

describe("forHighDemand", () => {
  it("storage tank gas for high demand", () => {
    expect(forHighDemand("storage_tank_gas")).toBe(true);
  });
  it("tankless not for high demand", () => {
    expect(forHighDemand("tankless_instantaneous")).toBe(false);
  });
});

describe("heating", () => {
  it("indirect uses boiler heated coil", () => {
    expect(heating("indirect_boiler_fired")).toBe("boiler_heated_coil_in_tank_stainless_exchanger");
  });
});

describe("bestUse", () => {
  it("heat pump hybrid for mild climate", () => {
    expect(bestUse("heat_pump_hybrid")).toBe("mild_climate_building_low_operating_cost_electric");
  });
});

describe("waterHeaterCommercialTypes", () => {
  it("returns 5 types", () => {
    expect(waterHeaterCommercialTypes()).toHaveLength(5);
  });
});
