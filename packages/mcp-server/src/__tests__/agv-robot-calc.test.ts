import { describe, it, expect } from "vitest";
import {
  payload, speed, navigation, flexibility,
  arCost, autonomous, forWarehouse, guidance,
  bestUse, agvRobotTypes,
} from "../agv-robot-calc.js";

describe("payload", () => {
  it("heavy payload highest capacity", () => {
    expect(payload("heavy_payload")).toBeGreaterThan(payload("amr_collaborative"));
  });
});

describe("speed", () => {
  it("towing tugger fastest", () => {
    expect(speed("towing_tugger")).toBeGreaterThan(speed("heavy_payload"));
  });
});

describe("navigation", () => {
  it("amr collaborative best navigation", () => {
    expect(navigation("amr_collaborative")).toBeGreaterThan(navigation("unit_load_agv"));
  });
});

describe("flexibility", () => {
  it("amr collaborative most flexible", () => {
    expect(flexibility("amr_collaborative")).toBeGreaterThan(flexibility("heavy_payload"));
  });
});

describe("arCost", () => {
  it("heavy payload most expensive", () => {
    expect(arCost("heavy_payload")).toBeGreaterThan(arCost("towing_tugger"));
  });
});

describe("autonomous", () => {
  it("amr collaborative is autonomous", () => {
    expect(autonomous("amr_collaborative")).toBe(true);
  });
  it("unit load agv not autonomous", () => {
    expect(autonomous("unit_load_agv")).toBe(false);
  });
});

describe("forWarehouse", () => {
  it("amr collaborative for warehouse", () => {
    expect(forWarehouse("amr_collaborative")).toBe(true);
  });
  it("heavy payload not for warehouse", () => {
    expect(forWarehouse("heavy_payload")).toBe(false);
  });
});

describe("guidance", () => {
  it("amr collaborative uses slam lidar", () => {
    expect(guidance("amr_collaborative")).toBe("slam_lidar_camera_dynamic_path_obstacle_avoidance_mapping");
  });
});

describe("bestUse", () => {
  it("towing tugger for assembly line supply", () => {
    expect(bestUse("towing_tugger")).toBe("assembly_line_supply_milk_run_parts_delivery_multi_station");
  });
});

describe("agvRobotTypes", () => {
  it("returns 5 types", () => {
    expect(agvRobotTypes()).toHaveLength(5);
  });
});
