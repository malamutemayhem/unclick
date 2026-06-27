import { describe, it, expect } from "vitest";
import {
  feedEven, visibility, precision, versatility,
  footCost, forQuilting, freeMotion, footMaterial,
  bestUse, walkFeet,
} from "../walk-foot-calc.js";

describe("feedEven", () => {
  it("even feed standard best feed", () => {
    expect(feedEven("even_feed_standard")).toBeGreaterThan(feedEven("free_motion_drop"));
  });
});

describe("visibility", () => {
  it("open toe visible best visibility", () => {
    expect(visibility("open_toe_visible")).toBeGreaterThan(visibility("even_feed_standard"));
  });
});

describe("precision", () => {
  it("narrow quarter inch most precise", () => {
    expect(precision("narrow_quarter_inch")).toBeGreaterThan(precision("free_motion_drop"));
  });
});

describe("versatility", () => {
  it("adjustable guide bar most versatile", () => {
    expect(versatility("adjustable_guide_bar")).toBeGreaterThan(versatility("narrow_quarter_inch"));
  });
});

describe("footCost", () => {
  it("adjustable guide bar most expensive", () => {
    expect(footCost("adjustable_guide_bar")).toBeGreaterThan(footCost("narrow_quarter_inch"));
  });
});

describe("forQuilting", () => {
  it("even feed standard is for quilting", () => {
    expect(forQuilting("even_feed_standard")).toBe(true);
  });
  it("free motion drop is for quilting", () => {
    expect(forQuilting("free_motion_drop")).toBe(true);
  });
});

describe("freeMotion", () => {
  it("free motion drop is free motion", () => {
    expect(freeMotion("free_motion_drop")).toBe(true);
  });
  it("even feed standard is not free motion", () => {
    expect(freeMotion("even_feed_standard")).toBe(false);
  });
});

describe("footMaterial", () => {
  it("open toe visible uses clear plastic steel", () => {
    expect(footMaterial("open_toe_visible")).toBe("clear_plastic_steel");
  });
});

describe("bestUse", () => {
  it("free motion drop best for stipple meander art", () => {
    expect(bestUse("free_motion_drop")).toBe("stipple_meander_art");
  });
});

describe("walkFeet", () => {
  it("returns 5 types", () => {
    expect(walkFeet()).toHaveLength(5);
  });
});
