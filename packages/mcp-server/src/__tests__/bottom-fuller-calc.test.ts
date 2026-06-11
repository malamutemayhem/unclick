import { describe, it, expect } from "vitest";
import {
  grooveClean, depthControl, speedWork, sizeRange,
  fullerCost, handheld, sharpEdge, grooveProfile,
  bestUse, bottomFullers,
} from "../bottom-fuller-calc.js";

describe("grooveClean", () => {
  it("radius round smooth cleanest groove", () => {
    expect(grooveClean("radius_round_smooth")).toBeGreaterThan(grooveClean("spring_fuller_handheld"));
  });
});

describe("depthControl", () => {
  it("vee groove sharp best depth control", () => {
    expect(depthControl("vee_groove_sharp")).toBeGreaterThan(depthControl("flat_bottom_wide"));
  });
});

describe("speedWork", () => {
  it("spring fuller handheld fastest work", () => {
    expect(speedWork("spring_fuller_handheld")).toBeGreaterThan(speedWork("vee_groove_sharp"));
  });
});

describe("sizeRange", () => {
  it("flat bottom wide widest size range", () => {
    expect(sizeRange("flat_bottom_wide")).toBeGreaterThan(sizeRange("radius_round_smooth"));
  });
});

describe("fullerCost", () => {
  it("spring fuller handheld most expensive", () => {
    expect(fullerCost("spring_fuller_handheld")).toBeGreaterThan(fullerCost("flat_bottom_wide"));
  });
});

describe("handheld", () => {
  it("spring fuller handheld is handheld", () => {
    expect(handheld("spring_fuller_handheld")).toBe(true);
  });
  it("half round standard not handheld", () => {
    expect(handheld("half_round_standard")).toBe(false);
  });
});

describe("sharpEdge", () => {
  it("vee groove sharp has sharp edge", () => {
    expect(sharpEdge("vee_groove_sharp")).toBe(true);
  });
  it("half round standard no sharp edge", () => {
    expect(sharpEdge("half_round_standard")).toBe(false);
  });
});

describe("grooveProfile", () => {
  it("radius round smooth uses full radius round", () => {
    expect(grooveProfile("radius_round_smooth")).toBe("full_radius_round");
  });
});

describe("bestUse", () => {
  it("half round standard best for general fullering", () => {
    expect(bestUse("half_round_standard")).toBe("general_fullering");
  });
});

describe("bottomFullers", () => {
  it("returns 5 types", () => {
    expect(bottomFullers()).toHaveLength(5);
  });
});
