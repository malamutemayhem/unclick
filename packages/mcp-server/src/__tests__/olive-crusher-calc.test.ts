import { describe, it, expect } from "vitest";
import {
  pasteFineness, throughput, heatGeneration, polyphenolRetention,
  ocCost, continuous, forExtraVirgin, crusherConfig,
  bestUse, oliveCrusherTypes,
} from "../olive-crusher-calc.js";

describe("pasteFineness", () => {
  it("blade crusher finest paste", () => {
    expect(pasteFineness("blade_crusher")).toBeGreaterThan(pasteFineness("stone_mill"));
  });
});

describe("throughput", () => {
  it("hammer crusher highest throughput", () => {
    expect(throughput("hammer_crusher")).toBeGreaterThan(throughput("stone_mill"));
  });
});

describe("heatGeneration", () => {
  it("stone mill least heat generation", () => {
    expect(heatGeneration("stone_mill")).toBeGreaterThan(heatGeneration("blade_crusher"));
  });
});

describe("polyphenolRetention", () => {
  it("stone mill best polyphenol retention", () => {
    expect(polyphenolRetention("stone_mill")).toBeGreaterThan(polyphenolRetention("blade_crusher"));
  });
});

describe("ocCost", () => {
  it("de pitter most expensive", () => {
    expect(ocCost("de_pitter")).toBeGreaterThan(ocCost("stone_mill"));
  });
});

describe("continuous", () => {
  it("hammer crusher is continuous", () => {
    expect(continuous("hammer_crusher")).toBe(true);
  });
  it("stone mill not continuous", () => {
    expect(continuous("stone_mill")).toBe(false);
  });
});

describe("forExtraVirgin", () => {
  it("stone mill for extra virgin", () => {
    expect(forExtraVirgin("stone_mill")).toBe(true);
  });
  it("blade crusher not for extra virgin", () => {
    expect(forExtraVirgin("blade_crusher")).toBe(false);
  });
});

describe("crusherConfig", () => {
  it("de pitter uses pit remove flesh only", () => {
    expect(crusherConfig("de_pitter")).toBe("de_pitter_crusher_pit_remove_flesh_only_crush_delicate_fruity_oil");
  });
});

describe("bestUse", () => {
  it("stone mill for traditional estate premium", () => {
    expect(bestUse("stone_mill")).toBe("traditional_estate_stone_mill_slow_crush_premium_extra_virgin_cold");
  });
});

describe("oliveCrusherTypes", () => {
  it("returns 5 types", () => {
    expect(oliveCrusherTypes()).toHaveLength(5);
  });
});
