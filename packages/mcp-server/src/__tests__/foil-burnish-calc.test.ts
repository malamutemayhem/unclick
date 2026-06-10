import { describe, it, expect } from "vitest";
import {
  burnishEven, foilAdhere, edgeDetail, durability,
  toolCost, forCorners, nonScratch, tipShape,
  bestUse, foilBurnishers,
} from "../foil-burnish-calc.js";

describe("burnishEven", () => {
  it("plastic roller press most even burnish", () => {
    expect(burnishEven("plastic_roller_press")).toBeGreaterThan(burnishEven("bone_point_crease"));
  });
});

describe("foilAdhere", () => {
  it("brass wheel edge best foil adhere", () => {
    expect(foilAdhere("brass_wheel_edge")).toBeGreaterThan(foilAdhere("bone_point_crease"));
  });
});

describe("edgeDetail", () => {
  it("bone point crease best edge detail", () => {
    expect(edgeDetail("bone_point_crease")).toBeGreaterThan(edgeDetail("plastic_roller_press"));
  });
});

describe("durability", () => {
  it("brass wheel edge most durable", () => {
    expect(durability("brass_wheel_edge")).toBeGreaterThan(durability("plastic_roller_press"));
  });
});

describe("toolCost", () => {
  it("brass wheel edge most expensive", () => {
    expect(toolCost("brass_wheel_edge")).toBeGreaterThan(toolCost("wood_fid_smooth"));
  });
});

describe("forCorners", () => {
  it("wood fid smooth is for corners", () => {
    expect(forCorners("wood_fid_smooth")).toBe(true);
  });
  it("plastic roller press not for corners", () => {
    expect(forCorners("plastic_roller_press")).toBe(false);
  });
});

describe("nonScratch", () => {
  it("teflon folder slide is non scratch", () => {
    expect(nonScratch("teflon_folder_slide")).toBe(true);
  });
  it("brass wheel edge not non scratch", () => {
    expect(nonScratch("brass_wheel_edge")).toBe(false);
  });
});

describe("tipShape", () => {
  it("wood fid smooth uses tapered flat wood", () => {
    expect(tipShape("wood_fid_smooth")).toBe("tapered_flat_wood");
  });
});

describe("bestUse", () => {
  it("bone point crease best for tight corner detail", () => {
    expect(bestUse("bone_point_crease")).toBe("tight_corner_detail");
  });
});

describe("foilBurnishers", () => {
  it("returns 5 types", () => {
    expect(foilBurnishers()).toHaveLength(5);
  });
});
