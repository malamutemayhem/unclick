import { describe, it, expect } from "vitest";
import {
  detectionRange, sensitivity, responseSpeed, sizeCompact,
  sensorCost, adjustable, autoRepeat, lensType,
  bestUse, pirSensors,
} from "../pir-sensor-calc.js";

describe("detectionRange", () => {
  it("dual element wide longest detection range", () => {
    expect(detectionRange("dual_element_wide")).toBeGreaterThan(detectionRange("am312_mini_compact"));
  });
});

describe("sensitivity", () => {
  it("dual element wide most sensitive", () => {
    expect(sensitivity("dual_element_wide")).toBeGreaterThan(sensitivity("am312_mini_compact"));
  });
});

describe("responseSpeed", () => {
  it("am312 mini compact fastest response", () => {
    expect(responseSpeed("am312_mini_compact")).toBeGreaterThan(responseSpeed("dual_element_wide"));
  });
});

describe("sizeCompact", () => {
  it("am312 mini compact most compact", () => {
    expect(sizeCompact("am312_mini_compact")).toBeGreaterThan(sizeCompact("dual_element_wide"));
  });
});

describe("sensorCost", () => {
  it("dual element wide most expensive", () => {
    expect(sensorCost("dual_element_wide")).toBeGreaterThan(sensorCost("hcsr501_standard"));
  });
});

describe("adjustable", () => {
  it("hcsr501 standard is adjustable", () => {
    expect(adjustable("hcsr501_standard")).toBe(true);
  });
  it("am312 mini compact not adjustable", () => {
    expect(adjustable("am312_mini_compact")).toBe(false);
  });
});

describe("autoRepeat", () => {
  it("am312 mini compact has auto repeat", () => {
    expect(autoRepeat("am312_mini_compact")).toBe(true);
  });
  it("hcsr501 standard no auto repeat", () => {
    expect(autoRepeat("hcsr501_standard")).toBe(false);
  });
});

describe("lensType", () => {
  it("fresnel lens narrow uses narrow beam fresnel", () => {
    expect(lensType("fresnel_lens_narrow")).toBe("narrow_beam_fresnel");
  });
});

describe("bestUse", () => {
  it("dual element wide best for security wide area", () => {
    expect(bestUse("dual_element_wide")).toBe("security_wide_area");
  });
});

describe("pirSensors", () => {
  it("returns 5 types", () => {
    expect(pirSensors()).toHaveLength(5);
  });
});
