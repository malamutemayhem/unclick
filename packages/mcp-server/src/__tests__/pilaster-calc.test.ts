import { describe, it, expect } from "vitest";
import {
  projectionCm, heightFromOrder, flutingCount, entasisMm,
  capitalHeight, baseHeight, loadCapacityKn, spacingCm,
  stoneBlocksNeeded, carvingHours, columnOrders,
} from "../pilaster-calc.js";

describe("projectionCm", () => {
  it("quarter of wall", () => {
    expect(projectionCm(40)).toBe(10);
  });
});

describe("heightFromOrder", () => {
  it("corinthian tallest", () => {
    expect(heightFromOrder("corinthian", 30)).toBeGreaterThan(heightFromOrder("tuscan", 30));
  });
});

describe("flutingCount", () => {
  it("tuscan has none", () => {
    expect(flutingCount("tuscan")).toBe(0);
  });
  it("ionic has 24", () => {
    expect(flutingCount("ionic")).toBe(24);
  });
});

describe("entasisMm", () => {
  it("positive mm", () => {
    expect(entasisMm(300)).toBeGreaterThan(0);
  });
});

describe("capitalHeight", () => {
  it("corinthian tallest capital", () => {
    expect(capitalHeight("corinthian", 30)).toBeGreaterThan(capitalHeight("doric", 30));
  });
});

describe("baseHeight", () => {
  it("doric has no base", () => {
    expect(baseHeight("doric", 30)).toBe(0);
  });
  it("ionic has base", () => {
    expect(baseHeight("ionic", 30)).toBeGreaterThan(0);
  });
});

describe("loadCapacityKn", () => {
  it("positive kN", () => {
    expect(loadCapacityKn(30, 20, 300)).toBeGreaterThan(0);
  });
  it("zero height = 0", () => {
    expect(loadCapacityKn(30, 20, 0)).toBe(0);
  });
});

describe("spacingCm", () => {
  it("positive cm", () => {
    expect(spacingCm(600, 5)).toBeGreaterThan(0);
  });
  it("single pilaster = 0", () => {
    expect(spacingCm(600, 1)).toBe(0);
  });
});

describe("stoneBlocksNeeded", () => {
  it("positive blocks", () => {
    expect(stoneBlocksNeeded(300, 40)).toBeGreaterThan(0);
  });
  it("zero block height = 0", () => {
    expect(stoneBlocksNeeded(300, 0)).toBe(0);
  });
});

describe("carvingHours", () => {
  it("corinthian most hours", () => {
    expect(carvingHours("corinthian")).toBeGreaterThan(carvingHours("tuscan"));
  });
});

describe("columnOrders", () => {
  it("returns 5 orders", () => {
    expect(columnOrders()).toHaveLength(5);
  });
});
