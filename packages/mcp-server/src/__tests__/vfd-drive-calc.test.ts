import { describe, it, expect } from "vitest";
import {
  torqueControl, speedRange, efficiency, dynamicResp,
  vfdCost, encoderReq, forPump, method,
  bestUse, vfdDrives,
} from "../vfd-drive-calc.js";

describe("torqueControl", () => {
  it("servo drive pm best torque control", () => {
    expect(torqueControl("servo_drive_pm")).toBeGreaterThan(torqueControl("v_f_scalar"));
  });
});

describe("speedRange", () => {
  it("servo drive pm widest speed range", () => {
    expect(speedRange("servo_drive_pm")).toBeGreaterThan(speedRange("v_f_scalar"));
  });
});

describe("efficiency", () => {
  it("servo drive pm most efficient", () => {
    expect(efficiency("servo_drive_pm")).toBeGreaterThan(efficiency("v_f_scalar"));
  });
});

describe("dynamicResp", () => {
  it("direct torque ctrl best dynamic response", () => {
    expect(dynamicResp("direct_torque_ctrl")).toBeGreaterThan(dynamicResp("v_f_scalar"));
  });
});

describe("vfdCost", () => {
  it("servo drive pm most expensive", () => {
    expect(vfdCost("servo_drive_pm")).toBeGreaterThan(vfdCost("v_f_scalar"));
  });
});

describe("encoderReq", () => {
  it("closed loop vector requires encoder", () => {
    expect(encoderReq("closed_loop_vector")).toBe(true);
  });
  it("sensorless vector no encoder required", () => {
    expect(encoderReq("sensorless_vector")).toBe(false);
  });
});

describe("forPump", () => {
  it("v f scalar is for pump", () => {
    expect(forPump("v_f_scalar")).toBe(true);
  });
  it("servo drive pm not for pump", () => {
    expect(forPump("servo_drive_pm")).toBe(false);
  });
});

describe("method", () => {
  it("direct torque ctrl uses hysteresis band switch", () => {
    expect(method("direct_torque_ctrl")).toBe("hysteresis_band_switch");
  });
});

describe("bestUse", () => {
  it("servo drive pm best for cnc spindle robot axis", () => {
    expect(bestUse("servo_drive_pm")).toBe("cnc_spindle_robot_axis");
  });
});

describe("vfdDrives", () => {
  it("returns 5 types", () => {
    expect(vfdDrives()).toHaveLength(5);
  });
});
