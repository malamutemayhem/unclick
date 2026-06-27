import { describe, it, expect } from "vitest";
import {
  torque, speed, precision, efficiency,
  stCost, encoderBuiltin, forCnc, winding,
  bestUse, stepperTypes,
} from "../stepper-type-calc.js";

describe("torque", () => {
  it("closed loop highest torque", () => {
    expect(torque("closed_loop_servo_step")).toBeGreaterThan(torque("tin_can_unipolar"));
  });
});

describe("speed", () => {
  it("variable reluctance fastest", () => {
    expect(speed("variable_reluctance_vr")).toBeGreaterThan(speed("tin_can_unipolar"));
  });
});

describe("precision", () => {
  it("closed loop most precise", () => {
    expect(precision("closed_loop_servo_step")).toBeGreaterThan(precision("permanent_magnet_pm"));
  });
});

describe("efficiency", () => {
  it("closed loop most efficient", () => {
    expect(efficiency("closed_loop_servo_step")).toBeGreaterThan(efficiency("tin_can_unipolar"));
  });
});

describe("stCost", () => {
  it("closed loop most expensive", () => {
    expect(stCost("closed_loop_servo_step")).toBeGreaterThan(stCost("tin_can_unipolar"));
  });
});

describe("encoderBuiltin", () => {
  it("closed loop has encoder", () => {
    expect(encoderBuiltin("closed_loop_servo_step")).toBe(true);
  });
  it("hybrid no encoder", () => {
    expect(encoderBuiltin("hybrid_two_phase")).toBe(false);
  });
});

describe("forCnc", () => {
  it("hybrid for cnc", () => {
    expect(forCnc("hybrid_two_phase")).toBe(true);
  });
  it("tin can not for cnc", () => {
    expect(forCnc("tin_can_unipolar")).toBe(false);
  });
});

describe("winding", () => {
  it("variable reluctance has toothed rotor", () => {
    expect(winding("variable_reluctance_vr")).toBe("toothed_rotor_no_magnet");
  });
});

describe("bestUse", () => {
  it("hybrid best for 3d printer cnc", () => {
    expect(bestUse("hybrid_two_phase")).toBe("3d_printer_cnc_axis_drive");
  });
});

describe("stepperTypes", () => {
  it("returns 5 types", () => {
    expect(stepperTypes()).toHaveLength(5);
  });
});
