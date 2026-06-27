import { describe, it, expect } from "vitest";
import {
  liftHeight, loadCapacity, platformSize, cycleSpeed,
  slCost, mobile, forOutdoor, mechanism,
  bestUse, scissorLiftTypes,
} from "../scissor-lift-calc.js";

describe("liftHeight", () => {
  it("diesel rough terrain highest lift", () => {
    expect(liftHeight("diesel_rough_terrain")).toBeGreaterThan(liftHeight("dock_leveler_pit"));
  });
});

describe("loadCapacity", () => {
  it("dock leveler pit highest load capacity", () => {
    expect(loadCapacity("dock_leveler_pit")).toBeGreaterThan(loadCapacity("pneumatic_clean_room"));
  });
});

describe("platformSize", () => {
  it("diesel rough terrain largest platform", () => {
    expect(platformSize("diesel_rough_terrain")).toBeGreaterThan(platformSize("pneumatic_clean_room"));
  });
});

describe("cycleSpeed", () => {
  it("pneumatic clean room fastest cycle", () => {
    expect(cycleSpeed("pneumatic_clean_room")).toBeGreaterThan(cycleSpeed("diesel_rough_terrain"));
  });
});

describe("slCost", () => {
  it("diesel rough terrain most expensive", () => {
    expect(slCost("diesel_rough_terrain")).toBeGreaterThan(slCost("dock_leveler_pit"));
  });
});

describe("mobile", () => {
  it("electric mobile slab is mobile", () => {
    expect(mobile("electric_mobile_slab")).toBe(true);
  });
  it("hydraulic stationary not mobile", () => {
    expect(mobile("hydraulic_stationary")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("diesel rough terrain for outdoor", () => {
    expect(forOutdoor("diesel_rough_terrain")).toBe(true);
  });
  it("electric mobile slab not for outdoor", () => {
    expect(forOutdoor("electric_mobile_slab")).toBe(false);
  });
});

describe("mechanism", () => {
  it("pneumatic uses air bag bellows", () => {
    expect(mechanism("pneumatic_clean_room")).toBe("air_bag_bellows_multi_stage_oil_free_clean_lift");
  });
});

describe("bestUse", () => {
  it("dock leveler for loading dock", () => {
    expect(bestUse("dock_leveler_pit")).toBe("loading_dock_truck_height_transition_forklift_access");
  });
});

describe("scissorLiftTypes", () => {
  it("returns 5 types", () => {
    expect(scissorLiftTypes()).toHaveLength(5);
  });
});
