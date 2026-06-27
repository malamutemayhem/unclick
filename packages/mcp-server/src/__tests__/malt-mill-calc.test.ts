import { describe, it, expect } from "vitest";
import {
  grindConsistency, throughput, huskPreservation, adjustability,
  mmCost, wetProcess, forCraft, millConfig,
  bestUse, maltMillTypes,
} from "../malt-mill-calc.js";

describe("grindConsistency", () => {
  it("six roller best grind consistency", () => {
    expect(grindConsistency("six_roller")).toBeGreaterThan(grindConsistency("two_roller"));
  });
});

describe("throughput", () => {
  it("six roller highest throughput", () => {
    expect(throughput("six_roller")).toBeGreaterThan(throughput("four_roller"));
  });
});

describe("huskPreservation", () => {
  it("wet mill best husk preservation", () => {
    expect(huskPreservation("wet_mill")).toBeGreaterThan(huskPreservation("hammer_mill"));
  });
});

describe("adjustability", () => {
  it("six roller best adjustability", () => {
    expect(adjustability("six_roller")).toBeGreaterThan(adjustability("hammer_mill"));
  });
});

describe("mmCost", () => {
  it("six roller most expensive", () => {
    expect(mmCost("six_roller")).toBeGreaterThan(mmCost("two_roller"));
  });
});

describe("wetProcess", () => {
  it("wet mill uses wet process", () => {
    expect(wetProcess("wet_mill")).toBe(true);
  });
  it("four roller not wet process", () => {
    expect(wetProcess("four_roller")).toBe(false);
  });
});

describe("forCraft", () => {
  it("two roller for craft", () => {
    expect(forCraft("two_roller")).toBe(true);
  });
  it("six roller not for craft", () => {
    expect(forCraft("six_roller")).toBe(false);
  });
});

describe("millConfig", () => {
  it("hammer mill uses impact grind fine flour", () => {
    expect(millConfig("hammer_mill")).toBe("hammer_mill_malt_impact_grind_fine_flour_mash_filter_process");
  });
});

describe("bestUse", () => {
  it("four roller for mid size craft brewery", () => {
    expect(bestUse("four_roller")).toBe("mid_size_craft_brewery_four_roller_mill_husk_intact_lauter_aid");
  });
});

describe("maltMillTypes", () => {
  it("returns 5 types", () => {
    expect(maltMillTypes()).toHaveLength(5);
  });
});
