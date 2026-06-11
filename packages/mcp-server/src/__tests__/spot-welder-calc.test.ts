import { describe, it, expect } from "vitest";
import {
  weldStrength, throughput, pressureControl, repeatability,
  swCost_, programmable, forAutomotive, welderConfig,
  bestUse, spotWelderTypes,
} from "../spot-welder-calc.js";

describe("weldStrength", () => {
  it("servo driven best weld strength", () => {
    expect(weldStrength("servo_driven_spot")).toBeGreaterThan(weldStrength("rocker_arm_spot"));
  });
});

describe("throughput", () => {
  it("multi head highest throughput", () => {
    expect(throughput("multi_head_spot")).toBeGreaterThan(throughput("portable_gun_spot"));
  });
});

describe("pressureControl", () => {
  it("servo driven best pressure control", () => {
    expect(pressureControl("servo_driven_spot")).toBeGreaterThan(pressureControl("rocker_arm_spot"));
  });
});

describe("repeatability", () => {
  it("servo driven best repeatability", () => {
    expect(repeatability("servo_driven_spot")).toBeGreaterThan(repeatability("rocker_arm_spot"));
  });
});

describe("swCost_", () => {
  it("servo driven most expensive", () => {
    expect(swCost_("servo_driven_spot")).toBeGreaterThan(swCost_("rocker_arm_spot"));
  });
});

describe("programmable", () => {
  it("press type is programmable", () => {
    expect(programmable("press_type_spot")).toBe(true);
  });
  it("rocker arm not programmable", () => {
    expect(programmable("rocker_arm_spot")).toBe(false);
  });
});

describe("forAutomotive", () => {
  it("multi head for automotive", () => {
    expect(forAutomotive("multi_head_spot")).toBe(true);
  });
  it("rocker arm not for automotive", () => {
    expect(forAutomotive("rocker_arm_spot")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("servo driven uses force profile adaptive monitor quality", () => {
    expect(welderConfig("servo_driven_spot")).toBe("servo_driven_spot_welder_force_profile_adaptive_monitor_quality");
  });
});

describe("bestUse", () => {
  it("multi head for auto body line simultaneous weld high speed", () => {
    expect(bestUse("multi_head_spot")).toBe("auto_body_line_multi_head_spot_welder_simultaneous_weld_high_speed");
  });
});

describe("spotWelderTypes", () => {
  it("returns 5 types", () => {
    expect(spotWelderTypes()).toHaveLength(5);
  });
});
