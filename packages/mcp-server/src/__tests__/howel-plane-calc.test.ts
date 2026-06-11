import { describe, it, expect } from "vitest";
import {
  chamferSmooth, cutSpeed, radiusMatch, adjustRange,
  howelCost, adjustable, forInside, soleShape,
  bestUse, howelPlanes,
} from "../howel-plane-calc.js";

describe("chamferSmooth", () => {
  it("flat sole finish smoothest chamfer", () => {
    expect(chamferSmooth("flat_sole_finish")).toBeGreaterThan(chamferSmooth("scrub_rough_fast"));
  });
});

describe("cutSpeed", () => {
  it("scrub rough fast fastest cut", () => {
    expect(cutSpeed("scrub_rough_fast")).toBeGreaterThan(cutSpeed("flat_sole_finish"));
  });
});

describe("radiusMatch", () => {
  it("round sole standard best radius match", () => {
    expect(radiusMatch("round_sole_standard")).toBeGreaterThan(radiusMatch("flat_sole_finish"));
  });
});

describe("adjustRange", () => {
  it("adjustable mouth set widest range", () => {
    expect(adjustRange("adjustable_mouth_set")).toBeGreaterThan(adjustRange("round_sole_standard"));
  });
});

describe("howelCost", () => {
  it("adjustable mouth set most expensive", () => {
    expect(howelCost("adjustable_mouth_set")).toBeGreaterThan(howelCost("flat_sole_finish"));
  });
});

describe("adjustable", () => {
  it("adjustable mouth set is adjustable", () => {
    expect(adjustable("adjustable_mouth_set")).toBe(true);
  });
  it("round sole standard not adjustable", () => {
    expect(adjustable("round_sole_standard")).toBe(false);
  });
});

describe("forInside", () => {
  it("round sole standard is for inside", () => {
    expect(forInside("round_sole_standard")).toBe(true);
  });
  it("flat sole finish not for inside", () => {
    expect(forInside("flat_sole_finish")).toBe(false);
  });
});

describe("soleShape", () => {
  it("sun plane outside uses concave outside sole", () => {
    expect(soleShape("sun_plane_outside")).toBe("concave_outside_sole");
  });
});

describe("bestUse", () => {
  it("scrub rough fast best for quick stock remove", () => {
    expect(bestUse("scrub_rough_fast")).toBe("quick_stock_remove");
  });
});

describe("howelPlanes", () => {
  it("returns 5 types", () => {
    expect(howelPlanes()).toHaveLength(5);
  });
});
