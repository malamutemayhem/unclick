import { describe, it, expect } from "vitest";
import {
  clampForce, jawAlign, openSpeed, bookRange,
  pressCost, quickRelease, forTrimming, jawMaterial,
  bestUse, finishingPresses,
} from "../finishing-press-calc.js";

describe("clampForce", () => {
  it("iron frame heavy strongest clamp", () => {
    expect(clampForce("iron_frame_heavy")).toBeGreaterThan(clampForce("portable_clamp_field"));
  });
});

describe("jawAlign", () => {
  it("iron frame heavy best alignment", () => {
    expect(jawAlign("iron_frame_heavy")).toBeGreaterThan(jawAlign("portable_clamp_field"));
  });
});

describe("openSpeed", () => {
  it("quick release cam fastest open", () => {
    expect(openSpeed("quick_release_cam")).toBeGreaterThan(openSpeed("iron_frame_heavy"));
  });
});

describe("bookRange", () => {
  it("iron frame heavy widest range", () => {
    expect(bookRange("iron_frame_heavy")).toBeGreaterThan(bookRange("portable_clamp_field"));
  });
});

describe("pressCost", () => {
  it("iron frame heavy most expensive", () => {
    expect(pressCost("iron_frame_heavy")).toBeGreaterThan(pressCost("portable_clamp_field"));
  });
});

describe("quickRelease", () => {
  it("quick release cam has quick release", () => {
    expect(quickRelease("quick_release_cam")).toBe(true);
  });
  it("wooden screw classic no quick release", () => {
    expect(quickRelease("wooden_screw_classic")).toBe(false);
  });
});

describe("forTrimming", () => {
  it("lying press trim is for trimming", () => {
    expect(forTrimming("lying_press_trim")).toBe(true);
  });
  it("wooden screw classic not for trimming", () => {
    expect(forTrimming("wooden_screw_classic")).toBe(false);
  });
});

describe("jawMaterial", () => {
  it("iron frame heavy uses cast iron cheek", () => {
    expect(jawMaterial("iron_frame_heavy")).toBe("cast_iron_cheek");
  });
});

describe("bestUse", () => {
  it("lying press trim best for edge trim plough", () => {
    expect(bestUse("lying_press_trim")).toBe("edge_trim_plough");
  });
});

describe("finishingPresses", () => {
  it("returns 5 types", () => {
    expect(finishingPresses()).toHaveLength(5);
  });
});
