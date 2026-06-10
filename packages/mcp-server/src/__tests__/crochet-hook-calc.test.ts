import { describe, it, expect } from "vitest";
import {
  smoothness, comfort, sizeRange, durability,
  hookCost, inlineHook, comesInSet, shaftMaterial,
  bestYarn, crochetHooks,
} from "../crochet-hook-calc.js";

describe("smoothness", () => {
  it("steel lace fine smoothest", () => {
    expect(smoothness("steel_lace_fine")).toBeGreaterThan(smoothness("bamboo_warm_light"));
  });
});

describe("comfort", () => {
  it("ergonomic rubber grip most comfortable", () => {
    expect(comfort("ergonomic_rubber_grip")).toBeGreaterThan(comfort("aluminum_basic_smooth"));
  });
});

describe("sizeRange", () => {
  it("interchangeable set case widest size range", () => {
    expect(sizeRange("interchangeable_set_case")).toBeGreaterThan(sizeRange("bamboo_warm_light"));
  });
});

describe("durability", () => {
  it("steel lace fine most durable", () => {
    expect(durability("steel_lace_fine")).toBeGreaterThan(durability("bamboo_warm_light"));
  });
});

describe("hookCost", () => {
  it("interchangeable set case most expensive", () => {
    expect(hookCost("interchangeable_set_case")).toBeGreaterThan(hookCost("aluminum_basic_smooth"));
  });
});

describe("inlineHook", () => {
  it("aluminum basic smooth is inline", () => {
    expect(inlineHook("aluminum_basic_smooth")).toBe(true);
  });
  it("ergonomic rubber grip is not inline", () => {
    expect(inlineHook("ergonomic_rubber_grip")).toBe(false);
  });
});

describe("comesInSet", () => {
  it("interchangeable set case comes in set", () => {
    expect(comesInSet("interchangeable_set_case")).toBe(true);
  });
  it("steel lace fine does not come in set", () => {
    expect(comesInSet("steel_lace_fine")).toBe(false);
  });
});

describe("shaftMaterial", () => {
  it("bamboo warm light uses moso bamboo natural", () => {
    expect(shaftMaterial("bamboo_warm_light")).toBe("moso_bamboo_natural");
  });
});

describe("bestYarn", () => {
  it("steel lace fine best for thread lace doily", () => {
    expect(bestYarn("steel_lace_fine")).toBe("thread_lace_doily");
  });
});

describe("crochetHooks", () => {
  it("returns 5 types", () => {
    expect(crochetHooks()).toHaveLength(5);
  });
});
