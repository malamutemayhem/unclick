import { describe, it, expect } from "vitest";
import {
  birdAttraction, durability, winterUse, installEase,
  bathCost, frostProof, hasMovingWater, basinMaterial,
  bestGarden, birdbaths,
} from "../birdbath-calc.js";

describe("birdAttraction", () => {
  it("solar fountain most attractive", () => {
    expect(birdAttraction("solar_fountain")).toBeGreaterThan(birdAttraction("hanging_ceramic"));
  });
});

describe("durability", () => {
  it("ground boulder most durable", () => {
    expect(durability("ground_boulder")).toBeGreaterThan(durability("hanging_ceramic"));
  });
});

describe("winterUse", () => {
  it("heated electric best winter use", () => {
    expect(winterUse("heated_electric")).toBeGreaterThan(winterUse("pedestal_concrete"));
  });
});

describe("installEase", () => {
  it("solar fountain easiest install", () => {
    expect(installEase("solar_fountain")).toBeGreaterThan(installEase("ground_boulder"));
  });
});

describe("bathCost", () => {
  it("heated electric most expensive", () => {
    expect(bathCost("heated_electric")).toBeGreaterThan(bathCost("hanging_ceramic"));
  });
});

describe("frostProof", () => {
  it("ground boulder is frost proof", () => {
    expect(frostProof("ground_boulder")).toBe(true);
  });
  it("pedestal concrete is not", () => {
    expect(frostProof("pedestal_concrete")).toBe(false);
  });
});

describe("hasMovingWater", () => {
  it("solar fountain has moving water", () => {
    expect(hasMovingWater("solar_fountain")).toBe(true);
  });
  it("pedestal concrete does not", () => {
    expect(hasMovingWater("pedestal_concrete")).toBe(false);
  });
});

describe("basinMaterial", () => {
  it("ground boulder uses natural river stone", () => {
    expect(basinMaterial("ground_boulder")).toBe("natural_river_stone");
  });
});

describe("bestGarden", () => {
  it("heated electric for cold climate year round", () => {
    expect(bestGarden("heated_electric")).toBe("cold_climate_year_round");
  });
});

describe("birdbaths", () => {
  it("returns 5 types", () => {
    expect(birdbaths()).toHaveLength(5);
  });
});
