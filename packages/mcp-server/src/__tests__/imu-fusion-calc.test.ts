import { describe, it, expect } from "vitest";
import {
  accuracy, speed, driftReject, magRequired,
  fusCost, adaptiveGain, forDrone, algorithm,
  bestUse, imuFusions,
} from "../imu-fusion-calc.js";

describe("accuracy", () => {
  it("ukf full state most accurate", () => {
    expect(accuracy("ukf_full_state")).toBeGreaterThan(accuracy("complementary_simple"));
  });
});

describe("speed", () => {
  it("complementary simple fastest", () => {
    expect(speed("complementary_simple")).toBeGreaterThan(speed("ukf_full_state"));
  });
});

describe("driftReject", () => {
  it("ukf full state best drift rejection", () => {
    expect(driftReject("ukf_full_state")).toBeGreaterThan(driftReject("complementary_simple"));
  });
});

describe("magRequired", () => {
  it("ukf full state most mag dependent", () => {
    expect(magRequired("ukf_full_state")).toBeGreaterThan(magRequired("complementary_simple"));
  });
});

describe("fusCost", () => {
  it("ukf full state most expensive", () => {
    expect(fusCost("ukf_full_state")).toBeGreaterThan(fusCost("complementary_simple"));
  });
});

describe("adaptiveGain", () => {
  it("madgwick gradient has adaptive gain", () => {
    expect(adaptiveGain("madgwick_gradient")).toBe(true);
  });
  it("complementary simple no adaptive gain", () => {
    expect(adaptiveGain("complementary_simple")).toBe(false);
  });
});

describe("forDrone", () => {
  it("ekf quaternion for drone", () => {
    expect(forDrone("ekf_quaternion")).toBe(true);
  });
  it("complementary simple not for drone", () => {
    expect(forDrone("complementary_simple")).toBe(false);
  });
});

describe("algorithm", () => {
  it("ukf full state uses unscented 15 state", () => {
    expect(algorithm("ukf_full_state")).toBe("unscented_15_state");
  });
});

describe("bestUse", () => {
  it("mahony pi best for small quadrotor ahrs", () => {
    expect(bestUse("mahony_pi")).toBe("small_quadrotor_ahrs");
  });
});

describe("imuFusions", () => {
  it("returns 5 types", () => {
    expect(imuFusions()).toHaveLength(5);
  });
});
