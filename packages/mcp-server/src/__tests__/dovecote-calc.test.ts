import { describe, it, expect } from "vitest";
import {
  nestingHoles, holeSpacingCm, towerHeight, floorArea,
  feedKgPerDay, waterLitersPerDay, breedingCycles,
  squabsPerYear, guanoKgPerYear, potholedWall, dovecoteShapes,
} from "../dovecote-calc.js";

describe("nestingHoles", () => {
  it("20% surplus", () => {
    expect(nestingHoles(10)).toBe(12);
  });
});

describe("holeSpacingCm", () => {
  it("2.5x diameter", () => {
    expect(holeSpacingCm(10)).toBe(25);
  });
});

describe("towerHeight", () => {
  it("rows + 100cm base", () => {
    expect(towerHeight(5, 30)).toBe(250);
  });
});

describe("floorArea", () => {
  it("round positive", () => {
    expect(floorArea("round", 200, 0)).toBeGreaterThan(0);
  });
  it("square = side^2", () => {
    expect(floorArea("square", 100, 0)).toBe(10000);
  });
  it("rectangular = l x w", () => {
    expect(floorArea("rectangular", 100, 50)).toBe(5000);
  });
});

describe("feedKgPerDay", () => {
  it("60g per pair", () => {
    expect(feedKgPerDay(10)).toBe(0.6);
  });
});

describe("waterLitersPerDay", () => {
  it("50ml per pair", () => {
    expect(waterLitersPerDay(10)).toBe(0.5);
  });
});

describe("breedingCycles", () => {
  it("1.5 months per cycle", () => {
    expect(breedingCycles(9)).toBe(6);
  });
});

describe("squabsPerYear", () => {
  it("2 per pair per cycle", () => {
    expect(squabsPerYear(10, 6)).toBe(120);
  });
});

describe("guanoKgPerYear", () => {
  it("12kg per pair", () => {
    expect(guanoKgPerYear(10)).toBe(120);
  });
});

describe("potholedWall", () => {
  it("positive m2", () => {
    expect(potholedWall(5, 10, 15)).toBeGreaterThan(0);
  });
});

describe("dovecoteShapes", () => {
  it("returns 4 shapes", () => {
    expect(dovecoteShapes()).toHaveLength(4);
  });
});
