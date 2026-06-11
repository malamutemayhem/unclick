import { describe, it, expect } from "vitest";
import {
  safety, payload, easeOfUse, flexibility,
  crCost__, fenceless, forSmallBatch, safetyMethod,
  bestUse, collaborativeRobotTypes,
} from "../collaborative-robot-calc.js";

describe("safety", () => {
  it("force limited 6 axis highest safety", () => {
    expect(safety("force_limited_6_axis")).toBeGreaterThanOrEqual(safety("mobile_cobot_platform"));
  });
});

describe("payload", () => {
  it("vision guided pick highest payload", () => {
    expect(payload("vision_guided_pick")).toBeGreaterThan(payload("table_top_desktop"));
  });
});

describe("easeOfUse", () => {
  it("table top desktop easiest to use", () => {
    expect(easeOfUse("table_top_desktop")).toBeGreaterThan(easeOfUse("dual_arm_bimanual"));
  });
});

describe("flexibility", () => {
  it("dual arm bimanual most flexible", () => {
    expect(flexibility("dual_arm_bimanual")).toBeGreaterThanOrEqual(flexibility("mobile_cobot_platform"));
  });
});

describe("crCost__", () => {
  it("mobile cobot platform most expensive", () => {
    expect(crCost__("mobile_cobot_platform")).toBeGreaterThan(crCost__("table_top_desktop"));
  });
});

describe("fenceless", () => {
  it("all cobots are fenceless", () => {
    expect(fenceless("force_limited_6_axis")).toBe(true);
    expect(fenceless("table_top_desktop")).toBe(true);
  });
});

describe("forSmallBatch", () => {
  it("all cobots for small batch", () => {
    expect(forSmallBatch("force_limited_6_axis")).toBe(true);
    expect(forSmallBatch("dual_arm_bimanual")).toBe(true);
  });
});

describe("safetyMethod", () => {
  it("mobile cobot uses amr base lidar", () => {
    expect(safetyMethod("mobile_cobot_platform")).toBe("amr_base_lidar_safety_scanner_cobot_arm_mounted");
  });
});

describe("bestUse", () => {
  it("table top for education prototyping", () => {
    expect(bestUse("table_top_desktop")).toBe("education_prototyping_micro_assembly_desktop_task");
  });
});

describe("collaborativeRobotTypes", () => {
  it("returns 5 types", () => {
    expect(collaborativeRobotTypes()).toHaveLength(5);
  });
});
