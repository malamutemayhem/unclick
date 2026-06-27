import { describe, it, expect } from "vitest";
import {
  accuracy, speed, nonlinear, robustness,
  kfCost, gaussianReq, forNavigation, propagation,
  bestUse, kalmanFilters,
} from "../kalman-filter-calc.js";

describe("accuracy", () => {
  it("particle pf most accurate", () => {
    expect(accuracy("particle_pf")).toBeGreaterThan(accuracy("standard_linear"));
  });
});

describe("speed", () => {
  it("standard linear fastest", () => {
    expect(speed("standard_linear")).toBeGreaterThan(speed("particle_pf"));
  });
});

describe("nonlinear", () => {
  it("particle pf handles nonlinearity best", () => {
    expect(nonlinear("particle_pf")).toBeGreaterThan(nonlinear("extended_ekf"));
  });
});

describe("robustness", () => {
  it("particle pf most robust", () => {
    expect(robustness("particle_pf")).toBeGreaterThan(robustness("extended_ekf"));
  });
});

describe("kfCost", () => {
  it("particle pf most expensive", () => {
    expect(kfCost("particle_pf")).toBeGreaterThan(kfCost("standard_linear"));
  });
});

describe("gaussianReq", () => {
  it("standard linear requires gaussian", () => {
    expect(gaussianReq("standard_linear")).toBe(true);
  });
  it("particle pf no gaussian requirement", () => {
    expect(gaussianReq("particle_pf")).toBe(false);
  });
});

describe("forNavigation", () => {
  it("extended ekf for navigation", () => {
    expect(forNavigation("extended_ekf")).toBe(true);
  });
  it("standard linear not for navigation", () => {
    expect(forNavigation("standard_linear")).toBe(false);
  });
});

describe("propagation", () => {
  it("unscented ukf uses sigma point transform", () => {
    expect(propagation("unscented_ukf")).toBe("sigma_point_transform");
  });
});

describe("bestUse", () => {
  it("particle pf best for robot localization map", () => {
    expect(bestUse("particle_pf")).toBe("robot_localization_map");
  });
});

describe("kalmanFilters", () => {
  it("returns 5 types", () => {
    expect(kalmanFilters()).toHaveLength(5);
  });
});
