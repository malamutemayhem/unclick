import { describe, it, expect } from "vitest";
import {
  cruiseSpeedKmh, rangeKm, passengerCapacity,
  fuelEfficiency, pilotLicenseHours, verticalTakeoff,
  enginePowered, bestApplication, operatingCostPerHour, aircraftTypes,
} from "../aircraft-type-calc.js";

describe("cruiseSpeedKmh", () => {
  it("jet is fastest", () => {
    expect(cruiseSpeedKmh("jet")).toBeGreaterThan(
      cruiseSpeedKmh("glider")
    );
  });
});

describe("rangeKm", () => {
  it("jet has longest range", () => {
    expect(rangeKm("jet")).toBeGreaterThan(
      rangeKm("helicopter")
    );
  });
});

describe("passengerCapacity", () => {
  it("jet carries most passengers", () => {
    expect(passengerCapacity("jet")).toBeGreaterThan(
      passengerCapacity("single_prop")
    );
  });
});

describe("fuelEfficiency", () => {
  it("glider is most fuel efficient", () => {
    expect(fuelEfficiency("glider")).toBeGreaterThan(
      fuelEfficiency("jet")
    );
  });
});

describe("pilotLicenseHours", () => {
  it("jet needs most training", () => {
    expect(pilotLicenseHours("jet")).toBeGreaterThan(
      pilotLicenseHours("glider")
    );
  });
});

describe("verticalTakeoff", () => {
  it("helicopter has vertical takeoff", () => {
    expect(verticalTakeoff("helicopter")).toBe(true);
  });
  it("jet does not", () => {
    expect(verticalTakeoff("jet")).toBe(false);
  });
});

describe("enginePowered", () => {
  it("jet is engine powered", () => {
    expect(enginePowered("jet")).toBe(true);
  });
  it("glider is not", () => {
    expect(enginePowered("glider")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("helicopter for emergency", () => {
    expect(bestApplication("helicopter")).toBe("emergency");
  });
});

describe("operatingCostPerHour", () => {
  it("jet has highest operating cost", () => {
    expect(operatingCostPerHour("jet")).toBeGreaterThan(
      operatingCostPerHour("glider")
    );
  });
});

describe("aircraftTypes", () => {
  it("returns 5 types", () => {
    expect(aircraftTypes()).toHaveLength(5);
  });
});
