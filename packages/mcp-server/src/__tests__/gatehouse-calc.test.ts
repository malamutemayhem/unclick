import { describe, it, expect } from "vitest";
import {
  passageWidthM, passageHeightM, passageLengthM, guardRoomCount,
  guardRoomAreaM2, doorCount, arrowLoopCount, wallThicknessCm,
  defenseRating, constructionCost, gatehouseDefenses,
} from "../gatehouse-calc.js";

describe("passageWidthM", () => {
  it("vehicle wider", () => {
    expect(passageWidthM(true)).toBeGreaterThan(passageWidthM(false));
  });
});

describe("passageHeightM", () => {
  it("1.5x width", () => {
    expect(passageHeightM(3.5)).toBe(5.25);
  });
});

describe("passageLengthM", () => {
  it("equals wall thickness", () => {
    expect(passageLengthM(4)).toBe(4);
  });
});

describe("guardRoomCount", () => {
  it("2 per floor", () => {
    expect(guardRoomCount(3)).toBe(6);
  });
});

describe("guardRoomAreaM2", () => {
  it("positive area", () => {
    expect(guardRoomAreaM2(3.5)).toBeGreaterThan(0);
  });
});

describe("doorCount", () => {
  it("always 2", () => {
    expect(doorCount()).toBe(2);
  });
});

describe("arrowLoopCount", () => {
  it("positive count", () => {
    expect(arrowLoopCount(3, 3)).toBeGreaterThan(0);
  });
});

describe("wallThicknessCm", () => {
  it("positive thickness", () => {
    expect(wallThicknessCm(10)).toBeGreaterThan(0);
  });
});

describe("defenseRating", () => {
  it("barbican highest", () => {
    expect(defenseRating("barbican")).toBeGreaterThan(defenseRating("murder_holes"));
  });
});

describe("constructionCost", () => {
  it("barbican most expensive", () => {
    expect(constructionCost(10, "barbican", 1000)).toBeGreaterThan(
      constructionCost(10, "murder_holes", 1000)
    );
  });
});

describe("gatehouseDefenses", () => {
  it("returns 5 defenses", () => {
    expect(gatehouseDefenses()).toHaveLength(5);
  });
});
