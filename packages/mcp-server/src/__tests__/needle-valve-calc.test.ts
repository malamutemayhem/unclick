import { describe, it, expect } from "vitest";
import {
  precision, pressure, flowControl, durability,
  nvCost, highPressure, forInstrumentation, stemType,
  bestUse, needleValveTypes,
} from "../needle-valve-calc.js";

describe("precision", () => {
  it("metering most precise", () => {
    expect(precision("metering_micrometer_handle")).toBeGreaterThan(precision("standard_bonnet_manual"));
  });
});

describe("pressure", () => {
  it("angle highest pressure", () => {
    expect(pressure("angle_pattern_high_pressure")).toBeGreaterThan(pressure("metering_micrometer_handle"));
  });
});

describe("flowControl", () => {
  it("metering best flow control", () => {
    expect(flowControl("metering_micrometer_handle")).toBeGreaterThan(flowControl("multiport_manifold_gauge"));
  });
});

describe("durability", () => {
  it("angle most durable", () => {
    expect(durability("angle_pattern_high_pressure")).toBeGreaterThan(durability("multiport_manifold_gauge"));
  });
});

describe("nvCost", () => {
  it("metering most expensive", () => {
    expect(nvCost("metering_micrometer_handle")).toBeGreaterThan(nvCost("standard_bonnet_manual"));
  });
});

describe("highPressure", () => {
  it("angle is high pressure", () => {
    expect(highPressure("angle_pattern_high_pressure")).toBe(true);
  });
  it("standard not high pressure", () => {
    expect(highPressure("standard_bonnet_manual")).toBe(false);
  });
});

describe("forInstrumentation", () => {
  it("integral for instrumentation", () => {
    expect(forInstrumentation("integral_bonnet_compact")).toBe(true);
  });
  it("angle not instrumentation", () => {
    expect(forInstrumentation("angle_pattern_high_pressure")).toBe(false);
  });
});

describe("stemType", () => {
  it("metering uses micrometer", () => {
    expect(stemType("metering_micrometer_handle")).toBe("micrometer_graduated_vernier");
  });
});

describe("bestUse", () => {
  it("angle for hydraulic test", () => {
    expect(bestUse("angle_pattern_high_pressure")).toBe("hydraulic_test_high_pressure_gas");
  });
});

describe("needleValveTypes", () => {
  it("returns 5 types", () => {
    expect(needleValveTypes()).toHaveLength(5);
  });
});
