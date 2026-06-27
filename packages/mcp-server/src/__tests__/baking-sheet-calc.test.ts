import { describe, it, expect } from "vitest";
import {
  heatDistribution, browningResult, releaseEase, durabilityScore,
  sheetCost, dishwasherSafe, ovenSafe500, surfaceFinish,
  bestBake, bakingSheets,
} from "../baking-sheet-calc.js";

describe("heatDistribution", () => {
  it("stone ceramic best heat distribution", () => {
    expect(heatDistribution("stone_ceramic")).toBeGreaterThan(heatDistribution("silicone_mat"));
  });
});

describe("browningResult", () => {
  it("stone ceramic best browning", () => {
    expect(browningResult("stone_ceramic")).toBeGreaterThan(browningResult("silicone_mat"));
  });
});

describe("releaseEase", () => {
  it("nonstick coated easiest release", () => {
    expect(releaseEase("nonstick_coated")).toBeGreaterThan(releaseEase("stainless_steel"));
  });
});

describe("durabilityScore", () => {
  it("stainless steel most durable", () => {
    expect(durabilityScore("stainless_steel")).toBeGreaterThan(durabilityScore("nonstick_coated"));
  });
});

describe("sheetCost", () => {
  it("stone ceramic most expensive", () => {
    expect(sheetCost("stone_ceramic")).toBeGreaterThan(sheetCost("nonstick_coated"));
  });
});

describe("dishwasherSafe", () => {
  it("stainless steel is dishwasher safe", () => {
    expect(dishwasherSafe("stainless_steel")).toBe(true);
  });
  it("nonstick coated is not", () => {
    expect(dishwasherSafe("nonstick_coated")).toBe(false);
  });
});

describe("ovenSafe500", () => {
  it("aluminum half is oven safe 500", () => {
    expect(ovenSafe500("aluminum_half")).toBe(true);
  });
  it("silicone mat is not", () => {
    expect(ovenSafe500("silicone_mat")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("stone ceramic uses unglazed cordierite slab", () => {
    expect(surfaceFinish("stone_ceramic")).toBe("unglazed_cordierite_slab");
  });
});

describe("bestBake", () => {
  it("aluminum half for cookie roast all purpose", () => {
    expect(bestBake("aluminum_half")).toBe("cookie_roast_all_purpose");
  });
});

describe("bakingSheets", () => {
  it("returns 5 types", () => {
    expect(bakingSheets()).toHaveLength(5);
  });
});
