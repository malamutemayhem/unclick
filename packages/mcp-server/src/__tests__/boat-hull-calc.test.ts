import { describe, it, expect } from "vitest";
import {
  stabilityAtRest, roughWater, topSpeed, cargoCapacity,
  hullCost, planing, shallowDraft, hullShape,
  bestWater, boatHulls,
} from "../boat-hull-calc.js";

describe("stabilityAtRest", () => {
  it("flat bottom most stable at rest", () => {
    expect(stabilityAtRest("flat_bottom")).toBeGreaterThan(stabilityAtRest("v_hull_deep"));
  });
});

describe("roughWater", () => {
  it("v hull deep best in rough water", () => {
    expect(roughWater("v_hull_deep")).toBeGreaterThan(roughWater("flat_bottom"));
  });
});

describe("topSpeed", () => {
  it("catamaran twin fastest", () => {
    expect(topSpeed("catamaran_twin")).toBeGreaterThan(topSpeed("displacement_round"));
  });
});

describe("cargoCapacity", () => {
  it("pontoon tube most cargo", () => {
    expect(cargoCapacity("pontoon_tube")).toBeGreaterThan(cargoCapacity("v_hull_deep"));
  });
});

describe("hullCost", () => {
  it("catamaran twin most expensive", () => {
    expect(hullCost("catamaran_twin")).toBeGreaterThan(hullCost("flat_bottom"));
  });
});

describe("planing", () => {
  it("v hull deep is planing", () => {
    expect(planing("v_hull_deep")).toBe(true);
  });
  it("displacement round is not", () => {
    expect(planing("displacement_round")).toBe(false);
  });
});

describe("shallowDraft", () => {
  it("flat bottom has shallow draft", () => {
    expect(shallowDraft("flat_bottom")).toBe(true);
  });
  it("v hull deep does not", () => {
    expect(shallowDraft("v_hull_deep")).toBe(false);
  });
});

describe("hullShape", () => {
  it("pontoon tube uses aluminum tube platform", () => {
    expect(hullShape("pontoon_tube")).toBe("aluminum_tube_platform");
  });
});

describe("bestWater", () => {
  it("v hull deep for offshore ocean cruising", () => {
    expect(bestWater("v_hull_deep")).toBe("offshore_ocean_cruising");
  });
});

describe("boatHulls", () => {
  it("returns 5 types", () => {
    expect(boatHulls()).toHaveLength(5);
  });
});
