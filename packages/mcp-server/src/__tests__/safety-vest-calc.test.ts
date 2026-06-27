import { describe, it, expect } from "vitest";
import {
  visibility, breathability, pocketCount, durability,
  vestCost, breakaway, flameResist, fabricType,
  bestJob, safetyVests,
} from "../safety-vest-calc.js";

describe("visibility", () => {
  it("class 3 full coverage best visibility", () => {
    expect(visibility("class_3_full_coverage")).toBeGreaterThan(visibility("class_2_standard_mesh"));
  });
});

describe("breathability", () => {
  it("class 2 standard mesh most breathable", () => {
    expect(breathability("class_2_standard_mesh")).toBeGreaterThan(breathability("flame_resistant_modacrylic"));
  });
});

describe("pocketCount", () => {
  it("surveyor multi pocket most pockets", () => {
    expect(pocketCount("surveyor_multi_pocket")).toBeGreaterThan(pocketCount("breakaway_traffic_snap"));
  });
});

describe("durability", () => {
  it("flame resistant modacrylic most durable", () => {
    expect(durability("flame_resistant_modacrylic")).toBeGreaterThan(durability("class_2_standard_mesh"));
  });
});

describe("vestCost", () => {
  it("flame resistant modacrylic most expensive", () => {
    expect(vestCost("flame_resistant_modacrylic")).toBeGreaterThan(vestCost("class_2_standard_mesh"));
  });
});

describe("breakaway", () => {
  it("breakaway traffic snap is breakaway", () => {
    expect(breakaway("breakaway_traffic_snap")).toBe(true);
  });
  it("class 3 full coverage is not", () => {
    expect(breakaway("class_3_full_coverage")).toBe(false);
  });
});

describe("flameResist", () => {
  it("flame resistant modacrylic is flame resistant", () => {
    expect(flameResist("flame_resistant_modacrylic")).toBe(true);
  });
  it("class 2 standard mesh is not", () => {
    expect(flameResist("class_2_standard_mesh")).toBe(false);
  });
});

describe("fabricType", () => {
  it("flame resistant modacrylic uses modacrylic aramid blend", () => {
    expect(fabricType("flame_resistant_modacrylic")).toBe("modacrylic_aramid_blend");
  });
});

describe("bestJob", () => {
  it("class 3 full coverage best for highway road night work", () => {
    expect(bestJob("class_3_full_coverage")).toBe("highway_road_night_work");
  });
});

describe("safetyVests", () => {
  it("returns 5 types", () => {
    expect(safetyVests()).toHaveLength(5);
  });
});
