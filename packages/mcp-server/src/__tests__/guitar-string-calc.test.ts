import { describe, it, expect } from "vitest";
import {
  brightnessRating, warmthRating, tensionKg,
  lifespanWeeks, fingerNoise, coated,
  magneticPickupCompatible, bestGenre, costPerSet, guitarStrings,
} from "../guitar-string-calc.js";

describe("brightnessRating", () => {
  it("phosphor bronze is brightest", () => {
    expect(brightnessRating("phosphor_bronze")).toBeGreaterThan(
      brightnessRating("flatwound")
    );
  });
});

describe("warmthRating", () => {
  it("flatwound is warmest", () => {
    expect(warmthRating("flatwound")).toBeGreaterThan(
      warmthRating("phosphor_bronze")
    );
  });
});

describe("tensionKg", () => {
  it("phosphor bronze has most tension", () => {
    expect(tensionKg("phosphor_bronze")).toBeGreaterThan(
      tensionKg("nylon")
    );
  });
});

describe("lifespanWeeks", () => {
  it("flatwound lasts longest", () => {
    expect(lifespanWeeks("flatwound")).toBeGreaterThan(
      lifespanWeeks("phosphor_bronze")
    );
  });
});

describe("fingerNoise", () => {
  it("phosphor bronze has most finger noise", () => {
    expect(fingerNoise("phosphor_bronze")).toBeGreaterThan(
      fingerNoise("flatwound")
    );
  });
});

describe("coated", () => {
  it("nylon is not coated", () => {
    expect(coated("nylon")).toBe(false);
  });
});

describe("magneticPickupCompatible", () => {
  it("nickel wound works with pickups", () => {
    expect(magneticPickupCompatible("nickel_wound")).toBe(true);
  });
  it("nylon does not", () => {
    expect(magneticPickupCompatible("nylon")).toBe(false);
  });
});

describe("bestGenre", () => {
  it("flatwound best for jazz", () => {
    expect(bestGenre("flatwound")).toBe("jazz");
  });
});

describe("costPerSet", () => {
  it("flatwound costs most", () => {
    expect(costPerSet("flatwound")).toBeGreaterThan(
      costPerSet("nickel_wound")
    );
  });
});

describe("guitarStrings", () => {
  it("returns 5 types", () => {
    expect(guitarStrings()).toHaveLength(5);
  });
});
