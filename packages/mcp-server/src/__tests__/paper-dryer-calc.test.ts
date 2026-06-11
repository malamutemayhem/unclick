import { describe, it, expect } from "vitest";
import {
  dryingRate, energyEfficiency, paperQuality, throughput,
  drCost, contactDrying, forTissue, dryerConfig,
  bestUse, paperDryerTypes,
} from "../paper-dryer-calc.js";

describe("dryingRate", () => {
  it("infrared dryer fastest drying rate", () => {
    expect(dryingRate("infrared_dryer")).toBeGreaterThanOrEqual(dryingRate("impulse_dryer"));
  });
});

describe("energyEfficiency", () => {
  it("impulse dryer best energy efficiency", () => {
    expect(energyEfficiency("impulse_dryer")).toBeGreaterThan(energyEfficiency("infrared_dryer"));
  });
});

describe("paperQuality", () => {
  it("air float best paper quality", () => {
    expect(paperQuality("air_float")).toBeGreaterThan(paperQuality("infrared_dryer"));
  });
});

describe("throughput", () => {
  it("yankee dryer highest throughput", () => {
    expect(throughput("yankee_dryer")).toBeGreaterThan(throughput("impulse_dryer"));
  });
});

describe("drCost", () => {
  it("impulse dryer most expensive", () => {
    expect(drCost("impulse_dryer")).toBeGreaterThan(drCost("multi_cylinder"));
  });
});

describe("contactDrying", () => {
  it("multi cylinder is contact drying", () => {
    expect(contactDrying("multi_cylinder")).toBe(true);
  });
  it("air float not contact drying", () => {
    expect(contactDrying("air_float")).toBe(false);
  });
});

describe("forTissue", () => {
  it("yankee dryer for tissue", () => {
    expect(forTissue("yankee_dryer")).toBe(true);
  });
  it("multi cylinder not for tissue", () => {
    expect(forTissue("multi_cylinder")).toBe(false);
  });
});

describe("dryerConfig", () => {
  it("air float uses hot air cushion contactless", () => {
    expect(dryerConfig("air_float")).toBe("air_float_paper_dryer_hot_air_cushion_contactless_coated_dry");
  });
});

describe("bestUse", () => {
  it("yankee dryer for tissue mill creping", () => {
    expect(bestUse("yankee_dryer")).toBe("tissue_mill_yankee_dryer_single_large_drum_creping_soft_tissue");
  });
});

describe("paperDryerTypes", () => {
  it("returns 5 types", () => {
    expect(paperDryerTypes()).toHaveLength(5);
  });
});
