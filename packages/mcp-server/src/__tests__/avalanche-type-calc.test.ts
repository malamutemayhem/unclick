import { describe, it, expect } from "vitest";
import {
  destructivePower, triggerProbability, forecastability, burialDepth,
  speedKph, humanTriggered, temperatureDependent, releaseZone,
  bestPrevention, avalancheTypes,
} from "../avalanche-type-calc.js";

describe("destructivePower", () => {
  it("slab most destructive", () => {
    expect(destructivePower("slab")).toBeGreaterThan(destructivePower("slush"));
  });
});

describe("triggerProbability", () => {
  it("slab highest trigger probability", () => {
    expect(triggerProbability("slab")).toBeGreaterThan(triggerProbability("ice"));
  });
});

describe("forecastability", () => {
  it("slush most forecastable", () => {
    expect(forecastability("slush")).toBeGreaterThan(forecastability("ice"));
  });
});

describe("burialDepth", () => {
  it("slab deepest burial", () => {
    expect(burialDepth("slab")).toBeGreaterThan(burialDepth("slush"));
  });
});

describe("speedKph", () => {
  it("ice fastest", () => {
    expect(speedKph("ice")).toBeGreaterThan(speedKph("slush"));
  });
});

describe("humanTriggered", () => {
  it("slab is human triggered", () => {
    expect(humanTriggered("slab")).toBe(true);
  });
  it("loose wet is not", () => {
    expect(humanTriggered("loose_wet")).toBe(false);
  });
});

describe("temperatureDependent", () => {
  it("loose wet is temperature dependent", () => {
    expect(temperatureDependent("loose_wet")).toBe(true);
  });
  it("slab is not", () => {
    expect(temperatureDependent("slab")).toBe(false);
  });
});

describe("releaseZone", () => {
  it("slab is weak layer planar failure", () => {
    expect(releaseZone("slab")).toBe("weak_layer_planar_failure");
  });
});

describe("bestPrevention", () => {
  it("loose wet is timing early morning", () => {
    expect(bestPrevention("loose_wet")).toBe("timing_early_morning");
  });
});

describe("avalancheTypes", () => {
  it("returns 5 types", () => {
    expect(avalancheTypes()).toHaveLength(5);
  });
});
