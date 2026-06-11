import { describe, it, expect } from "vitest";
import {
  temperature, durability, gloss, colorRange,
  cgCost, foodSafe, forDinnerware, firing,
  bestUse, ceramicGlazeTypes,
} from "../ceramic-glaze-calc.js";

describe("temperature", () => {
  it("porcelain highest temperature", () => {
    expect(temperature("porcelain_high_fire")).toBeGreaterThan(temperature("earthenware_low_fire"));
  });
});

describe("durability", () => {
  it("porcelain most durable", () => {
    expect(durability("porcelain_high_fire")).toBeGreaterThan(durability("raku_rapid_cool"));
  });
});

describe("gloss", () => {
  it("crystalline glossiest", () => {
    expect(gloss("crystalline_zinc_silicate")).toBeGreaterThan(gloss("raku_rapid_cool"));
  });
});

describe("colorRange", () => {
  it("earthenware widest color range", () => {
    expect(colorRange("earthenware_low_fire")).toBeGreaterThan(colorRange("porcelain_high_fire"));
  });
});

describe("cgCost", () => {
  it("crystalline most expensive", () => {
    expect(cgCost("crystalline_zinc_silicate")).toBeGreaterThan(cgCost("earthenware_low_fire"));
  });
});

describe("foodSafe", () => {
  it("stoneware is food safe", () => {
    expect(foodSafe("stoneware_mid_fire")).toBe(true);
  });
  it("raku not food safe", () => {
    expect(foodSafe("raku_rapid_cool")).toBe(false);
  });
});

describe("forDinnerware", () => {
  it("porcelain for dinnerware", () => {
    expect(forDinnerware("porcelain_high_fire")).toBe(true);
  });
  it("earthenware not for dinnerware", () => {
    expect(forDinnerware("earthenware_low_fire")).toBe(false);
  });
});

describe("firing", () => {
  it("raku uses rapid cool reduction", () => {
    expect(firing("raku_rapid_cool")).toBe("rapid_cool_reduction_luster");
  });
});

describe("bestUse", () => {
  it("earthenware for decorative tile", () => {
    expect(bestUse("earthenware_low_fire")).toBe("decorative_tile_bright_color_art");
  });
});

describe("ceramicGlazeTypes", () => {
  it("returns 5 types", () => {
    expect(ceramicGlazeTypes()).toHaveLength(5);
  });
});
