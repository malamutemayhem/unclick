import { describe, it, expect } from "vitest";
import {
  tempControl, throughput, crystalQuality, repeatability,
  tuCost, automated, forChocolate, temperConfig,
  bestUse, temperingUnitTypes,
} from "../tempering-unit-calc.js";

describe("tempControl", () => {
  it("multi zone best temp control", () => {
    expect(tempControl("multi_zone_temper")).toBeGreaterThan(tempControl("batch_temper"));
  });
});

describe("throughput", () => {
  it("continuous temper highest throughput", () => {
    expect(throughput("continuous_temper")).toBeGreaterThan(throughput("batch_temper"));
  });
});

describe("crystalQuality", () => {
  it("seed temper best crystal quality", () => {
    expect(crystalQuality("seed_temper")).toBeGreaterThan(crystalQuality("batch_temper"));
  });
});

describe("repeatability", () => {
  it("multi zone best repeatability", () => {
    expect(repeatability("multi_zone_temper")).toBeGreaterThan(repeatability("batch_temper"));
  });
});

describe("tuCost", () => {
  it("multi zone most expensive", () => {
    expect(tuCost("multi_zone_temper")).toBeGreaterThan(tuCost("batch_temper"));
  });
});

describe("automated", () => {
  it("continuous temper is automated", () => {
    expect(automated("continuous_temper")).toBe(true);
  });
  it("batch temper not automated", () => {
    expect(automated("batch_temper")).toBe(false);
  });
});

describe("forChocolate", () => {
  it("continuous temper for chocolate", () => {
    expect(forChocolate("continuous_temper")).toBe(true);
  });
  it("scraped surface not for chocolate", () => {
    expect(forChocolate("scraped_surface")).toBe(false);
  });
});

describe("temperConfig", () => {
  it("seed temper uses inject cocoa butter seed crystal nucleate fast", () => {
    expect(temperConfig("seed_temper")).toBe("seed_temper_unit_inject_cocoa_butter_seed_crystal_nucleate_fast");
  });
});

describe("bestUse", () => {
  it("scraped surface for margarine fat crystal texture spread", () => {
    expect(bestUse("scraped_surface")).toBe("margarine_scraped_surface_temper_unit_fat_crystal_texture_spread");
  });
});

describe("temperingUnitTypes", () => {
  it("returns 5 types", () => {
    expect(temperingUnitTypes()).toHaveLength(5);
  });
});
