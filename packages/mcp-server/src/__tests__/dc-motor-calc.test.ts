import { describe, it, expect } from "vitest";
import {
  speedOutput, torqueOutput, efficiency, durability,
  motorCost, brushless, geared, driveType,
  bestUse, dcMotors,
} from "../dc-motor-calc.js";

describe("speedOutput", () => {
  it("coreless dc fast highest speed output", () => {
    expect(speedOutput("coreless_dc_fast")).toBeGreaterThan(speedOutput("geared_dc_torque"));
  });
});

describe("torqueOutput", () => {
  it("planetary gear dc highest torque output", () => {
    expect(torqueOutput("planetary_gear_dc")).toBeGreaterThan(torqueOutput("coreless_dc_fast"));
  });
});

describe("efficiency", () => {
  it("brushless outrunner most efficient", () => {
    expect(efficiency("brushless_outrunner")).toBeGreaterThan(efficiency("brushed_standard_hobby"));
  });
});

describe("durability", () => {
  it("brushless outrunner most durable", () => {
    expect(durability("brushless_outrunner")).toBeGreaterThan(durability("brushed_standard_hobby"));
  });
});

describe("motorCost", () => {
  it("planetary gear dc most expensive", () => {
    expect(motorCost("planetary_gear_dc")).toBeGreaterThan(motorCost("brushed_standard_hobby"));
  });
});

describe("brushless", () => {
  it("brushless outrunner is brushless", () => {
    expect(brushless("brushless_outrunner")).toBe(true);
  });
  it("brushed standard hobby not brushless", () => {
    expect(brushless("brushed_standard_hobby")).toBe(false);
  });
});

describe("geared", () => {
  it("planetary gear dc is geared", () => {
    expect(geared("planetary_gear_dc")).toBe(true);
  });
  it("brushless outrunner not geared", () => {
    expect(geared("brushless_outrunner")).toBe(false);
  });
});

describe("driveType", () => {
  it("brushless outrunner uses esc electronic commute", () => {
    expect(driveType("brushless_outrunner")).toBe("esc_electronic_commute");
  });
});

describe("bestUse", () => {
  it("coreless dc fast best for fast response actuate", () => {
    expect(bestUse("coreless_dc_fast")).toBe("fast_response_actuate");
  });
});

describe("dcMotors", () => {
  it("returns 5 types", () => {
    expect(dcMotors()).toHaveLength(5);
  });
});
