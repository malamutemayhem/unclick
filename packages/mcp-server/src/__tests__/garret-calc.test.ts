import { describe, it, expect } from "vitest";
import {
  usableArea, headroomPercent, dormerCount, dormerArea,
  insulationThicknessCm, ventilationOpenings, stairwellArea,
  floorLoadKgPerM2, lightLevel, conversionCost, garretRoofs,
} from "../garret-calc.js";

describe("usableArea", () => {
  it("mansard best", () => {
    expect(usableArea(50, "mansard")).toBeGreaterThan(usableArea(50, "hip"));
  });
});

describe("headroomPercent", () => {
  it("between 0 and 100", () => {
    const pct = headroomPercent(4, 2.1, 8);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
  it("zero span = 0", () => {
    expect(headroomPercent(4, 2.1, 0)).toBe(0);
  });
});

describe("dormerCount", () => {
  it("positive count", () => {
    expect(dormerCount(12, 3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(dormerCount(12, 0)).toBe(0);
  });
});

describe("dormerArea", () => {
  it("positive area", () => {
    expect(dormerArea(1.5, 1.8)).toBeGreaterThan(0);
  });
});

describe("insulationThicknessCm", () => {
  it("shed thickest", () => {
    expect(insulationThicknessCm("shed")).toBeGreaterThan(insulationThicknessCm("mansard"));
  });
});

describe("ventilationOpenings", () => {
  it("positive count", () => {
    expect(ventilationOpenings(50)).toBeGreaterThan(0);
  });
});

describe("stairwellArea", () => {
  it("positive area", () => {
    expect(stairwellArea(2.5)).toBeGreaterThan(0);
  });
});

describe("floorLoadKgPerM2", () => {
  it("commercial heavier", () => {
    expect(floorLoadKgPerM2(false)).toBeGreaterThan(floorLoadKgPerM2(true));
  });
});

describe("lightLevel", () => {
  it("positive percent", () => {
    expect(lightLevel(5, 50)).toBeGreaterThan(0);
  });
  it("zero floor = 0", () => {
    expect(lightLevel(5, 0)).toBe(0);
  });
});

describe("conversionCost", () => {
  it("hip most expensive", () => {
    expect(conversionCost(50, "hip")).toBeGreaterThan(conversionCost(50, "mansard"));
  });
});

describe("garretRoofs", () => {
  it("returns 5 roofs", () => {
    expect(garretRoofs()).toHaveLength(5);
  });
});
