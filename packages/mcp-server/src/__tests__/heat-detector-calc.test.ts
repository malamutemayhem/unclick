import { describe, it, expect } from "vitest";
import {
  response, reliability, falseAlarm, coverage,
  hdCost, restorable, forHarsh, element,
  bestUse, heatDetectorTypes,
} from "../heat-detector-calc.js";

describe("response", () => {
  it("electronic fastest response", () => {
    expect(response("electronic_thermistor")).toBeGreaterThan(response("fixed_temp_fusible"));
  });
});

describe("reliability", () => {
  it("linear heat cable most reliable", () => {
    expect(reliability("linear_heat_cable")).toBeGreaterThan(reliability("electronic_thermistor"));
  });
});

describe("falseAlarm", () => {
  it("fixed temp lowest false alarm", () => {
    expect(falseAlarm("fixed_temp_fusible")).toBeGreaterThan(falseAlarm("electronic_thermistor"));
  });
});

describe("coverage", () => {
  it("linear heat cable best coverage", () => {
    expect(coverage("linear_heat_cable")).toBeGreaterThan(coverage("fixed_temp_fusible"));
  });
});

describe("hdCost", () => {
  it("linear heat cable most expensive", () => {
    expect(hdCost("linear_heat_cable")).toBeGreaterThan(hdCost("fixed_temp_fusible"));
  });
});

describe("restorable", () => {
  it("ror is restorable", () => {
    expect(restorable("rate_of_rise_pneumatic")).toBe(true);
  });
  it("fixed temp not restorable", () => {
    expect(restorable("fixed_temp_fusible")).toBe(false);
  });
});

describe("forHarsh", () => {
  it("fixed temp for harsh env", () => {
    expect(forHarsh("fixed_temp_fusible")).toBe(true);
  });
  it("ror not for harsh", () => {
    expect(forHarsh("rate_of_rise_pneumatic")).toBe(false);
  });
});

describe("element", () => {
  it("linear uses polymer cable", () => {
    expect(element("linear_heat_cable")).toBe("polymer_cable_conductor_short");
  });
});

describe("bestUse", () => {
  it("combination for general purpose", () => {
    expect(bestUse("combination_fixed_ror")).toBe("general_purpose_best_coverage");
  });
});

describe("heatDetectorTypes", () => {
  it("returns 5 types", () => {
    expect(heatDetectorTypes()).toHaveLength(5);
  });
});
