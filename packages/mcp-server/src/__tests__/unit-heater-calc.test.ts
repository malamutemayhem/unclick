import { describe, it, expect } from "vitest";
import {
  output, efficiency, noise, durability,
  uhCost, vented, forWarehouse, fuel,
  bestUse, unitHeaterTypes,
} from "../unit-heater-calc.js";

describe("output", () => {
  it("steam highest output", () => {
    expect(output("steam_unit_heater")).toBeGreaterThan(output("electric_fan_forced"));
  });
});

describe("efficiency", () => {
  it("electric most efficient", () => {
    expect(efficiency("electric_fan_forced")).toBeGreaterThan(efficiency("hot_water_hydronic"));
  });
});

describe("noise", () => {
  it("infrared quietest", () => {
    expect(noise("infrared_tube_radiant")).toBeGreaterThan(noise("gas_fired_propeller"));
  });
});

describe("durability", () => {
  it("steam most durable", () => {
    expect(durability("steam_unit_heater")).toBeGreaterThan(durability("gas_fired_propeller"));
  });
});

describe("uhCost", () => {
  it("infrared most expensive", () => {
    expect(uhCost("infrared_tube_radiant")).toBeGreaterThan(uhCost("electric_fan_forced"));
  });
});

describe("vented", () => {
  it("gas fired is vented", () => {
    expect(vented("gas_fired_propeller")).toBe(true);
  });
  it("electric not vented", () => {
    expect(vented("electric_fan_forced")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("gas fired for warehouse", () => {
    expect(forWarehouse("gas_fired_propeller")).toBe(true);
  });
  it("electric not warehouse", () => {
    expect(forWarehouse("electric_fan_forced")).toBe(false);
  });
});

describe("fuel", () => {
  it("infrared uses radiant tube", () => {
    expect(fuel("infrared_tube_radiant")).toBe("gas_fired_radiant_tube_burner");
  });
});

describe("bestUse", () => {
  it("steam for industrial", () => {
    expect(bestUse("steam_unit_heater")).toBe("industrial_plant_steam_avail");
  });
});

describe("unitHeaterTypes", () => {
  it("returns 5 types", () => {
    expect(unitHeaterTypes()).toHaveLength(5);
  });
});
