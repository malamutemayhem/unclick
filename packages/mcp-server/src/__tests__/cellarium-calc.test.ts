import { describe, it, expect } from "vitest";
import {
  floorAreaM2, bayCount, columnCount, storageCapacityM3,
  ventilationOpenings, temperatureStabilityCelsius, loadingDoorWidthCm,
  shelvingLengthM, drainageRequired, constructionCost, cellariumGoods,
} from "../cellarium-calc.js";

describe("floorAreaM2", () => {
  it("length times width", () => {
    expect(floorAreaM2(15, 10)).toBe(150);
  });
});

describe("bayCount", () => {
  it("positive count", () => {
    expect(bayCount(15, 4)).toBeGreaterThan(0);
  });
  it("zero span = 0", () => {
    expect(bayCount(15, 0)).toBe(0);
  });
});

describe("columnCount", () => {
  it("zero for single aisle", () => {
    expect(columnCount(4, 1)).toBe(0);
  });
  it("positive for double aisle", () => {
    expect(columnCount(4, 2)).toBeGreaterThan(0);
  });
});

describe("storageCapacityM3", () => {
  it("positive capacity", () => {
    expect(storageCapacityM3(150, 4)).toBeGreaterThan(0);
  });
});

describe("ventilationOpenings", () => {
  it("at least 2", () => {
    expect(ventilationOpenings(10)).toBe(2);
  });
});

describe("temperatureStabilityCelsius", () => {
  it("thicker walls more stable", () => {
    expect(temperatureStabilityCelsius(100)).toBeGreaterThan(temperatureStabilityCelsius(50));
  });
});

describe("loadingDoorWidthCm", () => {
  it("wool widest", () => {
    expect(loadingDoorWidthCm("wool")).toBeGreaterThan(loadingDoorWidthCm("tools"));
  });
});

describe("shelvingLengthM", () => {
  it("positive length", () => {
    expect(shelvingLengthM(150)).toBeGreaterThan(0);
  });
});

describe("drainageRequired", () => {
  it("wine needs drainage", () => {
    expect(drainageRequired("wine")).toBe(true);
  });
  it("grain does not", () => {
    expect(drainageRequired("grain")).toBe(false);
  });
});

describe("constructionCost", () => {
  it("wine most expensive", () => {
    expect(constructionCost(150, "wine", 500)).toBeGreaterThan(
      constructionCost(150, "wool", 500)
    );
  });
});

describe("cellariumGoods", () => {
  it("returns 5 goods", () => {
    expect(cellariumGoods()).toHaveLength(5);
  });
});
