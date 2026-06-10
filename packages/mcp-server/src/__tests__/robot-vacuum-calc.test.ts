import { describe, it, expect } from "vitest";
import {
  suctionPower, navigationAccuracy, batteryRuntime, noiseLevel,
  unitPrice, canMop, autoEmptyDock, mappingTech,
  bestFloorType, robotVacuums,
} from "../robot-vacuum-calc.js";

describe("suctionPower", () => {
  it("self emptying strongest suction", () => {
    expect(suctionPower("self_emptying")).toBeGreaterThan(suctionPower("gyro_basic"));
  });
});

describe("navigationAccuracy", () => {
  it("lidar nav most accurate", () => {
    expect(navigationAccuracy("lidar_nav")).toBeGreaterThan(navigationAccuracy("gyro_basic"));
  });
});

describe("batteryRuntime", () => {
  it("lidar nav longest runtime", () => {
    expect(batteryRuntime("lidar_nav")).toBeGreaterThan(batteryRuntime("mopping_hybrid"));
  });
});

describe("noiseLevel", () => {
  it("self emptying noisiest", () => {
    expect(noiseLevel("self_emptying")).toBeGreaterThan(noiseLevel("mopping_hybrid"));
  });
});

describe("unitPrice", () => {
  it("self emptying most expensive", () => {
    expect(unitPrice("self_emptying")).toBeGreaterThan(unitPrice("gyro_basic"));
  });
});

describe("canMop", () => {
  it("mopping hybrid can mop", () => {
    expect(canMop("mopping_hybrid")).toBe(true);
  });
  it("lidar nav cannot", () => {
    expect(canMop("lidar_nav")).toBe(false);
  });
});

describe("autoEmptyDock", () => {
  it("self emptying has auto empty dock", () => {
    expect(autoEmptyDock("self_emptying")).toBe(true);
  });
  it("camera nav does not", () => {
    expect(autoEmptyDock("camera_nav")).toBe(false);
  });
});

describe("mappingTech", () => {
  it("lidar nav uses rotating laser distance scan", () => {
    expect(mappingTech("lidar_nav")).toBe("rotating_laser_distance_scan");
  });
});

describe("bestFloorType", () => {
  it("mopping hybrid for hardwood tile combo", () => {
    expect(bestFloorType("mopping_hybrid")).toBe("hardwood_tile_combo");
  });
});

describe("robotVacuums", () => {
  it("returns 5 types", () => {
    expect(robotVacuums()).toHaveLength(5);
  });
});
