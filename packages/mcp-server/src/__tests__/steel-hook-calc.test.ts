import { describe, it, expect } from "vitest";
import {
  threadControl, speedFactor, handComfort, precision,
  hookCost, forLace, hasGrip, hookFinish,
  bestProject, steelHooks,
} from "../steel-hook-calc.js";

describe("threadControl", () => {
  it("lace extra fine best thread control", () => {
    expect(threadControl("lace_extra_fine")).toBeGreaterThan(threadControl("comfort_grip_rubber"));
  });
});

describe("speedFactor", () => {
  it("round head smooth fastest", () => {
    expect(speedFactor("round_head_smooth")).toBeGreaterThan(speedFactor("lace_extra_fine"));
  });
});

describe("handComfort", () => {
  it("comfort grip rubber most comfortable", () => {
    expect(handComfort("comfort_grip_rubber")).toBeGreaterThan(handComfort("inline_head_tapered"));
  });
});

describe("precision", () => {
  it("lace extra fine most precise", () => {
    expect(precision("lace_extra_fine")).toBeGreaterThan(precision("round_head_smooth"));
  });
});

describe("hookCost", () => {
  it("bent handle ergo most expensive", () => {
    expect(hookCost("bent_handle_ergo")).toBeGreaterThan(hookCost("inline_head_tapered"));
  });
});

describe("forLace", () => {
  it("lace extra fine is for lace", () => {
    expect(forLace("lace_extra_fine")).toBe(true);
  });
  it("round head smooth is not for lace", () => {
    expect(forLace("round_head_smooth")).toBe(false);
  });
});

describe("hasGrip", () => {
  it("comfort grip rubber has grip", () => {
    expect(hasGrip("comfort_grip_rubber")).toBe(true);
  });
  it("inline head tapered has no grip", () => {
    expect(hasGrip("inline_head_tapered")).toBe(false);
  });
});

describe("hookFinish", () => {
  it("lace extra fine uses hardened steel fine", () => {
    expect(hookFinish("lace_extra_fine")).toBe("hardened_steel_fine");
  });
});

describe("bestProject", () => {
  it("inline head tapered best for amigurumi tight stitch", () => {
    expect(bestProject("inline_head_tapered")).toBe("amigurumi_tight_stitch");
  });
});

describe("steelHooks", () => {
  it("returns 5 types", () => {
    expect(steelHooks()).toHaveLength(5);
  });
});
