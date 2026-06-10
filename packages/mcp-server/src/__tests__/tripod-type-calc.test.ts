import { describe, it, expect } from "vitest";
import {
  loadCapacity, stability, portability, maxHeight,
  tripodCost, hasFluidHead, foldingLegs, legMaterial,
  bestUse, tripodTypes,
} from "../tripod-type-calc.js";

describe("loadCapacity", () => {
  it("video fluid highest capacity", () => {
    expect(loadCapacity("video_fluid")).toBeGreaterThan(loadCapacity("tabletop_mini"));
  });
});

describe("stability", () => {
  it("video fluid most stable", () => {
    expect(stability("video_fluid")).toBeGreaterThan(stability("monopod"));
  });
});

describe("portability", () => {
  it("tabletop mini most portable", () => {
    expect(portability("tabletop_mini")).toBeGreaterThan(portability("video_fluid"));
  });
});

describe("maxHeight", () => {
  it("monopod tallest", () => {
    expect(maxHeight("monopod")).toBeGreaterThan(maxHeight("tabletop_mini"));
  });
});

describe("tripodCost", () => {
  it("video fluid most expensive", () => {
    expect(tripodCost("video_fluid")).toBeGreaterThan(tripodCost("tabletop_mini"));
  });
});

describe("hasFluidHead", () => {
  it("video fluid has fluid head", () => {
    expect(hasFluidHead("video_fluid")).toBe(true);
  });
  it("carbon fiber does not", () => {
    expect(hasFluidHead("carbon_fiber")).toBe(false);
  });
});

describe("foldingLegs", () => {
  it("aluminum travel has folding legs", () => {
    expect(foldingLegs("aluminum_travel")).toBe(true);
  });
  it("monopod does not", () => {
    expect(foldingLegs("monopod")).toBe(false);
  });
});

describe("legMaterial", () => {
  it("carbon fiber uses layered carbon fiber tube", () => {
    expect(legMaterial("carbon_fiber")).toBe("layered_carbon_fiber_tube");
  });
});

describe("bestUse", () => {
  it("tabletop mini for vlogging product macro", () => {
    expect(bestUse("tabletop_mini")).toBe("vlogging_product_macro");
  });
});

describe("tripodTypes", () => {
  it("returns 5 types", () => {
    expect(tripodTypes()).toHaveLength(5);
  });
});
