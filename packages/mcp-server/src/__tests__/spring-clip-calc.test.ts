import { describe, it, expect } from "vitest";
import {
  gripForce, speedAttach, holdSecure, springRange,
  springCost, powered, forSinuous, clipMethod,
  bestUse, springClips,
} from "../spring-clip-calc.js";

describe("gripForce", () => {
  it("hog ring plier strongest grip", () => {
    expect(gripForce("hog_ring_plier")).toBeGreaterThan(gripForce("spring_clip_hand"));
  });
});

describe("speedAttach", () => {
  it("zigzag clip auto fastest attach", () => {
    expect(speedAttach("zigzag_clip_auto")).toBeGreaterThan(speedAttach("coil_spring_tie"));
  });
});

describe("holdSecure", () => {
  it("hog ring plier most secure hold", () => {
    expect(holdSecure("hog_ring_plier")).toBeGreaterThan(holdSecure("spring_clip_hand"));
  });
});

describe("springRange", () => {
  it("coil spring tie widest spring range", () => {
    expect(springRange("coil_spring_tie")).toBeGreaterThan(springRange("zigzag_clip_auto"));
  });
});

describe("springCost", () => {
  it("zigzag clip auto most expensive", () => {
    expect(springCost("zigzag_clip_auto")).toBeGreaterThan(springCost("spring_clip_hand"));
  });
});

describe("powered", () => {
  it("zigzag clip auto is powered", () => {
    expect(powered("zigzag_clip_auto")).toBe(true);
  });
  it("hog ring plier not powered", () => {
    expect(powered("hog_ring_plier")).toBe(false);
  });
});

describe("forSinuous", () => {
  it("sinuous spring hook is for sinuous", () => {
    expect(forSinuous("sinuous_spring_hook")).toBe(true);
  });
  it("hog ring plier not for sinuous", () => {
    expect(forSinuous("hog_ring_plier")).toBe(false);
  });
});

describe("clipMethod", () => {
  it("coil spring tie uses twine tie knot", () => {
    expect(clipMethod("coil_spring_tie")).toBe("twine_tie_knot");
  });
});

describe("bestUse", () => {
  it("hog ring plier best for spring to frame fix", () => {
    expect(bestUse("hog_ring_plier")).toBe("spring_to_frame_fix");
  });
});

describe("springClips", () => {
  it("returns 5 types", () => {
    expect(springClips()).toHaveLength(5);
  });
});
