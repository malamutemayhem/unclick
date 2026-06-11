import { describe, it, expect } from "vitest";
import {
  levelFlat, chimeBevel, setupSpeed, barrelRange,
  planeCost, adjustable, forChime, soleShape,
  bestUse, toppingPlanes,
} from "../topping-plane-calc.js";

describe("levelFlat", () => {
  it("combination level check flattest level", () => {
    expect(levelFlat("combination_level_check")).toBeGreaterThan(levelFlat("angled_chime_bevel"));
  });
});

describe("chimeBevel", () => {
  it("angled chime bevel best chime bevel", () => {
    expect(chimeBevel("angled_chime_bevel")).toBeGreaterThan(chimeBevel("standard_flat_top"));
  });
});

describe("setupSpeed", () => {
  it("standard flat top fastest setup", () => {
    expect(setupSpeed("standard_flat_top")).toBeGreaterThan(setupSpeed("combination_level_check"));
  });
});

describe("barrelRange", () => {
  it("adjustable depth set best barrel range", () => {
    expect(barrelRange("adjustable_depth_set")).toBeGreaterThan(barrelRange("angled_chime_bevel"));
  });
});

describe("planeCost", () => {
  it("combination level check most expensive", () => {
    expect(planeCost("combination_level_check")).toBeGreaterThan(planeCost("standard_flat_top"));
  });
});

describe("adjustable", () => {
  it("adjustable depth set is adjustable", () => {
    expect(adjustable("adjustable_depth_set")).toBe(true);
  });
  it("standard flat top not adjustable", () => {
    expect(adjustable("standard_flat_top")).toBe(false);
  });
});

describe("forChime", () => {
  it("angled chime bevel is for chime", () => {
    expect(forChime("angled_chime_bevel")).toBe(true);
  });
  it("standard flat top not for chime", () => {
    expect(forChime("standard_flat_top")).toBe(false);
  });
});

describe("soleShape", () => {
  it("compass round follow uses curved compass sole", () => {
    expect(soleShape("compass_round_follow")).toBe("curved_compass_sole");
  });
});

describe("bestUse", () => {
  it("angled chime bevel best for chime edge bevel", () => {
    expect(bestUse("angled_chime_bevel")).toBe("chime_edge_bevel");
  });
});

describe("toppingPlanes", () => {
  it("returns 5 types", () => {
    expect(toppingPlanes()).toHaveLength(5);
  });
});
