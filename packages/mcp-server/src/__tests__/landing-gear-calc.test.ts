import { describe, it, expect } from "vitest";
import {
  groundStability, crosswindTolerance, dragScore,
  maintenanceComplexity, weightPenalty, retractable,
  waterCapable, typicalAircraft, surfaceRequirement, landingGears,
} from "../landing-gear-calc.js";

describe("groundStability", () => {
  it("tricycle most stable", () => {
    expect(groundStability("tricycle")).toBeGreaterThan(
      groundStability("tailwheel")
    );
  });
});

describe("crosswindTolerance", () => {
  it("tricycle best crosswind handling", () => {
    expect(crosswindTolerance("tricycle")).toBeGreaterThan(
      crosswindTolerance("float")
    );
  });
});

describe("dragScore", () => {
  it("float highest drag", () => {
    expect(dragScore("float")).toBeGreaterThan(
      dragScore("tricycle")
    );
  });
});

describe("maintenanceComplexity", () => {
  it("float most maintenance", () => {
    expect(maintenanceComplexity("float")).toBeGreaterThan(
      maintenanceComplexity("tailwheel")
    );
  });
});

describe("weightPenalty", () => {
  it("float heaviest penalty", () => {
    expect(weightPenalty("float")).toBeGreaterThan(
      weightPenalty("tailwheel")
    );
  });
});

describe("retractable", () => {
  it("tricycle is retractable", () => {
    expect(retractable("tricycle")).toBe(true);
  });
  it("float is not", () => {
    expect(retractable("float")).toBe(false);
  });
});

describe("waterCapable", () => {
  it("float is water capable", () => {
    expect(waterCapable("float")).toBe(true);
  });
  it("tricycle is not", () => {
    expect(waterCapable("tricycle")).toBe(false);
  });
});

describe("typicalAircraft", () => {
  it("tricycle for commercial airliner", () => {
    expect(typicalAircraft("tricycle")).toBe("commercial_airliner");
  });
});

describe("surfaceRequirement", () => {
  it("float needs calm water", () => {
    expect(surfaceRequirement("float")).toBe("calm_water");
  });
});

describe("landingGears", () => {
  it("returns 5 types", () => {
    expect(landingGears()).toHaveLength(5);
  });
});
