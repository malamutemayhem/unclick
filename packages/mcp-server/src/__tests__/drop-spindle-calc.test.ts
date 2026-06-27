import { describe, it, expect } from "vitest";
import {
  whorlWeightG, shaftLengthCm, spinSpeedRpm, yarnWeightRange,
  beginnerFriendly, draftsPerMinute, plySuitable, portabilityRating,
  costEstimate, spindleTypes,
} from "../drop-spindle-calc.js";

describe("whorlWeightG", () => {
  it("bottom whorl is heaviest", () => {
    expect(whorlWeightG("bottom_whorl")).toBeGreaterThan(
      whorlWeightG("tahkli")
    );
  });
});

describe("shaftLengthCm", () => {
  it("bottom whorl has longest shaft", () => {
    expect(shaftLengthCm("bottom_whorl")).toBeGreaterThan(
      shaftLengthCm("tahkli")
    );
  });
});

describe("spinSpeedRpm", () => {
  it("tahkli spins fastest", () => {
    expect(spinSpeedRpm("tahkli")).toBeGreaterThan(
      spinSpeedRpm("top_whorl")
    );
  });
});

describe("yarnWeightRange", () => {
  it("tahkli produces finest yarn", () => {
    expect(yarnWeightRange("tahkli")).toBe("cobweb_to_lace");
  });
});

describe("beginnerFriendly", () => {
  it("top whorl is beginner friendly", () => {
    expect(beginnerFriendly("top_whorl")).toBe(true);
  });
  it("supported is not beginner friendly", () => {
    expect(beginnerFriendly("supported")).toBe(false);
  });
});

describe("draftsPerMinute", () => {
  it("tahkli drafts fastest", () => {
    expect(draftsPerMinute("tahkli")).toBeGreaterThan(
      draftsPerMinute("turkish")
    );
  });
});

describe("plySuitable", () => {
  it("top whorl can ply", () => {
    expect(plySuitable("top_whorl")).toBe(true);
  });
  it("tahkli cannot ply", () => {
    expect(plySuitable("tahkli")).toBe(false);
  });
});

describe("portabilityRating", () => {
  it("top whorl is most portable", () => {
    expect(portabilityRating("top_whorl")).toBeGreaterThanOrEqual(
      portabilityRating("supported")
    );
  });
});

describe("costEstimate", () => {
  it("supported is most expensive", () => {
    expect(costEstimate("supported")).toBeGreaterThan(
      costEstimate("bottom_whorl")
    );
  });
});

describe("spindleTypes", () => {
  it("returns 5 types", () => {
    expect(spindleTypes()).toHaveLength(5);
  });
});
