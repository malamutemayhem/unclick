import { describe, it, expect } from "vitest";
import {
  flow, pressure, reliability, maintenance,
  fpCost, selfPowered, forHighRise, driver,
  bestUse, firePumpTypes,
} from "../fire-pump-calc.js";

describe("flow", () => {
  it("horizontal split case highest flow", () => {
    expect(flow("horizontal_split_case")).toBeGreaterThan(flow("end_suction_centrifugal"));
  });
});

describe("pressure", () => {
  it("vertical turbine highest pressure", () => {
    expect(pressure("vertical_turbine_inline")).toBeGreaterThan(pressure("end_suction_centrifugal"));
  });
});

describe("reliability", () => {
  it("diesel most reliable", () => {
    expect(reliability("diesel_engine_driven")).toBeGreaterThan(reliability("end_suction_centrifugal"));
  });
});

describe("maintenance", () => {
  it("electric direct lowest maintenance", () => {
    expect(maintenance("electric_motor_direct")).toBeGreaterThan(maintenance("diesel_engine_driven"));
  });
});

describe("fpCost", () => {
  it("diesel most expensive", () => {
    expect(fpCost("diesel_engine_driven")).toBeGreaterThan(fpCost("end_suction_centrifugal"));
  });
});

describe("selfPowered", () => {
  it("diesel is self powered", () => {
    expect(selfPowered("diesel_engine_driven")).toBe(true);
  });
  it("electric not self powered", () => {
    expect(selfPowered("electric_motor_direct")).toBe(false);
  });
});

describe("forHighRise", () => {
  it("vertical turbine for high rise", () => {
    expect(forHighRise("vertical_turbine_inline")).toBe(true);
  });
  it("end suction not for high rise", () => {
    expect(forHighRise("end_suction_centrifugal")).toBe(false);
  });
});

describe("driver", () => {
  it("diesel uses battery start", () => {
    expect(driver("diesel_engine_driven")).toBe("diesel_engine_battery_start");
  });
});

describe("bestUse", () => {
  it("end suction for small building", () => {
    expect(bestUse("end_suction_centrifugal")).toBe("small_building_light_hazard");
  });
});

describe("firePumpTypes", () => {
  it("returns 5 types", () => {
    expect(firePumpTypes()).toHaveLength(5);
  });
});
