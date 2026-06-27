import { describe, it, expect } from "vitest";
import {
  firingFlexibility, temperatureMax, loadCapacity, energyUse,
  skCost, topLoading, forSpecialty, kilnConfig,
  bestUse, shuttleKilnTypes,
} from "../shuttle-kiln-calc.js";

describe("firingFlexibility", () => {
  it("top hat lift best firing flexibility", () => {
    expect(firingFlexibility("top_hat_lift")).toBeGreaterThan(firingFlexibility("bell_furnace"));
  });
});

describe("temperatureMax", () => {
  it("bell furnace highest temperature max", () => {
    expect(temperatureMax("bell_furnace")).toBeGreaterThan(temperatureMax("electric_box"));
  });
});

describe("loadCapacity", () => {
  it("gas fired car largest load capacity", () => {
    expect(loadCapacity("gas_fired_car")).toBeGreaterThan(loadCapacity("electric_box"));
  });
});

describe("energyUse", () => {
  it("electric box better energy use", () => {
    expect(energyUse("electric_box")).toBeGreaterThan(energyUse("gas_fired_car"));
  });
});

describe("skCost", () => {
  it("top hat lift most expensive", () => {
    expect(skCost("top_hat_lift")).toBeGreaterThan(skCost("electric_box"));
  });
});

describe("topLoading", () => {
  it("top hat lift is top loading", () => {
    expect(topLoading("top_hat_lift")).toBe(true);
  });
  it("gas fired car not top loading", () => {
    expect(topLoading("gas_fired_car")).toBe(false);
  });
});

describe("forSpecialty", () => {
  it("bell furnace for specialty", () => {
    expect(forSpecialty("bell_furnace")).toBe(true);
  });
  it("gas fired car not for specialty", () => {
    expect(forSpecialty("gas_fired_car")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("mobile hearth uses car bottom roll out", () => {
    expect(kilnConfig("mobile_hearth")).toBe("mobile_hearth_car_bottom_roll_out_heavy_load_refractory_batch");
  });
});

describe("bestUse", () => {
  it("electric box for small batch technical ceramic", () => {
    expect(bestUse("electric_box")).toBe("small_batch_technical_ceramic_dental_lab_electric_box_kiln");
  });
});

describe("shuttleKilnTypes", () => {
  it("returns 5 types", () => {
    expect(shuttleKilnTypes()).toHaveLength(5);
  });
});
