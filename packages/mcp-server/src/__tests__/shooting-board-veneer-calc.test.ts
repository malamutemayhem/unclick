import { describe, it, expect } from "vitest";
import {
  edgeStraight, anglePrecision, setupSpeed, lengthRange,
  shootingCost, adjustable, forMiter, bedStyle,
  bestUse, shootingBoardVeneers,
} from "../shooting-board-veneer-calc.js";

describe("edgeStraight", () => {
  it("flat bed standard most straight edge", () => {
    expect(edgeStraight("flat_bed_standard")).toBeGreaterThan(edgeStraight("mini_block_trim"));
  });
});

describe("anglePrecision", () => {
  it("angled miter joint best angle precision", () => {
    expect(anglePrecision("angled_miter_joint")).toBeGreaterThan(anglePrecision("mini_block_trim"));
  });
});

describe("setupSpeed", () => {
  it("mini block trim fastest setup", () => {
    expect(setupSpeed("mini_block_trim")).toBeGreaterThan(setupSpeed("angled_miter_joint"));
  });
});

describe("lengthRange", () => {
  it("long bed strip best length range", () => {
    expect(lengthRange("long_bed_strip")).toBeGreaterThan(lengthRange("mini_block_trim"));
  });
});

describe("shootingCost", () => {
  it("adjustable fence set more expensive than mini block", () => {
    expect(shootingCost("adjustable_fence_set")).toBeGreaterThan(shootingCost("mini_block_trim"));
  });
});

describe("adjustable", () => {
  it("adjustable fence set is adjustable", () => {
    expect(adjustable("adjustable_fence_set")).toBe(true);
  });
  it("flat bed standard not adjustable", () => {
    expect(adjustable("flat_bed_standard")).toBe(false);
  });
});

describe("forMiter", () => {
  it("angled miter joint is for miter", () => {
    expect(forMiter("angled_miter_joint")).toBe(true);
  });
  it("flat bed standard not for miter", () => {
    expect(forMiter("flat_bed_standard")).toBe(false);
  });
});

describe("bedStyle", () => {
  it("long bed strip uses extended long bed", () => {
    expect(bedStyle("long_bed_strip")).toBe("extended_long_bed");
  });
});

describe("bestUse", () => {
  it("angled miter joint best for miter joint veneer", () => {
    expect(bestUse("angled_miter_joint")).toBe("miter_joint_veneer");
  });
});

describe("shootingBoardVeneers", () => {
  it("returns 5 types", () => {
    expect(shootingBoardVeneers()).toHaveLength(5);
  });
});
