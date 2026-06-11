import { describe, it, expect } from "vitest";
import {
  trenchDepth, trenchSpeed, rockCapability, precision,
  trCost, selfPropelled, forUtility, cutting,
  bestUse, trencherTypes,
} from "../trencher-calc.js";

describe("trenchDepth", () => {
  it("wheel trencher deepest trench", () => {
    expect(trenchDepth("wheel_trencher")).toBeGreaterThan(trenchDepth("micro_trencher"));
  });
});

describe("trenchSpeed", () => {
  it("micro trencher fastest", () => {
    expect(trenchSpeed("micro_trencher")).toBeGreaterThan(trenchSpeed("rock_wheel"));
  });
});

describe("rockCapability", () => {
  it("rock wheel best rock capability", () => {
    expect(rockCapability("rock_wheel")).toBeGreaterThan(rockCapability("portable_walk_behind"));
  });
});

describe("precision", () => {
  it("micro trencher most precise", () => {
    expect(precision("micro_trencher")).toBeGreaterThan(precision("wheel_trencher"));
  });
});

describe("trCost", () => {
  it("rock wheel most expensive", () => {
    expect(trCost("rock_wheel")).toBeGreaterThan(trCost("portable_walk_behind"));
  });
});

describe("selfPropelled", () => {
  it("chain trencher is self propelled", () => {
    expect(selfPropelled("chain_trencher")).toBe(true);
  });
  it("portable walk behind not self propelled", () => {
    expect(selfPropelled("portable_walk_behind")).toBe(false);
  });
});

describe("forUtility", () => {
  it("chain trencher for utility", () => {
    expect(forUtility("chain_trencher")).toBe(true);
  });
  it("rock wheel not for utility", () => {
    expect(forUtility("rock_wheel")).toBe(false);
  });
});

describe("cutting", () => {
  it("micro trencher uses diamond blade", () => {
    expect(cutting("micro_trencher")).toBe("diamond_blade_narrow_slot_fiber_optic_micro_duct_install");
  });
});

describe("bestUse", () => {
  it("portable walk behind for landscape irrigation", () => {
    expect(bestUse("portable_walk_behind")).toBe("landscape_irrigation_sprinkler_line_small_cable_residential");
  });
});

describe("trencherTypes", () => {
  it("returns 5 types", () => {
    expect(trencherTypes()).toHaveLength(5);
  });
});
