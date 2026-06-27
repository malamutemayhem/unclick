import { describe, it, expect } from "vitest";
import {
  scratchSatisfaction, durability, spaceEfficiency, catEngagement,
  scratcherCost, replaceable, multiCatFriendly, surfaceMaterial,
  bestCat, catScratchers,
} from "../cat-scratcher-calc.js";

describe("scratchSatisfaction", () => {
  it("tree tower multi most satisfying", () => {
    expect(scratchSatisfaction("tree_tower_multi")).toBeGreaterThan(scratchSatisfaction("carpet_ramp_incline"));
  });
});

describe("durability", () => {
  it("wall mount shelf most durable", () => {
    expect(durability("wall_mount_shelf")).toBeGreaterThan(durability("cardboard_pad_flat"));
  });
});

describe("spaceEfficiency", () => {
  it("wall mount shelf most space efficient", () => {
    expect(spaceEfficiency("wall_mount_shelf")).toBeGreaterThan(spaceEfficiency("tree_tower_multi"));
  });
});

describe("catEngagement", () => {
  it("tree tower multi highest engagement", () => {
    expect(catEngagement("tree_tower_multi")).toBeGreaterThan(catEngagement("carpet_ramp_incline"));
  });
});

describe("scratcherCost", () => {
  it("tree tower multi most expensive", () => {
    expect(scratcherCost("tree_tower_multi")).toBeGreaterThan(scratcherCost("cardboard_pad_flat"));
  });
});

describe("replaceable", () => {
  it("cardboard pad flat is replaceable", () => {
    expect(replaceable("cardboard_pad_flat")).toBe(true);
  });
  it("wall mount shelf is not", () => {
    expect(replaceable("wall_mount_shelf")).toBe(false);
  });
});

describe("multiCatFriendly", () => {
  it("tree tower multi is multi cat friendly", () => {
    expect(multiCatFriendly("tree_tower_multi")).toBe(true);
  });
  it("sisal post vertical is not", () => {
    expect(multiCatFriendly("sisal_post_vertical")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("sisal post vertical uses natural sisal rope", () => {
    expect(surfaceMaterial("sisal_post_vertical")).toBe("natural_sisal_rope");
  });
});

describe("bestCat", () => {
  it("tree tower multi best for energetic multi cat home", () => {
    expect(bestCat("tree_tower_multi")).toBe("energetic_multi_cat_home");
  });
});

describe("catScratchers", () => {
  it("returns 5 types", () => {
    expect(catScratchers()).toHaveLength(5);
  });
});
