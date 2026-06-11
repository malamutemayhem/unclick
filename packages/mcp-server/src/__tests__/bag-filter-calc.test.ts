import { describe, it, expect } from "vitest";
import {
  filtrationEff, dustLoad, airToCloth, cleaningEase,
  bfCost, continuousClean, forHighTemp, media,
  bestUse, bagFilterTypes,
} from "../bag-filter-calc.js";

describe("filtrationEff", () => {
  it("ceramic highest filtration efficiency", () => {
    expect(filtrationEff("high_temp_ceramic")).toBeGreaterThan(filtrationEff("shaker_mechanical"));
  });
});

describe("dustLoad", () => {
  it("pulse jet handles highest dust load", () => {
    expect(dustLoad("pulse_jet_online")).toBeGreaterThan(dustLoad("shaker_mechanical"));
  });
});

describe("airToCloth", () => {
  it("pleated bag highest air to cloth ratio", () => {
    expect(airToCloth("pleated_bag_compact")).toBeGreaterThan(airToCloth("reverse_air_offline"));
  });
});

describe("cleaningEase", () => {
  it("pulse jet easiest cleaning", () => {
    expect(cleaningEase("pulse_jet_online")).toBeGreaterThan(cleaningEase("shaker_mechanical"));
  });
});

describe("bfCost", () => {
  it("ceramic most expensive", () => {
    expect(bfCost("high_temp_ceramic")).toBeGreaterThan(bfCost("shaker_mechanical"));
  });
});

describe("continuousClean", () => {
  it("pulse jet has continuous cleaning", () => {
    expect(continuousClean("pulse_jet_online")).toBe(true);
  });
  it("reverse air not continuous", () => {
    expect(continuousClean("reverse_air_offline")).toBe(false);
  });
});

describe("forHighTemp", () => {
  it("ceramic for high temp", () => {
    expect(forHighTemp("high_temp_ceramic")).toBe(true);
  });
  it("pulse jet not for high temp", () => {
    expect(forHighTemp("pulse_jet_online")).toBe(false);
  });
});

describe("media", () => {
  it("shaker uses woven cotton", () => {
    expect(media("shaker_mechanical")).toBe("woven_cotton_polyester_mechanical_shake");
  });
});

describe("bestUse", () => {
  it("pleated bag for pharmaceutical", () => {
    expect(bestUse("pleated_bag_compact")).toBe("pharmaceutical_food_compact_space_fine_dust");
  });
});

describe("bagFilterTypes", () => {
  it("returns 5 types", () => {
    expect(bagFilterTypes()).toHaveLength(5);
  });
});
