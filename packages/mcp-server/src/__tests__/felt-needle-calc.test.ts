import { describe, it, expect } from "vitest";
import {
  feltSpeed, surfaceFinish, detailWork, breakResist,
  needleCost, pullsFiber, forBeginners, barbPattern,
  bestUse, feltNeedles,
} from "../felt-needle-calc.js";

describe("feltSpeed", () => {
  it("star point fast fastest felting", () => {
    expect(feltSpeed("star_point_fast")).toBeGreaterThan(feltSpeed("reverse_barb_pull"));
  });
});

describe("surfaceFinish", () => {
  it("crown point surface best surface finish", () => {
    expect(surfaceFinish("crown_point_surface")).toBeGreaterThan(surfaceFinish("star_point_fast"));
  });
});

describe("detailWork", () => {
  it("crown point surface best detail work", () => {
    expect(detailWork("crown_point_surface")).toBeGreaterThan(detailWork("triangle_standard_general"));
  });
});

describe("breakResist", () => {
  it("triangle standard general most break resistant", () => {
    expect(breakResist("triangle_standard_general")).toBeGreaterThan(breakResist("crown_point_surface"));
  });
});

describe("needleCost", () => {
  it("reverse barb pull more expensive than triangle", () => {
    expect(needleCost("reverse_barb_pull")).toBeGreaterThan(needleCost("triangle_standard_general"));
  });
});

describe("pullsFiber", () => {
  it("reverse barb pull pulls fiber", () => {
    expect(pullsFiber("reverse_barb_pull")).toBe(true);
  });
  it("triangle standard general does not pull fiber", () => {
    expect(pullsFiber("triangle_standard_general")).toBe(false);
  });
});

describe("forBeginners", () => {
  it("triangle standard general is for beginners", () => {
    expect(forBeginners("triangle_standard_general")).toBe(true);
  });
  it("reverse barb pull is not for beginners", () => {
    expect(forBeginners("reverse_barb_pull")).toBe(false);
  });
});

describe("barbPattern", () => {
  it("spiral twist smooth uses helical groove barb", () => {
    expect(barbPattern("spiral_twist_smooth")).toBe("helical_groove_barb");
  });
});

describe("bestUse", () => {
  it("reverse barb pull best for fuzzy texture fur", () => {
    expect(bestUse("reverse_barb_pull")).toBe("fuzzy_texture_fur");
  });
});

describe("feltNeedles", () => {
  it("returns 5 types", () => {
    expect(feltNeedles()).toHaveLength(5);
  });
});
