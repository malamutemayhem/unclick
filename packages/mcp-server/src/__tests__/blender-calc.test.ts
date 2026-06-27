import { describe, it, expect } from "vitest";
import {
  blendPower, smoothTexture, easyClean, capacity,
  blenderCost, crushIce, hotSoup, bladeDesign,
  bestUse, blenders,
} from "../blender-calc.js";

describe("blendPower", () => {
  it("commercial high power most blend power", () => {
    expect(blendPower("commercial_high_power")).toBeGreaterThan(blendPower("immersion_stick"));
  });
});

describe("smoothTexture", () => {
  it("commercial high power smoothest texture", () => {
    expect(smoothTexture("commercial_high_power")).toBeGreaterThan(smoothTexture("personal_bullet"));
  });
});

describe("easyClean", () => {
  it("immersion stick easiest to clean", () => {
    expect(easyClean("immersion_stick")).toBeGreaterThan(easyClean("commercial_high_power"));
  });
});

describe("capacity", () => {
  it("immersion stick most capacity versatility", () => {
    expect(capacity("immersion_stick")).toBeGreaterThan(capacity("personal_bullet"));
  });
});

describe("blenderCost", () => {
  it("commercial high power most expensive", () => {
    expect(blenderCost("commercial_high_power")).toBeGreaterThan(blenderCost("personal_bullet"));
  });
});

describe("crushIce", () => {
  it("countertop full can crush ice", () => {
    expect(crushIce("countertop_full")).toBe(true);
  });
  it("immersion stick cannot", () => {
    expect(crushIce("immersion_stick")).toBe(false);
  });
});

describe("hotSoup", () => {
  it("immersion stick handles hot soup", () => {
    expect(hotSoup("immersion_stick")).toBe(true);
  });
  it("countertop full does not", () => {
    expect(hotSoup("countertop_full")).toBe(false);
  });
});

describe("bladeDesign", () => {
  it("personal bullet uses flat extraction blade", () => {
    expect(bladeDesign("personal_bullet")).toBe("flat_extraction_blade");
  });
});

describe("bestUse", () => {
  it("immersion stick for pot soup sauce blend", () => {
    expect(bestUse("immersion_stick")).toBe("pot_soup_sauce_blend");
  });
});

describe("blenders", () => {
  it("returns 5 types", () => {
    expect(blenders()).toHaveLength(5);
  });
});
