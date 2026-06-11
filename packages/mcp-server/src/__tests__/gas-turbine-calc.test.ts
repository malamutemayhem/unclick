import { describe, it, expect } from "vitest";
import {
  efficiency, powerOutput, startupTime, fuelFlex,
  gtCost, combined, forPeaking, compressor,
  bestUse, gasTurbineTypes,
} from "../gas-turbine-calc.js";

describe("efficiency", () => {
  it("combined cycle most efficient", () => {
    expect(efficiency("combined_cycle_ccgt")).toBeGreaterThan(efficiency("micro_turbine_small"));
  });
});

describe("powerOutput", () => {
  it("heavy duty frame highest power", () => {
    expect(powerOutput("heavy_duty_frame")).toBeGreaterThan(powerOutput("micro_turbine_small"));
  });
});

describe("startupTime", () => {
  it("micro turbine fastest startup", () => {
    expect(startupTime("micro_turbine_small")).toBeGreaterThan(startupTime("combined_cycle_ccgt"));
  });
});

describe("fuelFlex", () => {
  it("micro turbine most fuel flexible", () => {
    expect(fuelFlex("micro_turbine_small")).toBeGreaterThan(fuelFlex("combined_cycle_ccgt"));
  });
});

describe("gtCost", () => {
  it("combined cycle most expensive", () => {
    expect(gtCost("combined_cycle_ccgt")).toBeGreaterThan(gtCost("micro_turbine_small"));
  });
});

describe("combined", () => {
  it("combined cycle is combined", () => {
    expect(combined("combined_cycle_ccgt")).toBe(true);
  });
  it("heavy duty frame not combined", () => {
    expect(combined("heavy_duty_frame")).toBe(false);
  });
});

describe("forPeaking", () => {
  it("aeroderivative for peaking", () => {
    expect(forPeaking("aeroderivative_light")).toBe(true);
  });
  it("heavy duty frame not for peaking", () => {
    expect(forPeaking("heavy_duty_frame")).toBe(false);
  });
});

describe("compressor", () => {
  it("micro turbine uses single stage centrifugal", () => {
    expect(compressor("micro_turbine_small")).toBe("single_stage_centrifugal_recuperated_cycle");
  });
});

describe("bestUse", () => {
  it("combined cycle for high efficiency baseload", () => {
    expect(bestUse("combined_cycle_ccgt")).toBe("high_efficiency_baseload_power_grid_anchor");
  });
});

describe("gasTurbineTypes", () => {
  it("returns 5 types", () => {
    expect(gasTurbineTypes()).toHaveLength(5);
  });
});
