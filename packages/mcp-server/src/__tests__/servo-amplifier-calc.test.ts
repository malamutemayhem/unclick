import { describe, it, expect } from "vitest";
import {
  powerRange, controlModes, networkIntegration, compactness,
  saCost, multiAxis, forIntegrated, topology,
  bestUse, servoAmplifierTypes,
} from "../servo-amplifier-calc.js";

describe("powerRange", () => {
  it("digital multi axis highest power range", () => {
    expect(powerRange("digital_multi_axis")).toBeGreaterThan(powerRange("micro_stepper_hybrid"));
  });
});

describe("controlModes", () => {
  it("digital multi axis most control modes", () => {
    expect(controlModes("digital_multi_axis")).toBeGreaterThan(controlModes("analog_velocity_mode"));
  });
});

describe("networkIntegration", () => {
  it("network ethercat slave best network integration", () => {
    expect(networkIntegration("network_ethercat_slave")).toBeGreaterThan(networkIntegration("analog_velocity_mode"));
  });
});

describe("compactness", () => {
  it("integrated drive motor most compact", () => {
    expect(compactness("integrated_drive_motor")).toBeGreaterThan(compactness("analog_velocity_mode"));
  });
});

describe("saCost", () => {
  it("digital multi axis most expensive", () => {
    expect(saCost("digital_multi_axis")).toBeGreaterThan(saCost("micro_stepper_hybrid"));
  });
});

describe("multiAxis", () => {
  it("digital multi axis is multi axis", () => {
    expect(multiAxis("digital_multi_axis")).toBe(true);
  });
  it("analog velocity not multi axis", () => {
    expect(multiAxis("analog_velocity_mode")).toBe(false);
  });
});

describe("forIntegrated", () => {
  it("integrated drive motor for integrated", () => {
    expect(forIntegrated("integrated_drive_motor")).toBe(true);
  });
  it("analog velocity not for integrated", () => {
    expect(forIntegrated("analog_velocity_mode")).toBe(false);
  });
});

describe("topology", () => {
  it("network ethercat uses daisy chain", () => {
    expect(topology("network_ethercat_slave")).toBe("ethercat_slave_distributed_servo_daisy_chain_fast");
  });
});

describe("bestUse", () => {
  it("micro stepper for 3d printer", () => {
    expect(bestUse("micro_stepper_hybrid")).toBe("3d_printer_lab_automation_light_duty_positioning");
  });
});

describe("servoAmplifierTypes", () => {
  it("returns 5 types", () => {
    expect(servoAmplifierTypes()).toHaveLength(5);
  });
});
