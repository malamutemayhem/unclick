import { describe, it, expect } from "vitest";
import {
  pushForce, stitchControl, handComfort, fabricRange,
  palmCost, isPalm, forHeavy, needleProfile,
  bestUse, palmNeedleSails,
} from "../palm-needle-sail-calc.js";

describe("pushForce", () => {
  it("roping palm heavy strongest push force", () => {
    expect(pushForce("roping_palm_heavy")).toBeGreaterThan(pushForce("gloving_needle_round"));
  });
});

describe("stitchControl", () => {
  it("gloving needle round best stitch control", () => {
    expect(stitchControl("gloving_needle_round")).toBeGreaterThan(stitchControl("roping_palm_heavy"));
  });
});

describe("handComfort", () => {
  it("seaming palm light most comfortable", () => {
    expect(handComfort("seaming_palm_light")).toBeGreaterThan(handComfort("sailmaker_needle_tri"));
  });
});

describe("fabricRange", () => {
  it("sailmaker needle tri best fabric range", () => {
    expect(fabricRange("sailmaker_needle_tri")).toBeGreaterThan(fabricRange("gloving_needle_round"));
  });
});

describe("palmCost", () => {
  it("roping palm heavy most expensive", () => {
    expect(palmCost("roping_palm_heavy")).toBeGreaterThan(palmCost("gloving_needle_round"));
  });
});

describe("isPalm", () => {
  it("roping palm heavy is a palm", () => {
    expect(isPalm("roping_palm_heavy")).toBe(true);
  });
  it("sailmaker needle tri not a palm", () => {
    expect(isPalm("sailmaker_needle_tri")).toBe(false);
  });
});

describe("forHeavy", () => {
  it("sailmaker needle tri is for heavy", () => {
    expect(forHeavy("sailmaker_needle_tri")).toBe(true);
  });
  it("gloving needle round not for heavy", () => {
    expect(forHeavy("gloving_needle_round")).toBe(false);
  });
});

describe("needleProfile", () => {
  it("sailmaker needle tri has triangular point", () => {
    expect(needleProfile("sailmaker_needle_tri")).toBe("triangular_point");
  });
});

describe("bestUse", () => {
  it("roping palm heavy best for bolt rope sew", () => {
    expect(bestUse("roping_palm_heavy")).toBe("bolt_rope_sew");
  });
});

describe("palmNeedleSails", () => {
  it("returns 5 types", () => {
    expect(palmNeedleSails()).toHaveLength(5);
  });
});
