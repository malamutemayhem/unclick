import { describe, it, expect } from "vitest";
import {
  gripForce, versatility, speed, delicacy,
  eeCost, contactless, forFragile, mechanism,
  bestUse, endEffectorTypes,
} from "../end-effector-calc.js";

describe("gripForce", () => {
  it("magnetic plate lift highest grip force", () => {
    expect(gripForce("magnetic_plate_lift")).toBeGreaterThan(gripForce("soft_adaptive_finger"));
  });
});

describe("versatility", () => {
  it("soft adaptive finger most versatile", () => {
    expect(versatility("soft_adaptive_finger")).toBeGreaterThanOrEqual(versatility("tool_changer_auto"));
  });
});

describe("speed", () => {
  it("vacuum suction cup fastest", () => {
    expect(speed("vacuum_suction_cup")).toBeGreaterThan(speed("tool_changer_auto"));
  });
});

describe("delicacy", () => {
  it("soft adaptive finger most delicate", () => {
    expect(delicacy("soft_adaptive_finger")).toBeGreaterThan(delicacy("parallel_jaw_gripper"));
  });
});

describe("eeCost", () => {
  it("tool changer auto most expensive", () => {
    expect(eeCost("tool_changer_auto")).toBeGreaterThan(eeCost("vacuum_suction_cup"));
  });
});

describe("contactless", () => {
  it("no end effectors are contactless", () => {
    expect(contactless("parallel_jaw_gripper")).toBe(false);
    expect(contactless("vacuum_suction_cup")).toBe(false);
  });
});

describe("forFragile", () => {
  it("soft adaptive finger for fragile", () => {
    expect(forFragile("soft_adaptive_finger")).toBe(true);
  });
  it("parallel jaw not for fragile", () => {
    expect(forFragile("parallel_jaw_gripper")).toBe(false);
  });
});

describe("mechanism", () => {
  it("tool changer uses pneumatic lock multi tool", () => {
    expect(mechanism("tool_changer_auto")).toBe("pneumatic_lock_multi_tool_dock_quick_swap_utility");
  });
});

describe("bestUse", () => {
  it("vacuum suction for box handling", () => {
    expect(bestUse("vacuum_suction_cup")).toBe("box_handling_sheet_metal_glass_panel_carton_pick");
  });
});

describe("endEffectorTypes", () => {
  it("returns 5 types", () => {
    expect(endEffectorTypes()).toHaveLength(5);
  });
});
