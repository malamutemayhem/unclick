import { describe, it, expect } from "vitest";
import {
  weightKg, topSpeedKmh, comfortRating,
  terrainVersatility, gearCount, hasSuspension,
  dropHandlebars, bestUse, averagePriceUsd, bicycleTypes,
} from "../bicycle-type-calc.js";

describe("weightKg", () => {
  it("road is lightest", () => {
    expect(weightKg("road")).toBeLessThan(
      weightKg("touring")
    );
  });
});

describe("topSpeedKmh", () => {
  it("road is fastest", () => {
    expect(topSpeedKmh("road")).toBeGreaterThan(
      topSpeedKmh("bmx")
    );
  });
});

describe("comfortRating", () => {
  it("touring is most comfortable", () => {
    expect(comfortRating("touring")).toBeGreaterThan(
      comfortRating("bmx")
    );
  });
});

describe("terrainVersatility", () => {
  it("gravel is most versatile", () => {
    expect(terrainVersatility("gravel")).toBeGreaterThan(
      terrainVersatility("road")
    );
  });
});

describe("gearCount", () => {
  it("touring has most gears", () => {
    expect(gearCount("touring")).toBeGreaterThan(
      gearCount("bmx")
    );
  });
});

describe("hasSuspension", () => {
  it("mountain has suspension", () => {
    expect(hasSuspension("mountain")).toBe(true);
  });
  it("road does not", () => {
    expect(hasSuspension("road")).toBe(false);
  });
});

describe("dropHandlebars", () => {
  it("road has drop handlebars", () => {
    expect(dropHandlebars("road")).toBe(true);
  });
  it("mountain does not", () => {
    expect(dropHandlebars("mountain")).toBe(false);
  });
});

describe("bestUse", () => {
  it("bmx for tricks", () => {
    expect(bestUse("bmx")).toBe("tricks");
  });
});

describe("averagePriceUsd", () => {
  it("road is most expensive", () => {
    expect(averagePriceUsd("road")).toBeGreaterThan(
      averagePriceUsd("bmx")
    );
  });
});

describe("bicycleTypes", () => {
  it("returns 5 types", () => {
    expect(bicycleTypes()).toHaveLength(5);
  });
});
