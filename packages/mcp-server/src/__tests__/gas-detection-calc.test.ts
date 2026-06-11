import { describe, it, expect } from "vitest";
import {
  sensitivity, selectivity, sensorLife, responseTime,
  gdCost, continuous, forFlammable, principle,
  bestUse, gasDetectionTypes,
} from "../gas-detection-calc.js";

describe("sensitivity", () => {
  it("pid most sensitive", () => {
    expect(sensitivity("photoionization_pid")).toBeGreaterThan(sensitivity("semiconductor_mos"));
  });
});

describe("selectivity", () => {
  it("infrared ndir best selectivity", () => {
    expect(selectivity("infrared_ndir_hc")).toBeGreaterThan(selectivity("photoionization_pid"));
  });
});

describe("sensorLife", () => {
  it("infrared ndir longest sensor life", () => {
    expect(sensorLife("infrared_ndir_hc")).toBeGreaterThan(sensorLife("electrochemical_toxic"));
  });
});

describe("responseTime", () => {
  it("pid fastest response", () => {
    expect(responseTime("photoionization_pid")).toBeGreaterThan(responseTime("semiconductor_mos"));
  });
});

describe("gdCost", () => {
  it("infrared ndir expensive", () => {
    expect(gdCost("infrared_ndir_hc")).toBeGreaterThan(gdCost("semiconductor_mos"));
  });
});

describe("continuous", () => {
  it("all types are continuous", () => {
    expect(continuous("catalytic_bead_lel")).toBe(true);
  });
});

describe("forFlammable", () => {
  it("catalytic bead for flammable", () => {
    expect(forFlammable("catalytic_bead_lel")).toBe(true);
  });
  it("electrochemical not for flammable", () => {
    expect(forFlammable("electrochemical_toxic")).toBe(false);
  });
});

describe("principle", () => {
  it("electrochemical uses amperometric cell", () => {
    expect(principle("electrochemical_toxic")).toBe("electrochemical_cell_diffusion_amperometric");
  });
});

describe("bestUse", () => {
  it("semiconductor for residential alarm", () => {
    expect(bestUse("semiconductor_mos")).toBe("residential_gas_alarm_low_cost_general_detect");
  });
});

describe("gasDetectionTypes", () => {
  it("returns 5 types", () => {
    expect(gasDetectionTypes()).toHaveLength(5);
  });
});
