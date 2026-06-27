import { describe, it, expect } from "vitest";
import {
  dryGrip, wetGrip, snowTraction,
  treadLife, roadNoise, studdable,
  offRoadRated, bestSeason, compoundType, tireTypes,
} from "../tire-type-calc.js";

describe("dryGrip", () => {
  it("performance best dry grip", () => {
    expect(dryGrip("performance")).toBeGreaterThan(
      dryGrip("winter")
    );
  });
});

describe("wetGrip", () => {
  it("performance best wet grip", () => {
    expect(wetGrip("performance")).toBeGreaterThan(
      wetGrip("all_terrain")
    );
  });
});

describe("snowTraction", () => {
  it("winter best snow traction", () => {
    expect(snowTraction("winter")).toBeGreaterThan(
      snowTraction("summer")
    );
  });
});

describe("treadLife", () => {
  it("all_season longest tread life", () => {
    expect(treadLife("all_season")).toBeGreaterThan(
      treadLife("performance")
    );
  });
});

describe("roadNoise", () => {
  it("all_terrain noisiest", () => {
    expect(roadNoise("all_terrain")).toBeGreaterThan(
      roadNoise("summer")
    );
  });
});

describe("studdable", () => {
  it("winter is studdable", () => {
    expect(studdable("winter")).toBe(true);
  });
  it("summer is not", () => {
    expect(studdable("summer")).toBe(false);
  });
});

describe("offRoadRated", () => {
  it("all_terrain is offroad rated", () => {
    expect(offRoadRated("all_terrain")).toBe(true);
  });
  it("summer is not", () => {
    expect(offRoadRated("summer")).toBe(false);
  });
});

describe("bestSeason", () => {
  it("winter for cold snow ice", () => {
    expect(bestSeason("winter")).toBe("cold_snow_ice");
  });
});

describe("compoundType", () => {
  it("performance is ultra soft sticky", () => {
    expect(compoundType("performance")).toBe("ultra_soft_sticky");
  });
});

describe("tireTypes", () => {
  it("returns 5 types", () => {
    expect(tireTypes()).toHaveLength(5);
  });
});
