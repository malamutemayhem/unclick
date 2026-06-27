import { describe, it, expect } from "vitest";
import {
  accuracy, biasStability, bandwidth, shock,
  imCost, solidState, forNavigation, sensing,
  bestUse, imuTypes,
} from "../imu-type-calc.js";

describe("accuracy", () => {
  it("ring laser gyro highest accuracy", () => {
    expect(accuracy("rlg_ring_laser_gyro")).toBeGreaterThan(accuracy("mems_consumer_6dof"));
  });
});

describe("biasStability", () => {
  it("ring laser gyro best bias stability", () => {
    expect(biasStability("rlg_ring_laser_gyro")).toBeGreaterThan(biasStability("mems_consumer_6dof"));
  });
});

describe("bandwidth", () => {
  it("ring laser gyro high bandwidth", () => {
    expect(bandwidth("rlg_ring_laser_gyro")).toBeGreaterThan(bandwidth("hemispherical_resonator"));
  });
});

describe("shock", () => {
  it("mems consumer best shock resistance", () => {
    expect(shock("mems_consumer_6dof")).toBeGreaterThan(shock("rlg_ring_laser_gyro"));
  });
});

describe("imCost", () => {
  it("ring laser gyro most expensive", () => {
    expect(imCost("rlg_ring_laser_gyro")).toBeGreaterThan(imCost("mems_consumer_6dof"));
  });
});

describe("solidState", () => {
  it("mems consumer is solid state", () => {
    expect(solidState("mems_consumer_6dof")).toBe(true);
  });
  it("ring laser gyro not solid state", () => {
    expect(solidState("rlg_ring_laser_gyro")).toBe(false);
  });
});

describe("forNavigation", () => {
  it("fog for navigation", () => {
    expect(forNavigation("fog_fiber_optic_gyro")).toBe(true);
  });
  it("mems consumer not for navigation", () => {
    expect(forNavigation("mems_consumer_6dof")).toBe(false);
  });
});

describe("sensing", () => {
  it("hemispherical uses coriolis quartz", () => {
    expect(sensing("hemispherical_resonator")).toBe("coriolis_quartz_hemisphere");
  });
});

describe("bestUse", () => {
  it("fog best for ship ins north finding", () => {
    expect(bestUse("fog_fiber_optic_gyro")).toBe("ship_ins_north_finding");
  });
});

describe("imuTypes", () => {
  it("returns 5 types", () => {
    expect(imuTypes()).toHaveLength(5);
  });
});
