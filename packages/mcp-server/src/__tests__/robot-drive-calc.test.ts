import { describe, it, expect } from "vitest";
import {
  maneuver, speed, terrainAbility, efficiency,
  rdCost, holonomic, forIndoor, locomotion,
  bestUse, robotDrives,
} from "../robot-drive-calc.js";

describe("maneuver", () => {
  it("mecanum best maneuver", () => {
    expect(maneuver("mecanum_omnidirect")).toBeGreaterThan(maneuver("ackermann_steering"));
  });
});

describe("speed", () => {
  it("ackermann fastest", () => {
    expect(speed("ackermann_steering")).toBeGreaterThan(speed("legged_quadruped"));
  });
});

describe("terrainAbility", () => {
  it("tracked skid steer best terrain", () => {
    expect(terrainAbility("tracked_skid_steer")).toBeGreaterThan(terrainAbility("mecanum_omnidirect"));
  });
});

describe("efficiency", () => {
  it("ackermann most efficient", () => {
    expect(efficiency("ackermann_steering")).toBeGreaterThan(efficiency("legged_quadruped"));
  });
});

describe("rdCost", () => {
  it("legged quadruped most expensive", () => {
    expect(rdCost("legged_quadruped")).toBeGreaterThan(rdCost("differential_two_wheel"));
  });
});

describe("holonomic", () => {
  it("mecanum is holonomic", () => {
    expect(holonomic("mecanum_omnidirect")).toBe(true);
  });
  it("differential not holonomic", () => {
    expect(holonomic("differential_two_wheel")).toBe(false);
  });
});

describe("forIndoor", () => {
  it("differential for indoor", () => {
    expect(forIndoor("differential_two_wheel")).toBe(true);
  });
  it("tracked not for indoor", () => {
    expect(forIndoor("tracked_skid_steer")).toBe(false);
  });
});

describe("locomotion", () => {
  it("legged uses four leg dynamic gait ctrl", () => {
    expect(locomotion("legged_quadruped")).toBe("four_leg_dynamic_gait_ctrl");
  });
});

describe("bestUse", () => {
  it("mecanum best for factory floor omnidirect", () => {
    expect(bestUse("mecanum_omnidirect")).toBe("factory_floor_omnidirect_amr");
  });
});

describe("robotDrives", () => {
  it("returns 5 types", () => {
    expect(robotDrives()).toHaveLength(5);
  });
});
