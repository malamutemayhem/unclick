import { describe, it, expect } from "vitest";
import {
  cleaningEfficiency, throughput, particleRemoval, waterUsage,
  vwCost, forSterile, forLyophilized, washerConfig,
  bestUse, vialWasherTypes,
} from "../vial-washer-calc.js";

describe("cleaningEfficiency", () => {
  it("linear tunnel best cleaning efficiency", () => {
    expect(cleaningEfficiency("linear_tunnel")).toBeGreaterThan(cleaningEfficiency("air_rinse_only"));
  });
});

describe("throughput", () => {
  it("linear tunnel highest throughput", () => {
    expect(throughput("linear_tunnel")).toBeGreaterThan(throughput("ultrasonic_wash"));
  });
});

describe("particleRemoval", () => {
  it("linear tunnel best particle removal", () => {
    expect(particleRemoval("linear_tunnel")).toBeGreaterThan(particleRemoval("air_rinse_only"));
  });
});

describe("waterUsage", () => {
  it("high purity wfi most water usage", () => {
    expect(waterUsage("high_purity_wfi")).toBeGreaterThan(waterUsage("air_rinse_only"));
  });
});

describe("vwCost", () => {
  it("high purity wfi most expensive", () => {
    expect(vwCost("high_purity_wfi")).toBeGreaterThan(vwCost("air_rinse_only"));
  });
});

describe("forSterile", () => {
  it("rotary jet for sterile", () => {
    expect(forSterile("rotary_jet")).toBe(true);
  });
  it("air rinse only not for sterile", () => {
    expect(forSterile("air_rinse_only")).toBe(false);
  });
});

describe("forLyophilized", () => {
  it("linear tunnel for lyophilized", () => {
    expect(forLyophilized("linear_tunnel")).toBe(true);
  });
  it("rotary jet not for lyophilized", () => {
    expect(forLyophilized("rotary_jet")).toBe(false);
  });
});

describe("washerConfig", () => {
  it("ultrasonic wash uses cavitation clean rinse residue remove", () => {
    expect(washerConfig("ultrasonic_wash")).toBe("ultrasonic_vial_washer_cavitation_clean_rinse_residue_remove");
  });
});

describe("bestUse", () => {
  it("air rinse only for nutraceutical dust removal dry fill line", () => {
    expect(bestUse("air_rinse_only")).toBe("nutraceutical_air_rinse_vial_washer_dust_removal_dry_fill_line");
  });
});

describe("vialWasherTypes", () => {
  it("returns 5 types", () => {
    expect(vialWasherTypes()).toHaveLength(5);
  });
});
