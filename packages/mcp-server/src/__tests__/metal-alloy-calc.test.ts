import { describe, it, expect } from "vitest";
import {
  purityPercent, meltingPointCelsius, hardnessVickers,
  tarnishResistance, allergenRisk, rhodiumPlated,
  bestApplication, densityGPerCm3, costPerGram, metalAlloys,
} from "../metal-alloy-calc.js";

describe("purityPercent", () => {
  it("platinum 950 is purest", () => {
    expect(purityPercent("platinum_950")).toBeGreaterThan(
      purityPercent("gold_14k")
    );
  });
});

describe("meltingPointCelsius", () => {
  it("platinum has highest melting point", () => {
    expect(meltingPointCelsius("platinum_950")).toBeGreaterThan(
      meltingPointCelsius("sterling_silver")
    );
  });
});

describe("hardnessVickers", () => {
  it("white gold is hardest", () => {
    expect(hardnessVickers("white_gold")).toBeGreaterThan(
      hardnessVickers("platinum_950")
    );
  });
});

describe("tarnishResistance", () => {
  it("platinum resists tarnish best", () => {
    expect(tarnishResistance("platinum_950")).toBeGreaterThan(
      tarnishResistance("sterling_silver")
    );
  });
});

describe("allergenRisk", () => {
  it("white gold has highest allergen risk", () => {
    expect(allergenRisk("white_gold")).toBeGreaterThan(
      allergenRisk("platinum_950")
    );
  });
});

describe("rhodiumPlated", () => {
  it("white gold is rhodium plated", () => {
    expect(rhodiumPlated("white_gold")).toBe(true);
  });
  it("gold 14k is not", () => {
    expect(rhodiumPlated("gold_14k")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("platinum best for engagement rings", () => {
    expect(bestApplication("platinum_950")).toBe("engagement_rings");
  });
});

describe("densityGPerCm3", () => {
  it("platinum is densest", () => {
    expect(densityGPerCm3("platinum_950")).toBeGreaterThan(
      densityGPerCm3("sterling_silver")
    );
  });
});

describe("costPerGram", () => {
  it("rose gold costs most", () => {
    expect(costPerGram("rose_gold")).toBeGreaterThan(
      costPerGram("sterling_silver")
    );
  });
});

describe("metalAlloys", () => {
  it("returns 5 alloys", () => {
    expect(metalAlloys()).toHaveLength(5);
  });
});
