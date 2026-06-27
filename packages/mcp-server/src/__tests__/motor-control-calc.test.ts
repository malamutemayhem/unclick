import { describe, it, expect } from "vitest";
import {
  dynamicResp, efficiency, torqueAccuracy, complexity,
  mcCost, sensorless, forInduction, technique,
  bestUse, motorControls,
} from "../motor-control-calc.js";

describe("dynamicResp", () => {
  it("model predictive mpc best dynamic response", () => {
    expect(dynamicResp("model_predictive_mpc")).toBeGreaterThan(dynamicResp("v_f_scalar"));
  });
});

describe("efficiency", () => {
  it("model predictive mpc highest efficiency", () => {
    expect(efficiency("model_predictive_mpc")).toBeGreaterThan(efficiency("v_f_scalar"));
  });
});

describe("torqueAccuracy", () => {
  it("field oriented foc best torque accuracy", () => {
    expect(torqueAccuracy("field_oriented_foc")).toBeGreaterThan(torqueAccuracy("v_f_scalar"));
  });
});

describe("complexity", () => {
  it("v f scalar simplest", () => {
    expect(complexity("v_f_scalar")).toBeGreaterThan(complexity("model_predictive_mpc"));
  });
});

describe("mcCost", () => {
  it("model predictive mpc most expensive", () => {
    expect(mcCost("model_predictive_mpc")).toBeGreaterThan(mcCost("v_f_scalar"));
  });
});

describe("sensorless", () => {
  it("v f scalar is sensorless", () => {
    expect(sensorless("v_f_scalar")).toBe(true);
  });
  it("field oriented foc not sensorless", () => {
    expect(sensorless("field_oriented_foc")).toBe(false);
  });
});

describe("forInduction", () => {
  it("direct torque dtc for induction", () => {
    expect(forInduction("direct_torque_dtc")).toBe(true);
  });
  it("model predictive mpc not for induction", () => {
    expect(forInduction("model_predictive_mpc")).toBe(false);
  });
});

describe("technique", () => {
  it("sliding mode smc uses switching surface reach", () => {
    expect(technique("sliding_mode_smc")).toBe("switching_surface_reach");
  });
});

describe("bestUse", () => {
  it("field oriented foc best for cnc spindle smooth torque", () => {
    expect(bestUse("field_oriented_foc")).toBe("cnc_spindle_smooth_torque");
  });
});

describe("motorControls", () => {
  it("returns 5 types", () => {
    expect(motorControls()).toHaveLength(5);
  });
});
