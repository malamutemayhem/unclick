import { describe, it, expect } from "vitest";
import {
  peakCurrent, propagDelay, driverVoltage, deadTime,
  driverCost, isolated, forGan, driveTopology,
  bestUse, gateDrivers,
} from "../gate-driver-calc.js";

describe("peakCurrent", () => {
  it("gan specific driver highest peak current", () => {
    expect(peakCurrent("gan_specific_driver")).toBeGreaterThan(peakCurrent("low_side_single"));
  });
});

describe("propagDelay", () => {
  it("gan specific driver fastest propagation", () => {
    expect(propagDelay("gan_specific_driver")).toBeGreaterThan(propagDelay("isolated_gate_opto"));
  });
});

describe("driverVoltage", () => {
  it("isolated gate opto highest driver voltage", () => {
    expect(driverVoltage("isolated_gate_opto")).toBeGreaterThan(driverVoltage("low_side_single"));
  });
});

describe("deadTime", () => {
  it("gan specific driver best dead time control", () => {
    expect(deadTime("gan_specific_driver")).toBeGreaterThan(deadTime("low_side_single"));
  });
});

describe("driverCost", () => {
  it("gan specific driver most expensive", () => {
    expect(driverCost("gan_specific_driver")).toBeGreaterThan(driverCost("low_side_single"));
  });
});

describe("isolated", () => {
  it("isolated gate opto is isolated", () => {
    expect(isolated("isolated_gate_opto")).toBe(true);
  });
  it("low side single not isolated", () => {
    expect(isolated("low_side_single")).toBe(false);
  });
});

describe("forGan", () => {
  it("gan specific driver is for gan", () => {
    expect(forGan("gan_specific_driver")).toBe(true);
  });
  it("low side single not for gan", () => {
    expect(forGan("low_side_single")).toBe(false);
  });
});

describe("driveTopology", () => {
  it("half bridge dual uses dual channel adaptive", () => {
    expect(driveTopology("half_bridge_dual")).toBe("dual_channel_adaptive");
  });
});

describe("bestUse", () => {
  it("isolated gate opto best for high voltage igbt drive", () => {
    expect(bestUse("isolated_gate_opto")).toBe("high_voltage_igbt_drive");
  });
});

describe("gateDrivers", () => {
  it("returns 5 types", () => {
    expect(gateDrivers()).toHaveLength(5);
  });
});
