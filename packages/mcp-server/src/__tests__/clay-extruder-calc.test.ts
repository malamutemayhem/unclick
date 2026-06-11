import { describe, it, expect } from "vitest";
import {
  forceOutput, dieRange, consistency, setupSpeed,
  extruderCost, powered, wallMount, driveType,
  bestUse, clayExtruders,
} from "../clay-extruder-calc.js";

describe("forceOutput", () => {
  it("hydraulic press power strongest force output", () => {
    expect(forceOutput("hydraulic_press_power")).toBeGreaterThan(forceOutput("hand_extruder_basic"));
  });
});

describe("dieRange", () => {
  it("hydraulic press power widest die range", () => {
    expect(dieRange("hydraulic_press_power")).toBeGreaterThan(dieRange("slab_extruder_flat"));
  });
});

describe("consistency", () => {
  it("hydraulic press power most consistent", () => {
    expect(consistency("hydraulic_press_power")).toBeGreaterThan(consistency("hand_extruder_basic"));
  });
});

describe("setupSpeed", () => {
  it("hand extruder basic fastest setup", () => {
    expect(setupSpeed("hand_extruder_basic")).toBeGreaterThan(setupSpeed("hydraulic_press_power"));
  });
});

describe("extruderCost", () => {
  it("hydraulic press power most expensive", () => {
    expect(extruderCost("hydraulic_press_power")).toBeGreaterThan(extruderCost("hand_extruder_basic"));
  });
});

describe("powered", () => {
  it("hydraulic press power is powered", () => {
    expect(powered("hydraulic_press_power")).toBe(true);
  });
  it("wall mount lever not powered", () => {
    expect(powered("wall_mount_lever")).toBe(false);
  });
});

describe("wallMount", () => {
  it("wall mount lever is wall mount", () => {
    expect(wallMount("wall_mount_lever")).toBe(true);
  });
  it("hand extruder basic not wall mount", () => {
    expect(wallMount("hand_extruder_basic")).toBe(false);
  });
});

describe("driveType", () => {
  it("table mount gear uses geared crank drive", () => {
    expect(driveType("table_mount_gear")).toBe("geared_crank_drive");
  });
});

describe("bestUse", () => {
  it("wall mount lever best for general studio extrude", () => {
    expect(bestUse("wall_mount_lever")).toBe("general_studio_extrude");
  });
});

describe("clayExtruders", () => {
  it("returns 5 types", () => {
    expect(clayExtruders()).toHaveLength(5);
  });
});
