import { describe, it, expect } from "vitest";
import {
  speedRating, maxFloors, energyEfficiency, installCost,
  loadCapacity, requiresMachineRoom, residentialUse, driveSystem,
  typicalBuilding, elevatorTypes,
} from "../elevator-type-calc.js";

describe("speedRating", () => {
  it("traction fastest", () => {
    expect(speedRating("traction")).toBeGreaterThan(speedRating("hydraulic"));
  });
});

describe("maxFloors", () => {
  it("traction serves most floors", () => {
    expect(maxFloors("traction")).toBeGreaterThan(maxFloors("pneumatic"));
  });
});

describe("energyEfficiency", () => {
  it("machine roomless most efficient", () => {
    expect(energyEfficiency("machine_roomless")).toBeGreaterThan(
      energyEfficiency("hydraulic")
    );
  });
});

describe("installCost", () => {
  it("pneumatic most expensive to install", () => {
    expect(installCost("pneumatic")).toBeGreaterThan(installCost("hydraulic"));
  });
});

describe("loadCapacity", () => {
  it("freight highest capacity", () => {
    expect(loadCapacity("freight")).toBeGreaterThan(loadCapacity("pneumatic"));
  });
});

describe("requiresMachineRoom", () => {
  it("traction requires machine room", () => {
    expect(requiresMachineRoom("traction")).toBe(true);
  });
  it("machine roomless does not", () => {
    expect(requiresMachineRoom("machine_roomless")).toBe(false);
  });
});

describe("residentialUse", () => {
  it("pneumatic for residential", () => {
    expect(residentialUse("pneumatic")).toBe(true);
  });
  it("traction not residential", () => {
    expect(residentialUse("traction")).toBe(false);
  });
});

describe("driveSystem", () => {
  it("hydraulic uses fluid piston", () => {
    expect(driveSystem("hydraulic")).toBe("fluid_piston");
  });
});

describe("typicalBuilding", () => {
  it("freight for warehouse", () => {
    expect(typicalBuilding("freight")).toBe("warehouse_industrial");
  });
});

describe("elevatorTypes", () => {
  it("returns 5 types", () => {
    expect(elevatorTypes()).toHaveLength(5);
  });
});
