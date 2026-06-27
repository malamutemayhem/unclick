import { describe, it, expect } from "vitest";
import {
  berryIntegrity, throughput, seedDamage, stemRemoval,
  gcCost, gentle, forPinot, crusherConfig,
  bestUse, grapeCrusherTypes,
} from "../grape-crusher-calc.js";

describe("berryIntegrity", () => {
  it("whole cluster bypass best berry integrity", () => {
    expect(berryIntegrity("whole_cluster_bypass")).toBeGreaterThan(berryIntegrity("centrifugal_crusher"));
  });
});

describe("throughput", () => {
  it("centrifugal crusher highest throughput", () => {
    expect(throughput("centrifugal_crusher")).toBeGreaterThan(throughput("whole_cluster_bypass"));
  });
});

describe("seedDamage", () => {
  it("whole cluster bypass least seed damage", () => {
    expect(seedDamage("whole_cluster_bypass")).toBeGreaterThan(seedDamage("centrifugal_crusher"));
  });
});

describe("stemRemoval", () => {
  it("centrifugal crusher best stem removal", () => {
    expect(stemRemoval("centrifugal_crusher")).toBeGreaterThan(stemRemoval("whole_cluster_bypass"));
  });
});

describe("gcCost", () => {
  it("cryo maceration most expensive", () => {
    expect(gcCost("cryo_maceration")).toBeGreaterThan(gcCost("roller_crusher"));
  });
});

describe("gentle", () => {
  it("bladeless impeller is gentle", () => {
    expect(gentle("bladeless_impeller")).toBe(true);
  });
  it("roller crusher not gentle", () => {
    expect(gentle("roller_crusher")).toBe(false);
  });
});

describe("forPinot", () => {
  it("whole cluster bypass for pinot", () => {
    expect(forPinot("whole_cluster_bypass")).toBe(true);
  });
  it("centrifugal crusher not for pinot", () => {
    expect(forPinot("centrifugal_crusher")).toBe(false);
  });
});

describe("crusherConfig", () => {
  it("cryo maceration uses cold soak dry ice", () => {
    expect(crusherConfig("cryo_maceration")).toBe("cryo_maceration_cold_soak_dry_ice_pre_ferment_color_aroma_extract");
  });
});

describe("bestUse", () => {
  it("centrifugal for bulk wine production", () => {
    expect(bestUse("centrifugal_crusher")).toBe("bulk_wine_production_centrifugal_crusher_high_volume_rapid_process");
  });
});

describe("grapeCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(grapeCrusherTypes()).toHaveLength(5);
  });
});
