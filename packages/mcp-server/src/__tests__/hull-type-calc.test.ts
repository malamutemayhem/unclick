import { describe, it, expect } from "vitest";
import {
  stabilityScore, topSpeedKnots, fuelEfficiency,
  roughWaterHandling, cargoCapacity, planesOnWater,
  multiHull, bestUse, draftMeters, hullTypes,
} from "../hull-type-calc.js";

describe("stabilityScore", () => {
  it("catamaran is most stable", () => {
    expect(stabilityScore("catamaran")).toBeGreaterThan(
      stabilityScore("planing")
    );
  });
});

describe("topSpeedKnots", () => {
  it("deep v is fastest", () => {
    expect(topSpeedKnots("deep_v")).toBeGreaterThan(
      topSpeedKnots("displacement")
    );
  });
});

describe("fuelEfficiency", () => {
  it("displacement is most efficient", () => {
    expect(fuelEfficiency("displacement")).toBeGreaterThan(
      fuelEfficiency("deep_v")
    );
  });
});

describe("roughWaterHandling", () => {
  it("deep v handles rough water best", () => {
    expect(roughWaterHandling("deep_v")).toBeGreaterThan(
      roughWaterHandling("pontoon")
    );
  });
});

describe("cargoCapacity", () => {
  it("displacement carries most cargo", () => {
    expect(cargoCapacity("displacement")).toBeGreaterThan(
      cargoCapacity("planing")
    );
  });
});

describe("planesOnWater", () => {
  it("planing hull planes", () => {
    expect(planesOnWater("planing")).toBe(true);
  });
  it("displacement does not", () => {
    expect(planesOnWater("displacement")).toBe(false);
  });
});

describe("multiHull", () => {
  it("catamaran is multi hull", () => {
    expect(multiHull("catamaran")).toBe(true);
  });
  it("deep v is not", () => {
    expect(multiHull("deep_v")).toBe(false);
  });
});

describe("bestUse", () => {
  it("pontoon for lake recreation", () => {
    expect(bestUse("pontoon")).toBe("lake_recreation");
  });
});

describe("draftMeters", () => {
  it("displacement has deepest draft", () => {
    expect(draftMeters("displacement")).toBeGreaterThan(
      draftMeters("pontoon")
    );
  });
});

describe("hullTypes", () => {
  it("returns 5 types", () => {
    expect(hullTypes()).toHaveLength(5);
  });
});
