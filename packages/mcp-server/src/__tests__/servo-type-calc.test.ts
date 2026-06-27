import { describe, it, expect } from "vitest";
import {
  torque, speed, precision, bandwidth,
  servoCost, gearless, forCnc, feedback,
  bestUse, servoTypes,
} from "../servo-type-calc.js";

describe("torque", () => {
  it("direct drive torque highest torque", () => {
    expect(torque("direct_drive_torque")).toBeGreaterThan(torque("hobby_pwm_dc"));
  });
});

describe("speed", () => {
  it("linear voice coil fastest speed", () => {
    expect(speed("linear_voice_coil")).toBeGreaterThan(speed("piezo_ultrasonic"));
  });
});

describe("precision", () => {
  it("direct drive torque best precision", () => {
    expect(precision("direct_drive_torque")).toBeGreaterThan(precision("hobby_pwm_dc"));
  });
});

describe("bandwidth", () => {
  it("linear voice coil widest bandwidth", () => {
    expect(bandwidth("linear_voice_coil")).toBeGreaterThan(bandwidth("hobby_pwm_dc"));
  });
});

describe("servoCost", () => {
  it("direct drive torque most expensive", () => {
    expect(servoCost("direct_drive_torque")).toBeGreaterThan(servoCost("hobby_pwm_dc"));
  });
});

describe("gearless", () => {
  it("direct drive torque is gearless", () => {
    expect(gearless("direct_drive_torque")).toBe(true);
  });
  it("hobby pwm dc not gearless", () => {
    expect(gearless("hobby_pwm_dc")).toBe(false);
  });
});

describe("forCnc", () => {
  it("industrial ac pmsm is for cnc", () => {
    expect(forCnc("industrial_ac_pmsm")).toBe(true);
  });
  it("hobby pwm dc not for cnc", () => {
    expect(forCnc("hobby_pwm_dc")).toBe(false);
  });
});

describe("feedback", () => {
  it("direct drive torque uses absolute encoder 26bit", () => {
    expect(feedback("direct_drive_torque")).toBe("absolute_encoder_26bit");
  });
});

describe("bestUse", () => {
  it("linear voice coil best for pick place head", () => {
    expect(bestUse("linear_voice_coil")).toBe("pick_place_head");
  });
});

describe("servoTypes", () => {
  it("returns 5 types", () => {
    expect(servoTypes()).toHaveLength(5);
  });
});
