import { describe, it, expect } from "vitest";
import {
  gapConsist, adjustRange, holdSecure, removeEase,
  spacerCost, reusable, selfLeveling, spacerShape,
  bestUse, tileSpacers,
} from "../tile-spacer-calc.js";

describe("gapConsist", () => {
  it("clip spacer level most consistent gap", () => {
    expect(gapConsist("clip_spacer_level")).toBeGreaterThan(gapConsist("horseshoe_spacer_wall"));
  });
});

describe("adjustRange", () => {
  it("wedge spacer adjust widest adjust range", () => {
    expect(adjustRange("wedge_spacer_adjust")).toBeGreaterThan(adjustRange("cross_spacer_standard"));
  });
});

describe("holdSecure", () => {
  it("clip spacer level most secure hold", () => {
    expect(holdSecure("clip_spacer_level")).toBeGreaterThan(holdSecure("tee_spacer_edge"));
  });
});

describe("removeEase", () => {
  it("horseshoe spacer wall easiest remove", () => {
    expect(removeEase("horseshoe_spacer_wall")).toBeGreaterThan(removeEase("clip_spacer_level"));
  });
});

describe("spacerCost", () => {
  it("clip spacer level most expensive", () => {
    expect(spacerCost("clip_spacer_level")).toBeGreaterThan(spacerCost("cross_spacer_standard"));
  });
});

describe("reusable", () => {
  it("wedge spacer adjust is reusable", () => {
    expect(reusable("wedge_spacer_adjust")).toBe(true);
  });
  it("cross spacer standard not reusable", () => {
    expect(reusable("cross_spacer_standard")).toBe(false);
  });
});

describe("selfLeveling", () => {
  it("clip spacer level is self leveling", () => {
    expect(selfLeveling("clip_spacer_level")).toBe(true);
  });
  it("cross spacer standard not self leveling", () => {
    expect(selfLeveling("cross_spacer_standard")).toBe(false);
  });
});

describe("spacerShape", () => {
  it("tee spacer edge uses three arm tee", () => {
    expect(spacerShape("tee_spacer_edge")).toBe("three_arm_tee");
  });
});

describe("bestUse", () => {
  it("cross spacer standard best for general floor tile", () => {
    expect(bestUse("cross_spacer_standard")).toBe("general_floor_tile");
  });
});

describe("tileSpacers", () => {
  it("returns 5 types", () => {
    expect(tileSpacers()).toHaveLength(5);
  });
});
