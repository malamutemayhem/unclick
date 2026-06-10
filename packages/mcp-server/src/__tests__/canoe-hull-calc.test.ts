import { describe, it, expect } from "vitest";
import {
  primaryStability, secondaryStability, speedRating,
  trackingRating, maneuverability, waveHandling,
  capacityRating, bestForWater, buildComplexity, canoeHullTypes,
} from "../canoe-hull-calc.js";

describe("primaryStability", () => {
  it("flat bottom is most stable initially", () => {
    expect(primaryStability("flat_bottom")).toBeGreaterThan(
      primaryStability("round_bottom")
    );
  });
});

describe("secondaryStability", () => {
  it("tumblehome has best secondary stability", () => {
    expect(secondaryStability("tumblehome")).toBeGreaterThan(
      secondaryStability("flat_bottom")
    );
  });
});

describe("speedRating", () => {
  it("round bottom is fastest", () => {
    expect(speedRating("round_bottom")).toBeGreaterThan(
      speedRating("flat_bottom")
    );
  });
});

describe("trackingRating", () => {
  it("vee hull tracks best", () => {
    expect(trackingRating("vee_hull")).toBeGreaterThan(
      trackingRating("flat_bottom")
    );
  });
});

describe("maneuverability", () => {
  it("flat bottom is most maneuverable", () => {
    expect(maneuverability("flat_bottom")).toBeGreaterThan(
      maneuverability("vee_hull")
    );
  });
});

describe("waveHandling", () => {
  it("vee hull handles waves best", () => {
    expect(waveHandling("vee_hull")).toBeGreaterThan(
      waveHandling("flat_bottom")
    );
  });
});

describe("capacityRating", () => {
  it("flat bottom has most capacity", () => {
    expect(capacityRating("flat_bottom")).toBeGreaterThan(
      capacityRating("tumblehome")
    );
  });
});

describe("bestForWater", () => {
  it("flat bottom is for calm lakes", () => {
    expect(bestForWater("flat_bottom")).toBe("calm_lakes");
  });
});

describe("buildComplexity", () => {
  it("tumblehome is most complex to build", () => {
    expect(buildComplexity("tumblehome")).toBeGreaterThan(
      buildComplexity("flat_bottom")
    );
  });
});

describe("canoeHullTypes", () => {
  it("returns 5 types", () => {
    expect(canoeHullTypes()).toHaveLength(5);
  });
});
