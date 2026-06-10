import { describe, it, expect } from "vitest";
import {
  floorAreaM2, seatingCapacity, tableCount, pulpitHeightM,
  servingHatchCount, windowAreaM2, hearthCount, lavaboPairCount,
  wallPaintingAreaM2, constructionCost, refectoryLayouts,
} from "../refectory-calc.js";

describe("floorAreaM2", () => {
  it("length times width", () => {
    expect(floorAreaM2(20, 8)).toBe(160);
  });
});

describe("seatingCapacity", () => {
  it("positive capacity", () => {
    expect(seatingCapacity(160)).toBeGreaterThan(0);
  });
});

describe("tableCount", () => {
  it("positive count", () => {
    expect(tableCount(100, 10)).toBeGreaterThan(0);
  });
  it("zero seats per table = 0", () => {
    expect(tableCount(100, 0)).toBe(0);
  });
});

describe("pulpitHeightM", () => {
  it("50% of ceiling", () => {
    expect(pulpitHeightM(6)).toBe(3);
  });
});

describe("servingHatchCount", () => {
  it("at least 1", () => {
    expect(servingHatchCount(2)).toBe(1);
  });
});

describe("windowAreaM2", () => {
  it("12% of floor area", () => {
    expect(windowAreaM2(100)).toBe(12);
  });
});

describe("hearthCount", () => {
  it("at least 1", () => {
    expect(hearthCount(30)).toBe(1);
  });
});

describe("lavaboPairCount", () => {
  it("at least 1", () => {
    expect(lavaboPairCount(10)).toBe(1);
  });
});

describe("wallPaintingAreaM2", () => {
  it("positive area", () => {
    expect(wallPaintingAreaM2(20, 6)).toBeGreaterThan(0);
  });
});

describe("constructionCost", () => {
  it("vaulted most expensive", () => {
    expect(constructionCost(160, "vaulted", 500)).toBeGreaterThan(
      constructionCost(160, "single_aisle", 500)
    );
  });
});

describe("refectoryLayouts", () => {
  it("returns 5 layouts", () => {
    expect(refectoryLayouts()).toHaveLength(5);
  });
});
