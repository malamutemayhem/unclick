import { describe, it, expect } from "vitest";
import {
  extractionControl, brewConsistency, throughput, flavorClarity,
  cbCost, automated, forSpecialty, brewerConfig,
  bestUse, coffeeBrewerTypes,
} from "../coffee-brewer-calc.js";

describe("extractionControl", () => {
  it("siphon vacuum best extraction control", () => {
    expect(extractionControl("siphon_vacuum")).toBeGreaterThan(extractionControl("batch_brewer"));
  });
});

describe("brewConsistency", () => {
  it("batch brewer best brew consistency", () => {
    expect(brewConsistency("batch_brewer")).toBeGreaterThan(brewConsistency("turkish_ibrik"));
  });
});

describe("throughput", () => {
  it("batch brewer highest throughput", () => {
    expect(throughput("batch_brewer")).toBeGreaterThan(throughput("siphon_vacuum"));
  });
});

describe("flavorClarity", () => {
  it("pour over drip best flavor clarity", () => {
    expect(flavorClarity("pour_over_drip")).toBeGreaterThan(flavorClarity("turkish_ibrik"));
  });
});

describe("cbCost", () => {
  it("siphon vacuum most expensive", () => {
    expect(cbCost("siphon_vacuum")).toBeGreaterThan(cbCost("turkish_ibrik"));
  });
});

describe("automated", () => {
  it("batch brewer is automated", () => {
    expect(automated("batch_brewer")).toBe(true);
  });
  it("pour over drip not automated", () => {
    expect(automated("pour_over_drip")).toBe(false);
  });
});

describe("forSpecialty", () => {
  it("siphon vacuum for specialty", () => {
    expect(forSpecialty("siphon_vacuum")).toBe(true);
  });
  it("batch brewer not for specialty", () => {
    expect(forSpecialty("batch_brewer")).toBe(false);
  });
});

describe("brewerConfig", () => {
  it("cold brew tower uses slow drip ice water", () => {
    expect(brewerConfig("cold_brew_tower")).toBe("cold_brew_tower_slow_drip_ice_water_glass_column_concentrate");
  });
});

describe("bestUse", () => {
  it("batch brewer for high volume cafe", () => {
    expect(bestUse("batch_brewer")).toBe("high_volume_cafe_batch_brewer_consistent_automatic_large_serve");
  });
});

describe("coffeeBrewerTypes", () => {
  it("returns 5 types", () => {
    expect(coffeeBrewerTypes()).toHaveLength(5);
  });
});
