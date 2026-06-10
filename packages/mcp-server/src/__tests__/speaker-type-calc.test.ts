import { describe, it, expect } from "vitest";
import {
  frequencyLow, frequencyHigh, powerHandling, coneSize,
  directionalityScore, requiresCrossover, standaloneCapable,
  typicalMaterial, bestPlacement, speakerTypes,
} from "../speaker-type-calc.js";

describe("frequencyLow", () => {
  it("subwoofer best low frequency", () => {
    expect(frequencyLow("subwoofer")).toBeGreaterThan(frequencyLow("tweeter"));
  });
});

describe("frequencyHigh", () => {
  it("tweeter best high frequency", () => {
    expect(frequencyHigh("tweeter")).toBeGreaterThan(frequencyHigh("subwoofer"));
  });
});

describe("powerHandling", () => {
  it("subwoofer handles most power", () => {
    expect(powerHandling("subwoofer")).toBeGreaterThan(powerHandling("tweeter"));
  });
});

describe("coneSize", () => {
  it("subwoofer largest cone", () => {
    expect(coneSize("subwoofer")).toBeGreaterThan(coneSize("tweeter"));
  });
});

describe("directionalityScore", () => {
  it("tweeter most directional", () => {
    expect(directionalityScore("tweeter")).toBeGreaterThan(directionalityScore("subwoofer"));
  });
});

describe("requiresCrossover", () => {
  it("woofer requires crossover", () => {
    expect(requiresCrossover("woofer")).toBe(true);
  });
  it("full range does not", () => {
    expect(requiresCrossover("full_range")).toBe(false);
  });
});

describe("standaloneCapable", () => {
  it("full range is standalone capable", () => {
    expect(standaloneCapable("full_range")).toBe(true);
  });
  it("tweeter is not", () => {
    expect(standaloneCapable("tweeter")).toBe(false);
  });
});

describe("typicalMaterial", () => {
  it("tweeter uses silk metal dome", () => {
    expect(typicalMaterial("tweeter")).toBe("silk_metal_dome");
  });
});

describe("bestPlacement", () => {
  it("subwoofer in corner floor", () => {
    expect(bestPlacement("subwoofer")).toBe("corner_floor");
  });
});

describe("speakerTypes", () => {
  it("returns 5 types", () => {
    expect(speakerTypes()).toHaveLength(5);
  });
});
