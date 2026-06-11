import { describe, it, expect } from "vitest";
import {
  axisCount, interpolation, programmability, realTime,
  mcCost, pcBased, forCnc, architecture,
  bestUse, motionControllerTypes,
} from "../motion-controller-calc.js";

describe("axisCount", () => {
  it("pc based soft motion most axes", () => {
    expect(axisCount("pc_based_soft_motion")).toBeGreaterThan(axisCount("cnc_controller_gcode"));
  });
});

describe("interpolation", () => {
  it("cnc controller gcode best interpolation", () => {
    expect(interpolation("cnc_controller_gcode")).toBeGreaterThan(interpolation("plc_integrated_motion"));
  });
});

describe("programmability", () => {
  it("pc based soft motion most programmable", () => {
    expect(programmability("pc_based_soft_motion")).toBeGreaterThan(programmability("robot_controller_teach"));
  });
});

describe("realTime", () => {
  it("cnc controller gcode best real time", () => {
    expect(realTime("cnc_controller_gcode")).toBeGreaterThan(realTime("pc_based_soft_motion"));
  });
});

describe("mcCost", () => {
  it("robot controller teach most expensive", () => {
    expect(mcCost("robot_controller_teach")).toBeGreaterThan(mcCost("plc_integrated_motion"));
  });
});

describe("pcBased", () => {
  it("pc based soft motion is pc based", () => {
    expect(pcBased("pc_based_soft_motion")).toBe(true);
  });
  it("standalone multi axis not pc based", () => {
    expect(pcBased("standalone_multi_axis")).toBe(false);
  });
});

describe("forCnc", () => {
  it("cnc controller gcode for cnc", () => {
    expect(forCnc("cnc_controller_gcode")).toBe(true);
  });
  it("robot controller teach not for cnc", () => {
    expect(forCnc("robot_controller_teach")).toBe(false);
  });
});

describe("architecture", () => {
  it("plc integrated uses plcopen function blocks", () => {
    expect(architecture("plc_integrated_motion")).toBe("plc_cpu_with_motion_function_blocks_plcopen_std");
  });
});

describe("bestUse", () => {
  it("cnc controller for milling turning", () => {
    expect(bestUse("cnc_controller_gcode")).toBe("milling_turning_grinding_machine_tool_path_control");
  });
});

describe("motionControllerTypes", () => {
  it("returns 5 types", () => {
    expect(motionControllerTypes()).toHaveLength(5);
  });
});
