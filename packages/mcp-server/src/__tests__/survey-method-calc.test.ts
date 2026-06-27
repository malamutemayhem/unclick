import { describe, it, expect } from "vitest";
import {
  accuracyCm, rangeKm, speedRating,
  equipmentCost, dataVolume, remote,
  creates3dModel, bestApplication, crewSizeRequired, surveyMethods,
} from "../survey-method-calc.js";

describe("accuracyCm", () => {
  it("total station is most accurate", () => {
    expect(accuracyCm("total_station")).toBeLessThan(
      accuracyCm("photogrammetry")
    );
  });
});

describe("rangeKm", () => {
  it("photogrammetry has longest range", () => {
    expect(rangeKm("photogrammetry")).toBeGreaterThan(
      rangeKm("total_station")
    );
  });
});

describe("speedRating", () => {
  it("lidar is fastest", () => {
    expect(speedRating("lidar")).toBeGreaterThan(
      speedRating("triangulation")
    );
  });
});

describe("equipmentCost", () => {
  it("lidar costs most", () => {
    expect(equipmentCost("lidar")).toBeGreaterThan(
      equipmentCost("triangulation")
    );
  });
});

describe("dataVolume", () => {
  it("lidar generates most data", () => {
    expect(dataVolume("lidar")).toBeGreaterThan(
      dataVolume("triangulation")
    );
  });
});

describe("remote", () => {
  it("lidar is remote", () => {
    expect(remote("lidar")).toBe(true);
  });
  it("triangulation is not", () => {
    expect(remote("triangulation")).toBe(false);
  });
});

describe("creates3dModel", () => {
  it("lidar creates 3d model", () => {
    expect(creates3dModel("lidar")).toBe(true);
  });
  it("triangulation does not", () => {
    expect(creates3dModel("triangulation")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("lidar for terrain modeling", () => {
    expect(bestApplication("lidar")).toBe("terrain_modeling");
  });
});

describe("crewSizeRequired", () => {
  it("triangulation needs largest crew", () => {
    expect(crewSizeRequired("triangulation")).toBeGreaterThan(
      crewSizeRequired("lidar")
    );
  });
});

describe("surveyMethods", () => {
  it("returns 5 types", () => {
    expect(surveyMethods()).toHaveLength(5);
  });
});
