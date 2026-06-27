import { describe, it, expect } from "vitest";
import {
  flexibility, payload, navAccuracy, throughput,
  agCost, autonomous, forOutdoor, guidance,
  bestUse, agvVehicleTypes,
} from "../agv-vehicle-calc.js";

describe("flexibility", () => {
  it("vision guided amr most flexible", () => {
    expect(flexibility("vision_guided_amr")).toBeGreaterThan(flexibility("rail_guided_agv"));
  });
});

describe("payload", () => {
  it("rail guided agv highest payload", () => {
    expect(payload("rail_guided_agv")).toBeGreaterThan(payload("vision_guided_amr"));
  });
});

describe("navAccuracy", () => {
  it("rail guided agv best navigation accuracy", () => {
    expect(navAccuracy("rail_guided_agv")).toBeGreaterThan(navAccuracy("magnetic_tape_guide"));
  });
});

describe("throughput", () => {
  it("vision guided amr highest throughput", () => {
    expect(throughput("vision_guided_amr")).toBeGreaterThan(throughput("magnetic_tape_guide"));
  });
});

describe("agCost", () => {
  it("rail guided agv most expensive", () => {
    expect(agCost("rail_guided_agv")).toBeGreaterThan(agCost("magnetic_tape_guide"));
  });
});

describe("autonomous", () => {
  it("vision guided amr is autonomous", () => {
    expect(autonomous("vision_guided_amr")).toBe(true);
  });
  it("laser guided agv not autonomous", () => {
    expect(autonomous("laser_guided_agv")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("inertial nav agv for outdoor", () => {
    expect(forOutdoor("inertial_nav_agv")).toBe(true);
  });
  it("vision guided amr not for outdoor", () => {
    expect(forOutdoor("vision_guided_amr")).toBe(false);
  });
});

describe("guidance", () => {
  it("magnetic tape uses floor path sensor", () => {
    expect(guidance("magnetic_tape_guide")).toBe("magnetic_tape_floor_path_sensor_follow_strip");
  });
});

describe("bestUse", () => {
  it("rail guided for steel mill foundry", () => {
    expect(bestUse("rail_guided_agv")).toBe("steel_mill_foundry_extreme_heavy_load_fixed_path");
  });
});

describe("agvVehicleTypes", () => {
  it("returns 5 types", () => {
    expect(agvVehicleTypes()).toHaveLength(5);
  });
});
