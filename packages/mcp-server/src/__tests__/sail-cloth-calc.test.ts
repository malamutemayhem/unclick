import { describe, it, expect } from "vitest";
import {
  weightGPerM2, stretchPercent, uvResistance,
  tearStrength, shapeRetention, repairability,
  sewable, lifespanYears, costPerM2, sailClothTypes,
} from "../sail-cloth-calc.js";

describe("weightGPerM2", () => {
  it("canvas is heaviest", () => {
    expect(weightGPerM2("canvas")).toBeGreaterThan(
      weightGPerM2("dyneema")
    );
  });
});

describe("stretchPercent", () => {
  it("nylon stretches most", () => {
    expect(stretchPercent("nylon")).toBeGreaterThan(
      stretchPercent("dyneema")
    );
  });
});

describe("uvResistance", () => {
  it("dyneema resists UV best", () => {
    expect(uvResistance("dyneema")).toBeGreaterThan(
      uvResistance("nylon")
    );
  });
});

describe("tearStrength", () => {
  it("dyneema is strongest", () => {
    expect(tearStrength("dyneema")).toBeGreaterThan(
      tearStrength("laminate")
    );
  });
});

describe("shapeRetention", () => {
  it("laminate retains shape best", () => {
    expect(shapeRetention("laminate")).toBeGreaterThan(
      shapeRetention("nylon")
    );
  });
});

describe("repairability", () => {
  it("canvas is most repairable", () => {
    expect(repairability("canvas")).toBeGreaterThan(
      repairability("laminate")
    );
  });
});

describe("sewable", () => {
  it("dacron is sewable", () => {
    expect(sewable("dacron")).toBe(true);
  });
  it("laminate is not", () => {
    expect(sewable("laminate")).toBe(false);
  });
});

describe("lifespanYears", () => {
  it("dyneema lasts longest", () => {
    expect(lifespanYears("dyneema")).toBeGreaterThan(
      lifespanYears("canvas")
    );
  });
});

describe("costPerM2", () => {
  it("dyneema is most expensive", () => {
    expect(costPerM2("dyneema")).toBeGreaterThan(
      costPerM2("canvas")
    );
  });
});

describe("sailClothTypes", () => {
  it("returns 5 types", () => {
    expect(sailClothTypes()).toHaveLength(5);
  });
});
