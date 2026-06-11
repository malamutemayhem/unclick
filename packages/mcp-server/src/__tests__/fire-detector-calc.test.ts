import { describe, it, expect } from "vitest";
import {
  sensitivity, responseTime, falseAlarmResist, coverage,
  fdCost, addressable, forCleanRoom, sensor,
  bestUse, fireDetectorTypes,
} from "../fire-detector-calc.js";

describe("sensitivity", () => {
  it("aspirating vesda most sensitive", () => {
    expect(sensitivity("aspirating_vesda")).toBeGreaterThan(sensitivity("heat_fixed_temp"));
  });
});

describe("responseTime", () => {
  it("aspirating vesda fastest response", () => {
    expect(responseTime("aspirating_vesda")).toBeGreaterThanOrEqual(responseTime("flame_ir_uv"));
  });
});

describe("falseAlarmResist", () => {
  it("heat fixed temp best false alarm resistance", () => {
    expect(falseAlarmResist("heat_fixed_temp")).toBeGreaterThan(falseAlarmResist("ionization_smoke"));
  });
});

describe("coverage", () => {
  it("aspirating vesda best coverage", () => {
    expect(coverage("aspirating_vesda")).toBeGreaterThan(coverage("heat_fixed_temp"));
  });
});

describe("fdCost", () => {
  it("aspirating vesda most expensive", () => {
    expect(fdCost("aspirating_vesda")).toBeGreaterThan(fdCost("heat_fixed_temp"));
  });
});

describe("addressable", () => {
  it("aspirating vesda is addressable", () => {
    expect(addressable("aspirating_vesda")).toBe(true);
  });
  it("ionization smoke not addressable", () => {
    expect(addressable("ionization_smoke")).toBe(false);
  });
});

describe("forCleanRoom", () => {
  it("aspirating vesda for clean room", () => {
    expect(forCleanRoom("aspirating_vesda")).toBe(true);
  });
  it("photoelectric smoke not for clean room", () => {
    expect(forCleanRoom("photoelectric_smoke")).toBe(false);
  });
});

describe("sensor", () => {
  it("flame ir uv uses multi spectrum", () => {
    expect(sensor("flame_ir_uv")).toBe("multi_spectrum_ir_uv_flame_signature_detect");
  });
});

describe("bestUse", () => {
  it("heat fixed temp for kitchen dusty area", () => {
    expect(bestUse("heat_fixed_temp")).toBe("kitchen_garage_dusty_area_heat_only_detection");
  });
});

describe("fireDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(fireDetectorTypes()).toHaveLength(5);
  });
});
