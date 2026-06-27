import { describe, it, expect } from "vitest";
import {
  splitClean, grainFollow, controlLever, widthRange,
  froeCost, curved, forShingle, bladeWidth,
  bestUse, froeSplits,
} from "../froe-split-calc.js";

describe("splitClean", () => {
  it("narrow froe lath cleanest split", () => {
    expect(splitClean("narrow_froe_lath")).toBeGreaterThan(splitClean("club_mallet_drive"));
  });
});

describe("grainFollow", () => {
  it("curved froe shingle best grain follow", () => {
    expect(grainFollow("curved_froe_shingle")).toBeGreaterThan(grainFollow("club_mallet_drive"));
  });
});

describe("controlLever", () => {
  it("curved froe shingle best control lever", () => {
    expect(controlLever("curved_froe_shingle")).toBeGreaterThan(controlLever("club_mallet_drive"));
  });
});

describe("widthRange", () => {
  it("wide froe board best width range", () => {
    expect(widthRange("wide_froe_board")).toBeGreaterThan(widthRange("narrow_froe_lath"));
  });
});

describe("froeCost", () => {
  it("wide froe board most expensive", () => {
    expect(froeCost("wide_froe_board")).toBeGreaterThan(froeCost("club_mallet_drive"));
  });
});

describe("curved", () => {
  it("curved froe shingle is curved", () => {
    expect(curved("curved_froe_shingle")).toBe(true);
  });
  it("straight froe standard not curved", () => {
    expect(curved("straight_froe_standard")).toBe(false);
  });
});

describe("forShingle", () => {
  it("curved froe shingle is for shingle", () => {
    expect(forShingle("curved_froe_shingle")).toBe(true);
  });
  it("straight froe standard not for shingle", () => {
    expect(forShingle("straight_froe_standard")).toBe(false);
  });
});

describe("bladeWidth", () => {
  it("wide froe board uses wide 12 inch", () => {
    expect(bladeWidth("wide_froe_board")).toBe("wide_12_inch");
  });
});

describe("bestUse", () => {
  it("curved froe shingle best for shingle shake split", () => {
    expect(bestUse("curved_froe_shingle")).toBe("shingle_shake_split");
  });
});

describe("froeSplits", () => {
  it("returns 5 types", () => {
    expect(froeSplits()).toHaveLength(5);
  });
});
