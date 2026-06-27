import { describe, it, expect } from "vitest";
import {
  efficiency, powerOutput, flexibility, reliability,
  stCost, cogeneration, forBaseload, config,
  bestUse, steamTurbineTypes,
} from "../steam-turbine-calc.js";

describe("efficiency", () => {
  it("reheat supercritical most efficient", () => {
    expect(efficiency("reheat_supercritical")).toBeGreaterThan(efficiency("geared_turbine_small"));
  });
});

describe("powerOutput", () => {
  it("condensing highest power output", () => {
    expect(powerOutput("condensing_power_gen")).toBeGreaterThan(powerOutput("geared_turbine_small"));
  });
});

describe("flexibility", () => {
  it("extraction most flexible", () => {
    expect(flexibility("extraction_combined")).toBeGreaterThan(flexibility("reheat_supercritical"));
  });
});

describe("reliability", () => {
  it("condensing highly reliable", () => {
    expect(reliability("condensing_power_gen")).toBeGreaterThanOrEqual(reliability("extraction_combined"));
  });
});

describe("stCost", () => {
  it("reheat supercritical most expensive", () => {
    expect(stCost("reheat_supercritical")).toBeGreaterThan(stCost("geared_turbine_small"));
  });
});

describe("cogeneration", () => {
  it("back pressure supports cogeneration", () => {
    expect(cogeneration("back_pressure_process")).toBe(true);
  });
  it("condensing does not support cogeneration", () => {
    expect(cogeneration("condensing_power_gen")).toBe(false);
  });
});

describe("forBaseload", () => {
  it("condensing for baseload", () => {
    expect(forBaseload("condensing_power_gen")).toBe(true);
  });
  it("geared turbine not for baseload", () => {
    expect(forBaseload("geared_turbine_small")).toBe(false);
  });
});

describe("config", () => {
  it("back pressure exhausts at process pressure", () => {
    expect(config("back_pressure_process")).toBe("exhaust_at_process_pressure_no_condenser");
  });
});

describe("bestUse", () => {
  it("reheat supercritical for large plant", () => {
    expect(bestUse("reheat_supercritical")).toBe("large_coal_nuclear_plant_ultra_supercritical");
  });
});

describe("steamTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(steamTurbineTypes()).toHaveLength(5);
  });
});
