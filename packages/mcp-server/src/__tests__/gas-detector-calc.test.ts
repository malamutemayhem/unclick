import { describe, it, expect } from "vitest";
import {
  sensitivity, responseTime, sensorLife, gasRange,
  gdCost, intrinsicSafe, forToxic, sensingPrinciple,
  bestUse, gasDetectorTypes,
} from "../gas-detector-calc.js";

describe("sensitivity", () => {
  it("electrochemical and photoionization highest sensitivity", () => {
    expect(sensitivity("electrochemical_cell")).toBeGreaterThan(sensitivity("semiconductor_mos"));
    expect(sensitivity("photoionization")).toBeGreaterThan(sensitivity("semiconductor_mos"));
  });
});

describe("responseTime", () => {
  it("photoionization fastest response time", () => {
    expect(responseTime("photoionization")).toBeGreaterThan(responseTime("semiconductor_mos"));
  });
});

describe("sensorLife", () => {
  it("infrared point longest sensor life", () => {
    expect(sensorLife("infrared_point")).toBeGreaterThan(sensorLife("electrochemical_cell"));
  });
});

describe("gasRange", () => {
  it("photoionization widest gas range", () => {
    expect(gasRange("photoionization")).toBeGreaterThan(gasRange("infrared_point"));
  });
});

describe("gdCost", () => {
  it("photoionization most expensive", () => {
    expect(gdCost("photoionization")).toBeGreaterThan(gdCost("semiconductor_mos"));
  });
});

describe("intrinsicSafe", () => {
  it("catalytic bead is intrinsically safe", () => {
    expect(intrinsicSafe("catalytic_bead")).toBe(true);
  });
  it("semiconductor mos not intrinsically safe", () => {
    expect(intrinsicSafe("semiconductor_mos")).toBe(false);
  });
});

describe("forToxic", () => {
  it("electrochemical cell for toxic gas", () => {
    expect(forToxic("electrochemical_cell")).toBe(true);
  });
  it("catalytic bead not for toxic gas", () => {
    expect(forToxic("catalytic_bead")).toBe(false);
  });
});

describe("sensingPrinciple", () => {
  it("photoionization uses uv lamp", () => {
    expect(sensingPrinciple("photoionization")).toBe("uv_lamp_ionize_voc_molecule_current_measure_ppb_broadband");
  });
});

describe("bestUse", () => {
  it("infrared point for offshore platform", () => {
    expect(bestUse("infrared_point")).toBe("offshore_platform_pipeline_methane_propane_fail_safe_detect");
  });
});

describe("gasDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(gasDetectorTypes()).toHaveLength(5);
  });
});
