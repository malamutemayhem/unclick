import { describe, it, expect } from "vitest";
import {
  thinningControl, consistency, learningCurve, bladeSharpness,
  knifeCost, hasGuard, motorized, bladeShape,
  bestUse, skivingKnives,
} from "../skiving-knife-calc.js";

describe("thinningControl", () => {
  it("french paring round best thinning control", () => {
    expect(thinningControl("french_paring_round")).toBeGreaterThan(thinningControl("utility_replaceable_blade"));
  });
});

describe("consistency", () => {
  it("bell skiver machine most consistent", () => {
    expect(consistency("bell_skiver_machine")).toBeGreaterThan(consistency("utility_replaceable_blade"));
  });
});

describe("learningCurve", () => {
  it("utility replaceable blade easiest to learn", () => {
    expect(learningCurve("utility_replaceable_blade")).toBeGreaterThan(learningCurve("french_paring_round"));
  });
});

describe("bladeSharpness", () => {
  it("japanese takobiki thin sharpest blade", () => {
    expect(bladeSharpness("japanese_takobiki_thin")).toBeGreaterThan(bladeSharpness("safety_skiver_guard"));
  });
});

describe("knifeCost", () => {
  it("bell skiver machine most expensive", () => {
    expect(knifeCost("bell_skiver_machine")).toBeGreaterThan(knifeCost("utility_replaceable_blade"));
  });
});

describe("hasGuard", () => {
  it("safety skiver guard has guard", () => {
    expect(hasGuard("safety_skiver_guard")).toBe(true);
  });
  it("french paring round has no guard", () => {
    expect(hasGuard("french_paring_round")).toBe(false);
  });
});

describe("motorized", () => {
  it("bell skiver machine is motorized", () => {
    expect(motorized("bell_skiver_machine")).toBe(true);
  });
  it("japanese takobiki thin is not motorized", () => {
    expect(motorized("japanese_takobiki_thin")).toBe(false);
  });
});

describe("bladeShape", () => {
  it("french paring round uses round bevel edge", () => {
    expect(bladeShape("french_paring_round")).toBe("round_bevel_edge");
  });
});

describe("bestUse", () => {
  it("bell skiver machine best for production strap split", () => {
    expect(bestUse("bell_skiver_machine")).toBe("production_strap_split");
  });
});

describe("skivingKnives", () => {
  it("returns 5 types", () => {
    expect(skivingKnives()).toHaveLength(5);
  });
});
