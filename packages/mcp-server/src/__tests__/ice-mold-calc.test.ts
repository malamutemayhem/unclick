import { describe, it, expect } from "vitest";
import {
  meltRate, dilutionControl, visualAppeal, makeEase,
  moldCost, clearIce, stackable, moldMaterial,
  bestDrink, iceMolds,
} from "../ice-mold-calc.js";

describe("meltRate", () => {
  it("sphere large whiskey slowest melt rate", () => {
    expect(meltRate("sphere_large_whiskey")).toBeGreaterThan(meltRate("crushed_bag_lewis"));
  });
});

describe("dilutionControl", () => {
  it("sphere large whiskey best dilution control", () => {
    expect(dilutionControl("sphere_large_whiskey")).toBeGreaterThan(dilutionControl("nugget_pebble_tray"));
  });
});

describe("visualAppeal", () => {
  it("diamond gem novelty best visual appeal", () => {
    expect(visualAppeal("diamond_gem_novelty")).toBeGreaterThan(visualAppeal("crushed_bag_lewis"));
  });
});

describe("makeEase", () => {
  it("nugget pebble tray easiest to make", () => {
    expect(makeEase("nugget_pebble_tray")).toBeGreaterThan(makeEase("cube_king_clear"));
  });
});

describe("moldCost", () => {
  it("cube king clear most expensive", () => {
    expect(moldCost("cube_king_clear")).toBeGreaterThan(moldCost("crushed_bag_lewis"));
  });
});

describe("clearIce", () => {
  it("cube king clear makes clear ice", () => {
    expect(clearIce("cube_king_clear")).toBe(true);
  });
  it("sphere large whiskey does not", () => {
    expect(clearIce("sphere_large_whiskey")).toBe(false);
  });
});

describe("stackable", () => {
  it("sphere large whiskey is stackable", () => {
    expect(stackable("sphere_large_whiskey")).toBe(true);
  });
  it("cube king clear is not", () => {
    expect(stackable("cube_king_clear")).toBe(false);
  });
});

describe("moldMaterial", () => {
  it("crushed bag lewis uses canvas bag mallet crush", () => {
    expect(moldMaterial("crushed_bag_lewis")).toBe("canvas_bag_mallet_crush");
  });
});

describe("bestDrink", () => {
  it("sphere large whiskey best for neat whiskey old fashioned", () => {
    expect(bestDrink("sphere_large_whiskey")).toBe("neat_whiskey_old_fashioned");
  });
});

describe("iceMolds", () => {
  it("returns 5 types", () => {
    expect(iceMolds()).toHaveLength(5);
  });
});
