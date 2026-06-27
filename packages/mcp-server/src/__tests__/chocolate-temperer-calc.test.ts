import { describe, it, expect } from "vitest";
import {
  crystalControl, throughput, snapQuality, glossFinish,
  ctCost, continuous, forCouverture, tempererConfig,
  bestUse, chocolateTempererTypes,
} from "../chocolate-temperer-calc.js";

describe("crystalControl", () => {
  it("seed injection best crystal control", () => {
    expect(crystalControl("seed_injection")).toBeGreaterThan(crystalControl("batch_kettle"));
  });
});

describe("throughput", () => {
  it("continuous multi zone highest throughput", () => {
    expect(throughput("continuous_multi_zone")).toBeGreaterThan(throughput("table_marble"));
  });
});

describe("snapQuality", () => {
  it("seed injection best snap quality", () => {
    expect(snapQuality("seed_injection")).toBeGreaterThan(snapQuality("scraped_surface"));
  });
});

describe("glossFinish", () => {
  it("table marble best gloss finish", () => {
    expect(glossFinish("table_marble")).toBeGreaterThan(glossFinish("batch_kettle"));
  });
});

describe("ctCost", () => {
  it("seed injection most expensive", () => {
    expect(ctCost("seed_injection")).toBeGreaterThan(ctCost("table_marble"));
  });
});

describe("continuous", () => {
  it("continuous multi zone is continuous", () => {
    expect(continuous("continuous_multi_zone")).toBe(true);
  });
  it("table marble not continuous", () => {
    expect(continuous("table_marble")).toBe(false);
  });
});

describe("forCouverture", () => {
  it("all temperers for couverture", () => {
    expect(forCouverture("seed_injection")).toBe(true);
    expect(forCouverture("batch_kettle")).toBe(true);
  });
});

describe("tempererConfig", () => {
  it("seed injection uses cocoa butter crystal seed", () => {
    expect(tempererConfig("seed_injection")).toBe("seed_injection_temperer_cocoa_butter_crystal_seed_precise_nucleate");
  });
});

describe("bestUse", () => {
  it("table marble for artisan chocolatier", () => {
    expect(bestUse("table_marble")).toBe("artisan_chocolatier_marble_table_temper_hand_craft_truffle_bonbon");
  });
});

describe("chocolateTempererTypes", () => {
  it("returns 5 types", () => {
    expect(chocolateTempererTypes()).toHaveLength(5);
  });
});
