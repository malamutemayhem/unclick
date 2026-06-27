import { describe, it, expect } from "vitest";
import {
  durabilityRating, timeMinutes, appearanceRating,
  waterResistance, repairability, toolsNeeded,
  colorOptions, bestProduct, costPerMeter, leatherEdgeFinishes,
} from "../leather-edge-calc.js";

describe("durabilityRating", () => {
  it("turned edge is most durable", () => {
    expect(durabilityRating("turned")).toBeGreaterThan(
      durabilityRating("raw")
    );
  });
});

describe("timeMinutes", () => {
  it("turned edge takes longest", () => {
    expect(timeMinutes("turned")).toBeGreaterThan(
      timeMinutes("beveled")
    );
  });
});

describe("appearanceRating", () => {
  it("painted edge looks best", () => {
    expect(appearanceRating("painted")).toBeGreaterThan(
      appearanceRating("raw")
    );
  });
});

describe("waterResistance", () => {
  it("turned edge is most water resistant", () => {
    expect(waterResistance("turned")).toBeGreaterThan(
      waterResistance("raw")
    );
  });
});

describe("repairability", () => {
  it("raw edge is easiest to repair", () => {
    expect(repairability("raw")).toBeGreaterThan(
      repairability("turned")
    );
  });
});

describe("toolsNeeded", () => {
  it("burnished needs tools", () => {
    expect(toolsNeeded("burnished")).toBe(true);
  });
  it("raw does not", () => {
    expect(toolsNeeded("raw")).toBe(false);
  });
});

describe("colorOptions", () => {
  it("painted has color options", () => {
    expect(colorOptions("painted")).toBe(true);
  });
  it("burnished does not", () => {
    expect(colorOptions("burnished")).toBe(false);
  });
});

describe("bestProduct", () => {
  it("painted edge best for luxury bag", () => {
    expect(bestProduct("painted")).toBe("luxury_bag");
  });
});

describe("costPerMeter", () => {
  it("turned edge costs most", () => {
    expect(costPerMeter("turned")).toBeGreaterThan(
      costPerMeter("raw")
    );
  });
});

describe("leatherEdgeFinishes", () => {
  it("returns 5 finishes", () => {
    expect(leatherEdgeFinishes()).toHaveLength(5);
  });
});
