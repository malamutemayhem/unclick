import { describe, it, expect } from "vitest";
import {
  liftCapacity, span, liftHeight, speed,
  ocCost, topRunning, forHeavy, hoist,
  bestUse, overheadCraneTypes,
} from "../overhead-crane-calc.js";

describe("liftCapacity", () => {
  it("double girder top highest lift capacity", () => {
    expect(liftCapacity("double_girder_top")).toBeGreaterThan(liftCapacity("underslung"));
  });
});

describe("span", () => {
  it("double girder top longest span", () => {
    expect(span("double_girder_top")).toBeGreaterThan(span("underslung"));
  });
});

describe("liftHeight", () => {
  it("double girder top highest lift", () => {
    expect(liftHeight("double_girder_top")).toBeGreaterThan(liftHeight("underslung"));
  });
});

describe("speed", () => {
  it("double girder top fastest", () => {
    expect(speed("double_girder_top")).toBeGreaterThan(speed("underslung"));
  });
});

describe("ocCost", () => {
  it("gantry outdoor most expensive", () => {
    expect(ocCost("gantry_outdoor")).toBeGreaterThan(ocCost("underslung"));
  });
});

describe("topRunning", () => {
  it("double girder top is top running", () => {
    expect(topRunning("double_girder_top")).toBe(true);
  });
  it("underslung not top running", () => {
    expect(topRunning("underslung")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("gantry outdoor for heavy", () => {
    expect(forHeavy("gantry_outdoor")).toBe(true);
  });
  it("single girder top not for heavy", () => {
    expect(forHeavy("single_girder_top")).toBe(false);
  });
});

describe("hoist", () => {
  it("semi gantry uses one leg one wall rail", () => {
    expect(hoist("semi_gantry")).toBe("one_leg_one_wall_rail_asymmetric_span_mixed_support_hook");
  });
});

describe("bestUse", () => {
  it("underslung for low headroom", () => {
    expect(bestUse("underslung")).toBe("low_headroom_building_retrofit_existing_structure_light");
  });
});

describe("overheadCraneTypes", () => {
  it("returns 5 types", () => {
    expect(overheadCraneTypes()).toHaveLength(5);
  });
});
