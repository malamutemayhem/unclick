import { describe, it, expect } from "vitest";
import {
  recessWidthCm, recessHeightCm, recessDepthCm, shelfCount,
  doorAreaCm2, hingeCount, ironworkWeightKg, interiorVolumeCm3,
  carvingHours, restorationCost, ambryDoors,
} from "../ambry-calc.js";

describe("recessWidthCm", () => {
  it("50% of wall", () => {
    expect(recessWidthCm(60)).toBe(30);
  });
});

describe("recessHeightCm", () => {
  it("1.4x width", () => {
    expect(recessHeightCm(30)).toBe(42);
  });
});

describe("recessDepthCm", () => {
  it("65% of wall", () => {
    expect(recessDepthCm(60)).toBe(39);
  });
});

describe("shelfCount", () => {
  it("at least 1", () => {
    expect(shelfCount(20)).toBe(1);
  });
  it("more shelves for taller recess", () => {
    expect(shelfCount(80)).toBeGreaterThan(shelfCount(20));
  });
});

describe("doorAreaCm2", () => {
  it("positive area", () => {
    expect(doorAreaCm2(30, 42)).toBe(1260);
  });
});

describe("hingeCount", () => {
  it("tall = 3 hinges", () => {
    expect(hingeCount(60)).toBe(3);
  });
  it("short = 2 hinges", () => {
    expect(hingeCount(40)).toBe(2);
  });
});

describe("ironworkWeightKg", () => {
  it("iron grille heaviest", () => {
    expect(ironworkWeightKg(1260, "iron_grille")).toBeGreaterThan(ironworkWeightKg(1260, "plain"));
  });
});

describe("interiorVolumeCm3", () => {
  it("positive volume", () => {
    expect(interiorVolumeCm3(30, 42, 39)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("tracery longest", () => {
    expect(carvingHours("tracery")).toBeGreaterThan(carvingHours("plain"));
  });
});

describe("restorationCost", () => {
  it("positive cost", () => {
    expect(restorationCost("iron_grille", 50)).toBeGreaterThan(0);
  });
});

describe("ambryDoors", () => {
  it("returns 5 doors", () => {
    expect(ambryDoors()).toHaveLength(5);
  });
});
