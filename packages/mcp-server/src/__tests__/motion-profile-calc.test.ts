import { describe, it, expect } from "vitest";
import {
  smoothness, speed, accuracy, computeLoad,
  mpCost, jerkLimited, forCnc, shape,
  bestUse, motionProfiles,
} from "../motion-profile-calc.js";

describe("smoothness", () => {
  it("polynomial 5th smoothest", () => {
    expect(smoothness("polynomial_5th")).toBeGreaterThan(smoothness("trapezoidal_vel"));
  });
});

describe("speed", () => {
  it("minimum time opt fastest", () => {
    expect(speed("minimum_time_opt")).toBeGreaterThan(speed("polynomial_5th"));
  });
});

describe("accuracy", () => {
  it("polynomial 5th most accurate", () => {
    expect(accuracy("polynomial_5th")).toBeGreaterThan(accuracy("trapezoidal_vel"));
  });
});

describe("computeLoad", () => {
  it("trapezoidal vel lightest compute", () => {
    expect(computeLoad("trapezoidal_vel")).toBeGreaterThan(computeLoad("minimum_time_opt"));
  });
});

describe("mpCost", () => {
  it("minimum time opt most expensive", () => {
    expect(mpCost("minimum_time_opt")).toBeGreaterThan(mpCost("trapezoidal_vel"));
  });
});

describe("jerkLimited", () => {
  it("s curve jerk is jerk limited", () => {
    expect(jerkLimited("s_curve_jerk")).toBe(true);
  });
  it("trapezoidal vel not jerk limited", () => {
    expect(jerkLimited("trapezoidal_vel")).toBe(false);
  });
});

describe("forCnc", () => {
  it("s curve jerk for cnc", () => {
    expect(forCnc("s_curve_jerk")).toBe(true);
  });
  it("polynomial 5th not for cnc", () => {
    expect(forCnc("polynomial_5th")).toBe(false);
  });
});

describe("shape", () => {
  it("minimum time opt uses bang bang time optimal", () => {
    expect(shape("minimum_time_opt")).toBe("bang_bang_time_optimal");
  });
});

describe("bestUse", () => {
  it("s curve jerk best for industrial robot joint", () => {
    expect(bestUse("s_curve_jerk")).toBe("industrial_robot_joint");
  });
});

describe("motionProfiles", () => {
  it("returns 5 types", () => {
    expect(motionProfiles()).toHaveLength(5);
  });
});
