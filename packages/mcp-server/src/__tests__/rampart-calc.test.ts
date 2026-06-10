import { describe, it, expect } from "vitest";
import {
  wallLength, wallThickness, walkwayWidth, merlonCount,
  towerCount, earthworkVolume, garrisonSize, constructionDays,
  gatehouseWidth, defensiveRating, wallMaterials,
} from "../rampart-calc.js";

describe("wallLength", () => {
  it("minus gates", () => {
    expect(wallLength(500, 5, 2)).toBe(490);
  });
});

describe("wallThickness", () => {
  it("earth thickest", () => {
    expect(wallThickness(10, "earth")).toBeGreaterThan(wallThickness(10, "concrete"));
  });
});

describe("walkwayWidth", () => {
  it("60% of wall", () => {
    expect(walkwayWidth(3)).toBeCloseTo(1.8, 1);
  });
});

describe("merlonCount", () => {
  it("positive count", () => {
    expect(merlonCount(100, 60, 40)).toBeGreaterThan(0);
  });
});

describe("towerCount", () => {
  it("positive count", () => {
    expect(towerCount(500, 50)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(towerCount(500, 0)).toBe(0);
  });
});

describe("earthworkVolume", () => {
  it("positive volume", () => {
    expect(earthworkVolume(100, 5, 3)).toBeGreaterThan(0);
  });
});

describe("garrisonSize", () => {
  it("positive soldiers", () => {
    expect(garrisonSize(500, 0.5)).toBeGreaterThan(0);
  });
});

describe("constructionDays", () => {
  it("positive days", () => {
    expect(constructionDays(1000, 50)).toBeGreaterThan(0);
  });
  it("zero workers = 0", () => {
    expect(constructionDays(1000, 0)).toBe(0);
  });
});

describe("gatehouseWidth", () => {
  it("wider than gate", () => {
    expect(gatehouseWidth(4)).toBeGreaterThan(4);
  });
});

describe("defensiveRating", () => {
  it("high = formidable", () => {
    expect(defensiveRating(10, 4, 8)).toBe("formidable");
  });
});

describe("wallMaterials", () => {
  it("returns 5 materials", () => {
    expect(wallMaterials()).toHaveLength(5);
  });
});
