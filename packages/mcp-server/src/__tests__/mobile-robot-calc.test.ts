import { describe, it, expect } from "vitest";
import {
  maneuverability, terrainCapability, payload, endurance,
  mrCost, allTerrain, forInspection, locomotion,
  bestUse, mobileRobotTypes,
} from "../mobile-robot-calc.js";

describe("maneuverability", () => {
  it("omnidirectional mecanum most maneuverable", () => {
    expect(maneuverability("omnidirectional_mecanum")).toBeGreaterThan(maneuverability("tracked_crawler_outdoor"));
  });
});

describe("terrainCapability", () => {
  it("tracked crawler outdoor best terrain capability", () => {
    expect(terrainCapability("tracked_crawler_outdoor")).toBeGreaterThan(terrainCapability("omnidirectional_mecanum"));
  });
});

describe("payload", () => {
  it("tracked crawler outdoor highest payload", () => {
    expect(payload("tracked_crawler_outdoor")).toBeGreaterThan(payload("aerial_drone_uav"));
  });
});

describe("endurance", () => {
  it("differential drive indoor best endurance", () => {
    expect(endurance("differential_drive_indoor")).toBeGreaterThan(endurance("aerial_drone_uav"));
  });
});

describe("mrCost", () => {
  it("legged quadruped most expensive", () => {
    expect(mrCost("legged_quadruped")).toBeGreaterThan(mrCost("differential_drive_indoor"));
  });
});

describe("allTerrain", () => {
  it("tracked crawler is all terrain", () => {
    expect(allTerrain("tracked_crawler_outdoor")).toBe(true);
  });
  it("differential drive not all terrain", () => {
    expect(allTerrain("differential_drive_indoor")).toBe(false);
  });
});

describe("forInspection", () => {
  it("aerial drone for inspection", () => {
    expect(forInspection("aerial_drone_uav")).toBe(true);
  });
  it("differential drive not for inspection", () => {
    expect(forInspection("differential_drive_indoor")).toBe(false);
  });
});

describe("locomotion", () => {
  it("legged quadruped uses four leg dynamic balance", () => {
    expect(locomotion("legged_quadruped")).toBe("four_leg_dynamic_balance_stair_climb_rough_terrain");
  });
});

describe("bestUse", () => {
  it("aerial drone for pipeline powerline inspection", () => {
    expect(bestUse("aerial_drone_uav")).toBe("pipeline_powerline_roof_inspection_mapping_survey");
  });
});

describe("mobileRobotTypes", () => {
  it("returns 5 types", () => {
    expect(mobileRobotTypes()).toHaveLength(5);
  });
});
