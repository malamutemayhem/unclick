import { describe, it, expect } from "vitest";
import {
  btuPerCord, seasoningMonths, sparkLevel,
  coalQuality, splitEase, creosoteRisk,
  aromaRating, densityKgPerM3, costPerCord, firewoodSpecies,
} from "../firewood-calc.js";

describe("btuPerCord", () => {
  it("white oak has highest btu", () => {
    expect(btuPerCord("white_oak")).toBeGreaterThan(
      btuPerCord("pine")
    );
  });
});

describe("seasoningMonths", () => {
  it("white oak needs longest seasoning", () => {
    expect(seasoningMonths("white_oak")).toBeGreaterThan(
      seasoningMonths("birch")
    );
  });
});

describe("sparkLevel", () => {
  it("pine sparks most", () => {
    expect(sparkLevel("pine")).toBeGreaterThan(
      sparkLevel("ash")
    );
  });
});

describe("coalQuality", () => {
  it("white oak makes best coals", () => {
    expect(coalQuality("white_oak")).toBeGreaterThan(
      coalQuality("pine")
    );
  });
});

describe("splitEase", () => {
  it("ash splits easiest", () => {
    expect(splitEase("ash")).toBeGreaterThan(
      splitEase("white_oak")
    );
  });
});

describe("creosoteRisk", () => {
  it("pine has highest creosote risk", () => {
    expect(creosoteRisk("pine")).toBeGreaterThan(
      creosoteRisk("ash")
    );
  });
});

describe("aromaRating", () => {
  it("sugar maple has best aroma", () => {
    expect(aromaRating("sugar_maple")).toBeGreaterThan(
      aromaRating("ash")
    );
  });
});

describe("densityKgPerM3", () => {
  it("white oak is densest", () => {
    expect(densityKgPerM3("white_oak")).toBeGreaterThan(
      densityKgPerM3("pine")
    );
  });
});

describe("costPerCord", () => {
  it("white oak costs most", () => {
    expect(costPerCord("white_oak")).toBeGreaterThan(
      costPerCord("pine")
    );
  });
});

describe("firewoodSpecies", () => {
  it("returns 5 species", () => {
    expect(firewoodSpecies()).toHaveLength(5);
  });
});
