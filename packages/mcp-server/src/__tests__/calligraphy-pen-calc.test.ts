import { describe, it, expect } from "vitest";
import {
  lineVariation, controlEase, inkCapacity, cleanupEase,
  penCost, needsDipping, refillable, nibType,
  bestScript, calligraphyPens,
} from "../calligraphy-pen-calc.js";

describe("lineVariation", () => {
  it("dip nib holder most line variation", () => {
    expect(lineVariation("dip_nib_holder")).toBeGreaterThan(lineVariation("felt_tip_marker"));
  });
});

describe("controlEase", () => {
  it("felt tip marker easiest control", () => {
    expect(controlEase("felt_tip_marker")).toBeGreaterThan(controlEase("dip_nib_holder"));
  });
});

describe("inkCapacity", () => {
  it("parallel pen pilot largest capacity", () => {
    expect(inkCapacity("parallel_pen_pilot")).toBeGreaterThan(inkCapacity("glass_dip_pen"));
  });
});

describe("cleanupEase", () => {
  it("felt tip marker easiest cleanup", () => {
    expect(cleanupEase("felt_tip_marker")).toBeGreaterThan(cleanupEase("dip_nib_holder"));
  });
});

describe("penCost", () => {
  it("glass dip pen most expensive", () => {
    expect(penCost("glass_dip_pen")).toBeGreaterThan(penCost("felt_tip_marker"));
  });
});

describe("needsDipping", () => {
  it("dip nib holder needs dipping", () => {
    expect(needsDipping("dip_nib_holder")).toBe(true);
  });
  it("brush pen flex does not", () => {
    expect(needsDipping("brush_pen_flex")).toBe(false);
  });
});

describe("refillable", () => {
  it("parallel pen pilot is refillable", () => {
    expect(refillable("parallel_pen_pilot")).toBe(true);
  });
  it("felt tip marker is not", () => {
    expect(refillable("felt_tip_marker")).toBe(false);
  });
});

describe("nibType", () => {
  it("glass dip pen uses twisted glass spiral", () => {
    expect(nibType("glass_dip_pen")).toBe("twisted_glass_spiral");
  });
});

describe("bestScript", () => {
  it("parallel pen pilot best for italic gothic blackletter", () => {
    expect(bestScript("parallel_pen_pilot")).toBe("italic_gothic_blackletter");
  });
});

describe("calligraphyPens", () => {
  it("returns 5 types", () => {
    expect(calligraphyPens()).toHaveLength(5);
  });
});
