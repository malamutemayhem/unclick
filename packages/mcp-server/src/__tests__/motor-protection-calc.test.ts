import { describe, it, expect } from "vitest";
import {
  accuracy, throughput, featureSet, responseTime,
  mpCost, communicating, forLargeMotor, protectionConfig,
  bestUse, motorProtectionTypes,
} from "../motor-protection-calc.js";

describe("accuracy", () => {
  it("motor management best accuracy", () => {
    expect(accuracy("motor_management")).toBeGreaterThan(accuracy("thermal_overload"));
  });
});

describe("throughput", () => {
  it("motor management highest throughput", () => {
    expect(throughput("motor_management")).toBeGreaterThan(throughput("thermistor_relay"));
  });
});

describe("featureSet", () => {
  it("motor management best feature set", () => {
    expect(featureSet("motor_management")).toBeGreaterThan(featureSet("thermal_overload"));
  });
});

describe("responseTime", () => {
  it("thermistor relay fastest response time", () => {
    expect(responseTime("thermistor_relay")).toBeGreaterThan(responseTime("thermal_overload"));
  });
});

describe("mpCost", () => {
  it("motor management most expensive", () => {
    expect(mpCost("motor_management")).toBeGreaterThan(mpCost("thermal_overload"));
  });
});

describe("communicating", () => {
  it("electronic overload is communicating", () => {
    expect(communicating("electronic_overload")).toBe(true);
  });
  it("thermal overload not communicating", () => {
    expect(communicating("thermal_overload")).toBe(false);
  });
});

describe("forLargeMotor", () => {
  it("motor management for large motor", () => {
    expect(forLargeMotor("motor_management")).toBe(true);
  });
  it("thermal overload not for large motor", () => {
    expect(forLargeMotor("thermal_overload")).toBe(false);
  });
});

describe("protectionConfig", () => {
  it("thermistor relay uses ptc sensor winding temp direct measure trip", () => {
    expect(protectionConfig("thermistor_relay")).toBe("thermistor_relay_ptc_sensor_winding_temp_direct_measure_trip");
  });
});

describe("bestUse", () => {
  it("differential motor for large hv motor internal fault instant trip", () => {
    expect(bestUse("differential_motor")).toBe("large_hv_motor_differential_relay_internal_fault_instant_trip");
  });
});

describe("motorProtectionTypes", () => {
  it("returns 5 types", () => {
    expect(motorProtectionTypes()).toHaveLength(5);
  });
});
