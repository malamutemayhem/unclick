import { describe, it, expect } from "vitest";
import {
  planingSmooth, beadCut, controlRoll, durability,
  skewCost, forBeginners, radiusEdge, crossSection,
  bestUse, skewChisels,
} from "../skew-chisel-calc.js";

describe("planingSmooth", () => {
  it("wide skew planing smoothest planing", () => {
    expect(planingSmooth("wide_skew_planing")).toBeGreaterThan(planingSmooth("mini_skew_detail"));
  });
});

describe("beadCut", () => {
  it("mini skew detail best bead cut", () => {
    expect(beadCut("mini_skew_detail")).toBeGreaterThan(beadCut("wide_skew_planing"));
  });
});

describe("controlRoll", () => {
  it("radius skew round best roll control", () => {
    expect(controlRoll("radius_skew_round")).toBeGreaterThan(controlRoll("wide_skew_planing"));
  });
});

describe("durability", () => {
  it("wide skew planing most durable", () => {
    expect(durability("wide_skew_planing")).toBeGreaterThan(durability("mini_skew_detail"));
  });
});

describe("skewCost", () => {
  it("radius skew round most expensive", () => {
    expect(skewCost("radius_skew_round")).toBeGreaterThan(skewCost("mini_skew_detail"));
  });
});

describe("forBeginners", () => {
  it("oval skew standard is for beginners", () => {
    expect(forBeginners("oval_skew_standard")).toBe(true);
  });
  it("flat skew traditional not for beginners", () => {
    expect(forBeginners("flat_skew_traditional")).toBe(false);
  });
});

describe("radiusEdge", () => {
  it("radius skew round has radius edge", () => {
    expect(radiusEdge("radius_skew_round")).toBe(true);
  });
  it("oval skew standard no radius edge", () => {
    expect(radiusEdge("oval_skew_standard")).toBe(false);
  });
});

describe("crossSection", () => {
  it("flat skew traditional uses flat bar stock", () => {
    expect(crossSection("flat_skew_traditional")).toBe("flat_bar_stock");
  });
});

describe("bestUse", () => {
  it("radius skew round best for catch resistant turn", () => {
    expect(bestUse("radius_skew_round")).toBe("catch_resistant_turn");
  });
});

describe("skewChisels", () => {
  it("returns 5 types", () => {
    expect(skewChisels()).toHaveLength(5);
  });
});
