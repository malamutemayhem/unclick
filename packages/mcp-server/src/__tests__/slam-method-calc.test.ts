import { describe, it, expect } from "vitest";
import {
  accuracy, speed, mapQuality, loopClosure,
  slamCost, gpuRequired, forOutdoor, frontend,
  bestUse, slamMethods,
} from "../slam-method-calc.js";

describe("accuracy", () => {
  it("graph based pose most accurate", () => {
    expect(accuracy("graph_based_pose")).toBeGreaterThan(accuracy("lidar_2d_scan_match"));
  });
});

describe("speed", () => {
  it("lidar 2d scan match fastest", () => {
    expect(speed("lidar_2d_scan_match")).toBeGreaterThan(speed("graph_based_pose"));
  });
});

describe("mapQuality", () => {
  it("graph based pose best map quality", () => {
    expect(mapQuality("graph_based_pose")).toBeGreaterThan(mapQuality("lidar_2d_scan_match"));
  });
});

describe("loopClosure", () => {
  it("graph based pose best loop closure", () => {
    expect(loopClosure("graph_based_pose")).toBeGreaterThan(loopClosure("lidar_2d_scan_match"));
  });
});

describe("slamCost", () => {
  it("graph based pose most expensive", () => {
    expect(slamCost("graph_based_pose")).toBeGreaterThan(slamCost("lidar_2d_scan_match"));
  });
});

describe("gpuRequired", () => {
  it("graph based pose requires gpu", () => {
    expect(gpuRequired("graph_based_pose")).toBe(true);
  });
  it("lidar 2d scan match no gpu required", () => {
    expect(gpuRequired("lidar_2d_scan_match")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("lidar 3d loam for outdoor", () => {
    expect(forOutdoor("lidar_3d_loam")).toBe(true);
  });
  it("lidar 2d scan match not for outdoor", () => {
    expect(forOutdoor("lidar_2d_scan_match")).toBe(false);
  });
});

describe("frontend", () => {
  it("visual orb slam uses orb feature track ba", () => {
    expect(frontend("visual_orb_slam")).toBe("orb_feature_track_ba");
  });
});

describe("bestUse", () => {
  it("visual inertial vins best for drone gps denied nav", () => {
    expect(bestUse("visual_inertial_vins")).toBe("drone_gps_denied_nav");
  });
});

describe("slamMethods", () => {
  it("returns 5 types", () => {
    expect(slamMethods()).toHaveLength(5);
  });
});
