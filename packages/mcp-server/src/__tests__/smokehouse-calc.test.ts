import { describe, it, expect } from "vitest";
import {
  tempRangeCelsius, smokingHoursTypical, flavorIntensity,
  moistureRetention, capacityKg, tempControlPrecision,
  fuelType, skillLevel, costEstimate, smokehouseTypes,
} from "../smokehouse-calc.js";

describe("tempRangeCelsius", () => {
  it("pit smoke reaches highest temp", () => {
    expect(tempRangeCelsius("pit_smoke")).toBeGreaterThan(
      tempRangeCelsius("cold_smoke")
    );
  });
});

describe("smokingHoursTypical", () => {
  it("cold smoke takes longest", () => {
    expect(smokingHoursTypical("cold_smoke")).toBeGreaterThan(
      smokingHoursTypical("cabinet")
    );
  });
});

describe("flavorIntensity", () => {
  it("pit smoke has most intense flavor", () => {
    expect(flavorIntensity("pit_smoke")).toBeGreaterThan(
      flavorIntensity("cabinet")
    );
  });
});

describe("moistureRetention", () => {
  it("cold smoke retains most moisture", () => {
    expect(moistureRetention("cold_smoke")).toBeGreaterThan(
      moistureRetention("pit_smoke")
    );
  });
});

describe("capacityKg", () => {
  it("pit smoke has most capacity", () => {
    expect(capacityKg("pit_smoke")).toBeGreaterThan(
      capacityKg("cabinet")
    );
  });
});

describe("tempControlPrecision", () => {
  it("cabinet has best temp control", () => {
    expect(tempControlPrecision("cabinet")).toBeGreaterThan(
      tempControlPrecision("pit_smoke")
    );
  });
});

describe("fuelType", () => {
  it("cabinet uses pellets", () => {
    expect(fuelType("cabinet")).toBe("pellets");
  });
});

describe("skillLevel", () => {
  it("pit smoke needs most skill", () => {
    expect(skillLevel("pit_smoke")).toBeGreaterThan(
      skillLevel("cabinet")
    );
  });
});

describe("costEstimate", () => {
  it("offset is most expensive", () => {
    expect(costEstimate("offset")).toBeGreaterThan(
      costEstimate("pit_smoke")
    );
  });
});

describe("smokehouseTypes", () => {
  it("returns 5 types", () => {
    expect(smokehouseTypes()).toHaveLength(5);
  });
});
