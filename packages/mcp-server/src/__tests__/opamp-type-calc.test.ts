import { describe, it, expect } from "vitest";
import {
  gbw, noise, slewRate, offsetDrift,
  opCost, railToRail, forPrecision, inputStage,
  bestUse, opampTypes,
} from "../opamp-type-calc.js";

describe("gbw", () => {
  it("current feedback highest gbw", () => {
    expect(gbw("current_feedback")).toBeGreaterThan(gbw("chopper_stabilized"));
  });
});

describe("noise", () => {
  it("jfet low noise best noise perf", () => {
    expect(noise("jfet_low_noise")).toBeGreaterThan(noise("current_feedback"));
  });
});

describe("slewRate", () => {
  it("current feedback fastest slew", () => {
    expect(slewRate("current_feedback")).toBeGreaterThan(slewRate("chopper_stabilized"));
  });
});

describe("offsetDrift", () => {
  it("chopper stabilized best offset drift", () => {
    expect(offsetDrift("chopper_stabilized")).toBeGreaterThan(offsetDrift("current_feedback"));
  });
});

describe("opCost", () => {
  it("fully differential most expensive", () => {
    expect(opCost("fully_differential")).toBeGreaterThan(opCost("cmos_rail_to_rail"));
  });
});

describe("railToRail", () => {
  it("cmos rail to rail is rail to rail", () => {
    expect(railToRail("cmos_rail_to_rail")).toBe(true);
  });
  it("jfet low noise not rail to rail", () => {
    expect(railToRail("jfet_low_noise")).toBe(false);
  });
});

describe("forPrecision", () => {
  it("chopper stabilized for precision", () => {
    expect(forPrecision("chopper_stabilized")).toBe(true);
  });
  it("cmos rail to rail not for precision", () => {
    expect(forPrecision("cmos_rail_to_rail")).toBe(false);
  });
});

describe("inputStage", () => {
  it("current feedback uses complementary bipolar mirror", () => {
    expect(inputStage("current_feedback")).toBe("complementary_bipolar_mirror");
  });
});

describe("bestUse", () => {
  it("fully differential best for adc driver", () => {
    expect(bestUse("fully_differential")).toBe("adc_driver_differential_input");
  });
});

describe("opampTypes", () => {
  it("returns 5 types", () => {
    expect(opampTypes()).toHaveLength(5);
  });
});
