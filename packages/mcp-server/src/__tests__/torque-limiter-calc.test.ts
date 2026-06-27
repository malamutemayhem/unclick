import { describe, it, expect } from "vitest";
import {
  precision, response, repeatability, torqueRange,
  tlCost, autoReset, forServo, element,
  bestUse, torqueLimiterTypes,
} from "../torque-limiter-calc.js";

describe("precision", () => {
  it("electronic servo most precise", () => {
    expect(precision("electronic_servo_limit")).toBeGreaterThan(precision("shear_pin_sacrificial"));
  });
});

describe("response", () => {
  it("ball detent fastest response", () => {
    expect(response("ball_detent_reset")).toBeGreaterThan(response("magnetic_hysteresis"));
  });
});

describe("repeatability", () => {
  it("magnetic hysteresis best repeatability", () => {
    expect(repeatability("magnetic_hysteresis")).toBeGreaterThan(repeatability("shear_pin_sacrificial"));
  });
});

describe("torqueRange", () => {
  it("shear pin widest range", () => {
    expect(torqueRange("shear_pin_sacrificial")).toBeGreaterThan(torqueRange("magnetic_hysteresis"));
  });
});

describe("tlCost", () => {
  it("electronic servo most expensive", () => {
    expect(tlCost("electronic_servo_limit")).toBeGreaterThan(tlCost("shear_pin_sacrificial"));
  });
});

describe("autoReset", () => {
  it("friction disc auto resets", () => {
    expect(autoReset("friction_disc_slip")).toBe(true);
  });
  it("shear pin does not auto reset", () => {
    expect(autoReset("shear_pin_sacrificial")).toBe(false);
  });
});

describe("forServo", () => {
  it("electronic servo for servo", () => {
    expect(forServo("electronic_servo_limit")).toBe(true);
  });
  it("friction disc not for servo", () => {
    expect(forServo("friction_disc_slip")).toBe(false);
  });
});

describe("element", () => {
  it("magnetic hysteresis uses permanent magnet disc", () => {
    expect(element("magnetic_hysteresis")).toBe("permanent_magnet_hysteresis_disc");
  });
});

describe("bestUse", () => {
  it("ball detent for packaging bottling", () => {
    expect(bestUse("ball_detent_reset")).toBe("packaging_bottling_precise_protect");
  });
});

describe("torqueLimiterTypes", () => {
  it("returns 5 types", () => {
    expect(torqueLimiterTypes()).toHaveLength(5);
  });
});
