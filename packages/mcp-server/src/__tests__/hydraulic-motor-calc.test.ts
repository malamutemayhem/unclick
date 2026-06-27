import { describe, it, expect } from "vitest";
import {
  torqueOutput, speedRange, mechanicalEfficiency, startingTorque,
  hmCost, bidirectional, forLowSpeed, design,
  bestUse, hydraulicMotorTypes,
} from "../hydraulic-motor-calc.js";

describe("torqueOutput", () => {
  it("radial piston cam highest torque", () => {
    expect(torqueOutput("radial_piston_cam")).toBeGreaterThan(torqueOutput("gear_motor"));
  });
});

describe("speedRange", () => {
  it("gear motor and axial piston widest speed range", () => {
    expect(speedRange("gear_motor")).toBeGreaterThan(speedRange("radial_piston_cam"));
    expect(speedRange("axial_piston_bent")).toBeGreaterThan(speedRange("radial_piston_cam"));
  });
});

describe("mechanicalEfficiency", () => {
  it("axial piston bent best efficiency", () => {
    expect(mechanicalEfficiency("axial_piston_bent")).toBeGreaterThan(mechanicalEfficiency("gear_motor"));
  });
});

describe("startingTorque", () => {
  it("radial piston cam best starting torque", () => {
    expect(startingTorque("radial_piston_cam")).toBeGreaterThan(startingTorque("gear_motor"));
  });
});

describe("hmCost", () => {
  it("radial piston cam most expensive", () => {
    expect(hmCost("radial_piston_cam")).toBeGreaterThan(hmCost("gear_motor"));
  });
});

describe("bidirectional", () => {
  it("all types are bidirectional", () => {
    expect(bidirectional("gear_motor")).toBe(true);
    expect(bidirectional("radial_piston_cam")).toBe(true);
  });
});

describe("forLowSpeed", () => {
  it("radial piston cam for low speed", () => {
    expect(forLowSpeed("radial_piston_cam")).toBe(true);
  });
  it("gear motor not for low speed", () => {
    expect(forLowSpeed("gear_motor")).toBe(false);
  });
});

describe("design", () => {
  it("gerotor orbital uses star orbit ring gear", () => {
    expect(design("gerotor_orbital")).toBe("gerotor_star_orbit_within_ring_gear_compact_high_torque");
  });
});

describe("bestUse", () => {
  it("radial piston cam for wheel drive", () => {
    expect(bestUse("radial_piston_cam")).toBe("wheel_drive_track_drive_conveyor_direct_no_gearbox_needed");
  });
});

describe("hydraulicMotorTypes", () => {
  it("returns 5 types", () => {
    expect(hydraulicMotorTypes()).toHaveLength(5);
  });
});
