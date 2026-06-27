import { describe, it, expect } from "vitest";
import {
  oxidationControl, throughput, colorDevelop, flavorDepth,
  toCost, automated, forBlack, oxidizerConfig,
  bestUse, teaOxidizerTypes,
} from "../tea-oxidizer-calc.js";

describe("oxidationControl", () => {
  it("climate chamber best oxidation control", () => {
    expect(oxidationControl("climate_chamber")).toBeGreaterThan(oxidationControl("open_floor"));
  });
});

describe("throughput", () => {
  it("drum continuous highest throughput", () => {
    expect(throughput("drum_continuous")).toBeGreaterThan(throughput("bamboo_basket"));
  });
});

describe("colorDevelop", () => {
  it("climate chamber best color development", () => {
    expect(colorDevelop("climate_chamber")).toBeGreaterThan(colorDevelop("drum_continuous"));
  });
});

describe("flavorDepth", () => {
  it("bamboo basket deepest flavor", () => {
    expect(flavorDepth("bamboo_basket")).toBeGreaterThan(flavorDepth("drum_continuous"));
  });
});

describe("toCost", () => {
  it("climate chamber most expensive", () => {
    expect(toCost("climate_chamber")).toBeGreaterThan(toCost("open_floor"));
  });
});

describe("automated", () => {
  it("trough controlled is automated", () => {
    expect(automated("trough_controlled")).toBe(true);
  });
  it("bamboo basket not automated", () => {
    expect(automated("bamboo_basket")).toBe(false);
  });
});

describe("forBlack", () => {
  it("trough controlled for black tea", () => {
    expect(forBlack("trough_controlled")).toBe(true);
  });
  it("bamboo basket not for black", () => {
    expect(forBlack("bamboo_basket")).toBe(false);
  });
});

describe("oxidizerConfig", () => {
  it("bamboo basket uses toss bruise oolong edge", () => {
    expect(oxidizerConfig("bamboo_basket")).toBe("bamboo_basket_partial_oxidation_toss_bruise_oolong_edge_oxidize");
  });
});

describe("bestUse", () => {
  it("climate chamber for premium tea precise control", () => {
    expect(bestUse("climate_chamber")).toBe("premium_tea_climate_chamber_oxidation_precise_temp_humidity_o2_control");
  });
});

describe("teaOxidizerTypes", () => {
  it("returns 5 types", () => {
    expect(teaOxidizerTypes()).toHaveLength(5);
  });
});
