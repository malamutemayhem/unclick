import { describe, it, expect } from "vitest";
import {
  tractionScore, handlingBalance, fuelEfficiency,
  manufacturingCost, weightDistribution, understeerTendency,
  offRoadCapable, typicalVehicle, driveshaftConfig, drivetrainTypes,
} from "../drivetrain-type-calc.js";

describe("tractionScore", () => {
  it("four_wd best traction", () => {
    expect(tractionScore("four_wd")).toBeGreaterThan(
      tractionScore("rwd")
    );
  });
});

describe("handlingBalance", () => {
  it("mid_engine_rwd best handling", () => {
    expect(handlingBalance("mid_engine_rwd")).toBeGreaterThan(
      handlingBalance("fwd")
    );
  });
});

describe("fuelEfficiency", () => {
  it("fwd most fuel efficient", () => {
    expect(fuelEfficiency("fwd")).toBeGreaterThan(
      fuelEfficiency("four_wd")
    );
  });
});

describe("manufacturingCost", () => {
  it("mid_engine_rwd most expensive", () => {
    expect(manufacturingCost("mid_engine_rwd")).toBeGreaterThan(
      manufacturingCost("fwd")
    );
  });
});

describe("weightDistribution", () => {
  it("mid_engine_rwd best distribution", () => {
    expect(weightDistribution("mid_engine_rwd")).toBeGreaterThan(
      weightDistribution("fwd")
    );
  });
});

describe("understeerTendency", () => {
  it("fwd tends to understeer", () => {
    expect(understeerTendency("fwd")).toBe(true);
  });
  it("rwd does not", () => {
    expect(understeerTendency("rwd")).toBe(false);
  });
});

describe("offRoadCapable", () => {
  it("four_wd is offroad capable", () => {
    expect(offRoadCapable("four_wd")).toBe(true);
  });
  it("fwd is not", () => {
    expect(offRoadCapable("fwd")).toBe(false);
  });
});

describe("typicalVehicle", () => {
  it("mid_engine_rwd is supercar", () => {
    expect(typicalVehicle("mid_engine_rwd")).toBe("supercar");
  });
});

describe("driveshaftConfig", () => {
  it("fwd uses transaxle", () => {
    expect(driveshaftConfig("fwd")).toBe("transaxle");
  });
});

describe("drivetrainTypes", () => {
  it("returns 5 types", () => {
    expect(drivetrainTypes()).toHaveLength(5);
  });
});
