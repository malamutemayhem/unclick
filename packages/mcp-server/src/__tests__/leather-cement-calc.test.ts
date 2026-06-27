import { describe, it, expect } from "vitest";
import {
  bondStrength, openTime, flexibility, easeOfUse,
  cementCost, waterResist, reversible, applyMethod,
  bestProject, leatherCements,
} from "../leather-cement-calc.js";

describe("bondStrength", () => {
  it("barge all purpose strongest bond", () => {
    expect(bondStrength("barge_all_purpose")).toBeGreaterThan(bondStrength("double_sided_tape"));
  });
});

describe("openTime", () => {
  it("double sided tape most open time", () => {
    expect(openTime("double_sided_tape")).toBeGreaterThan(openTime("contact_cement_instant"));
  });
});

describe("flexibility", () => {
  it("barge all purpose most flexible", () => {
    expect(flexibility("barge_all_purpose")).toBeGreaterThan(flexibility("white_craft_glue"));
  });
});

describe("easeOfUse", () => {
  it("white craft glue easiest to use", () => {
    expect(easeOfUse("white_craft_glue")).toBeGreaterThan(easeOfUse("hide_glue_natural"));
  });
});

describe("cementCost", () => {
  it("barge all purpose most expensive", () => {
    expect(cementCost("barge_all_purpose")).toBeGreaterThan(cementCost("white_craft_glue"));
  });
});

describe("waterResist", () => {
  it("contact cement instant is water resistant", () => {
    expect(waterResist("contact_cement_instant")).toBe(true);
  });
  it("white craft glue is not water resistant", () => {
    expect(waterResist("white_craft_glue")).toBe(false);
  });
});

describe("reversible", () => {
  it("hide glue natural is reversible", () => {
    expect(reversible("hide_glue_natural")).toBe(true);
  });
  it("barge all purpose is not reversible", () => {
    expect(reversible("barge_all_purpose")).toBe(false);
  });
});

describe("applyMethod", () => {
  it("double sided tape uses peel stick press", () => {
    expect(applyMethod("double_sided_tape")).toBe("peel_stick_press");
  });
});

describe("bestProject", () => {
  it("barge all purpose best for heavy bag construct", () => {
    expect(bestProject("barge_all_purpose")).toBe("heavy_bag_construct");
  });
});

describe("leatherCements", () => {
  it("returns 5 types", () => {
    expect(leatherCements()).toHaveLength(5);
  });
});
