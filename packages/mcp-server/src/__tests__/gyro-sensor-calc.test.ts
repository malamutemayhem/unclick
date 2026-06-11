import { describe, it, expect } from "vitest";
import {
  biasStability, bandwidth, scaleAccuracy, sizeWeight,
  gyroCost, solidState, forNavigation, sensingPrinciple,
  bestUse, gyroSensors,
} from "../gyro-sensor-calc.js";

describe("biasStability", () => {
  it("ring laser gyro best bias stability", () => {
    expect(biasStability("ring_laser_gyro")).toBeGreaterThan(biasStability("mems_vibrating"));
  });
});

describe("bandwidth", () => {
  it("ring laser gyro widest bandwidth", () => {
    expect(bandwidth("ring_laser_gyro")).toBeGreaterThan(bandwidth("dtg_dynamically_tuned"));
  });
});

describe("scaleAccuracy", () => {
  it("ring laser gyro best scale accuracy", () => {
    expect(scaleAccuracy("ring_laser_gyro")).toBeGreaterThan(scaleAccuracy("mems_vibrating"));
  });
});

describe("sizeWeight", () => {
  it("mems vibrating smallest size weight", () => {
    expect(sizeWeight("mems_vibrating")).toBeGreaterThan(sizeWeight("ring_laser_gyro"));
  });
});

describe("gyroCost", () => {
  it("ring laser gyro most expensive", () => {
    expect(gyroCost("ring_laser_gyro")).toBeGreaterThan(gyroCost("mems_vibrating"));
  });
});

describe("solidState", () => {
  it("mems vibrating is solid state", () => {
    expect(solidState("mems_vibrating")).toBe(true);
  });
  it("dtg dynamically tuned not solid state", () => {
    expect(solidState("dtg_dynamically_tuned")).toBe(false);
  });
});

describe("forNavigation", () => {
  it("ring laser gyro is for navigation", () => {
    expect(forNavigation("ring_laser_gyro")).toBe(true);
  });
  it("mems vibrating not for navigation", () => {
    expect(forNavigation("mems_vibrating")).toBe(false);
  });
});

describe("sensingPrinciple", () => {
  it("hemispherical res uses wine glass resonance", () => {
    expect(sensingPrinciple("hemispherical_res")).toBe("wine_glass_resonance");
  });
});

describe("bestUse", () => {
  it("mems vibrating best for consumer imu motion", () => {
    expect(bestUse("mems_vibrating")).toBe("consumer_imu_motion");
  });
});

describe("gyroSensors", () => {
  it("returns 5 types", () => {
    expect(gyroSensors()).toHaveLength(5);
  });
});
