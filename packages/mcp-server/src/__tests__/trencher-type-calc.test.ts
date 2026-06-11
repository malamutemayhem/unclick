import { describe, it, expect } from "vitest";
import {
  depth, speed, width, versatility,
  trCost, selfPropelled, forUtility, cutter,
  bestUse, trencherTypes,
} from "../trencher-type-calc.js";

describe("depth", () => {
  it("chain trencher deepest", () => {
    expect(depth("chain_trencher_ladder")).toBeGreaterThan(depth("micro_trencher_fiber"));
  });
});

describe("speed", () => {
  it("micro trencher fastest", () => {
    expect(speed("micro_trencher_fiber")).toBeGreaterThan(speed("portable_walk_behind"));
  });
});

describe("width", () => {
  it("wheel trencher widest", () => {
    expect(width("wheel_trencher_rockwheel")).toBeGreaterThan(width("micro_trencher_fiber"));
  });
});

describe("versatility", () => {
  it("portable most versatile", () => {
    expect(versatility("portable_walk_behind")).toBeGreaterThan(versatility("micro_trencher_fiber"));
  });
});

describe("trCost", () => {
  it("wheel trencher most expensive", () => {
    expect(trCost("wheel_trencher_rockwheel")).toBeGreaterThan(trCost("portable_walk_behind"));
  });
});

describe("selfPropelled", () => {
  it("chain trencher is self propelled", () => {
    expect(selfPropelled("chain_trencher_ladder")).toBe(true);
  });
  it("portable not self propelled", () => {
    expect(selfPropelled("portable_walk_behind")).toBe(false);
  });
});

describe("forUtility", () => {
  it("chain trencher for utility", () => {
    expect(forUtility("chain_trencher_ladder")).toBe(true);
  });
  it("portable not for utility", () => {
    expect(forUtility("portable_walk_behind")).toBe(false);
  });
});

describe("cutter", () => {
  it("micro uses diamond blade", () => {
    expect(cutter("micro_trencher_fiber")).toBe("diamond_blade_narrow_slot");
  });
});

describe("bestUse", () => {
  it("chain for deep utility trench", () => {
    expect(bestUse("chain_trencher_ladder")).toBe("deep_utility_trench_pipe_cable");
  });
});

describe("trencherTypes", () => {
  it("returns 5 types", () => {
    expect(trencherTypes()).toHaveLength(5);
  });
});
