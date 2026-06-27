import { describe, it, expect } from "vitest";
import {
  resolution, torque, smoothness, speed,
  stpCost, encoderRequired, forPrecision, excitation,
  bestUse, stepperDrives,
} from "../stepper-drive-calc.js";

describe("resolution", () => {
  it("closed loop servo highest resolution", () => {
    expect(resolution("closed_loop_servo")).toBeGreaterThan(resolution("full_step_wave"));
  });
});

describe("torque", () => {
  it("five phase hybrid highest torque", () => {
    expect(torque("five_phase_hybrid")).toBeGreaterThan(torque("microstepping_256"));
  });
});

describe("smoothness", () => {
  it("microstepping 256 smoothest", () => {
    expect(smoothness("microstepping_256")).toBeGreaterThan(smoothness("full_step_wave"));
  });
});

describe("speed", () => {
  it("closed loop servo fastest", () => {
    expect(speed("closed_loop_servo")).toBeGreaterThan(speed("microstepping_256"));
  });
});

describe("stpCost", () => {
  it("closed loop servo most expensive", () => {
    expect(stpCost("closed_loop_servo")).toBeGreaterThan(stpCost("full_step_wave"));
  });
});

describe("encoderRequired", () => {
  it("closed loop servo requires encoder", () => {
    expect(encoderRequired("closed_loop_servo")).toBe(true);
  });
  it("microstepping 256 no encoder required", () => {
    expect(encoderRequired("microstepping_256")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("closed loop servo for precision", () => {
    expect(forPrecision("closed_loop_servo")).toBe(true);
  });
  it("full step wave not for precision", () => {
    expect(forPrecision("full_step_wave")).toBe(false);
  });
});

describe("excitation", () => {
  it("five phase hybrid uses pentagon winding sequence", () => {
    expect(excitation("five_phase_hybrid")).toBe("pentagon_winding_sequence");
  });
});

describe("bestUse", () => {
  it("microstepping 256 best for 3d printer smooth axis", () => {
    expect(bestUse("microstepping_256")).toBe("3d_printer_smooth_axis");
  });
});

describe("stepperDrives", () => {
  it("returns 5 types", () => {
    expect(stepperDrives()).toHaveLength(5);
  });
});
