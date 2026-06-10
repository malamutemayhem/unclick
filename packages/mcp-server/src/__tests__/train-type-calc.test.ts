import { describe, it, expect } from "vitest";
import {
  topSpeedKmh, passengerCapacity, energyEfficiency,
  infrastructureCost, noiseLevel, zeroCarbonOperation,
  contactlessTrack, bestApplication, maintenanceCost, trainTypes,
} from "../train-type-calc.js";

describe("topSpeedKmh", () => {
  it("maglev is fastest", () => {
    expect(topSpeedKmh("maglev")).toBeGreaterThan(
      topSpeedKmh("high_speed")
    );
  });
});

describe("passengerCapacity", () => {
  it("electric has most capacity", () => {
    expect(passengerCapacity("electric")).toBeGreaterThan(
      passengerCapacity("steam")
    );
  });
});

describe("energyEfficiency", () => {
  it("electric is most efficient", () => {
    expect(energyEfficiency("electric")).toBeGreaterThan(
      energyEfficiency("steam")
    );
  });
});

describe("infrastructureCost", () => {
  it("maglev has highest infrastructure cost", () => {
    expect(infrastructureCost("maglev")).toBeGreaterThan(
      infrastructureCost("diesel")
    );
  });
});

describe("noiseLevel", () => {
  it("steam is noisiest", () => {
    expect(noiseLevel("steam")).toBeGreaterThan(
      noiseLevel("maglev")
    );
  });
});

describe("zeroCarbonOperation", () => {
  it("electric is zero carbon", () => {
    expect(zeroCarbonOperation("electric")).toBe(true);
  });
  it("diesel is not", () => {
    expect(zeroCarbonOperation("diesel")).toBe(false);
  });
});

describe("contactlessTrack", () => {
  it("maglev has contactless track", () => {
    expect(contactlessTrack("maglev")).toBe(true);
  });
  it("electric does not", () => {
    expect(contactlessTrack("electric")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("steam for heritage", () => {
    expect(bestApplication("steam")).toBe("heritage");
  });
});

describe("maintenanceCost", () => {
  it("steam has highest maintenance", () => {
    expect(maintenanceCost("steam")).toBeGreaterThan(
      maintenanceCost("electric")
    );
  });
});

describe("trainTypes", () => {
  it("returns 5 types", () => {
    expect(trainTypes()).toHaveLength(5);
  });
});
