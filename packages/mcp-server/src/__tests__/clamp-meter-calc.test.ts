import { describe, it, expect } from "vitest";
import {
  accuracy, currentRange, features, jawSize,
  meterCost, dcCapable, trueRms, sensorType,
  bestUse, clampMeters,
} from "../clamp-meter-calc.js";

describe("accuracy", () => {
  it("power quality clamp best accuracy", () => {
    expect(accuracy("power_quality_clamp")).toBeGreaterThan(accuracy("ac_only_basic"));
  });
});

describe("currentRange", () => {
  it("high current 1000a widest range", () => {
    expect(currentRange("high_current_1000a")).toBeGreaterThan(currentRange("ac_only_basic"));
  });
});

describe("features", () => {
  it("power quality clamp most features", () => {
    expect(features("power_quality_clamp")).toBeGreaterThan(features("ac_only_basic"));
  });
});

describe("jawSize", () => {
  it("flexible rogowski largest jaw", () => {
    expect(jawSize("flexible_rogowski")).toBeGreaterThan(jawSize("ac_only_basic"));
  });
});

describe("meterCost", () => {
  it("power quality clamp most expensive", () => {
    expect(meterCost("power_quality_clamp")).toBeGreaterThan(meterCost("ac_only_basic"));
  });
});

describe("dcCapable", () => {
  it("ac dc true rms is dc capable", () => {
    expect(dcCapable("ac_dc_true_rms")).toBe(true);
  });
  it("ac only basic not dc capable", () => {
    expect(dcCapable("ac_only_basic")).toBe(false);
  });
});

describe("trueRms", () => {
  it("ac dc true rms is true rms", () => {
    expect(trueRms("ac_dc_true_rms")).toBe(true);
  });
  it("ac only basic not true rms", () => {
    expect(trueRms("ac_only_basic")).toBe(false);
  });
});

describe("sensorType", () => {
  it("flexible rogowski uses rogowski coil flex", () => {
    expect(sensorType("flexible_rogowski")).toBe("rogowski_coil_flex");
  });
});

describe("bestUse", () => {
  it("high current 1000a best for industrial high current", () => {
    expect(bestUse("high_current_1000a")).toBe("industrial_high_current");
  });
});

describe("clampMeters", () => {
  it("returns 5 types", () => {
    expect(clampMeters()).toHaveLength(5);
  });
});
