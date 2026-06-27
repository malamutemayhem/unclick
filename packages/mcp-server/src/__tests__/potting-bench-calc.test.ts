import { describe, it, expect } from "vitest";
import {
  workSpace, storageCapacity, weatherResist, portability,
  benchCost, hasSink, foldable, topMaterial,
  bestSpot, pottingBenches,
} from "../potting-bench-calc.js";

describe("workSpace", () => {
  it("potting sink basin most work space", () => {
    expect(workSpace("potting_sink_basin")).toBeGreaterThan(workSpace("folding_portable_resin"));
  });
});

describe("storageCapacity", () => {
  it("cedar freestanding shelf most storage", () => {
    expect(storageCapacity("cedar_freestanding_shelf")).toBeGreaterThan(storageCapacity("wall_mount_drop_leaf"));
  });
});

describe("weatherResist", () => {
  it("steel frame galvanized best weather resist", () => {
    expect(weatherResist("steel_frame_galvanized")).toBeGreaterThan(weatherResist("wall_mount_drop_leaf"));
  });
});

describe("portability", () => {
  it("folding portable resin most portable", () => {
    expect(portability("folding_portable_resin")).toBeGreaterThan(portability("potting_sink_basin"));
  });
});

describe("benchCost", () => {
  it("potting sink basin most expensive", () => {
    expect(benchCost("potting_sink_basin")).toBeGreaterThan(benchCost("folding_portable_resin"));
  });
});

describe("hasSink", () => {
  it("potting sink basin has sink", () => {
    expect(hasSink("potting_sink_basin")).toBe(true);
  });
  it("cedar freestanding shelf has no sink", () => {
    expect(hasSink("cedar_freestanding_shelf")).toBe(false);
  });
});

describe("foldable", () => {
  it("folding portable resin is foldable", () => {
    expect(foldable("folding_portable_resin")).toBe(true);
  });
  it("steel frame galvanized is not foldable", () => {
    expect(foldable("steel_frame_galvanized")).toBe(false);
  });
});

describe("topMaterial", () => {
  it("potting sink basin uses stainless steel basin", () => {
    expect(topMaterial("potting_sink_basin")).toBe("stainless_steel_basin");
  });
});

describe("bestSpot", () => {
  it("cedar freestanding shelf best for garden shed permanent", () => {
    expect(bestSpot("cedar_freestanding_shelf")).toBe("garden_shed_permanent");
  });
});

describe("pottingBenches", () => {
  it("returns 5 types", () => {
    expect(pottingBenches()).toHaveLength(5);
  });
});
