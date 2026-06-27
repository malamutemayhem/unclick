import { describe, it, expect } from "vitest";
import {
  volumeLiters, catchmentArea, fillTime, waterPressureKpa,
  wallThickness, evaporationLoss, daysOfSupply, overflowPipe,
  sedimentTrap, materialCost, cisternShapes,
} from "../cistern-calc.js";

describe("volumeLiters", () => {
  it("rectangular positive", () => {
    expect(volumeLiters("rectangular", 100, 100, 100)).toBe(1000);
  });
  it("cylindrical positive", () => {
    expect(volumeLiters("cylindrical", 100, 100, 0)).toBeGreaterThan(0);
  });
});

describe("catchmentArea", () => {
  it("positive area", () => {
    expect(catchmentArea(500, 5000)).toBeGreaterThan(0);
  });
  it("zero rainfall = 0", () => {
    expect(catchmentArea(0, 5000)).toBe(0);
  });
});

describe("fillTime", () => {
  it("positive minutes", () => {
    expect(fillTime(1000, 10)).toBe(100);
  });
});

describe("waterPressureKpa", () => {
  it("positive kPa", () => {
    expect(waterPressureKpa(2)).toBeGreaterThan(0);
  });
});

describe("wallThickness", () => {
  it("stone thickest", () => {
    expect(wallThickness(2, "stone")).toBeGreaterThan(wallThickness(2, "ferrocement"));
  });
});

describe("evaporationLoss", () => {
  it("positive liters", () => {
    expect(evaporationLoss(10, 25)).toBeGreaterThan(0);
  });
});

describe("daysOfSupply", () => {
  it("correct days", () => {
    expect(daysOfSupply(1000, 50)).toBe(20);
  });
});

describe("overflowPipe", () => {
  it("positive mm", () => {
    expect(overflowPipe(50)).toBeGreaterThan(0);
  });
});

describe("sedimentTrap", () => {
  it("5% of volume", () => {
    expect(sedimentTrap(1000)).toBe(50);
  });
});

describe("materialCost", () => {
  it("positive cost", () => {
    expect(materialCost("concrete")).toBeGreaterThan(0);
  });
});

describe("cisternShapes", () => {
  it("returns 4 shapes", () => {
    expect(cisternShapes()).toHaveLength(4);
  });
});
