import { describe, it, expect } from "vitest";
import {
  holdingCapacity, installEase, durability, spaceEfficiency,
  hookCost, noDrilling, foldFlat, hookMaterial,
  bestSpace, coatHooks,
} from "../coat-hook-calc.js";

describe("holdingCapacity", () => {
  it("freestanding tree rack highest capacity", () => {
    expect(holdingCapacity("freestanding_tree_rack")).toBeGreaterThan(holdingCapacity("adhesive_stick_on"));
  });
});

describe("installEase", () => {
  it("over door hanger easiest install", () => {
    expect(installEase("over_door_hanger")).toBeGreaterThan(installEase("rail_multi_hook"));
  });
});

describe("durability", () => {
  it("wall mount single most durable", () => {
    expect(durability("wall_mount_single")).toBeGreaterThan(durability("adhesive_stick_on"));
  });
});

describe("spaceEfficiency", () => {
  it("adhesive stick on most space efficient", () => {
    expect(spaceEfficiency("adhesive_stick_on")).toBeGreaterThan(spaceEfficiency("freestanding_tree_rack"));
  });
});

describe("hookCost", () => {
  it("freestanding tree rack most expensive", () => {
    expect(hookCost("freestanding_tree_rack")).toBeGreaterThan(hookCost("adhesive_stick_on"));
  });
});

describe("noDrilling", () => {
  it("over door hanger needs no drilling", () => {
    expect(noDrilling("over_door_hanger")).toBe(true);
  });
  it("wall mount single needs drilling", () => {
    expect(noDrilling("wall_mount_single")).toBe(false);
  });
});

describe("foldFlat", () => {
  it("wall mount single folds flat", () => {
    expect(foldFlat("wall_mount_single")).toBe(true);
  });
  it("over door hanger does not", () => {
    expect(foldFlat("over_door_hanger")).toBe(false);
  });
});

describe("hookMaterial", () => {
  it("freestanding tree rack uses solid wood oak", () => {
    expect(hookMaterial("freestanding_tree_rack")).toBe("solid_wood_oak");
  });
});

describe("bestSpace", () => {
  it("over door hanger best for rental apartment dorm", () => {
    expect(bestSpace("over_door_hanger")).toBe("rental_apartment_dorm");
  });
});

describe("coatHooks", () => {
  it("returns 5 types", () => {
    expect(coatHooks()).toHaveLength(5);
  });
});
