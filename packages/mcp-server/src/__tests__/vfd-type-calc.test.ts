import { describe, it, expect } from "vitest";
import {
  torqueControl, speedRange, efficiency, harmonics,
  vfCost, encoderRequired, forPump, topology,
  bestUse, vfdTypes,
} from "../vfd-type-calc.js";

describe("torqueControl", () => {
  it("closed loop vector best torque control", () => {
    expect(torqueControl("closed_loop_vector_encoder")).toBeGreaterThan(torqueControl("volts_per_hz_scalar"));
  });
});

describe("speedRange", () => {
  it("closed loop vector widest speed range", () => {
    expect(speedRange("closed_loop_vector_encoder")).toBeGreaterThan(speedRange("volts_per_hz_scalar"));
  });
});

describe("efficiency", () => {
  it("regenerative most efficient", () => {
    expect(efficiency("regenerative_afr_braking")).toBeGreaterThan(efficiency("volts_per_hz_scalar"));
  });
});

describe("harmonics", () => {
  it("medium voltage best harmonics", () => {
    expect(harmonics("medium_voltage_multilevel")).toBeGreaterThan(harmonics("volts_per_hz_scalar"));
  });
});

describe("vfCost", () => {
  it("regenerative most expensive", () => {
    expect(vfCost("regenerative_afr_braking")).toBeGreaterThan(vfCost("volts_per_hz_scalar"));
  });
});

describe("encoderRequired", () => {
  it("closed loop vector requires encoder", () => {
    expect(encoderRequired("closed_loop_vector_encoder")).toBe(true);
  });
  it("sensorless vector no encoder", () => {
    expect(encoderRequired("sensorless_vector_foc")).toBe(false);
  });
});

describe("forPump", () => {
  it("volts per hz for pump", () => {
    expect(forPump("volts_per_hz_scalar")).toBe(true);
  });
  it("closed loop vector not for pump", () => {
    expect(forPump("closed_loop_vector_encoder")).toBe(false);
  });
});

describe("topology", () => {
  it("medium voltage uses cascaded h bridge", () => {
    expect(topology("medium_voltage_multilevel")).toBe("cascaded_h_bridge_multilevel");
  });
});

describe("bestUse", () => {
  it("regenerative best for elevator crane", () => {
    expect(bestUse("regenerative_afr_braking")).toBe("elevator_crane_energy_recovery");
  });
});

describe("vfdTypes", () => {
  it("returns 5 types", () => {
    expect(vfdTypes()).toHaveLength(5);
  });
});
