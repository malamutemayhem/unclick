import { describe, it, expect } from "vitest";
import {
  buildTimeMinutes, warmthRating, waterproofRating,
  windProtection, materialsNeeded, toolsRequired,
  bestSeason, sleepCapacity, skillRequired, shelterTypes,
} from "../shelter-type-calc.js";

describe("buildTimeMinutes", () => {
  it("snow cave takes longest to build", () => {
    expect(buildTimeMinutes("snow_cave")).toBeGreaterThan(
      buildTimeMinutes("tarp_shelter")
    );
  });
});

describe("warmthRating", () => {
  it("snow cave is warmest", () => {
    expect(warmthRating("snow_cave")).toBeGreaterThan(
      warmthRating("tarp_shelter")
    );
  });
});

describe("waterproofRating", () => {
  it("snow cave is most waterproof", () => {
    expect(waterproofRating("snow_cave")).toBeGreaterThan(
      waterproofRating("lean_to")
    );
  });
});

describe("windProtection", () => {
  it("snow cave has best wind protection", () => {
    expect(windProtection("snow_cave")).toBeGreaterThan(
      windProtection("tarp_shelter")
    );
  });
});

describe("materialsNeeded", () => {
  it("debris hut needs most materials", () => {
    expect(materialsNeeded("debris_hut")).toBeGreaterThan(
      materialsNeeded("snow_cave")
    );
  });
});

describe("toolsRequired", () => {
  it("snow cave requires tools", () => {
    expect(toolsRequired("snow_cave")).toBe(true);
  });
  it("lean to does not", () => {
    expect(toolsRequired("lean_to")).toBe(false);
  });
});

describe("bestSeason", () => {
  it("snow cave best in winter", () => {
    expect(bestSeason("snow_cave")).toBe("winter");
  });
});

describe("sleepCapacity", () => {
  it("wickiup sleeps most", () => {
    expect(sleepCapacity("wickiup")).toBeGreaterThan(
      sleepCapacity("debris_hut")
    );
  });
});

describe("skillRequired", () => {
  it("snow cave needs most skill", () => {
    expect(skillRequired("snow_cave")).toBeGreaterThan(
      skillRequired("lean_to")
    );
  });
});

describe("shelterTypes", () => {
  it("returns 5 types", () => {
    expect(shelterTypes()).toHaveLength(5);
  });
});
