import { describe, it, expect } from "vitest";
import {
  holdTorque, stepAccuracy, speedRange, sizeCompact,
  motorCost, closedLoop, geared, stepAngle,
  bestUse, stepperMotors,
} from "../stepper-motor-calc.js";

describe("holdTorque", () => {
  it("nema23 high torque most hold torque", () => {
    expect(holdTorque("nema23_high_torque")).toBeGreaterThan(holdTorque("nema14_compact"));
  });
});

describe("stepAccuracy", () => {
  it("geared stepper ratio best step accuracy", () => {
    expect(stepAccuracy("geared_stepper_ratio")).toBeGreaterThan(stepAccuracy("nema17_bipolar_std"));
  });
});

describe("speedRange", () => {
  it("closed loop encoder widest speed range", () => {
    expect(speedRange("closed_loop_encoder")).toBeGreaterThan(speedRange("geared_stepper_ratio"));
  });
});

describe("sizeCompact", () => {
  it("nema14 compact most compact", () => {
    expect(sizeCompact("nema14_compact")).toBeGreaterThan(sizeCompact("nema23_high_torque"));
  });
});

describe("motorCost", () => {
  it("closed loop encoder most expensive", () => {
    expect(motorCost("closed_loop_encoder")).toBeGreaterThan(motorCost("nema17_bipolar_std"));
  });
});

describe("closedLoop", () => {
  it("closed loop encoder is closed loop", () => {
    expect(closedLoop("closed_loop_encoder")).toBe(true);
  });
  it("nema17 bipolar std not closed loop", () => {
    expect(closedLoop("nema17_bipolar_std")).toBe(false);
  });
});

describe("geared", () => {
  it("geared stepper ratio is geared", () => {
    expect(geared("geared_stepper_ratio")).toBe(true);
  });
  it("nema17 bipolar std not geared", () => {
    expect(geared("nema17_bipolar_std")).toBe(false);
  });
});

describe("stepAngle", () => {
  it("closed loop encoder uses encoder feedback step", () => {
    expect(stepAngle("closed_loop_encoder")).toBe("encoder_feedback_step");
  });
});

describe("bestUse", () => {
  it("nema17 bipolar std best for 3d printer axis", () => {
    expect(bestUse("nema17_bipolar_std")).toBe("3d_printer_axis");
  });
});

describe("stepperMotors", () => {
  it("returns 5 types", () => {
    expect(stepperMotors()).toHaveLength(5);
  });
});
