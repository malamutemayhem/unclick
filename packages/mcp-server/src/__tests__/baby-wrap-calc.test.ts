import { describe, it, expect } from "vitest";
import {
  newbornFit, toddlerSupport, learnCurve, breathability,
  wrapCost, noTying, backCarry, fabricType,
  bestStage, babyWraps,
} from "../baby-wrap-calc.js";

describe("newbornFit", () => {
  it("stretchy jersey knit best newborn fit", () => {
    expect(newbornFit("stretchy_jersey_knit")).toBeGreaterThan(newbornFit("mei_tai_soft_structured"));
  });
});

describe("toddlerSupport", () => {
  it("woven cotton rigid best toddler support", () => {
    expect(toddlerSupport("woven_cotton_rigid")).toBeGreaterThan(toddlerSupport("stretchy_jersey_knit"));
  });
});

describe("learnCurve", () => {
  it("hybrid buckle wrap easiest learn curve", () => {
    expect(learnCurve("hybrid_buckle_wrap")).toBeGreaterThan(learnCurve("woven_cotton_rigid"));
  });
});

describe("breathability", () => {
  it("woven cotton rigid most breathable", () => {
    expect(breathability("woven_cotton_rigid")).toBeGreaterThan(breathability("stretchy_jersey_knit"));
  });
});

describe("wrapCost", () => {
  it("woven cotton rigid most expensive", () => {
    expect(wrapCost("woven_cotton_rigid")).toBeGreaterThan(wrapCost("stretchy_jersey_knit"));
  });
});

describe("noTying", () => {
  it("ring sling shoulder needs no tying", () => {
    expect(noTying("ring_sling_shoulder")).toBe(true);
  });
  it("stretchy jersey knit needs tying", () => {
    expect(noTying("stretchy_jersey_knit")).toBe(false);
  });
});

describe("backCarry", () => {
  it("woven cotton rigid supports back carry", () => {
    expect(backCarry("woven_cotton_rigid")).toBe(true);
  });
  it("stretchy jersey knit does not support back carry", () => {
    expect(backCarry("stretchy_jersey_knit")).toBe(false);
  });
});

describe("fabricType", () => {
  it("woven cotton rigid uses handloom cotton weave", () => {
    expect(fabricType("woven_cotton_rigid")).toBe("handloom_cotton_weave");
  });
});

describe("bestStage", () => {
  it("stretchy jersey knit best for newborn first months", () => {
    expect(bestStage("stretchy_jersey_knit")).toBe("newborn_first_months");
  });
});

describe("babyWraps", () => {
  it("returns 5 types", () => {
    expect(babyWraps()).toHaveLength(5);
  });
});
