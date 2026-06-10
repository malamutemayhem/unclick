import { describe, it, expect } from "vitest";
import {
  climbHeight, scratchSurface, floorSpace, hidingSpots,
  treeCost, multiCat, wallMount, mainMaterial,
  bestCat, catTrees,
} from "../cat-tree-calc.js";

describe("climbHeight", () => {
  it("tall tower condo most climb height", () => {
    expect(climbHeight("tall_tower_condo")).toBeGreaterThan(climbHeight("window_perch"));
  });
});

describe("scratchSurface", () => {
  it("scratching post sisal most scratch surface", () => {
    expect(scratchSurface("scratching_post_sisal")).toBeGreaterThan(scratchSurface("window_perch"));
  });
});

describe("floorSpace", () => {
  it("wall mounted shelf saves most floor space", () => {
    expect(floorSpace("wall_mounted_shelf")).toBeGreaterThan(floorSpace("tall_tower_condo"));
  });
});

describe("hidingSpots", () => {
  it("tall tower condo most hiding spots", () => {
    expect(hidingSpots("tall_tower_condo")).toBeGreaterThan(hidingSpots("window_perch"));
  });
});

describe("treeCost", () => {
  it("modern furniture blend most expensive", () => {
    expect(treeCost("modern_furniture_blend")).toBeGreaterThan(treeCost("window_perch"));
  });
});

describe("multiCat", () => {
  it("tall tower condo supports multi cat", () => {
    expect(multiCat("tall_tower_condo")).toBe(true);
  });
  it("window perch does not", () => {
    expect(multiCat("window_perch")).toBe(false);
  });
});

describe("wallMount", () => {
  it("wall mounted shelf is wall mount", () => {
    expect(wallMount("wall_mounted_shelf")).toBe(true);
  });
  it("tall tower condo is not", () => {
    expect(wallMount("tall_tower_condo")).toBe(false);
  });
});

describe("mainMaterial", () => {
  it("scratching post sisal uses sisal rope wrapped post", () => {
    expect(mainMaterial("scratching_post_sisal")).toBe("sisal_rope_wrapped_post");
  });
});

describe("bestCat", () => {
  it("window perch for bird watcher sun napper", () => {
    expect(bestCat("window_perch")).toBe("bird_watcher_sun_napper");
  });
});

describe("catTrees", () => {
  it("returns 5 types", () => {
    expect(catTrees()).toHaveLength(5);
  });
});
