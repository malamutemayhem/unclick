import { describe, it, expect } from "vitest";
import {
  liftCapacity, speed, ergonomic, versatility,
  vlCost, powered, forSheet, suction,
  bestUse, vacuumLifterTypes,
} from "../vacuum-lifter-calc.js";

describe("liftCapacity", () => {
  it("crane mounted sheet highest lift capacity", () => {
    expect(liftCapacity("crane_mounted_sheet")).toBeGreaterThan(liftCapacity("self_powered_cup"));
  });
});

describe("speed", () => {
  it("cobot integrated fastest", () => {
    expect(speed("cobot_integrated")).toBeGreaterThan(speed("crane_mounted_sheet"));
  });
});

describe("ergonomic", () => {
  it("electric tube most ergonomic", () => {
    expect(ergonomic("electric_tube")).toBeGreaterThan(ergonomic("crane_mounted_sheet"));
  });
});

describe("versatility", () => {
  it("cobot integrated most versatile", () => {
    expect(versatility("cobot_integrated")).toBeGreaterThan(versatility("crane_mounted_sheet"));
  });
});

describe("vlCost", () => {
  it("cobot integrated most expensive", () => {
    expect(vlCost("cobot_integrated")).toBeGreaterThan(vlCost("self_powered_cup"));
  });
});

describe("powered", () => {
  it("electric tube is powered", () => {
    expect(powered("electric_tube")).toBe(true);
  });
  it("self powered cup not powered", () => {
    expect(powered("self_powered_cup")).toBe(false);
  });
});

describe("forSheet", () => {
  it("pneumatic pad for sheet", () => {
    expect(forSheet("pneumatic_pad")).toBe(true);
  });
  it("electric tube not for sheet", () => {
    expect(forSheet("electric_tube")).toBe(false);
  });
});

describe("suction", () => {
  it("cobot integrated uses robot arm end effector", () => {
    expect(suction("cobot_integrated")).toBe("robot_arm_end_effector_vacuum_gripper_vision_pick_place");
  });
});

describe("bestUse", () => {
  it("self powered cup for glass install", () => {
    expect(bestUse("self_powered_cup")).toBe("glass_install_window_tile_field_work_portable_no_power");
  });
});

describe("vacuumLifterTypes", () => {
  it("returns 5 types", () => {
    expect(vacuumLifterTypes()).toHaveLength(5);
  });
});
