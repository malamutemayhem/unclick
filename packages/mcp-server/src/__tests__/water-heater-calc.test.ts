import { describe, it, expect } from "vitest";
import {
  heatingSpeed, energyEfficiency, hotWaterCapacity, spaceRequired,
  heaterCost, endlessHotWater, renewableEnergy, heatingMethod,
  bestHome, waterHeaters,
} from "../water-heater-calc.js";

describe("heatingSpeed", () => {
  it("tankless gas fastest heating", () => {
    expect(heatingSpeed("tankless_gas")).toBeGreaterThan(heatingSpeed("solar_thermal"));
  });
});

describe("energyEfficiency", () => {
  it("heat pump most efficient", () => {
    expect(energyEfficiency("heat_pump")).toBeGreaterThan(energyEfficiency("tank_gas"));
  });
});

describe("hotWaterCapacity", () => {
  it("tankless gas highest capacity", () => {
    expect(hotWaterCapacity("tankless_gas")).toBeGreaterThan(hotWaterCapacity("solar_thermal"));
  });
});

describe("spaceRequired", () => {
  it("tankless gas least space", () => {
    expect(spaceRequired("solar_thermal")).toBeGreaterThan(spaceRequired("tankless_gas"));
  });
});

describe("heaterCost", () => {
  it("solar thermal most expensive", () => {
    expect(heaterCost("solar_thermal")).toBeGreaterThan(heaterCost("tank_electric"));
  });
});

describe("endlessHotWater", () => {
  it("tankless gas has endless hot water", () => {
    expect(endlessHotWater("tankless_gas")).toBe(true);
  });
  it("tank gas does not", () => {
    expect(endlessHotWater("tank_gas")).toBe(false);
  });
});

describe("renewableEnergy", () => {
  it("solar thermal uses renewable energy", () => {
    expect(renewableEnergy("solar_thermal")).toBe(true);
  });
  it("tankless gas does not", () => {
    expect(renewableEnergy("tankless_gas")).toBe(false);
  });
});

describe("heatingMethod", () => {
  it("heat pump uses refrigerant compressor coil", () => {
    expect(heatingMethod("heat_pump")).toBe("refrigerant_compressor_coil");
  });
});

describe("bestHome", () => {
  it("tankless gas for large family high demand", () => {
    expect(bestHome("tankless_gas")).toBe("large_family_high_demand");
  });
});

describe("waterHeaters", () => {
  it("returns 5 types", () => {
    expect(waterHeaters()).toHaveLength(5);
  });
});
