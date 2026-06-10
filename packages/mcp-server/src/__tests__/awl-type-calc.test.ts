import { describe, it, expect } from "vitest";
import {
  holeSize, precisionRating, threadPassage,
  leatherDamage, versatility, lockStitchCapable,
  marking, bestApplication, costEstimate, awlTypes,
} from "../awl-type-calc.js";

describe("holeSize", () => {
  it("round awl makes biggest holes", () => {
    expect(holeSize("round_awl")).toBeGreaterThan(
      holeSize("scratch_awl")
    );
  });
});

describe("precisionRating", () => {
  it("diamond awl is most precise", () => {
    expect(precisionRating("diamond_awl")).toBeGreaterThan(
      precisionRating("round_awl")
    );
  });
});

describe("threadPassage", () => {
  it("stitching awl has best thread passage", () => {
    expect(threadPassage("stitching_awl")).toBeGreaterThan(
      threadPassage("scratch_awl")
    );
  });
});

describe("leatherDamage", () => {
  it("round awl causes most damage", () => {
    expect(leatherDamage("round_awl")).toBeGreaterThan(
      leatherDamage("diamond_awl")
    );
  });
});

describe("versatility", () => {
  it("scratch awl is most versatile", () => {
    expect(versatility("scratch_awl")).toBeGreaterThan(
      versatility("round_awl")
    );
  });
});

describe("lockStitchCapable", () => {
  it("stitching awl can lock stitch", () => {
    expect(lockStitchCapable("stitching_awl")).toBe(true);
  });
  it("scratch awl cannot", () => {
    expect(lockStitchCapable("scratch_awl")).toBe(false);
  });
});

describe("marking", () => {
  it("scratch awl is for marking", () => {
    expect(marking("scratch_awl")).toBe(true);
  });
  it("stitching awl is not", () => {
    expect(marking("stitching_awl")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("stitching awl best for saddle stitch", () => {
    expect(bestApplication("stitching_awl")).toBe("saddle_stitch");
  });
});

describe("costEstimate", () => {
  it("stitching awl costs most", () => {
    expect(costEstimate("stitching_awl")).toBeGreaterThan(
      costEstimate("scratch_awl")
    );
  });
});

describe("awlTypes", () => {
  it("returns 5 types", () => {
    expect(awlTypes()).toHaveLength(5);
  });
});
