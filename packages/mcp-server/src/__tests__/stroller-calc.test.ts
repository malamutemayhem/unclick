import { describe, it, expect } from "vitest";
import {
  safetyRating, maneuverability, storageSpace, foldCompact,
  strollerCost, carSeatCompatible, allTerrain, wheelDesign,
  bestFamily, strollers,
} from "../stroller-calc.js";

describe("safetyRating", () => {
  it("full size travel highest safety", () => {
    expect(safetyRating("full_size_travel")).toBeGreaterThan(safetyRating("lightweight_umbrella"));
  });
});

describe("maneuverability", () => {
  it("lightweight umbrella most maneuverable", () => {
    expect(maneuverability("lightweight_umbrella")).toBeGreaterThan(maneuverability("double_tandem"));
  });
});

describe("storageSpace", () => {
  it("full size travel most storage", () => {
    expect(storageSpace("full_size_travel")).toBeGreaterThan(storageSpace("lightweight_umbrella"));
  });
});

describe("foldCompact", () => {
  it("lightweight umbrella most compact fold", () => {
    expect(foldCompact("lightweight_umbrella")).toBeGreaterThan(foldCompact("double_tandem"));
  });
});

describe("strollerCost", () => {
  it("convertible modular most expensive", () => {
    expect(strollerCost("convertible_modular")).toBeGreaterThan(strollerCost("lightweight_umbrella"));
  });
});

describe("carSeatCompatible", () => {
  it("full size travel is car seat compatible", () => {
    expect(carSeatCompatible("full_size_travel")).toBe(true);
  });
  it("lightweight umbrella is not", () => {
    expect(carSeatCompatible("lightweight_umbrella")).toBe(false);
  });
});

describe("allTerrain", () => {
  it("jogging three wheel is all terrain", () => {
    expect(allTerrain("jogging_three_wheel")).toBe(true);
  });
  it("full size travel is not", () => {
    expect(allTerrain("full_size_travel")).toBe(false);
  });
});

describe("wheelDesign", () => {
  it("jogging three wheel uses air filled fixed front", () => {
    expect(wheelDesign("jogging_three_wheel")).toBe("air_filled_fixed_front");
  });
});

describe("bestFamily", () => {
  it("double tandem for twins siblings close age", () => {
    expect(bestFamily("double_tandem")).toBe("twins_siblings_close_age");
  });
});

describe("strollers", () => {
  it("returns 5 types", () => {
    expect(strollers()).toHaveLength(5);
  });
});
