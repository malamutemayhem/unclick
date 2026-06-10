import { describe, it, expect } from "vitest";
import {
  topSpeed, fuelEfficiency, maintenanceCost, noiseLevel,
  maneuverability, zeroCarbonOperation, shallowWaterSafe, typicalVessel,
  powerSource, marinePropulsionTypes,
} from "../marine-propulsion-calc.js";

describe("topSpeed", () => {
  it("jet drive fastest", () => {
    expect(topSpeed("jet_drive")).toBeGreaterThan(topSpeed("sail"));
  });
});

describe("fuelEfficiency", () => {
  it("sail most efficient", () => {
    expect(fuelEfficiency("sail")).toBeGreaterThan(fuelEfficiency("jet_drive"));
  });
});

describe("maintenanceCost", () => {
  it("jet drive most expensive maintenance", () => {
    expect(maintenanceCost("jet_drive")).toBeGreaterThan(maintenanceCost("sail"));
  });
});

describe("noiseLevel", () => {
  it("jet drive noisiest", () => {
    expect(noiseLevel("jet_drive")).toBeGreaterThan(noiseLevel("sail"));
  });
});

describe("maneuverability", () => {
  it("jet drive most maneuverable", () => {
    expect(maneuverability("jet_drive")).toBeGreaterThan(maneuverability("sail"));
  });
});

describe("zeroCarbonOperation", () => {
  it("sail is zero carbon", () => {
    expect(zeroCarbonOperation("sail")).toBe(true);
  });
  it("outboard is not", () => {
    expect(zeroCarbonOperation("outboard")).toBe(false);
  });
});

describe("shallowWaterSafe", () => {
  it("outboard is shallow water safe", () => {
    expect(shallowWaterSafe("outboard")).toBe(true);
  });
  it("inboard diesel is not", () => {
    expect(shallowWaterSafe("inboard_diesel")).toBe(false);
  });
});

describe("typicalVessel", () => {
  it("sail for sailboat yacht", () => {
    expect(typicalVessel("sail")).toBe("sailboat_yacht");
  });
});

describe("powerSource", () => {
  it("sail uses wind energy", () => {
    expect(powerSource("sail")).toBe("wind_energy");
  });
});

describe("marinePropulsionTypes", () => {
  it("returns 5 types", () => {
    expect(marinePropulsionTypes()).toHaveLength(5);
  });
});
