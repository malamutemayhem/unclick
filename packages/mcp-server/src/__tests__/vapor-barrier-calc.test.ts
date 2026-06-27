import { describe, it, expect } from "vitest";
import {
  moistureResistance, breathability, installEase, materialCost,
  durabilityScore, adaptivePermeance, seamless, permRating,
  bestClimate, vaporBarriers,
} from "../vapor-barrier-calc.js";

describe("moistureResistance", () => {
  it("polyethylene best moisture resistance", () => {
    expect(moistureResistance("polyethylene")).toBeGreaterThan(moistureResistance("kraft_paper"));
  });
});

describe("breathability", () => {
  it("smart membrane most breathable", () => {
    expect(breathability("smart_membrane")).toBeGreaterThan(breathability("polyethylene"));
  });
});

describe("installEase", () => {
  it("kraft paper easiest install", () => {
    expect(installEase("kraft_paper")).toBeGreaterThan(installEase("liquid_applied"));
  });
});

describe("materialCost", () => {
  it("smart membrane most expensive", () => {
    expect(materialCost("smart_membrane")).toBeGreaterThan(materialCost("polyethylene"));
  });
});

describe("durabilityScore", () => {
  it("smart membrane most durable", () => {
    expect(durabilityScore("smart_membrane")).toBeGreaterThan(durabilityScore("kraft_paper"));
  });
});

describe("adaptivePermeance", () => {
  it("smart membrane is adaptive", () => {
    expect(adaptivePermeance("smart_membrane")).toBe(true);
  });
  it("polyethylene is not", () => {
    expect(adaptivePermeance("polyethylene")).toBe(false);
  });
});

describe("seamless", () => {
  it("liquid applied is seamless", () => {
    expect(seamless("liquid_applied")).toBe(true);
  });
  it("polyethylene is not", () => {
    expect(seamless("polyethylene")).toBe(false);
  });
});

describe("permRating", () => {
  it("polyethylene is class i below 0 1", () => {
    expect(permRating("polyethylene")).toBe("class_i_below_0_1");
  });
});

describe("bestClimate", () => {
  it("smart membrane for mixed humid climate", () => {
    expect(bestClimate("smart_membrane")).toBe("mixed_humid_climate");
  });
});

describe("vaporBarriers", () => {
  it("returns 5 barriers", () => {
    expect(vaporBarriers()).toHaveLength(5);
  });
});
