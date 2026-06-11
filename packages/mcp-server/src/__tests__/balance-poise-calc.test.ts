import { describe, it, expect } from "vitest";
import {
  poiseAccuracy, adjustRange, speedCheck, repeatability,
  poiseCost, dynamic, forModern, measureMethod,
  bestUse, balancePoises,
} from "../balance-poise-calc.js";

describe("poiseAccuracy", () => {
  it("dynamic test rig most accurate", () => {
    expect(poiseAccuracy("dynamic_test_rig")).toBeGreaterThan(poiseAccuracy("weight_screw_adjust"));
  });
});

describe("adjustRange", () => {
  it("weight screw adjust widest range", () => {
    expect(adjustRange("weight_screw_adjust")).toBeGreaterThan(adjustRange("poising_tool_knife"));
  });
});

describe("speedCheck", () => {
  it("dynamic test rig fastest check", () => {
    expect(speedCheck("dynamic_test_rig")).toBeGreaterThan(speedCheck("timing_screw_set"));
  });
});

describe("repeatability", () => {
  it("dynamic test rig most repeatable", () => {
    expect(repeatability("dynamic_test_rig")).toBeGreaterThan(repeatability("weight_screw_adjust"));
  });
});

describe("poiseCost", () => {
  it("dynamic test rig most expensive", () => {
    expect(poiseCost("dynamic_test_rig")).toBeGreaterThan(poiseCost("weight_screw_adjust"));
  });
});

describe("dynamic", () => {
  it("dynamic test rig is dynamic", () => {
    expect(dynamic("dynamic_test_rig")).toBe(true);
  });
  it("poising tool knife not dynamic", () => {
    expect(dynamic("poising_tool_knife")).toBe(false);
  });
});

describe("forModern", () => {
  it("timing screw set is for modern", () => {
    expect(forModern("timing_screw_set")).toBe(true);
  });
  it("poising tool knife not for modern", () => {
    expect(forModern("poising_tool_knife")).toBe(false);
  });
});

describe("measureMethod", () => {
  it("dynamic test rig uses electronic vibration", () => {
    expect(measureMethod("dynamic_test_rig")).toBe("electronic_vibration");
  });
});

describe("bestUse", () => {
  it("weight screw adjust best for quick weight tweak", () => {
    expect(bestUse("weight_screw_adjust")).toBe("quick_weight_tweak");
  });
});

describe("balancePoises", () => {
  it("returns 5 types", () => {
    expect(balancePoises()).toHaveLength(5);
  });
});
