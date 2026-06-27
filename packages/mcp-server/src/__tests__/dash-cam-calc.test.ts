import { describe, it, expect } from "vitest";
import {
  videoResolution, fieldOfView, nightQuality, installEase,
  camCost, parkingMode, cloudUpload, storageType,
  bestDriver, dashCams,
} from "../dash-cam-calc.js";

describe("videoResolution", () => {
  it("four k premium highest resolution", () => {
    expect(videoResolution("four_k_premium")).toBeGreaterThan(videoResolution("single_front"));
  });
});

describe("fieldOfView", () => {
  it("dual front rear widest field of view", () => {
    expect(fieldOfView("dual_front_rear")).toBeGreaterThan(fieldOfView("single_front"));
  });
});

describe("nightQuality", () => {
  it("four k premium best night quality", () => {
    expect(nightQuality("four_k_premium")).toBeGreaterThan(nightQuality("single_front"));
  });
});

describe("installEase", () => {
  it("single front easiest install", () => {
    expect(installEase("single_front")).toBeGreaterThan(installEase("fleet_gps"));
  });
});

describe("camCost", () => {
  it("fleet gps most expensive", () => {
    expect(camCost("fleet_gps")).toBeGreaterThan(camCost("single_front"));
  });
});

describe("parkingMode", () => {
  it("dual front rear has parking mode", () => {
    expect(parkingMode("dual_front_rear")).toBe(true);
  });
  it("single front does not", () => {
    expect(parkingMode("single_front")).toBe(false);
  });
});

describe("cloudUpload", () => {
  it("fleet gps has cloud upload", () => {
    expect(cloudUpload("fleet_gps")).toBe(true);
  });
  it("dual front rear does not", () => {
    expect(cloudUpload("dual_front_rear")).toBe(false);
  });
});

describe("storageType", () => {
  it("fleet gps uses ssd cloud backup lte", () => {
    expect(storageType("fleet_gps")).toBe("ssd_cloud_backup_lte");
  });
});

describe("bestDriver", () => {
  it("dual front rear for rideshare full coverage", () => {
    expect(bestDriver("dual_front_rear")).toBe("rideshare_full_coverage");
  });
});

describe("dashCams", () => {
  it("returns 5 types", () => {
    expect(dashCams()).toHaveLength(5);
  });
});
