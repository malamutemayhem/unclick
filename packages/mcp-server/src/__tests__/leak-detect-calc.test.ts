import { describe, it, expect } from "vitest";
import {
  sensitivity, coverage, localization, response,
  ldCost, continuous, forDataCenter, method,
  bestUse, leakDetectTypes,
} from "../leak-detect-calc.js";

describe("sensitivity", () => {
  it("rope most sensitive", () => {
    expect(sensitivity("rope_cable_sensor")).toBeGreaterThan(sensitivity("flow_anomaly_software"));
  });
});

describe("coverage", () => {
  it("acoustic widest coverage", () => {
    expect(coverage("acoustic_pipe_monitor")).toBeGreaterThan(coverage("spot_probe_point"));
  });
});

describe("localization", () => {
  it("spot best localization", () => {
    expect(localization("spot_probe_point")).toBeGreaterThan(localization("flow_anomaly_software"));
  });
});

describe("response", () => {
  it("spot fastest response", () => {
    expect(response("spot_probe_point")).toBeGreaterThan(response("infrared_thermal_scan"));
  });
});

describe("ldCost", () => {
  it("acoustic most expensive", () => {
    expect(ldCost("acoustic_pipe_monitor")).toBeGreaterThan(ldCost("spot_probe_point"));
  });
});

describe("continuous", () => {
  it("rope is continuous", () => {
    expect(continuous("rope_cable_sensor")).toBe(true);
  });
  it("thermal not continuous", () => {
    expect(continuous("infrared_thermal_scan")).toBe(false);
  });
});

describe("forDataCenter", () => {
  it("rope for data center", () => {
    expect(forDataCenter("rope_cable_sensor")).toBe(true);
  });
  it("acoustic not data center", () => {
    expect(forDataCenter("acoustic_pipe_monitor")).toBe(false);
  });
});

describe("method", () => {
  it("flow uses ml anomaly", () => {
    expect(method("flow_anomaly_software")).toBe("flow_meter_ml_anomaly_detect");
  });
});

describe("bestUse", () => {
  it("rope for data center floor", () => {
    expect(bestUse("rope_cable_sensor")).toBe("data_center_raised_floor_perimeter");
  });
});

describe("leakDetectTypes", () => {
  it("returns 5 types", () => {
    expect(leakDetectTypes()).toHaveLength(5);
  });
});
