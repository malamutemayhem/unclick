import { describe, it, expect } from "vitest";
import {
  feltSpeed, surfaceSmooth, controlFine, durability,
  needleCost, reverse, forSurface, barbStyle,
  bestUse, feltingNeedles,
} from "../felting-needle-calc.js";

describe("feltSpeed", () => {
  it("star point fast fastest felt", () => {
    expect(feltSpeed("star_point_fast")).toBeGreaterThan(feltSpeed("reverse_barb_pull"));
  });
});

describe("surfaceSmooth", () => {
  it("spiral twist smooth smoothest surface", () => {
    expect(surfaceSmooth("spiral_twist_smooth")).toBeGreaterThan(surfaceSmooth("star_point_fast"));
  });
});

describe("controlFine", () => {
  it("crown point surface finest control", () => {
    expect(controlFine("crown_point_surface")).toBeGreaterThan(controlFine("star_point_fast"));
  });
});

describe("durability", () => {
  it("spiral twist smooth most durable", () => {
    expect(durability("spiral_twist_smooth")).toBeGreaterThan(durability("reverse_barb_pull"));
  });
});

describe("needleCost", () => {
  it("spiral twist smooth most expensive", () => {
    expect(needleCost("spiral_twist_smooth")).toBeGreaterThan(needleCost("triangle_standard_medium"));
  });
});

describe("reverse", () => {
  it("reverse barb pull is reverse", () => {
    expect(reverse("reverse_barb_pull")).toBe(true);
  });
  it("triangle standard medium not reverse", () => {
    expect(reverse("triangle_standard_medium")).toBe(false);
  });
});

describe("forSurface", () => {
  it("crown point surface is for surface", () => {
    expect(forSurface("crown_point_surface")).toBe(true);
  });
  it("triangle standard medium not for surface", () => {
    expect(forSurface("triangle_standard_medium")).toBe(false);
  });
});

describe("barbStyle", () => {
  it("star point fast uses star four barb", () => {
    expect(barbStyle("star_point_fast")).toBe("star_four_barb");
  });
});

describe("bestUse", () => {
  it("triangle standard medium best for general needle felt", () => {
    expect(bestUse("triangle_standard_medium")).toBe("general_needle_felt");
  });
});

describe("feltingNeedles", () => {
  it("returns 5 types", () => {
    expect(feltingNeedles()).toHaveLength(5);
  });
});
