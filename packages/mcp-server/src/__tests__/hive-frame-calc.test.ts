import { describe, it, expect } from "vitest";
import {
  honeyCapacity, broodSpace, liftingWeight, inspectionEase,
  availabilityScore, foundationRequired, extractorCompatible, typicalUse,
  combStyle, hiveFrames,
} from "../hive-frame-calc.js";

describe("honeyCapacity", () => {
  it("deep has most honey capacity", () => {
    expect(honeyCapacity("langstroth_deep")).toBeGreaterThan(honeyCapacity("warre"));
  });
});

describe("broodSpace", () => {
  it("deep has most brood space", () => {
    expect(broodSpace("langstroth_deep")).toBeGreaterThan(broodSpace("langstroth_shallow"));
  });
});

describe("liftingWeight", () => {
  it("deep heaviest to lift", () => {
    expect(liftingWeight("langstroth_deep")).toBeGreaterThan(liftingWeight("langstroth_shallow"));
  });
});

describe("inspectionEase", () => {
  it("top bar easiest inspection", () => {
    expect(inspectionEase("top_bar")).toBeGreaterThan(inspectionEase("warre"));
  });
});

describe("availabilityScore", () => {
  it("langstroth deep most available", () => {
    expect(availabilityScore("langstroth_deep")).toBeGreaterThan(availabilityScore("warre"));
  });
});

describe("foundationRequired", () => {
  it("langstroth deep requires foundation", () => {
    expect(foundationRequired("langstroth_deep")).toBe(true);
  });
  it("top bar does not", () => {
    expect(foundationRequired("top_bar")).toBe(false);
  });
});

describe("extractorCompatible", () => {
  it("langstroth medium is extractor compatible", () => {
    expect(extractorCompatible("langstroth_medium")).toBe(true);
  });
  it("warre is not", () => {
    expect(extractorCompatible("warre")).toBe(false);
  });
});

describe("typicalUse", () => {
  it("top bar for natural beekeeping", () => {
    expect(typicalUse("top_bar")).toBe("natural_beekeeping");
  });
});

describe("combStyle", () => {
  it("top bar is natural free form", () => {
    expect(combStyle("top_bar")).toBe("natural_free_form");
  });
});

describe("hiveFrames", () => {
  it("returns 5 frames", () => {
    expect(hiveFrames()).toHaveLength(5);
  });
});
