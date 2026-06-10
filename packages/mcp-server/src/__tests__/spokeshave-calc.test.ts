import { describe, it, expect } from "vitest";
import {
  surfaceFinish, curveHandling, controlGrip, depthAdjust,
  shaveCost, forConvex, forConcave, soleProfile,
  bestProject, spokeshaves,
} from "../spokeshave-calc.js";

describe("surfaceFinish", () => {
  it("adjustable mouth brass best surface finish", () => {
    expect(surfaceFinish("adjustable_mouth_brass")).toBeGreaterThan(surfaceFinish("round_bottom_concave"));
  });
});

describe("curveHandling", () => {
  it("round bottom concave best curve handling", () => {
    expect(curveHandling("round_bottom_concave")).toBeGreaterThan(curveHandling("flat_bottom_standard"));
  });
});

describe("controlGrip", () => {
  it("flat bottom standard best control grip", () => {
    expect(controlGrip("flat_bottom_standard")).toBeGreaterThan(controlGrip("travisher_deep_scoop"));
  });
});

describe("depthAdjust", () => {
  it("adjustable mouth brass best depth adjust", () => {
    expect(depthAdjust("adjustable_mouth_brass")).toBeGreaterThan(depthAdjust("travisher_deep_scoop"));
  });
});

describe("shaveCost", () => {
  it("adjustable mouth brass more expensive than flat bottom", () => {
    expect(shaveCost("adjustable_mouth_brass")).toBeGreaterThan(shaveCost("flat_bottom_standard"));
  });
});

describe("forConvex", () => {
  it("flat bottom standard is for convex", () => {
    expect(forConvex("flat_bottom_standard")).toBe(true);
  });
  it("round bottom concave is not for convex", () => {
    expect(forConvex("round_bottom_concave")).toBe(false);
  });
});

describe("forConcave", () => {
  it("round bottom concave is for concave", () => {
    expect(forConcave("round_bottom_concave")).toBe(true);
  });
  it("flat bottom standard is not for concave", () => {
    expect(forConcave("flat_bottom_standard")).toBe(false);
  });
});

describe("soleProfile", () => {
  it("adjustable mouth brass uses flat brass adjuster", () => {
    expect(soleProfile("adjustable_mouth_brass")).toBe("flat_brass_adjuster");
  });
});

describe("bestProject", () => {
  it("round bottom concave best for windsor seat bowl", () => {
    expect(bestProject("round_bottom_concave")).toBe("windsor_seat_bowl");
  });
});

describe("spokeshaves", () => {
  it("returns 5 types", () => {
    expect(spokeshaves()).toHaveLength(5);
  });
});
