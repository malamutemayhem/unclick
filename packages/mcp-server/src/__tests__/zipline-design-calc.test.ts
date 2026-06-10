import { describe, it, expect } from "vitest";
import {
  maxSpeed, safetyRating, installCost, maintenanceFrequency,
  riderCapacity, selfBraking, allWeatherOperation, brakingMethod,
  bestVenue, ziplineDesigns,
} from "../zipline-design-calc.js";

describe("maxSpeed", () => {
  it("dual cable fastest", () => {
    expect(maxSpeed("dual_cable")).toBeGreaterThan(maxSpeed("pendulum"));
  });
});

describe("safetyRating", () => {
  it("dual cable safest", () => {
    expect(safetyRating("dual_cable")).toBeGreaterThan(safetyRating("gravity"));
  });
});

describe("installCost", () => {
  it("dual cable most expensive", () => {
    expect(installCost("dual_cable")).toBeGreaterThan(installCost("gravity"));
  });
});

describe("maintenanceFrequency", () => {
  it("dual cable most maintenance", () => {
    expect(maintenanceFrequency("dual_cable")).toBeGreaterThan(maintenanceFrequency("gravity"));
  });
});

describe("riderCapacity", () => {
  it("dual cable highest capacity", () => {
    expect(riderCapacity("dual_cable")).toBeGreaterThan(riderCapacity("pendulum"));
  });
});

describe("selfBraking", () => {
  it("spring brake is self braking", () => {
    expect(selfBraking("spring_brake")).toBe(true);
  });
  it("gravity is not", () => {
    expect(selfBraking("gravity")).toBe(false);
  });
});

describe("allWeatherOperation", () => {
  it("gravity is all weather", () => {
    expect(allWeatherOperation("gravity")).toBe(true);
  });
  it("pendulum is not", () => {
    expect(allWeatherOperation("pendulum")).toBe(false);
  });
});

describe("brakingMethod", () => {
  it("dual cable uses magnetic eddy current", () => {
    expect(brakingMethod("dual_cable")).toBe("magnetic_eddy_current");
  });
});

describe("bestVenue", () => {
  it("trolley for canopy eco tour", () => {
    expect(bestVenue("trolley")).toBe("canopy_eco_tour");
  });
});

describe("ziplineDesigns", () => {
  it("returns 5 designs", () => {
    expect(ziplineDesigns()).toHaveLength(5);
  });
});
