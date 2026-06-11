import { describe, it, expect } from "vitest";
import {
  energyEff, airQuality, zoneControl, humidity,
  ahCost, variableFlow, forHighOccupancy, airPath,
  bestUse, airHandlingTypes,
} from "../air-handling-calc.js";

describe("energyEff", () => {
  it("energy recovery erv most efficient", () => {
    expect(energyEff("energy_recovery_erv")).toBeGreaterThan(energyEff("constant_volume_single"));
  });
});

describe("airQuality", () => {
  it("dedicated outdoor doas best air quality", () => {
    expect(airQuality("dedicated_outdoor_doas")).toBeGreaterThan(airQuality("constant_volume_single"));
  });
});

describe("zoneControl", () => {
  it("variable volume vav best zone control", () => {
    expect(zoneControl("variable_volume_vav")).toBeGreaterThan(zoneControl("constant_volume_single"));
  });
});

describe("humidity", () => {
  it("dedicated outdoor doas best humidity control", () => {
    expect(humidity("dedicated_outdoor_doas")).toBeGreaterThan(humidity("constant_volume_single"));
  });
});

describe("ahCost", () => {
  it("dual duct mixing most expensive", () => {
    expect(ahCost("dual_duct_mixing")).toBeGreaterThan(ahCost("constant_volume_single"));
  });
});

describe("variableFlow", () => {
  it("variable volume vav has variable flow", () => {
    expect(variableFlow("variable_volume_vav")).toBe(true);
  });
  it("constant volume not variable flow", () => {
    expect(variableFlow("constant_volume_single")).toBe(false);
  });
});

describe("forHighOccupancy", () => {
  it("dedicated outdoor doas for high occupancy", () => {
    expect(forHighOccupancy("dedicated_outdoor_doas")).toBe(true);
  });
  it("constant volume not for high occupancy", () => {
    expect(forHighOccupancy("constant_volume_single")).toBe(false);
  });
});

describe("airPath", () => {
  it("energy recovery uses enthalpy wheel", () => {
    expect(airPath("energy_recovery_erv")).toBe("enthalpy_wheel_plate_exchanger_exhaust_to_supply");
  });
});

describe("bestUse", () => {
  it("dual duct for laboratory hospital", () => {
    expect(bestUse("dual_duct_mixing")).toBe("laboratory_hospital_precise_zone_temp_no_crossover");
  });
});

describe("airHandlingTypes", () => {
  it("returns 5 types", () => {
    expect(airHandlingTypes()).toHaveLength(5);
  });
});
