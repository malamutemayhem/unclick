import { describe, it, expect } from "vitest";
import {
  surfaceSmooth, reachDepth, controlPull, shaveSpeed,
  chivCost, pushCut, forDeep, bladeArc,
  bestUse, chivShaves,
} from "../chiv-shave-calc.js";

describe("surfaceSmooth", () => {
  it("flat push inside smoothest surface", () => {
    expect(surfaceSmooth("flat_push_inside")).toBeGreaterThan(surfaceSmooth("buzz_short_quick"));
  });
});

describe("reachDepth", () => {
  it("swift long reach deepest reach", () => {
    expect(reachDepth("swift_long_reach")).toBeGreaterThan(reachDepth("buzz_short_quick"));
  });
});

describe("controlPull", () => {
  it("buzz short quick best control pull", () => {
    expect(controlPull("buzz_short_quick")).toBeGreaterThan(controlPull("swift_long_reach"));
  });
});

describe("shaveSpeed", () => {
  it("buzz short quick fastest shave", () => {
    expect(shaveSpeed("buzz_short_quick")).toBeGreaterThan(shaveSpeed("inshave_deep_scoop"));
  });
});

describe("chivCost", () => {
  it("inshave deep scoop most expensive", () => {
    expect(chivCost("inshave_deep_scoop")).toBeGreaterThan(chivCost("buzz_short_quick"));
  });
});

describe("pushCut", () => {
  it("flat push inside is push cut", () => {
    expect(pushCut("flat_push_inside")).toBe(true);
  });
  it("round pull standard not push cut", () => {
    expect(pushCut("round_pull_standard")).toBe(false);
  });
});

describe("forDeep", () => {
  it("swift long reach is for deep", () => {
    expect(forDeep("swift_long_reach")).toBe(true);
  });
  it("buzz short quick not for deep", () => {
    expect(forDeep("buzz_short_quick")).toBe(false);
  });
});

describe("bladeArc", () => {
  it("inshave deep scoop uses deep scoop arc", () => {
    expect(bladeArc("inshave_deep_scoop")).toBe("deep_scoop_arc");
  });
});

describe("bestUse", () => {
  it("swift long reach best for deep barrel inside", () => {
    expect(bestUse("swift_long_reach")).toBe("deep_barrel_inside");
  });
});

describe("chivShaves", () => {
  it("returns 5 types", () => {
    expect(chivShaves()).toHaveLength(5);
  });
});
