import { describe, it, expect } from "vitest";
import {
  sunProtection, mobility, quickDry, rashPrevent,
  guardCost, hasHood, hasZipper, fabricBlend,
  bestActivity, rashGuards,
} from "../rash-guard-calc.js";

describe("sunProtection", () => {
  it("long sleeve full cover best sun protection", () => {
    expect(sunProtection("long_sleeve_full_cover")).toBeGreaterThan(sunProtection("sleeveless_tank_swim"));
  });
});

describe("mobility", () => {
  it("sleeveless tank swim best mobility", () => {
    expect(mobility("sleeveless_tank_swim")).toBeGreaterThan(mobility("hooded_surf_zip"));
  });
});

describe("quickDry", () => {
  it("compression fit athletic fastest quick dry", () => {
    expect(quickDry("compression_fit_athletic")).toBeGreaterThan(quickDry("hooded_surf_zip"));
  });
});

describe("rashPrevent", () => {
  it("long sleeve full cover best rash prevent", () => {
    expect(rashPrevent("long_sleeve_full_cover")).toBeGreaterThan(rashPrevent("sleeveless_tank_swim"));
  });
});

describe("guardCost", () => {
  it("hooded surf zip most expensive", () => {
    expect(guardCost("hooded_surf_zip")).toBeGreaterThan(guardCost("short_sleeve_upf50"));
  });
});

describe("hasHood", () => {
  it("hooded surf zip has hood", () => {
    expect(hasHood("hooded_surf_zip")).toBe(true);
  });
  it("long sleeve full cover has no hood", () => {
    expect(hasHood("long_sleeve_full_cover")).toBe(false);
  });
});

describe("hasZipper", () => {
  it("hooded surf zip has zipper", () => {
    expect(hasZipper("hooded_surf_zip")).toBe(true);
  });
  it("short sleeve upf50 has no zipper", () => {
    expect(hasZipper("short_sleeve_upf50")).toBe(false);
  });
});

describe("fabricBlend", () => {
  it("compression fit athletic uses four way stretch poly", () => {
    expect(fabricBlend("compression_fit_athletic")).toBe("four_way_stretch_poly");
  });
});

describe("bestActivity", () => {
  it("hooded surf zip best for surfing board sport", () => {
    expect(bestActivity("hooded_surf_zip")).toBe("surfing_board_sport");
  });
});

describe("rashGuards", () => {
  it("returns 5 types", () => {
    expect(rashGuards()).toHaveLength(5);
  });
});
