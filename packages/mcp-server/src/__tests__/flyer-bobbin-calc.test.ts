import { describe, it, expect } from "vitest";
import {
  yarnCapacity, windEven, spinSpeed, weightBalance,
  bobbinCost, adjustable, highSpeed, coreMaterial,
  bestUse, flyerBobbins,
} from "../flyer-bobbin-calc.js";

describe("yarnCapacity", () => {
  it("jumbo bulk large highest capacity", () => {
    expect(yarnCapacity("jumbo_bulk_large")).toBeGreaterThan(yarnCapacity("lace_weight_small"));
  });
});

describe("windEven", () => {
  it("sliding hook adjust most even wind", () => {
    expect(windEven("sliding_hook_adjust")).toBeGreaterThan(windEven("jumbo_bulk_large"));
  });
});

describe("spinSpeed", () => {
  it("delta high speed fastest spin", () => {
    expect(spinSpeed("delta_high_speed")).toBeGreaterThan(spinSpeed("jumbo_bulk_large"));
  });
});

describe("weightBalance", () => {
  it("delta high speed best balance", () => {
    expect(weightBalance("delta_high_speed")).toBeGreaterThan(weightBalance("jumbo_bulk_large"));
  });
});

describe("bobbinCost", () => {
  it("delta high speed most expensive", () => {
    expect(bobbinCost("delta_high_speed")).toBeGreaterThan(bobbinCost("standard_wood_round"));
  });
});

describe("adjustable", () => {
  it("sliding hook adjust is adjustable", () => {
    expect(adjustable("sliding_hook_adjust")).toBe(true);
  });
  it("standard wood round not adjustable", () => {
    expect(adjustable("standard_wood_round")).toBe(false);
  });
});

describe("highSpeed", () => {
  it("delta high speed is high speed", () => {
    expect(highSpeed("delta_high_speed")).toBe(true);
  });
  it("standard wood round not high speed", () => {
    expect(highSpeed("standard_wood_round")).toBe(false);
  });
});

describe("coreMaterial", () => {
  it("standard wood round uses hardwood turned", () => {
    expect(coreMaterial("standard_wood_round")).toBe("hardwood_turned");
  });
});

describe("bestUse", () => {
  it("jumbo bulk large best for bulky art yarn", () => {
    expect(bestUse("jumbo_bulk_large")).toBe("bulky_art_yarn");
  });
});

describe("flyerBobbins", () => {
  it("returns 5 types", () => {
    expect(flyerBobbins()).toHaveLength(5);
  });
});
