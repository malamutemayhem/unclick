import { describe, it, expect } from "vitest";
import {
  wll, sideLoad, ease, durability,
  skCost, quickRelease, forRigging, pin,
  bestUse, shackleTypes,
} from "../shackle-type-calc.js";

describe("wll", () => {
  it("wide body highest wll", () => {
    expect(wll("wide_body_bolt_type")).toBeGreaterThan(wll("screw_pin_quick_connect"));
  });
});

describe("sideLoad", () => {
  it("wide body best side load", () => {
    expect(sideLoad("wide_body_bolt_type")).toBeGreaterThan(sideLoad("chain_dee_straight"));
  });
});

describe("ease", () => {
  it("screw pin easiest", () => {
    expect(ease("screw_pin_quick_connect")).toBeGreaterThan(ease("wide_body_bolt_type"));
  });
});

describe("durability", () => {
  it("wide body most durable", () => {
    expect(durability("wide_body_bolt_type")).toBeGreaterThan(durability("screw_pin_quick_connect"));
  });
});

describe("skCost", () => {
  it("wide body most expensive", () => {
    expect(skCost("wide_body_bolt_type")).toBeGreaterThan(skCost("screw_pin_quick_connect"));
  });
});

describe("quickRelease", () => {
  it("screw pin is quick release", () => {
    expect(quickRelease("screw_pin_quick_connect")).toBe(true);
  });
  it("anchor bow not quick release", () => {
    expect(quickRelease("anchor_bow_omega")).toBe(false);
  });
});

describe("forRigging", () => {
  it("anchor bow for rigging", () => {
    expect(forRigging("anchor_bow_omega")).toBe(true);
  });
  it("screw pin not for rigging", () => {
    expect(forRigging("screw_pin_quick_connect")).toBe(false);
  });
});

describe("pin", () => {
  it("synthetic sling uses smooth round pin", () => {
    expect(pin("synthetic_sling_round_pin")).toBe("smooth_round_pin_large_radius");
  });
});

describe("bestUse", () => {
  it("wide body for heavy lift offshore", () => {
    expect(bestUse("wide_body_bolt_type")).toBe("heavy_lift_offshore_crane_block");
  });
});

describe("shackleTypes", () => {
  it("returns 5 types", () => {
    expect(shackleTypes()).toHaveLength(5);
  });
});
