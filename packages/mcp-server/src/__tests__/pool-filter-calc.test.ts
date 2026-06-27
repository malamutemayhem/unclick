import { describe, it, expect } from "vitest";
import {
  filtration, maintenance, flow, longevity,
  pfCost, backwash, forCommercial, media,
  bestUse, poolFilterTypes,
} from "../pool-filter-calc.js";

describe("filtration", () => {
  it("de best filtration", () => {
    expect(filtration("de_diatomaceous_earth")).toBeGreaterThan(filtration("sand_media_standard"));
  });
});

describe("maintenance", () => {
  it("glass media lowest maintenance", () => {
    expect(maintenance("glass_media_recycled")).toBeGreaterThan(maintenance("de_diatomaceous_earth"));
  });
});

describe("flow", () => {
  it("regenerative highest flow", () => {
    expect(flow("regenerative_media")).toBeGreaterThan(flow("cartridge_pleated"));
  });
});

describe("longevity", () => {
  it("glass media longest lasting", () => {
    expect(longevity("glass_media_recycled")).toBeGreaterThan(longevity("cartridge_pleated"));
  });
});

describe("pfCost", () => {
  it("regenerative most expensive", () => {
    expect(pfCost("regenerative_media")).toBeGreaterThan(pfCost("sand_media_standard"));
  });
});

describe("backwash", () => {
  it("sand requires backwash", () => {
    expect(backwash("sand_media_standard")).toBe(true);
  });
  it("cartridge no backwash", () => {
    expect(backwash("cartridge_pleated")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("regenerative for commercial", () => {
    expect(forCommercial("regenerative_media")).toBe(true);
  });
  it("sand not commercial", () => {
    expect(forCommercial("sand_media_standard")).toBe(false);
  });
});

describe("media", () => {
  it("glass uses recycled afm", () => {
    expect(media("glass_media_recycled")).toBe("recycled_glass_afm_activated");
  });
});

describe("bestUse", () => {
  it("de for crystal clear water", () => {
    expect(bestUse("de_diatomaceous_earth")).toBe("crystal_clear_water_quality");
  });
});

describe("poolFilterTypes", () => {
  it("returns 5 types", () => {
    expect(poolFilterTypes()).toHaveLength(5);
  });
});
